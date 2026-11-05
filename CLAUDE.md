# Theorem

Theo 的个人中文博客（https://xuethlovelicy.xyz ）。用 Astro 生成纯静态页面，部署在 Cloudflare Workers 的静态资源托管上，没有服务端代码。

## 常用命令

```bash
npm install
npm run dev      # 本地预览 http://localhost:4321，会显示草稿
npm run build    # 输出到 dist/，同时校验文章文件头；项目没有测试，改动后用它验证
npm run new -- <slug> --title <标题> --category <分类>   # 新建文章
```

## 目录结构

- `src/content/posts/`：文章，`<slug>.md` 或 `<slug>/index.md`
- `src/content.config.ts`：文章文件头的 schema
- `src/pages/`：路由，包括文章、分类、标签、RSS 和关于页
- `src/components/`、`src/layouts/`：组件和布局
- `src/lib/site.ts`：分类信息、文章查询、日期格式化等共用逻辑
- `src/lib/shiki-theme.js`：代码高亮主题
- `src/styles/global.css`：颜色、字体、间距等设计变量
- `public/icons.svg`：手绘图标
- `scripts/`：辅助脚本
- `wrangler.jsonc`：Cloudflare Workers 部署配置

## 文档索引

需要时查阅 `docs/` 下的文档：

- [新建文章工具](docs/new-post-tool.md)：`npm run new` 的参数、示例、报错行为和维护事项。新建文章前先读。

`README.md` 面向人，其中有文章正文可用的特殊写法（提示框、双图并排、手绘示意图）。

新增 `docs/` 文档时，在这里加一条索引；工具的行为变化时，同步更新对应文档。
