const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

console.log(process.env)

const {PORT,api_prefix ,databaseURI ,cloud ,appId ,masterKey} = process.env

const serverURL = `http://localhost:${PORT}${api_prefix}`


const api = new ParseServer({
    databaseURI, // Connection string for your MongoDB database
    cloud , // Absolute path to your Cloud Code
    appId,
    masterKey, // Keep this key secret!
    serverURL// Don't forget to change to https if needed
});


// Serve the Parse API on the /parse URL prefix
app.use(api_prefix, api);

app.listen(PORT, function() {
    console.log(`parse-server-example running on port ${PORT}.`);
});