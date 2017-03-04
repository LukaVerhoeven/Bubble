const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
   /*.js('resources/assets/materialize-src/js/bin/materialize.min.js','public/assets/all.js')*/

mix.sass('resources/assets/sass/app.scss', '../resources/assets/css')
   .js('resources/assets/js/main.js','public/js/all.js')
   .sass('resources/assets/materialize-src/sass/materialize.scss', '../resources/assets/css')
   .combine([
   		'resources/assets/css/materialize.css',
   		'resources/assets/css/app.css'
   	],  'public/css/all.css');
