import {
  allPosts,
  postBySlug,
  postById,
  postsByLanguage,
  postsByCategory,
} from './posts.js';
import { test, expect } from 'vitest';

test('allPosts should return an array of posts', () => {
  const posts = allPosts();
  expect(Array.isArray(posts)).toBe(true);
});

test("postBySlug should return undefined when the post slug isn't matching any existing posts", async () => {
  const slug = 'non-existing-post';
  const post = await postBySlug(slug);
  expect(post).toBe(undefined);
});

test('postBySlug should return a post object matching the given slug without the id', async () => {
  const slug = 'svelte-for-beginners';
  const post = await postBySlug(slug);
  expect(post.slug).toBe(slug);
});

test('postById should return a post object matching the given id', () => {
  const id = 2;
  const post = postById(id);
  expect(post.id).toBe(id);
});

test('postById should return undefined when looking for a an id without a post associated', () => {
  const id = 343425434;
  const post = postById(id);
  expect(post).toStrictEqual(undefined);
});

test('postsByLanguage should return an array of posts when looking for a non-existing language', () => {
  const language = 'non-existing-language';
  const posts = postsByLanguage(language);
  expect(posts).toStrictEqual([]);
});

test('postsByLanguage should return an empty array of posts with the given language', () => {
  const language = 'Javascript';
  const posts = postsByLanguage(language);
  expect(posts.every((post) => post.languages.includes(language))).toBe(true);
});

test('postsByCategory should return the right posts', () => {
  const category1 = 'front-end';
  const posts1 = postsByCategory(category1);
  expect
    .soft(posts1.every((post) => post.categories.includes(category1)))
    .toBe(true);

  const category2 = 'non-existing-category';
  const posts2 = postsByCategory(category2);
  expect(posts2).toStrictEqual([]);
});
