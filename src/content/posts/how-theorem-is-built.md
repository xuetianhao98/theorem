---
title: 这个博客是怎么搭起来的
date: 2026-11-05
category: tech
tags: [Astro, Cloudflare, 建站]
summary: Astro 生成静态页面，Cloudflare 负责托管，写作只需要一个 Markdown 文件。
---

Theorem 是一个纯静态网站：所有页面在构建时生成好，服务器只负责把文件发出去。这样既快，也几乎不用维护。

## 技术选型

- **Astro**：把 Markdown 编译成 HTML，默认不往页面里塞 JavaScript。
- **Cloudflare Workers**：托管构建好的静态文件，绑定自己的域名。
- **Shiki**：在构建时完成代码高亮，用的是自己调的一套五色主题。

## 写一篇文章

在 `src/content/posts/` 下新建一个 Markdown 文件，文件名就是文章的网址：

```yaml
---
title: 结构体的内存对齐
date: 2026-07-01
category: tech        # tech / travel / life / reading
tags: [C++]
summary: 对 C++ 结构体的内存对齐机制做一个全面的阐述
---
```

<div class="note tip">

没有配图的文章不需要准备封面，列表里会自动显示所属分类的手绘小图标。

</div>

## 代码高亮

代码块只用五种颜色：关键字灰蓝、注释灰、字符串橄榄、数字赭石，其余都是正文的墨色。

```cpp
#include <cstdio>

struct S {
    char  a;   // offset 0
    int   b;   // offset 4
    short c;   // offset 8
};

int main() {
    std::printf("sizeof(S) = %zu\n", sizeof(S));  // 12
    return 0;
}
```

## 发布

把改动推送到 GitHub，Cloudflare 会自动构建并发布。本地预览用：

```bash
npm install
npm run dev
```
