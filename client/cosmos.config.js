module.exports = {
  containerQuerySelector: '#root',
  webpackConfigPath: './config/webpack.config.dev',
  publicPath: 'public',
  // Optional: Create this file when you begin adding proxies
  proxiesPath: 'src/cosmos.proxies',
  hot: true,
  httpProxy: {
    context: '*',
    target: 'http://localhost:3030/api/v1.0',
  },
  globalImports: ['./src/styles/base/_reset.sass'],
}
