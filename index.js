const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

const port = 3000
const api_prefix = '/api'
const databaseURI = 'mongodb://localhost:27017/ummo-dev'
const cloud = 'cloud/main.js'
const appId = 'ummo'
const masterKey = 'VeryVerySecretKey'
const fileKey = 'optionalFileKey'
const serverURL = `http://localhost:${port}${api_prefix}`


const api = new ParseServer({
    databaseURI, // Connection string for your MongoDB database
    cloud , // Absolute path to your Cloud Code
    appId,
    masterKey, // Keep this key secret!
    fileKey ,
    serverURL// Don't forget to change to https if needed
});

// Serve the Parse API on the /parse URL prefix
app.use(api_prefix, api);

app.listen(port, function() {
    console.log(`parse-server-example running on port ${port}.`);
});