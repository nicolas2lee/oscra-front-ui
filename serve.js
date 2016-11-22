var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var port = process.env.PORT || 8090;
config.entry.app.unshift("webpack-dev-server/client?http://localhost:"+port);

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
server.listen(port);