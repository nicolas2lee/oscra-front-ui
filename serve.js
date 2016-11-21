var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
//config.entry.app.unshift("webpack-dev-server/client?http://localhost:8090/");
config.entry.app.unshift("webpack-dev-server/client?https://limitless-falls-39025.herokuapp.com/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    proxy: {
        '/api/*': {
            target: 'http://localhost:8080',
            secure: false
        }
    }
});
/*In order to avoid conflict with back-office*/
server.listen(8090);