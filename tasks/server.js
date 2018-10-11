import gulp    from 'gulp'
import Browser from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import globalConfig from './config';
import { webpackConfig, scripts } from './webpack'
import styles from './styles'
import assets from './assets'

const browser = Browser.create()
const bundler = webpack(webpackConfig)

export function server() {
    let config = {
        open: true,
        middleware: [
            webpackDevMiddleware(bundler, {})
        ],
    }

    if (globalConfig.proxy) {
      config.proxy = globalConfig.proxy;
    } else {
      config.server = globalConfig.server;
    }

    browser.init(config)

    /* TODO: Clean dist folder */

    /* TODO: Run build of all assets */
    scripts();
    styles(browser);
    assets(browser);

    gulp.watch(globalConfig.scriptsDirectory + '**/*.js').on('change', () => {
      console.log('Scripts changed');
      scripts();
      browser.reload()
    });

    gulp.watch(globalConfig.stylesDirectory + '**/*.scss').on('change', () => {
      console.log('Styles changed');
      styles(browser);
    });

    gulp.watch(globalConfig.viewsDirectory + '**/*.cshtml').on('change', () => {
      console.log('Views changed');
      browser.reload();
    });
}
