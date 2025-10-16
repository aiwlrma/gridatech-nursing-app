const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration
 * https://docs.expo.dev/guides/customizing-metro/
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// Static rendering 비활성화
config.server = {
  ...config.server,
  experimentalImportSupport: false,
};

// Add support for additional platforms
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure blockList is properly initialized as an array
config.resolver.blockList = Array.isArray(config.resolver.blockList) 
  ? config.resolver.blockList 
  : [];

// Web-specific configuration
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-svg': 'react-native-svg-web',
};

// Block problematic native modules on web
config.resolver.blockList = [
  ...config.resolver.blockList,
  /react-native-blob-util/,
  /react-native-share/,
  /react-native-pdf/
];

// Web-specific resolver configuration
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
