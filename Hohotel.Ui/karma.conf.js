var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests/*-test.js',
      'tests/**/*-test.js'
    ],
    preprocessors: {
      'tests/*-test.js': ['webpack'],
      'tests/**/*-test.js': ['webpack']
    },
    reporters: ['progress', 'junit', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { type: 'clover', dir: 'test-reports', subdir: '.', file: 'clover.xml' }
      ]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(js|jsx)$/, loader: 'babel-loader' }
        ],
        postLoaders: [
          {
            test: /\.jsx$/,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    junitReporter: {
      outputDir: './',
      outputFile: 'test-results.xml',
      suite: '',
      useBrowserName: false,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    }
  });
};