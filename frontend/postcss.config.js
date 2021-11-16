// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {},
    tailwindcss: {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": false,
      },
    },
  },
};
