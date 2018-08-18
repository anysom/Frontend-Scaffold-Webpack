let globalConfig = {
  staticDirectory: 'works/static/',
  server: 'site', // Either use Server or Proxy.
  proxy: 'http://local-works.dk/', // If proxy is set, server will be ignored
  isProduction: (process.env.NODE_ENV === 'production '), // The string needs whitespace in the end, due to some bug in how the variable is passed from npm
  mainStyleFile: 'main.scss',
  //scriptBundleEntry: 'main.js' // Bundle entry can be defined either as the name of a single file,
  scriptBundleEntry: { // OR as an object containing mulitple entries, for multiple bundles
    main:'main.js'
  }
};

globalConfig.staticSrcDirectory = globalConfig.staticDirectory + 'src/';
globalConfig.staticDistDirectory = globalConfig.staticDirectory + 'dist/';
globalConfig.stylesDirectory = globalConfig.staticSrcDirectory + 'styles/';
globalConfig.scriptsDirectory = globalConfig.staticSrcDirectory + 'scripts/';

module.exports = globalConfig;
