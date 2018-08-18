import gulp    from 'gulp'
import Browser from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import globalConfig from './config';
import { webpackConfig, scripts } from './webpack'
import styles from './styles'

const browser = Browser.create()
const bundler = webpack(webpackConfig)

export function server() {
    let config = {
        server: globalConfig.server,
        open: false,
        middleware: [
            webpackDevMiddleware(bundler, {})
        ],
    }

    browser.init(config)

    /* TODO: Clean dist folder */

    /* TODO: Run build of all assets */
    scripts();
    styles(browser);

    gulp.watch(globalConfig.scriptsDirectory + '**/*.js').on('change', () => {
      console.log('Scripts changed');
      scripts();
      browser.reload()
    });

    gulp.watch(globalConfig.stylesDirectory + '**/*.scss').on('change', () => {
      console.log('Styles changed');
      styles(browser);
      browser.reload();
    });
}
