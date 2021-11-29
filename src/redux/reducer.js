import { STAFFS, DEPARTMENTS } from "../shared/staffs";

export const initialState = {
  staffs: STAFFS,
  departments: DEPARTMENTS,
  addNewStaff (newStaff) {
    this.staffs = { ...this.staffs, newStaff}
  }
}

export const Reducer = ( state = initialState, action) => {
  return state;
}