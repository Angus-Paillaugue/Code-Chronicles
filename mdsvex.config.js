import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from 'remark-flexible-code-titles';

// rehypeSlug is used to add IDs to headings
// remarkUnwrapImages is used to remove the wrapping <p> tag around images
// remarkCodeTitles is used to add titles to code blocks

const config = {
  extensions: ['.md', '.svx'],
  remarkPlugins: [remarkUnwrapImages, remarkCodeTitles],
  rehypePlugins: [rehypeSlug],
};

export default config;
