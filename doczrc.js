const merge = require('webpack-merge');
const customCompile = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
};

export default {
    title: 'React MUI UI',
    description: 'This is React Material UI, UI Projects',
    themeConfig: {
        colors: {
            primary: 'tomato',
        },
    },
    files: './docz/*.{md,markdown,mdx}',
    plugins: [],
    modifyBundlerConfig: config => {
        return merge(config, customCompile);
    }
}