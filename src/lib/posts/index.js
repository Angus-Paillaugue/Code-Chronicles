export default function getPostComponent(slug) {
  return import(/* @vite-ignore */`./${slug}.md`);
}