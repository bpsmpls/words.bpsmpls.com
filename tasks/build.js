/**
 * Builds all source code in /src, and outputs to /dist
 *
 * @usage gulp
 */

import del from 'del';
import gulp from 'gulp';
import notify from './notify';
import runSequence from 'run-sequence';

function clean() {
    const src = [
        `${process.env.DIRECTORY_DEST_PUBLIC}/favicon`,
        `${process.env.DIRECTORY_DEST_PUBLIC}/icons`,
        `${process.env.DIRECTORY_DEST_PUBLIC}/scripts`,
        `${process.env.DIRECTORY_DEST_PUBLIC}/styles`,
        `${process.env.DIRECTORY_DEST_TEMPLATES}`
    ]
    return del(src, {
        force: process.env.ENABLE_UNSAFE_CLEAN === 'true',
    });
}

export default function build(done) {
    return runSequence(
        'clean',
        ['media'],
        ['markup', 'scripts', 'styles', 'vendor'],
        () => {
            process.env.watchStarted = true;
            done();
            notify.log(
                'Your build has completed!',
                process.env.WATCH === 'true' ? 'Starting watch...' : '',
                true
            );
        }
    );
}

gulp.task('clean', clean);