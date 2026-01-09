require('dotenv').config();

const appJson = require('./app.json');

module.exports = {
    ...appJson.expo,
    extra: {
        uploadPreset: process.env.EXPO_PUBLIC_UPLOAD_PRESET,
        cloudname: process.env.EXPO_PUBLIC_CLOUD_NAME,
        ...appJson.expo.extra,
    }
}