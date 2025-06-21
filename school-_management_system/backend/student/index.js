exports.handler = async (event) => {
  const method = event.httpMethod;
  if (method === 'GET') {
    return { statusCode: 200, body: JSON.stringify({ message: "Get student data" }) };
  } else if (method === 'POST') {
    return { statusCode: 201, body: JSON.stringify({ message: "Create student" }) };
  }
};