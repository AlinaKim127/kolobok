const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer').default; // <-- ДОБАВИЛ .default
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const { deleteAsync } = require('del');
const rename = require('gulp-rename');

// Пути к файлам
const paths = {
    html: {
        src: 'src/html/**/*.html',
        dest: 'dist/'
    },
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    assets: {
        src: 'src/assets/**/*.*',
        dest: 'dist/assets/'
    }
};

// Задача: Очистка папки dist
function clean() {
    return deleteAsync(['dist']);
}

// Задача: Обработка HTML
function html() {
    return src(paths.html.src)
        .pipe(plumber()) // Обработка ошибок
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream()); // Авто-перезагрузка
}

// Задача: Компиляция SCSS в CSS
function styles() {
    return src('src/scss/main.scss') // Точка входа
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.scss.dest))
        .pipe(browserSync.stream()); // Встроенная перезагрузка CSS
}

// Задача: Копирование JS
function scripts() {
    return src(paths.js.src)
        .pipe(plumber())
        .pipe(dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// Задача: Копирование assets
// Обработка бинарных файлов (изображения, шрифты)
function assets() {
    return src(paths.assets.src, { 
        encoding: false, // ВАЖНО: отключает текстовую обработку
        removeBOM: false // Сохраняет бинарную структуру
    })
    .pipe(dest(paths.assets.dest))
    .pipe(browserSync.stream());
}

// Задача: Запуск локального сервера
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000,
        open: true,
        notify: false
    });

    // Слежение за изменениями
    watch(paths.html.src, html);
    watch(paths.scss.src, styles);
    watch(paths.js.src, scripts);
    watch(paths.assets.src, assets);

    done();
}

// Экспортируем задачи
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.assets = assets;
exports.serve = serve;

// Сборка проекта
exports.build = series(clean, parallel(html, styles, scripts, assets));

// Задача по умолчанию (запуск сервера)
exports.default = series(clean, parallel(html, styles, scripts, assets), serve);