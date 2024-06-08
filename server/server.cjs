// This is a proxy server for connecting Sharepoint to the React application. 
// This appears to 
// have failed because the developer did not have the right permissions.

// During development, remember to also run "node server/server.cjs"
// and create a .env file for the values required below.

const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Load environment variables from .env file
// TODO: Make a .env file to define the value of PORT
const port = process.env.PORT || 3001;

// use CORS middleware
app.use(cors());

// TODO: Make a .env file to define these values
const tenantId = process.env.TENANT_ID; // Directory (tenant) ID
const clientId = process.env.CLIENT_ID; // Application (client) ID
const clientSecret = process.env.CLIENT_SECRET; // Client secret value
const resource = process.env.RESOURCE; // 'https://mqoutlook.sharepoint.com'

const getAccessToken = async () => {
  try {
    const tokenResponse = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: `${resource}/.default`,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    console.log('Access Token:', tokenResponse.data.access_token); 
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error retrieving access token:', error.message); 
    throw error;
  }
};

app.use(cors({ origin: 'http://localhost:5173' })); // May need to be replaced

// A request to GET data from sharepoint
app.get('/api/sharepoint', async (req, res) => {
  // Manually set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(
      'https://mqoutlook.sharepoint.com/sites/OzHarvest/_api/web/lists/getbytitle(\'Customer Records\')/items',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json;odata=verbose',
        },
      }
    );
    res.json(response.data.d.results);
  } catch (error) {
    console.error('Error fetching data from SharePoint:', error.message); 
    res.status(500).send('Error fetching data from SharePoint');
  }
});

// TODO: A Request to POST/PUT data from Firebase into Sharepoint

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});

