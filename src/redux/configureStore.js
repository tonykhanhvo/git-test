import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Staffs } from './reducers/staffs';
import { Departments } from './reducers/departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialForm } from './forms';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      ...createForms({
        form: InitialForm
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}