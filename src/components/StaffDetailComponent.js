import React, { Component } from "react";
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";

function RenderStaff({ staff }) {
  return (
    <div className="col-12 m-1">
      <Media tag="li">
        <Media left middle>
          <Media object src={staff.image} alt={staff.name} />
        </Media>
        <Media body className="ml-5">
          <Media heading>Họ và tên: {staff.name}</Media>
          <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
          <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
          <p>Phòng ban: {staff.department.name}</p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số ngày đã làm thêm: {staff.overTime}</p>
        </Media>
      </Media>
    </div>
  );
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    return (
      <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row">
            <RenderStaff dish={props.staff} />
          </div>
        </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

// class StaffDetail extends Component {
//   render() {
//     const staff = this.props.staff;
//     // if (staff != null) {
//     //   return (
//     //     <div className="container">
//     //       <div className="row">
//     //         <div className="col-12 m-1">
//     //           {/* <Card id="staffdetail">
//     //             <CardImg width="100%" src={staff.image} alt={staff.name}/>
//     //             <CardBody>
//     //               <CardTitle>Họ và tên: {staff.name}</CardTitle>
//     //               <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
//     //               <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
//     //               <CardText>Phòng ban: {staff.department.name}</CardText>
//     //               <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
//     //               <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
//     //             </CardBody>
//     //           </Card> */}
//     //           <Media tag="li">
//     //             <Media left middle>
//     //               <Media object src={staff.image} alt={staff.name} />
//     //             </Media>
//     //             <Media body className="ml-5">
//     //               <Media heading>Họ và tên: {staff.name}</Media>
//     //               <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
//     //               <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
//     //               <p>Phòng ban: {staff.department.name}</p>
//     //               <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
//     //               <p>Số ngày đã làm thêm: {staff.overTime}</p>
//     //             </Media>
//     //           </Media>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   );
//     // } else {
//     //   return (
//     //     <div className="row">
//     //       <h5 className="col-12 m-1">Bấm vào tên nhân viên để xem thông tin.</h5>
//     //     </div>
//     //   );
//     // }
//     return (
//       <div className="container">
//           <div className="row">
//             <div className="col-12 m-1">
//               <Media tag="li">
//                 <Media left middle>
//                   <Media object src={staff.image} alt={staff.name} />
//                 </Media>
//                 <Media body className="ml-5">
//                   <Media heading>Họ và tên: {staff.name}</Media>
//                   <p>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</p>
//                   <p>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</p>
//                   <p>Phòng ban: {staff.department.name}</p>
//                   <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
//                   <p>Số ngày đã làm thêm: {staff.overTime}</p>
//                 </Media>
//               </Media>
//             </div>
//           </div>
//         </div>
//     );
//   }
// }

export default StaffDetail;