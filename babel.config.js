module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in .jsconfig.json
            "@assets": "./assets",
            "@components": "./components",
            "@constants": "./constants",
          },
        },
      ],
    ],
  };
};
