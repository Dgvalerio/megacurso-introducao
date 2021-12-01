// eslint-disable-next-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main-bundle-[fullhash].js',
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.scss'] },
  plugins: [new CleanWebpackPlugin()],
};
