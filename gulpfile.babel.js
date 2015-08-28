/*eslint-env node*/

import _ from 'underscore';
import gulp from 'gulp';

// Define plugins
const plugins = require('gulp-load-plugins')({
    pattern: [
        'babelify',
        'browserify',
        'gulp*',
        'livereactload',
        'run-sequence',
        'vinyl-*',
        'watchify',
    ],
});

const CONFIG = {
    js: {
        source: './web/js/entry-point.jsx',
        destinationPath: './web/dist',
    },
    server: {
        source: 'server.js',
    },
    liveReloadPort: 35750,
};

// Get the project's name for output filenames.
function getOutputFilename() {
    return 'main';
}

// # Serve static content.
gulp.task('serve', () => {
    const server = plugins.liveServer.static('web', 3000);
    server.start();
});

// # Javascript Build

// ## `bundle`
function bundle(bundler) {
    return bundler
        .bundle()

        // Handle errors
        .once('error', function(err) {
            plugins.util.log('[browserify]', err.message);
            plugins.util.beep();
            this.emit('end');
        })

        // Rename package
        .pipe(plugins.vinylSourceStream(getOutputFilename() + '.js'))

        // Convert stream to buffer beacuse `sourcemaps.init` does not
        // support streaming.
        .pipe(plugins.vinylBuffer())

        // Import inline sourcemaps.
        .pipe(plugins.sourcemaps.init({loadMaps: true}))

        // Write sourcemaps.
        .pipe(plugins.sourcemaps.write('./'))

        // Write javascript to `CONFIG.js.destinationPath`.
        .pipe(gulp.dest(CONFIG.js.destinationPath))
    ;
}

// ## `browserify`
gulp.task('browserify', function browserifyTask() {
    var bundler = plugins.browserify(_.extend(plugins.watchify.args, {
        entries: [CONFIG.js.source],
        extensions: ['.js', '.jsx'],
        debug: true,
    }));

    bundler.transform(plugins.babelify.configure({
        optional: [
            'es7.classProperties',
        ],
    }));

    bundler.transform(plugins.livereactload);

    bundler = plugins.watchify(bundler);
    bundler.on('update', bundle.bind(null, bundler));

    plugins.livereactload.monitor(`./web/dist/${getOutputFilename()}.js`);

    return bundle(bundler);
});

gulp.task('default', ['serve', 'browserify']);
