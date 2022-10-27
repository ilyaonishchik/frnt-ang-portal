import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IPermissionsState} from '../interfaces/permissions-state.interface'

export const permissionsFeatureSelector =
  createFeatureSelector<IPermissionsState>('permissions')

export const isLoadingSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.isLoading
)

export const errorSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.error
)

export const permissionsSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.data
)

export const dialogActionSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.crud
)

export const tableStateSelector = createSelector(
  permissionsFeatureSelector,
  (permissionsState: IPermissionsState) => permissionsState.tableState
)

// export const countSelector = createSelector(
//   permissionsFeatureSelector,
//   (permissionsState: IPermissionsState) => permissionsState.count
// )

// export const itemSelector = createSelector(
//   permissionsFeatureSelector,
//   (permissionsState: IPermissionsState) => permissionsState.item
// )

// export const itemDialogSelector = createSelector(
//   permissionsFeatureSelector,
//   (permissionsState: IPermissionsState) => permissionsState.itemDialog
// )

// export const itemDialogViewSelector = createSelector(
//   permissionsFeatureSelector,
//   (permissionsState: IPermissionsState) => permissionsState.itemDialogView
// )

// export const itemDialogDeleteSelector = createSelector(
//   permissionsFeatureSelector,
//   (permissionsState: IPermissionsState) => permissionsState.itemDialogDelete
// )

// export const submittedSelector = createSelector(
//   permissionsFeatureSelector,
//   (permissionsState: IPermissionsState) => permissionsState.submitted
// )
