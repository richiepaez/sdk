Cloud CMS Server Sample
=======================

This folder contains an example of embedding the cloud cms server to create your own nodejs server application.

Grab your gitana.json file from your cloudcms tenant. You need to create an application for your project. 
Then download the associated gitana.json for the application into the root folder of this project.

Your website assets go into the ./public folder.

This sample server handles a custom route which looks for /api/get and performs a simple query to Cloud CMS
and caches the resulting JSON node list and returns the JSON data.

Install dependencies:
    npm install

Start the server
    npm start (or node app.js)

from a browser:
    http://localhost:2999
    
