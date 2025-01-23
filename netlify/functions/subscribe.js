const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);
    const API_KEY = process.env.SENDFOX_API_KEY;
    const LIST_ID = process.env.SENDFOX_LIST_ID;
    const DATACENTER = API_KEY.split('-')[1];

    console.log('Attempting to subscribe:', email); // Debug log
    console.log('List ID:', LIST_ID); // Debug log

    const response = await axios.post(
      'https://api.sendfox.com/contacts',
      {
        email: email,
        lists: [LIST_ID]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('SendFox Response:', response.data); // Debug log

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed', data: response.data })
    };
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to subscribe',
        details: error.response?.data || error.message
      })
    };
  }
};