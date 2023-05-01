const functions = require('firebase-functions');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// const cors = require('cors');
// const axios = require('axios');
const cors = require('cors'); // Import the cors library
//
// exports.summarizeString = functions.https.onRequest((request, response) => {
//   // Use the cors middleware
//   cors(request, response, () => {
//     const inputString = request.query.string; // Get the input string from the query parameter
//     console.log("str:" + inputString);
//     // Make the request to the external API
//     // Update the URL and method as needed
//     // You can use axios, fetch, or any other HTTP library here
//     // Example using axios:
//     response.set('Access-Control-Allow-Origin', '*');
//     response.set('Access-Control-Allow-Methods', 'GET, POST');
//     response.set('Access-Control-Allow-Headers', 'Content-Type');
//     axios
//       .get(`https://text-summarization-pegasus-model-jvgcexcekq-uc.a.run.app/summarize/${inputString}`)
//       .then((apiResponse) => {
//         console.log("calling function");
//         const summary = apiResponse.data.summary; // Extract the summary from the API response
//         response.status(200).json({ summary }); // Return the summary in the response
//       })
//       .catch((error) => {
//         console.error(error);
//         response.status(500).json({ error: 'Failed to summarize string' });
//       });
//   });
// });

const app = express();

app.use(cors({ origin: true }));

// Proxy /api/* requests to the target API
app.use('/api', createProxyMiddleware({
  target: 'https://text-summarization-model-jvgcexcekq-uc.a.run.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  headers: {
    'Access-Control-Allow-Origin': 'https://gydapp-b8dd4.web.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}));

// Proxy /second/* requests to the target API
app.use('/second', createProxyMiddleware({
  target: 'https://text-summarization-pegasus-model-jvgcexcekq-uc.a.run.app',
  changeOrigin: true,
  pathRewrite: {
    '^/second': ''
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}));

app.use('/forth', createProxyMiddleware({
  target: 'https://questionanswering-fmml3v2fuq-uc.a.run.app',
  changeOrigin: true,
  pathRewrite: {
    '^/forth': ''
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}));

// Proxy /second/* requests to the target API
app.use('/third', createProxyMiddleware({
  target: 'https://text2graph-fmml3v2fuq-uc.a.run.app',
  changeOrigin: true,
  pathRewrite: {
    '^/third': ''
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
}));

// Other Firebase Cloud Functions logic
// ...

exports.app = functions.https.onRequest(app);
