const path = require("path");

module.exports = {
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "server.js"
    },
    mode: "production",
    target: "node",
    resolve: {
        extensions: [".ts", ".js", ".mjs"]
    },
    stats: {
        warnings: false
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [{
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    },
                    "ts-loader"
                ]
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            }
        ]
    }
};