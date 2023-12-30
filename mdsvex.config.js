import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';


const config = {
    extensions: ['.md', ".svx"],
	remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
};

export default config;