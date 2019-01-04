import config from './config/config';
import path from 'path';

//禁用pwa
config.plugins[0][1].pwa = null;
//禁用externals
config.externals = null;
config.history = 'hash';
config.alias = {
  '~': path.resolve(__dirname, 'src/'),
};
const innerChain = config.chainWebpack;
config.chainWebpack = config => {
  innerChain(config);
  config.optimization.splitChunks({
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  });
};
//配置proxy
config.proxy = {};
export default config;
