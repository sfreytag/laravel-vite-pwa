# laravel-vite-pwa

This repository demonstrates building a PWA for Laravel, Vite and Vue by configuring the [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa).

This process is made complex by Laravel being a mix of backend and frontend concepts. For example,

- Laravel has its own public dir
- So vite then builds to public/build/assets which is different to the usual frontend layout
- there is not an immediately apparent static HTML entrypoint for the PWA
- Laravel will put other things (like Telescope) in the public dir that you do not want offline

This repo builds on all the advice in [this issue](https://github.com/vite-pwa/vite-plugin-pwa/issues/431). Thoughts, feedback or improvements are welcome - there are probably other ways to solve the same problems!

# What's Here?

This repo demonstrates a working PWA with install prompts and offline support within Laravel using Vue3, Vite and Typescript. The useful things are:

- A vite.config.ts with settings for `VitePWA` that work with Laravel's directory layout
- A Blade template that works as the entrypoint for the PWA
- A generator for the PWA icons
- A `server.php` file that supplies the Service-Worker-Allowed header for `php artisan serve` for local development
- A composable `usePwa` that demonstrates how to access the `vite-plugin-pwa` functionality within Vue3 and TypeScript (eg install and update hooks, online/offline status)
- A `PwaStatus` component that shows how it all works
- TypeScript types for the install event

# Setup

This repo has been built on a vanilla install of Laravel 10 using composer from `composer create-project laravel/laravel`.

To see the changes I then made to set up the PWA,

1. Work through the commit history, which builds it up step-by-step
2. Or view the entire diff of the HEAD against the vanilla Laravel install: https://github.com/sfreytag/laravel-vite-pwa/compare/a59497..HEAD

Or just fork the repo and start from there!

## Build

To build this repo, follow the usual Laravel steps. Assuming you have PHP, NPM and Composer:

```
git clone git@github.com:sfreytag/laravel-vite-pwa.git
cd laravel-vite-pwa
composer install
cp .env.example .env
php artisan key:generate
npm install
npm run build
```

## Run 

Before you run it, bear in mind that the PWA installs a service worker and fills a cache. This can conflict with other service workers and caches from your other localhost projects. So I recommend using a port unique to each PWA project, eg to use 8082 for this one:

```
php artisan serve --port=8082
```

The app should now be running on http://localhost:8082 (or whichever port you picked). It should immediately work as a PWA. If you check the dev tools, the service worker should be running. If your browser offers it there will be an intall prompt in the address bar. It should then be installable. And if you use dev tools to take either the network or service worker offline, it should continue working if you reload the page.

## Working on the PWA

The PWA is configured to only work with prod builds, rather than dev. This is straightforward to work with and helps stop the PWA cache get in the way of refreshing your build during the dev cycle. However this might not suit everyone. It would be a good PR to submit to this repo to get the PWA working with a dev build. In the meantime, before running the PWA and when making changes to be sure you have the latest version of it, ensure you use:

```
npm run build
```

## PWA Icons

This project uses [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) for its icons.

The canonical icon should be an SVG file. This is useful for the PWA anyway, so it can be saved in `public/favicon.svg`. Then build the other icons from it by running:

```
npm run pwa-icons
```

This generates a set of icons defined by the minimal preset described [here](https://vite-pwa-org.netlify.app/assets-generator/cli.html#presets) which matches up pretty well with this [detailed blog post about favicons](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7).

They are automatically packaged in the public folder so they are web readable. They are also included in this repo so this process only needs repeating if you change the the canonical favicon.svg icon.

## Screenshot

![image](https://github.com/sfreytag/laravel-vite-pwa/assets/1155275/f98383dd-93e8-4d6d-abb0-06a6ddd55022)

