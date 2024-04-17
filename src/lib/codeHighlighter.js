import { codeToHtml, getHighlighter } from 'shiki';
import { parse } from 'node-html-parser';
const THEME = 'one-dark-pro';

/**
 * @param code {string} - code to highlight
 * @param lang {string} - code language
 * @param meta {string} - code meta
 * @returns {Promise<string>} - highlighted html
 */
async function highlighter(code, lang, meta) {
  await getHighlighter({
    langs: [lang],
    themes: [THEME],
  });

  let html;
  if (!meta) {
    html = await codeToHtml(code, {
      lang,
      theme: THEME,
    });
  } else {
    html = await codeToHtml(code, {
      lang,
      theme: THEME,
      meta: { __raw: meta },
    });
  }

  html = makeFocussable(html);
  return escapeHtml(html);
}

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} html - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
  return code.replace(
    /[{}`]/g,
    (character) =>
      ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' })[character]
  );
}

/**
 * @param html {string} - code to highlight
 * @returns {string} - highlighted html
 */
function makeFocussable(html) {
  const root = parse(html);
  root.querySelector('pre').setAttribute('tabIndex', '0');
  return root.toString();
}

export default highlighter;
