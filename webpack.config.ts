import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/**
 * Configuración unificada de webpack.
 *
 * Uso:
 *   Web:     npx webpack --env target=web       (o npm run build / npm run dev)
 *   Consola: npx webpack --env target=console   (o npm run build:console)
 */
module.exports = (env: { target?: string } = {}) => {
    const isConsole = env.target === "console";

    if (isConsole) {
        // ── Consola (Node.js) ─────────────────────────────────────────────────
        return {
            entry: "./main.ts",
            output: {
                filename: "console.js",
                path: path.resolve(__dirname, "dist"),
            },
            target: "node",
            resolve: { extensions: [".ts", ".js"] },
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: "ts-loader",
                        exclude: /node_modules/,
                    },
                ],
            },
            mode: "development" as const,
        };
    }

    // ── Web (browser) ─────────────────────────────────────────────────────────
    return {
        entry: "./main.ts",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        target: "web",
        resolve: { extensions: [".ts", ".js"] },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, // extrae a styles.css
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.html$/,
                    use: "html-loader",
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "styles.css" }),
            new HtmlWebpackPlugin({
                template: "./src/UI/View/web/index.html",
                filename: "index.html",
                inject: "body",
            }),
        ],
        devServer: {
            static: { directory: path.join(__dirname, "dist") },
            compress: true,
            port: 8080,
            open: true,
            hot: true,
        },
        mode: "development" as const,
    };
};
