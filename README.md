## FE Challenge

For this challenge, i used my own Nextjs Template https://github.com/hanifrev/nextjs-redux-starter with modification

#### Installation

You can use yarn / npx, it's up to you, but I recommend to using pnpm

```
pnpm install
```

#### Running

```bash
pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Method to reduces loading times

In here I'm using Time to First Byte (TTFB) and First Contentful Paint (FCP) methods

For TTFB, I implementing SSR to fetch the initial data, and since I'm using RTK Query to handle the API things, I follow this resources to make RTK query work on server side rendering ( https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering )

And i used next/dynamic to do dynamic import on ProductList components inside Product modules, Product Detail component, and on Carousel component too. By using that, it keeps the initial bundle smaller and can improve performance metrics like Time to First Byte (TTFB) and First Contentful Paint (FCP) on the initial page load.

For FCP, I'm using lazy load images. In next.js, we can do lazy load images if we're using next/image component, so I implement loading="lazy" to all Image component
