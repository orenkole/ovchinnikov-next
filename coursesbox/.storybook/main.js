module.exports = {
  "stories": [
      "../stories/**/*.stories.mdx",
      "../stories/**/*.stories.@(js|jsx|ts|tsx)",
      "../pages/**/*.stories.mdx",
      "../pages/**/*.stories.@(js|jsx|ts|tsx)",
      "../components/**/*.stories.mdx",
      "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "staticDirs": ["../public"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "features": {
      "emotionAlias": false
  }
}
