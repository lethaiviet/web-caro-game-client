const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@features': path.resolve(__dirname, 'src/features/'),
            '@storeRedux': path.resolve(__dirname, 'src/app/store.ts'),
            '@hookRedux': path.resolve(__dirname, 'src/app/hook.ts'),
        },
    },
};