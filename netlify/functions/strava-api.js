exports.handler = async (event) => {
  const token = event.headers['authorization'];
  const path = event.queryStringParameters?.path || '/athlete';

  if (!token) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Missing token' }) };
  }

  try {
    const response = await fetch(`https://www.strava.com/api/v3${path}`, {
      headers: { Authorization: token },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
