// In case of success...
export function success(body) {
  return buildResponse(200, body);
}

// In case of failure....
export function failure(body) {
  return buildResponse(500, body);
}

// Given a status code and a body, build out an acceptable response 
// to communicate between AWS and our React application.
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
