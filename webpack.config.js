var path = require('path');
var pkg = require('./package.json');
var appRoot = path.join(__dirname, '/' + pkg.configuration.directories.src);
var buildDir = path.join(__dirname, '/' + pkg.configuration.directories.dest);
var outputPath = path.join(buildDir);
module.exports = {
    entry: {
        app: ["./src/app.js"]
    },
    output: {
        path: outputPath,
        publicPath: './',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html"},
            { test: /\.svg$/, loader: 'svg-inline'}
        ]
    }
};