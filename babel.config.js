module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // This plugin lets you import .sql files as strings
      ['inline-import', { extensions: ['.sql'] }],
    ],
  };
};
