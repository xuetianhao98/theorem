#!/usr/bin/env node
// 新建文章：生成预填好文件头的空 Markdown 文件。用法见 USAGE，或运行 npm run new -- --help。
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

// 与 src/content.config.ts 的 category 保持一致（那边依赖 astro:content，这里无法导入）。
const CATEGORIES = ['tech', 'travel', 'life', 'reading'];

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS_DIR = join(ROOT, 'src/content/posts');

const USAGE = `用法：npm run new -- <slug> --title <标题> --category <分类> [选项]

  <slug>             文件名和网址，只允许小写字母、数字和连字符
  --title <标题>     必填
  --category <分类>  必填，可选 ${CATEGORIES.join(' / ')}
  --summary <摘要>   一句话摘要，不传则留空，之后再补
  --tags <标签>      逗号分隔，如 "C++,Astro"
  --date <日期>      YYYY-MM-DD，默认今天
  --draft            标记为草稿，只在本地 dev 显示
  --dir              生成 <slug>/index.md，用于带图片的文章
  --icon <图标>      手绘图标，如 i-code
  --location <地点>  游记的地点
  --book <书名>      读书笔记的书名，须与 --author 同时提供
  --author <作者>    读书笔记的作者
  --help             显示本说明

示例：npm run new -- my-new-post --title "文章标题" --category tech --tags "C++,Astro"`;

function fail(message) {
  console.error(`错误：${message}\n运行 npm run new -- --help 查看用法。`);
  process.exit(1);
}

const pad = (n) => String(n).padStart(2, '0');

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// 正则之外再转换回来比较一次，才能挡住 2026-02-31 这样不存在的日期。
function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0, 10) === value;
}

let parsed;
try {
  parsed = parseArgs({
    allowPositionals: true,
    options: {
      title: { type: 'string' },
      category: { type: 'string' },
      summary: { type: 'string', default: '' },
      tags: { type: 'string', default: '' },
      date: { type: 'string' },
      draft: { type: 'boolean', default: false },
      dir: { type: 'boolean', default: false },
      icon: { type: 'string' },
      location: { type: 'string' },
      book: { type: 'string' },
      author: { type: 'string' },
      help: { type: 'boolean', default: false },
    },
  });
} catch (err) {
  fail(err.message);
}
const { values: args, positionals } = parsed;

if (args.help) {
  console.log(USAGE);
  process.exit(0);
}

const [slug, ...extra] = positionals;
if (!slug) fail('缺少 slug');
if (extra.length) fail(`多余的参数：${extra.join(' ')}`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(`slug 只能包含小写字母、数字和连字符：${slug}`);
if (!args.title) fail('缺少 --title');
if (!args.category) fail('缺少 --category');
if (!CATEGORIES.includes(args.category)) fail(`--category 只能是 ${CATEGORIES.join(' / ')}：${args.category}`);
if (args.date !== undefined && !isValidDate(args.date)) fail(`--date 不是有效的 YYYY-MM-DD 日期：${args.date}`);
if (Boolean(args.book) !== Boolean(args.author)) fail('--book 和 --author 须同时提供');

// <slug>.md 和 <slug>/index.md 对应同一个网址，两种形式都要查。
const flat = join(POSTS_DIR, `${slug}.md`);
const folder = join(POSTS_DIR, slug);
for (const existing of [flat, folder]) {
  if (existsSync(existing)) fail(`已存在：${relative(ROOT, existing)}`);
}

// JSON 字符串同时是合法的 YAML 双引号字符串，标题里有冒号、# 或全是数字都不会出问题。
const str = JSON.stringify;
const tags = args.tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean);

const lines = [
  '---',
  `title: ${str(args.title)}`,
  `date: ${args.date ?? today()}`,
  `category: ${args.category}`,
  `tags: [${tags.map(str).join(', ')}]`,
  `summary: ${str(args.summary)}`,
];
if (args.draft) lines.push('draft: true');
if (args.icon) lines.push(`icon: ${str(args.icon)}`);
if (args.location) lines.push(`location: ${str(args.location)}`);
if (args.book) lines.push(`book: { title: ${str(args.book)}, author: ${str(args.author)} }`);
lines.push('---', '', '');

const target = args.dir ? join(folder, 'index.md') : flat;
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, lines.join('\n'), { flag: 'wx' });
console.log(`已创建：${relative(ROOT, target)}`);
