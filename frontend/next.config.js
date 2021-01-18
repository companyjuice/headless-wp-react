const path = require('path');
const glob = require('glob');

require('dotenv').config();

module.exports = {
  env: {
    SGKEY: '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'
  },
  webpack: config => {
    config.node = {
      fs: 'empty',
    }
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          'raw-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['styles', 'node_modules']
                  .map(d => path.join(__dirname, d))
                  .map(g => glob.sync(g))
                  .reduce((a, c) => a.concat(c), []),
              }
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false }
                ],
              }
            }
          },
        ]
      },
    );
    return config;
  },
};
