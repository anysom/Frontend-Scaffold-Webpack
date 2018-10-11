import gulp from 'gulp'
import globalConfig from './config'


function copyAssets (browser) {
  console.log('Copy Assets!');

  gulp.src(globalConfig.staticAssetsDirectory + '**/*.*')
  .pipe(gulp.dest(globalConfig.staticDistDirectory + '/assets'));

  if (browser) {
    browser.reload();
  }
}

function assets(browser) {
  copyAssets();

  gulp.watch(globalConfig.staticAssetsDirectory + '**/*.*').on('change', () => {
    console.log('Assets changed');
    copyAssets(browser);
  });
}

module.exports = assets
