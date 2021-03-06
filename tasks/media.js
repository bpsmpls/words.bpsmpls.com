/**
 * Builds static files found in /src/assets/media
 *
 * @usage gulp media
 */

import browserSync from 'browser-sync';
import chmod from 'gulp-chmod';
import gulp from 'gulp';
import notify from './notify';

function watchMedia() {
    const src = [
        `${process.env.DIRECTORY_SRC}/assets/favicon/**/*`,
        `${process.env.DIRECTORY_SRC}/assets/fonts/**/*`,
        `${process.env.DIRECTORY_SRC}/assets/templateImgs/**/*`,
    ];
    gulp.watch(src, () => {
        notify.log('MEDIA: file update detected, rebuilding...');
        buildMedia();
    });
}

function buildMedia() {
    const browser = browserSync.get('local');
    const src = [
        `${process.env.DIRECTORY_SRC}/assets/favicon/**/*`,
        `${process.env.DIRECTORY_SRC}/assets/fonts/**/*`,
        `${process.env.DIRECTORY_SRC}/assets/templateImgs/**/*`,
    ];

    return gulp
        .src(src, { base: process.env.DIRECTORY_SRC })
        .pipe(notify.onError('MEDIA: error'))
        .pipe(chmod(0o644))
        .pipe(gulp.dest(process.env.DIRECTORY_DEST_PUBLIC))
        .on('end', notify.onLog('MEDIA: rebuild complete'))
        .on('end', browser.reload);
}

export default function media() {
    if (process.env.WATCH === 'true') {
        watchMedia();
    }

    return buildMedia();
}
