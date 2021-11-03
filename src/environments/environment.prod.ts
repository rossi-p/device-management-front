export const environment = {
  production: true,
  success: 'Database updated with success!',
  error: (_statusCode: any) => {
    if(_statusCode = 400) return 'Bad request!';
    if(_statusCode = 404) return 'Not found!';
    if(_statusCode = 409) return 'Conflict, resource already exist!';
    if(_statusCode = 500) return 'Internal server error!';
    return 'Error!'
  }
};
