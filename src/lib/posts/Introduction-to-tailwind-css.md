---
title: Introduction to TailwindCSS
description: A simple TailwindCSS tutorial for beginners
banner: /postsAssets/Javascript-for-beginners.jpg
date: '2024-01-01'
languages:
  - TailwindCSS
categories:
  - front-end
published: true
---

<script>
  import { Link } from "$lib/components";
</script>

1. [Introduction](#introduction)
2. [What Is Tailwind CSS?](#what-is-tailwind-css)
3. [The Art Of Writing CSS](#the-art-of-writing-css)
4. [Repetition](#repetition)
5. [The Tailwind CSS Approach](#the-tailwind-css-approach)
6. [Writing CSS Like Shakespeare](#writing-css-like-shakespeare)
7. [Dealing With Remembering](#dealing-with-remembering)
8. [Tailwind Components](#tailwind-components)
9. [Conclusion](#conclusion)


# Introduction

I love writing CSS. It’s a satisfying feeling when you get into the flow, and assemble the pieces of a site like a puzzle. I understand not everyone might feel that way — and a lot of us instead reach for a popular CSS framework.

While each have their pros, and cons — there’s always friction that gets in the way of writing styles like naming, and context switching between files regardless if you’re using a framework, or writing it yourself.

Wouldn’t it be nicer if writing styles could flow like prose?


# What Is Tailwind CSS?

<Link href="https://tailwindcss.com/">Tailwind CSS</Link> is a utility-first CSS framework. In other words, instead of having premade components like other frameworks, Tailwind only offers utility classes to build your site. For example `p-8` is the equivalent of `padding: 2rem`.

Isn’t this more work? You might ask what’s the point, if you can use premade components with traditional CSS frameworks.

**The problem is despite that, they barely offer utility beyond what makes up a component, so you still write your styles separately.**

Modifying the base styles is often a bad developer experience. Remember when you swore you’d never use `!important`? Reality is often disappointing.

*“Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.”*

Writing styles with Tailwind is enjoyable because it removes that friction I mentioned at the start. It let’s you prototype ideas quick since it’s intuitive, and tied to your markup. It’s limiting, but extensible.

Enough talk, let’s go through an example.


# The Art Of Writing CSS

Let’s start with a simple product card using plain HTML, and CSS before we refactor to Tailwind.

You’re welcome to recreate it yourself if you want to retain what you learn. You can use <Link href="https://codepen.io/">Codepen</Link> if you don’t feel like opening your editor.

This is the source code of our finished card.

You can copy the HTML code, if you want to get practice refactoring it to Tailwind later.


```html title='index.html'
<div class="container">
  <article class="card">
    <div class="card-image">
      <img src="https://i.ibb.co/09nx6Jt/converse.webp" alt="Converse sneakers" />
    </div>

    <div class="card-details">
      <h2 class="title">Converse Sneakers</h2>
      <span class="description">High Top (Lemon Yellow)</span>
      <span class="price">$60</span>
    </div>

    <div class="card-colors">
      <span class="screen-reader-only">Colors available</span>

      <button aria-label="Yellow" class="color-btn">
        <div class="color-container">
          <div class="color-first yellow"></div>
          <div class="color-second white"></div>
        </div>
      </button>

      <button aria-label="Red" class="color-btn">
        <div class="color-container">
          <div class="color-first red"></div>
          <div class="color-second white"></div>
        </div>
      </button>

      <button aria-label="Blue" class="color-btn">
        <div class="color-container">
          <div class="color-first blue"></div>
          <div class="color-second white"></div>
        </div>
      </button>

      <button aria-label="Black" class="color-btn">
        <div class="color-container">
          <div class="color-first black"></div>
          <div class="color-second white"></div>
        </div>
      </button>
    </div>

    <div class="card-add">
      <button class="add-btn">
        <p class="add-text">Add to Cart</p>
        <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </article>
</div>
```

```css title='styles.css'
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap");

/* Reset */

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */

:root {
  --app-bg-color: hsl(220, 13%, 91%);
  --card-bg-color: hsl(0, 0%, 100%);
  --text-color: hsl(215, 28%, 17%);
  --border: 1px solid hsl(220, 13%, 91%);
}

/* Container */

.container {
  height: 100vh;
  display: grid;
  place-content: center;
  padding: 1rem;
  font-family: "Montserrat", sans-serif;
  background-color: var(--app-bg-color);
  color: var(--text-color);
}

/* Card */

.card {
  max-width: 24rem;
  background-color: var(--card-bg-color);
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px hsla(0, 0%, 0%, 10%),
    0 4px 6px -2px hsla(0, 0%, 0%, 5%);
  overflow: hidden; /* for the image covering our border */
}

.card-image img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0 1rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
}

.description {
  font-weight: 400;
}

.price {
  font-weight: 600;
}

.card-colors {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;
}

.color-btn {
  padding: 0.125rem;
  background: none;
  border: var(--border);
  border-radius: 50%;
  cursor: pointer;
}

.color-container {
  height: 1.5rem;
  width: 1.5rem;
  transform: rotate(-45deg);
  border-radius: inherit;
  overflow: hidden;
}

.color-first {
  height: 50%;
}

.color-second {
  height: 50%;
}

.card-add {
  margin-top: 1rem;
  padding: 1rem;
  border-top: var(--border);
}

.add-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
  font-weight: 700;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

.add-btn:hover {
  text-decoration: underline;
}

.add-text {
  font-size: 1rem;
}

.plus-icon {
  height: 1.5rem;
  width: 1.5rem;
}

/* Utils */

.screen-reader-only {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

.yellow {
  background-color: hsl(38, 92%, 50%);
}

.red {
  background-color: hsl(0, 84%, 60%);
}

.blue {
  background-color: hsl(217, 91%, 60%);
}

.black {
  background-color: hsl(215, 28%, 17%);
}

.white {
  background-color: hsl(0, 0%, 100%);
}

/* Media */

@media (prefers-color-scheme: dark) {
  :root {
    --app-bg-color: hsl(215, 28%, 17%);
    --card-bg-color: hsl(217, 19%, 27%);
    --text-color: hsl(0, 0%, 100%);
    --border: 1px solid hsl(220, 9%, 46%);
  }
}

@media (min-width: 640px) {
  .container {
    padding: 0;
  }
}
```

There’s not much to the styles. We’re using <Link href="https://fonts.google.com/">Google Fonts</Link>, <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</Link> to control dark mode, and I got the icon from <Link href="https://heroicons.com/">Heroicons</Link>.

I’ve added some basic media queries such as dark mode support, and responsive to show how it translates to Tailwind.

If you’re wondering why for the color options we don’t use a simple gradient — it’s because of an issue with jagged edges when a color abruptly stops in a gradient causing banding.

```css title='example.css'
.gradient {
  background: linear-gradient(145deg, black 50%, white 50%);
}
```

It’s a fixable problem, but I opted for this solution instead since it varies across browsers.


# Repetition

I mentioned earlier how I enjoy writing CSS, but it doesn’t mean I enjoy repetition. How many times do we write out the same things over again?

I mean the tedious nature of curly brackets, semicolons, and coming up with class names, which leads to using methodologies like <Link href="http://getbem.com/introduction/">BEM</Link>, but we’re only fooling ourselves believing this approach is truly a separation of concerns when our markup becomes dependent on the class names we assign it.

I love <Link href="https://sass-lang.com/">SASS</Link>, but truth be told, I rarely find use for it nowadays with CSS variables being a thing, and how everything is componentized if you’re using a JavaScript framework, or having the option of using <Link href="https://en.wikipedia.org/wiki/CSS-in-JS">CSS-in-JS</Link> in popular frameworks such as <Link href="https://reactjs.org/">React</Link>.


# The Tailwind CSS Approach

To get up and going, we’re going to use <Link href="https://play.tailwindcss.com/">Tailwind Play</Link>, the official playground provided by the Tailwind team. It has everything set up. Once you open it, clear the example in the HTML file, so we can work from a blank slate.

If you want to use Tailwind in your project you can read the <Link href="https://tailwindcss.com/docs/installation">installation steps</Link> from the documentation.

Let me briefly explain how Tailwind works.

Tailwind uses a `tailwind.config.js` config file that uses PostCSS under the hood that uses the `@tailwind` directive inside your CSS file at build-time to inject:

 - base (Tailwind base styles, CSS reset)
 - components (component classes)
 - utilities (utiliy classes)

Don’t panic! This is just an explanation of how it works. Setting it up is straightforward, and doesn’t require any configuration.

The amount of utility classes can lead to huge files, but Tailwind purges unused styles for you creating a tiny file in production. You can learn more about it if you read <Link href="https://tailwindcss.com/docs/optimizing-for-production">optimizing for production</Link>.

Some people shrug their shoulders at resets, but when you’re recreating a design. The amount of CSS you write is negligible since you only end up having to add a couple of lines of styles for things such as headings, and paragraphs.

You’re going to rewrite the defaults anyhow, if you want consistency, and not spending a lot of time inspecting what styles you’re trying to change.

Tailwind among other things also has support for dark mode, media queries, and plugins like <Link href="https://github.com/tailwindlabs/tailwindcss-aspect-ratio">aspect ratio</Link> that gives elements a fixed aspect ratio making it easy to use those features without thinking about implementation details (at the time of writing this only Chrome, and Edge support the built-in <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio">aspect-ratio</Link>).

Let’s refactor the earlier example to use Tailwind.


# Writing CSS Like Shakespeare

In the CSS section of Tailwind Play, we can import our font. Don’t think it’s anything magical. It’s a normal CSS file.


```css title='styles.css'
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;
```

We can declare the font here like you would. Instead, let’s modify the config instead. Tailwind by default doesn’t come with everything enabled due to file size concerns (Tailwind Play has everything enabled).

That means we can also specify the base Tailwind colors we want to use. We can look at <Link href="https://tailwindcss.com/docs/customizing-colors">available Tailwind colors</Link> for example, but we can also add ours into the config file.

```js title='tailwind.config.js'
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  theme: {
    color: {
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      black: colors.black,
    },
    fontFamily: {
      serif: ['Montserrat', 'system-ui'],
    },
  },
  variants: {},
  plugins: [],
}
```

You can copy the original HTML code if you wish to follow along. The nice thing is that we don’t have to write any resets. We’re going to start by replacing the classes with Tailwind.

Let’s start with the container.

```html title='index.html'
<div class="grid h-screen p-4 font-serif text-gray-800 bg-gray-200 place-content-center dark:bg-gray-800 dark:text-gray-50 sm:p-0">
  <!-- ... -->
</div>
```

Notice the helpful autocomplete feature when you type out Tailwind classes. This makes for a nicer developer experience. If you’re using VS Code I recommend you get <Link href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss">Tailwind CSS IntelliSense</Link>. If at any point you lose the suggestions, press <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd>.

The first thought you might have is “whoa, that’s a lot of markup!“. Once you shift how you think, you’re not going to want to go back. I believe it’s wrong saying that using Tailwind is not having to write CSS. It’s the opposite. You write CSS, that’s more terse.

You’re able to change things as you think, not having to switch to a separate file, and think about naming conventions. It let’s you be more creative, and productive.

Let’s do the same for the card.

```html title='index.html'
<div class="grid h-screen p-4 font-serif text-gray-800 bg-gray-200 place-content-center dark:bg-gray-800 dark:text-gray-50 sm:p-0">
  <article class="max-w-sm overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700">
    <!-- ... -->
  </article>
</div>
```

Notice how simple adding dark mode is with the `dark` variant and the use of media queries. Tailwind uses a mobile first approach with the <Link href="https://tailwindcss.com/docs/breakpoints">default breakpoints</Link> being `sm`, `md`, `lg`, `xl`, `2xl`.

We can even remove most of the styles from the image, because of Tailwind defaults.

```html title='index.html'
<div class="grid h-screen p-4 font-serif text-gray-800 bg-gray-200 place-content-center dark:bg-gray-800 dark:text-gray-50 sm:p-0">
  <article class="max-w-sm overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700">
    <div>
      <img class="object-cover" src="https://i.ibb.co/09nx6Jt/converse.webp" alt="Converse sneakers"/>
    </div>
    <!-- ... -->
  </article>
</div>
```

Let’s style the details such as title, description, price.

```html title='index.html'
<div class="grid h-screen p-4 font-serif text-gray-800 bg-gray-200 place-content-center dark:bg-gray-800 dark:text-gray-50 sm:p-0">
  <article class="max-w-sm overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700">
    <div>
      <img class="object-cover" src="https://i.ibb.co/09nx6Jt/converse.webp" alt="Converse sneakers"/>
    </div>

    <div class="flex flex-col gap-0.5 mt-4 px-4">
      <h2 class="text-lg font-semibold">Converse Sneakers</h2>
      <span class="font-normal">High Top (Lemon Yellow)</span>
      <span class="font-semibold">$60</span>
    </div>
    <!-- ... -->
  </article>
</div>
```

Next up is the color section.

```html title='index.html'
<div class="grid h-screen p-4 font-serif text-gray-800 bg-gray-200 place-content-center dark:bg-gray-800 dark:text-gray-50 sm:p-0">
  <article class="max-w-sm overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700">
    <div>
      <img class="object-cover" src="https://i.ibb.co/09nx6Jt/converse.webp" alt="Converse sneakers"/>
    </div>

    <div class="flex flex-col gap-0.5 mt-4 px-4">
      <h2 class="text-lg font-semibold">Converse Sneakers</h2>
      <span class="font-normal">High Top (Lemon Yellow)</span>
      <span class="font-semibold">$60</span>
    </div>

    <div class="flex gap-4 px-4 mt-4">
      <span class="sr-only">Colors available</span>

      <button aria-label="Yellow" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-yellow-500 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>

      <button aria-label="Red" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-red-500 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>

      <button aria-label="Blue" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-blue-500 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>

      <button aria-label="Black" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-gray-800 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>
    </div>
    <!-- ... -->
  </article>
</div>
```

“That’s great, but it’s a lot of repetition” you might be thinking. While you would be right, keep in mind when using a framework you often loop through some data you get. You would only have to change it in one place — if it was a component.

There’s other ways of extracting out classes (see the documentation), but it’s not recommended as you get into the same predicament as writing regular styles. One helpful feature is to toggle word wrap in your editor.

The last thing left is the “Add to Cart” section.

```html title='index.html'
<div class="grid h-screen p-4 font-serif text-gray-800 bg-gray-200 place-content-center dark:bg-gray-800 dark:text-gray-50 sm:p-0">
  <article class="max-w-sm overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700">
    <div>
      <img class="object-cover" src="https://i.ibb.co/09nx6Jt/converse.webp" alt="Converse sneakers"/>
    </div>

    <div class="flex flex-col gap-0.5 mt-4 px-4">
      <h2 class="text-lg font-semibold">Converse Sneakers</h2>
      <span class="font-normal">High Top (Lemon Yellow)</span>
      <span class="font-semibold">$60</span>
    </div>

    <div class="flex gap-4 px-4 mt-4">
      <span class="sr-only">Colors available</span>

      <button aria-label="Yellow" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-yellow-500 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>

      <button aria-label="Red" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-red-500 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>

      <button aria-label="Blue" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-blue-500 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>

      <button aria-label="Black" class="p-0.5 bg-white border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer">
        <div class="w-6 h-6 overflow-hidden transform -rotate-45 rounded-full">
          <div class="bg-gray-800 h-1/2"></div>
          <div class="h-1/2 white"></div>
        </div>
      </button>
    </div>

    <div class="p-4 mt-4 border-t border-gray-200 dark:border-gray-600">
      <button class="flex items-center justify-between w-full font-bold cursor-pointer hover:underline">
        <p class="text-base">Add to Cart</p>
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  </article>
</div>
```

There’s more you can do with hover, focus, and other states. You can look at the <Link href="https://play.tailwindcss.com/MhPY3fFFtF">complete example</Link> on Tailwind Play.


# Dealing With Remembering

Often people are overwhelmed with just the amount of regular CSS properties to remember. Tailwind requires you to understand CSS, unlike other frameworks which is a great way to learn.

You will have an easier time if you read the documentation, but I also recommend dumping the entire config file so you can reference it. This is done easily from the <Link href="https://tailwindcss.com/docs/configuration">configuration step</Link>.

```shell title='terminal'
npx tailwindcss init tailwindcss-full-config.js --full
```
The real `tailwindcss.config.js` config is going to be used for your project, and you can use this one for reference.


# Tailwind Components

If you end up loving Tailwind, but still think it’s a drag to create components from scratch there’s free resources like <Link href="https://tailwindcomponents.com/">Tailwind Components</Link>.

If you want access to official Tailwind components, you can look at the paid components from <Link href="https://tailwindui.com/">Tailwind UI</Link> if you want to support the creators of Tailwind CSS.


# Conclusion

Hope you give Tailwind a chance! You can use it for other things such as <Link href="https://en.wikipedia.org/wiki/Software_prototyping">rapid prototypes</Link>. It might not be your cup of tea, and that’s fine. I just hope you at least give it a try, and keep an open mind.

If you want to learn Tailwind CSS, I highly recommend watching <Link href="https://www.youtube.com/playlist?list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0">Tailwind CSS: From Zero to Production</Link> from the official <Link href="https://www.youtube.com/tailwindlabs">Tailwind Labs YouTube channel</Link>. You’re going to end up learning more about CSS in the process.