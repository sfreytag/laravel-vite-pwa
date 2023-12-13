<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>{{env('APP_NAME')}}</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    {{--
        PWA

        Link to the icons and web manifest.

        These could in theory be injected from the app with some script - ref
        'Registering Web Manifest' in:
        https://github.com/vite-pwa/docs/blob/userquin/include-integrations-section/integrations/laravel.md

        However hardcoding them below works well.
    --}}
    <link rel="icon" href="/favicon.ico" sizes="64x64">
    <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" sizes="180x180">
    <link rel="manifest" href="/build/manifest.webmanifest">
</head>

<body>
<noscript>
    <strong>We're sorry but this application doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>

<div id="app"></div>

</body>

</html>
