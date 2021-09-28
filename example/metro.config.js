/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
var path = require('path');
module.exports = {
  projectRoot: path.resolve(__dirname),
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      },
    ),
  },
  watchFolders: [path.resolve(__dirname, '../src')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
