import { createReducer, on } from '@ngrx/store';
import { createAction } from '@ngrx/store';

// Define actions
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

// Define the initial state
export const initialState = 0;

// Create the reducer function
export const counterReducer = createReducer(
    initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(reset, _ => initialState)
);