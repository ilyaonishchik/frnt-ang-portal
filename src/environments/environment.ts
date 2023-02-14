// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Бизнес-портал',
  version: '0.1.3',
  urlApi: '/api/v1',
  urlApiAuth: '/api/v1/auth',
  urlApiPdp: '/api/v1/sorting',
  urlApiStorage: '/api/v1/storage',
  urlApiReport: '/api/v1/report',
  // urlApiReport: 'http://172.16.190.86:8097',

  rowsPerPageCount: 15,
  rowsPerPageOptions: [5, 10, 15, 20, 25],

  adminRoleCode: 'role:administrator',
  adminPermissionCode: 'permission:administrator',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
