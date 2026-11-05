// Theorem 代码高亮：只用 5 种颜色，其余一律 ink。
const ink = '#24262a';
const keyword = '#4f6884';
const comment = '#6b6d70';
const string = '#5f7148';
const number = '#8a5a2b';

export default {
  name: 'theorem',
  type: 'light',
  colors: { 'editor.background': '#f0eee8', 'editor.foreground': ink },
  tokenColors: [
    { settings: { foreground: ink } },
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: comment, fontStyle: 'italic' } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new',
        'support.type', 'entity.name.type', 'entity.name.class', 'meta.preprocessor', 'keyword.control.directive'],
      settings: { foreground: keyword, fontStyle: 'bold' },
    },
    { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: string } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character', 'constant.other'], settings: { foreground: number } },
    { scope: ['entity.name.function', 'support.function'], settings: { foreground: ink, fontStyle: 'bold' } },
  ],
};
