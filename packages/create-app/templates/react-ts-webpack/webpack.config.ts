import webpack, { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const createConfig = (): Configuration => {
  const isProduction = process.env.NODE_ENV === 'production'

  const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'renderer', 'index.html'),
      filename: 'index.html',
      inject: 'head',
      scriptLoading: 'defer',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ].filter(Boolean)

  const rendererSources = path.resolve(__dirname, 'src', 'renderer')

  const configuration: Configuration = {
    entry: {
      renderer: [
        path.join(rendererSources, 'index.tsx'),
        path.join(rendererSources, 'index.css'),
      ],
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: rendererSources,
          use: [
            !isProduction && 'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ].filter(Boolean),
        },
        {
          test: /\.tsx?$/,
          include: rendererSources,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: false,
                    },
                  ],
                ],
                plugins: [
                  !isProduction && [
                    'react-refresh/babel',
                    { skipEnvCheck: true },
                  ],
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                  '@babel/plugin-proposal-class-properties',
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,
              },
            },
          ],
        },
      ],
    },
    plugins,
  }

  if (isProduction) {
    configuration.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerWebpackPlugin()],
    }
  } else {
    configuration.plugins.push(
      new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin(),
    )

    const entries = configuration.entry as Record<'renderer', string[]>

    entries.renderer.unshift('css-hot-loader/hotModuleReplacement')

    configuration.entry = entries
  }

  return configuration
}

export default createConfig()
