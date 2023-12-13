# laravel-vite-pwa

This repository demonstrates configuring the [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa) within Laravel 10 for offline support and app installation.

It is made complex by Laravel being a mix of backend and frontend concepts. For example,

- it has its own public dir
- Vite then builds to public/build/assets which is different to the
- there is not an immediately obvious HTML entrypoint

This approach was derived from the advice in [this issue](https://github.com/vite-pwa/vite-plugin-pwa/issues/431). Thoughts, feedback or improvements are welcome - there are probably other ways to solve the same problems!

## Install

Usual Laravel steps, assuming you have PHP, NPM and Composer:

```
git clone git@github.com:sfreytag/laravel-vite-pwa.git
cd laravel-vite-pwa
composer install
cp .env.example .env
php artisan key:generate
npm install
npm run build
```

The PWA installs a service worker and this can conflict with other service workers from other localhost projects. So I recommend using a port unique to this project:

```
php artisan serve --port=8082
```

The app should now be running on http://localhost:8082 (or whichever port you picked).

## PWA Icons

This project uses [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) for its icons.

The canonical icon should be an SVG file. It is needed for the PWA so it can be saved in `public/favicon.svg`. Then build the other icons from it by running:

```
npm run pwa-icons
```

This generates a set of icons defined by the minimal preset described [here](https://vite-pwa-org.netlify.app/assets-generator/cli.html#presets) which matches up pretty well with this [detailed blog post about favicons](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7).

They are packaged in the public folder so they are web readable. These are included in this repo so this process only needs repeating when the canonical favicon.svg icon is changed.
