This is repository for my home page. It is built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/) and is deployed into [Vercel](https://vercel.com/).

## Current state

<img width="2672" height="1527" alt="Main page" src="https://github.com/user-attachments/assets/bcfe3432-2817-4b06-93f8-59ccd400c48e" />

The design is minimalistic and was made of parts I used on my old next.js landing. This design is not final and is work in progress.

## Project structure

├── public/
├── README.md
├── src
│   ├── assets/
│   ├── components
│   ├── consts.ts
│   ├── content
│   │   ├── blog
│   │   │   ├── hello-world.mdx
│   │   ├── drafts
│   │   │   ├── first-post.md
│   │   │   ├── markdown-style-guide.md
│   │   │   ├── quick-post-test.mdx
│   │   │   ├── second-post.md
│   │   │   ├── third-post.md
│   │   │   └── using-mdx.mdx
│   │   └── pages
│   │       ├── about-me.mdx
│   │       └── uses.mdx
│   ├── content.config.ts
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── types.ts
└── tsconfig.json

`/src/content/blog` folder contain all published posts, `/src/content/drafts` folder contains all unpublished posts, `/src/content/pages` folder is responsible for the contents of pages like "About me".

## Writing posts

To create a post you need to go to `/src/content/posts` and create `*.mdx` file there. There is some metainfo for this file.

### Quick post
Quick post is the post that doesn't have it's own single page, url and is rendered in a blog list without title. To create such post, create `*.mdx` file and paste there something like this:

```md
---
pubDate: 'Sep 22 2025'
quick: true
---
```

### Ordinary post

```md
---
title: Jam.dev
description: "Brief note about Jam.dev - Chrome extension which can capture screenshot, record tab or whole desktop and share link to 'bug report'."
excerpt: "Occasionally found usefull instrument which can solve every developer's pain - somebody found the bug, but you don't know all details about how, where and why."
pubDate: 'Jul 09 2024'
heroImage: '/src/assets/jam-dev.avif'
---
```
`excerpt` is useful to more control of text to cut and show in blog list. Hero image is first image in post that is show before the excerpt. Image is not always required, you can create posts without it.

### Posts with images

To create posts with images inside I use my own component `MdxImage`. I use it like this:

```mdx
import MdxImage from '../../components/MdxImage.astro';

<MdxImage src='/src/assets/chrome-extension-panel.avif' width={600} caption="Here is how Chrome extension panel looks like" />
```

To create gallery (it only creates a grid of MdxImages, I use `MdxGallery` component.

```mdx
import MdxGallery from '../../components/MdxGallery.astro';

<MdxGallery items={['crush-80_3.avif', 'crush-80_4.avif', 'crush-80_5.avif', 'crush-80_6.avif']} width={697} withUrl />
```

It accepts names of files and searches `src/assets` folder for them. `withUrl` param indicates can you go to the original image by clicking on any image in the gallery.

### Posts with Youtube

Sadly, Youtube doesn't work in my country, but if you want to show posts with Youtube video player, here is the component for it.

```mdx
import MdxYoutube from '../../components/MdxYoutube.astro';

<MdxYoutube src="https://www.youtube.com/embed/J7TFwaULXg4?si=K73fSWH-TI-SrWHq" title="YouTube video player" />
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
