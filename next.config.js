const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
// const fs = require('fs')
const fs = require('fs-extra')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = withLess(withSass(withCSS({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
    outputStyle: 'compressed',

  },
  sassLoaderOptions: {
    outputStyle: 'compressed',
  },
  images:{
    domains: ['localhost','mragain.eu.pythonanywhere.com','develop.mragain.nl','mragain.nl'],
  },
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer,webpack }) => {
    if (isServer) {
      if (!isServer) {
        config.node = {
          fs: 'empty',
          fs_extra: 'empty'
        }
      }
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:8].[ext]',
            publicPath: (url) => {
              return `/_next/static/css/${url}`;
            },
            outputPath: `${isServer ? '../' : ''}static/css/`,
            esModule: false,
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    config.node={
        fs: "empty"
    }
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  },
})))
