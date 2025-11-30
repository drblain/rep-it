// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for .sql files
config.resolver.sourceExts.push('sql');

config.resolver.assetExts.push('db');
config.resolver.assetExts.push('sqlite');

module.exports = withNativeWind(config, { input: './global.css' });
