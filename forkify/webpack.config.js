/*
    1. Entry point. Where to look files for bundling
    2. Output. Where to save bundles
    3. Loaders
    4. Pluggins
*/

const path = require('path');
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    }
};