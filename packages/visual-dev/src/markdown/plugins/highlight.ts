/* eslint-disable no-console */
import escapeHtml from 'escape-html';
import prism from 'prismjs';

// prism is listed as actual dep so it's ok to require
const loadLanguages = require('prismjs/components/index');

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript']);

function wrap(code: string, lang: string): string {
  if (lang === 'text') {
    code = escapeHtml(code);
  }
  return ` <div class="language-${lang}"><pre><code>${code}</code></pre></div>`;
}

export const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text');
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup';
  }
  if (lang === 'md') {
    lang = 'markdown';
  }
  if (lang === 'ts') {
    lang = 'typescript';
  }
  if (lang === 'py') {
    lang = 'python';
  }
  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang]);
    } catch (e) {
      console.warn(`Syntax highlight for language "${lang}" is not supported.`);
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, 'text');
};
