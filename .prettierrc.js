const baseConfig = require('./prettier/baseConfig');
const tailwindcssConfig = require('./prettier/tailwindConfig');

module.exports = {
  ...baseConfig,
  ...tailwindcssConfig,
};
