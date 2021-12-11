import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

//Fetch Staffs from Server and Action Creators Staffs ------------------------------
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

//Fetch Departments from Server and Action Creators Departments ----------------------------
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

//Fetch Staffs of A Department -----------------------------------------------------------
export const fetchDeptStaffs = (DeptId) => (dispatch) => {
  dispatch(deptStaffsLoading(true));

  return fetch(baseUrl + 'departments/' + DeptId)
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
    .then(staffs => dispatch(addDeptStaffs(staffs)))
    .catch(error => dispatch(deptStaffsFailed(error.message)));
}

export const addDeptStaffs = (staffs) => ({
  type: ActionTypes.ADD_DEPTSTAFFS,
  payload: staffs
})

export const deptStaffsLoading = () => ({
  type: ActionTypes.DEPTSTAFFS_LOADING
})

export const deptStaffsFailed = (errMess) => ({
  type: ActionTypes.DEPTSTAFFS_FAILED,
  payload: errMess
})

//Add Payroll of Staffs ----------------------------------------------------------------
export const fetchPayroll = () => (dispatch) => {
  dispatch(payrollLoading(true));

  return fetch(baseUrl + 'staffsSalary')
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
    .then(payroll => dispatch(addPayroll(payroll)))
    .catch(error => dispatch(payrollFailed(error.message)));
}

export const addPayroll = (payroll) => ({
  type: ActionTypes.ADD_PAYROLL,
  payload: payroll
})

export const payrollLoading = () => ({
  type: ActionTypes.PAYROLL_LOADING
})

export const payrollFailed = (errMess) => ({
  type: ActionTypes.PAYROLL_FAILED,
  payload: errMess
})