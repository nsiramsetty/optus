import {initialState} from './initialState';

export const UPDATE_API_RESPONSE = (state, api_response) => {
  state.api_response = api_response;
};

export const CLEAR_ALL_DATA = (state) => {
  state.api_response = initialState.api_response;
};
