module.exports = {
    entry: "./public/lib/script/index.js", 
    output: {
        path: __dirname + "/public/dist/", 
        filename: "index.js" 
    },
    module: {
        loaders: [
            {
                test: /\.js$/, 
                loader: "babel-loader",
                query: {presets: ['es2015']}
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!less-loader'
            },
            {
                test:/\.scss$/,
                loader:'style-loader!css-loader!sass-loader'
            }

        ]
    },
    devServer:{
        contentBase:'./',
        historyApiFallback: true,
        inline: true
    }
};