import { expect, test } from 'vitest';
import { formatDate, urlHealer } from './index.js';


// * formatDate
test('formatDate should format a medium english date correctly', () => {
  const date = new Date(2024, 0, 1);
  expect(formatDate(date)).toBe('Jan 1, 2024');
});
test('formatDate should format a medium french date correctly', () => {
  const date = new Date(2024, 8, 14);
  expect(formatDate(date, undefined, "fr")).toBe('14 sept. 2024');
});
test('formatDate should format a long english date correctly', () => {
  const date = new Date(2024, 6, 22);
  expect(formatDate(date, "long", "en")).toBe('July 22, 2024');
});

// * urlHealer
test('urlHealer.identifier.separate should separate id and slug correctly', () => {
  const url1 = 'slug-123';
  const result1 = urlHealer.identifier.separate(url1);
  expect.soft(result1).toEqual({ id: 123, slug: 'slug' });

  const url2 = 'slug123';
  const result2 = urlHealer.identifier.separate(url2);
  expect.soft(result2).toEqual({ id: 123, slug: 'slug' });

  const url3 = 'slug---123';
  const result3 = urlHealer.identifier.separate(url3);
  expect.soft(result3).toEqual({ id: 123, slug: 'slug' });

  const url4 = '123';
  const result4 = urlHealer.identifier.separate(url4);
  expect.soft(result4).toEqual({ id: 123, slug: '' });
});
test('urlHealer.identifier.join should join slug and id correctly', () => {
  const slug = 'slug';
  const id = '123';
  const result = urlHealer.identifier.join(slug, id);
  expect(result).toBe("slug-123");
});
test('urlHealer.sanitize should sanitize url correctly', () => {
  const url1 = 'Some URL With Spaces';
  const result1 = urlHealer.sanitize(url1);
  expect.soft(result1).toBe('some-url-with-spaces');

  const url2 = 'some--url-with-dashes---2';
  const result2 = urlHealer.sanitize(url2);
  expect.soft(result2).toBe('some-url-with-dashes-2');
});
