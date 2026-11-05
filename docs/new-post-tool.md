# 新建文章工具

`scripts/new-post.mjs`（通过 `npm run new` 调用）生成预填好文件头、正文为空的 Markdown 文件。新建文章时都应该使用它，不要手写文件头。

## 用法

```bash
npm run new -- <slug> --title <标题> --category <分类> [选项]
```

`npm run new` 后面的 `--` 不能省略，否则参数会被 npm 接收，传不到脚本。

| 参数 | 必填 | 说明 |
|---|---|---|
| `<slug>` | 是 | 文件名和网址，格式为 `^[a-z0-9]+(-[a-z0-9]+)*$` |
| `--title` | 是 | 标题 |
| `--category` | 是 | `tech` / `travel` / `life` / `reading` |
| `--summary` | 否 | 摘要，默认空字符串 |
| `--tags` | 否 | 逗号分隔，中英文逗号都可以，默认 `[]` |
| `--date` | 否 | `YYYY-MM-DD`，默认本地时区的今天 |
| `--draft` | 否 | 写入 `draft: true`，文章只在 `npm run dev` 时显示 |
| `--dir` | 否 | 生成 `<slug>/index.md`，图片放在同一文件夹 |
| `--icon` | 否 | 图标 ID，定义在 `public/icons.svg`，不传时使用分类的默认图标 |
| `--location` | 否 | 游记的地点 |
| `--book` / `--author` | 否 | 写入 `book: { title, author }`，两者须同时提供 |
| `--help` | 否 | 打印用法 |

## 示例

```bash
npm run new -- my-new-post --title "文章标题" --category tech --tags "C++,Astro" --summary "一句话摘要"
```

生成 `src/content/posts/my-new-post.md`，对应网址 `/posts/my-new-post/`：

```yaml
---
title: "文章标题"
date: 2026-11-05
category: tech
tags: ["C++", "Astro"]
summary: "一句话摘要"
---
```

带图片的文章和读书笔记：

```bash
npm run new -- qingdao-trip --title "青岛三日" --category travel --location "青岛" --dir
npm run new -- some-book --title "读《某书》" --category reading --book "某书" --author "某作者" --draft
```

## 行为

- **成功：** 打印 `已创建：<相对路径>`，退出码为 0。
- **失败：** 向 stderr 打印 `错误：<原因>`，退出码为 1，不写入文件。以下情况会失败：
  - 缺少必填项，或存在未知参数、多余的位置参数
  - slug 或分类不合法
  - 日期格式不对，或日期不存在（如 `2026-02-31`）
  - `--book` 和 `--author` 只传了一个
  - `<slug>.md` 或 `<slug>/` 已存在（两者对应同一个网址），已有文件不会被覆盖
- **不校验：** `--icon` 的值是否真实存在，写错不会报错，传入前先查 `public/icons.svg`。
- **字符串转义：** 用户输入的字符串都用 `JSON.stringify` 写入文件头，所以含冒号、引号、`#` 的值和纯数字标题都是安全的，不需要预先转义。

## 生成后

- **摘要：** 没传 `--summary` 时要在写完后补上。空摘要能通过构建，但文章列表和 RSS 描述会是空的。
- **未写完的文章：** 不加 `--draft` 就会随下一次构建发布，所以没写完时要加 `--draft`，写完后删掉 `draft: true`。
- **没有参数的字段：** `cover`、`coverCaption` 和 `book` 里的 `finished` 需要手动加到文件头。`cover` 的图片必须已经存在，否则构建失败；图片要和文章放在一起，所以应使用 `--dir`。
- **校验：** 运行 `npm run build`，它会按 `src/content.config.ts` 的 schema 校验文件头。

## 维护

- **分类：** 分类在 `scripts/new-post.mjs` 的 `CATEGORIES` 和 `src/content.config.ts` 的 `category` 枚举里各有一份，脚本无法导入后者。增删分类时两处都要改，同时还要改 `src/lib/site.ts` 里的分类信息。
- **文件头字段：** 修改 schema 时，检查脚本的参数和本文档是否需要同步。
