import rss from '@astrojs/rss';
import { getPosts, SITE, CATEGORIES } from '../lib/site';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    customData: '<language>zh-CN</language>',
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/posts/${p.id}/`,
      categories: [CATEGORIES[p.data.category].name, ...p.data.tags],
    })),
  });
}
