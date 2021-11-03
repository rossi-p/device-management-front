// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  success: 'Database updated with success!',
  error: (_statusCode: any) => {
    if(_statusCode = 400) return 'Bad request!';
    if(_statusCode = 404) return 'Not found!';
    if(_statusCode = 409) return 'Conflict, resource already exist!';
    if(_statusCode = 500) return 'Internal server error!';
    return 'Error!'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
