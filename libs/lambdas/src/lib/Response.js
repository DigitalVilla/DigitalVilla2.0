const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
}

export const Response = {
  success: (body = null, status = 200, headers = {}) => {
    const response = !body ? { message: 'success' } : body
    return {
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(response),
      statusCode: status,
    }
  },

  error: (error = {}, status, headers = {}) => {
    console.log('Error', error)
    return {
      statusCode: status || error.statusCode || 500,
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify({
        error: error.name || 'Exception',
        message: error.message || 'Unknown error',
      }),
    }
  },
}
