import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

//Fetch Staffs from Server and Action Creators Staffs
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + 'staffs')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errMess = new Error(error.message);
        throw errMess;
      }  
    )
  .then(response => response.json())
  .then(staffs => dispatch(addStaffs(staffs)))
  .catch(error => dispatch(staffsFailed(error.message)))
};

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs
});

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errMess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errMess
});

//Fetch Departments from Server and Action Creators Departments
export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + 'departments')
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errMess = new Error(error.message);
        throw errMess;
      }  
    )
  .then(response => response.json())
  .then(departments => dispatch(addDepartments(departments)))
  .catch(error => dispatch(departmentsFailed(error.message)))
};

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments
});

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errMess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errMess
});