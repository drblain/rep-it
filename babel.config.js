module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // This plugin lets you import .sql files as strings
      ['inline-import', { extensions: ['.sql'] }],
      // Reanimated must be last
      'react-native-reanimated/plugin',
    ],
  };
};
