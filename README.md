# laravel-vite-pwa

This repository demonstrates configuring the [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa) within Laravel 10 for offline support and app installation.

It is made complex by Laravel being a mix of backend and frontend concepts. For example,

- it has its own public dir
- Vite then builds to public/build/assets which is different to the
- there is not an immediately obvious HTML entrypoint

This approach was derived from the advice in [this issue](https://github.com/vite-pwa/vite-plugin-pwa/issues/431). Thoughts, feedback or improvements are welcome - there are probably other ways to solve the same problems!
