import path    from 'path'
import webpack from 'webpack'
import process from 'process'
import globalConfig from './config';

/* Build plugins array*/
let plugins = [];

if(globalConfig.isProduction) {
  //plugins.push(new webpack.optimize.UglifyJsPlugin()); /* This plugin does not work*/
}

// Construct webpack bundle entry
let entry;
if (typeof globalConfig.scriptBundleEntry === 'string') {
  entry = './' + globalConfig.scriptsDirectory + globalConfig.scriptBundleEntry;
} else if (typeof globalConfig.scriptBundleEntry === 'object') {
  // Update the path for all the bundle entries
  entry = {};
  for(var propt in globalConfig.scriptBundleEntry) {
    entry[propt] = './' + globalConfig.scriptsDirectory + globalConfig.scriptBundleEntry[propt];
  }
}

let webpackConfig = {
    entry: entry,

    output: {
        filename: './[name].bundle.js',
        path: path.resolve(__dirname, '../' + globalConfig.staticDistDirectory + '/js')
    },
    devtool: 'source-map',

    context: path.resolve(__dirname, '../'),
    //context: path.resolve(__dirname, '../' + globalConfig.scriptsDirectory + '/'),

    plugins: plugins
}


function scripts() {
    return new Promise(resolve => webpack(webpackConfig, (err, stats) => {

        if(err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { webpackConfig, scripts }
