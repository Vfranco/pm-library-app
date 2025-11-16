const path = require("path");

module.exports = {
    entry: "./main.ts",

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },

    target: "node",

    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: "/node_modules",
            },
        ]
    },
    mode: "production"
}