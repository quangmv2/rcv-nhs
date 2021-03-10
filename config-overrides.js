const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@assets/*': path.resolve(__dirname, 'src/assets'),
      '@components/*': path.resolve(__dirname, 'src/components'),
      '@pages/*': path.resolve(__dirname, 'src/pages'),
      '@router/*': path.resolve(__dirname, 'src/router'),
      '@store/*': path.resolve(__dirname, 'src/store'),

    //   "@assets/*": ["assets/*"],
    //   "@components/*": ["components/*"],
    //   "@pages/*": ["pages/*"],
    //   "@router/*": ["router/*"],
    //   "@store/*": ["store/*"],
    },
  };

  return config;
};