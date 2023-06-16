// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  title: 'Бизнес-портал',
  version: '0.15.10',
  urlApi: '/api/v1',
  urlApiCore: '/api/v1/core',
  urlApiAuth: '/api/v1/auth',
  urlApiPdp: '/api/v1/sorting',
  urlApiStorage: '/api/v1/storage',
  urlApiCatalog: '/api/v1/catalog',
  urlApiReport: '/api/v1/report',

  rowsPerPageCount: 15,
  rowsPerPageOptions: [5, 10, 15, 20, 25],

  adminRoleCode: 'base:role:admin',
  adminPermissionCode: 'base:permission:admin',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error' // Included with Angular CLI.
