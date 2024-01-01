import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from "remark-flexible-code-titles";

const config = {
    extensions: ['.md', ".svx"],
	remarkPlugins: [remarkUnwrapImages, remarkCodeTitles],
	rehypePlugins: [rehypeSlug],
};

export default config;