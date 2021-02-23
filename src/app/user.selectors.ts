import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer'

const getUserFeatureState = createFeatureSelector<State>('usersState');

export const getUser = createSelector(
    getUserFeatureState,
    state => state.users
)

export const getError = createSelector(
    getUserFeatureState,
    state => state.error
)
