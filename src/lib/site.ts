import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Category = Post['data']['category'];

export const SITE = {
  name: 'Theorem',
  author: 'Theo',
  description: '写代码时想明白的事，和路上看到的风景。',
};

export const CATEGORIES: Record<Category, { name: string; icon: string; blurb: string }> = {
  tech: { name: '技术', icon: 'i-code', blurb: '写代码时想明白的事' },
  travel: { name: '游记', icon: 'i-hill', blurb: '路上看到的风景' },
  life: { name: '日常', icon: 'i-cup', blurb: '一些平常的日子' },
  reading: { name: '读书', icon: 'i-book', blurb: '读过的书和留下的话' },
};

export async function getPosts() {
  const all = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function groupByYear(posts: Post[]) {
  const map = new Map<number, Post[]>();
  for (const p of posts) {
    const y = p.data.date.getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(p);
  }
  return [...map.entries()];
}

const pad = (n: number) => String(n).padStart(2, '0');
export const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fmtMonthDay = (d: Date) => `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** 字数：汉字按字计，其余按词计；代码块不计入。 */
export function wordCount(body = '') {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const cjk = text.match(/[㐀-鿿豈-﫿]/g)?.length ?? 0;
  const latin = text.replace(/[㐀-鿿豈-﫿]/g, ' ').match(/[A-Za-z0-9]+/g)?.length ?? 0;
  return cjk + latin;
}

export const readMinutes = (count: number) => Math.max(1, Math.round(count / 350));

export const postUrl = (p: Post) => `/posts/${p.id}/`;
export const tagUrl = (t: string) => `/tags/${encodeURIComponent(t)}/`;
