# Theorem

Theo 的个人博客，网址 https://xuethlovelicy.xyz 。用 Astro 生成静态页面，部署在 Cloudflare Workers。

## 本地预览

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 写文章

用命令生成预填好文件头的空文件，然后接着写正文：

```bash
npm run new -- my-new-post --title "文章标题" --category tech --tags "C++,Astro" --summary "一句话摘要"
```

`--title` 和 `--category` 必填，有图片的文章加 `--dir`，其余选项见 `npm run new -- --help`。

头图（`cover: ./cover.jpg`，16:9）、图注（`coverCaption`）和读完日期（`book` 里的 `finished`）没有对应参数，需要时加到生成的文件头里。

正文里可用的写法：

- 提示框：`<div class="note tip">…</div>`、`<div class="note warn">…</div>`（标签内外各空一行）
- 双图并排：`<div class="pair">` 里放两张 `![说明](./a.jpg)`
- 手绘示意图：`<svg class="diagram">`，线条用 `class="ink"`

## 设计

颜色、字体、间距都在 `src/styles/global.css` 的变量里；手绘图标在 `public/icons.svg`；代码高亮主题在 `src/lib/shiki-theme.js`。完整规范见《Theorem 博客设计方案》。
