module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // 이 줄이 맨 마지막에 있어야 함!
    ],
  };
};
