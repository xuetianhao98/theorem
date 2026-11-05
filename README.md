# Theorem

Theo 的个人博客，网址 https://xuethlovelicy.xyz 。用 Astro 生成静态页面，部署在 Cloudflare Workers。

## 本地预览

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
```

## 写文章

在 `src/content/posts/` 下新建 `英文-slug.md`（有图片的文章可以建一个同名文件夹，放 `index.md` 和图片），文件名就是网址。

```yaml
---
title: 文章标题
date: 2026-11-05
category: tech          # tech 技术 / travel 游记 / life 日常 / reading 读书
tags: [C++]
summary: 一句话摘要，显示在列表里
# 可选：
# draft: true           # 草稿，只在本地 dev 显示
# icon: i-code          # 换一个手绘图标
# location: 青岛         # 游记的地点
# cover: ./cover.jpg    # 游记头图（16:9）
# coverCaption: 图注
# book: { title: 书名, author: 作者, finished: 2026-06-18 }
---
```

正文里可用的写法：

- 提示框：`<div class="note tip">…</div>`、`<div class="note warn">…</div>`（标签内外各空一行）
- 双图并排：`<div class="pair">` 里放两张 `![说明](./a.jpg)`
- 手绘示意图：`<svg class="diagram">`，线条用 `class="ink"`

## 设计

颜色、字体、间距都在 `src/styles/global.css` 的变量里；手绘图标在 `src/components/IconSprite.astro`；代码高亮主题在 `src/lib/shiki-theme.js`。完整规范见《Theorem 博客设计方案》。
