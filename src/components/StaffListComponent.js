// import React, { Component } from 'react';
// import { Card, CardImg, CardBody, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';


// class StaffList extends Component {

//   constructor(props) {
//     super(props)
    
//     this.state = {
//       selectedColumn : "col-12 col-md-6 col-lg-4",
//     }
//   }

//   onSelectedStaff(staff) {
//     this.setState({ selectedStaff: staff});
//   }

//   setColum(column) {
//     this.setState({selectedColumn: column});
//   }

//   renderStaffs() {
//     const staffs = this.props.staffs;
  
//     const staffList = staffs.map((staff) => {
//       return (
//         <div key={staff.id} className={this.state.selectedColumn + " mt-3"}>
//           <Card onClick={() => {
//             setTimeout(() => document.getElementById("staffdetail").scrollIntoView(), 100)
//             return this.onSelectedStaff(staff);
//           }}
//           >
//             <CardImg width="100%" src={staff.image} alt={staff.name} />
//             <CardBody>
//               <CardTitle>{staff.name}</CardTitle>
//             </CardBody>
//           </Card>
//         </div>
//       );
//     })
//     return (staffList);
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <Form inline className="offset-7 offset-md-8 offset-lg-9">
//             <FormGroup>
//               <Label for="splitColumn" className="mr-2">
//                 Hiển thị:
//               </Label>
//               <Input
//                 id="splitColumn"
//                 name="NoColumn"
//                 type="select"
//                 onChange={() => {
//                   let column = document.getElementById("splitColumn").value;
//                   return this.setColum(column);
//                 }}
//               >
//                 <option value="col-12 col-md-6 col-lg-4">Default</option>
//                 <option value="col-12">1 Cột</option>
//                 <option value="col-6">2 Cột</option>
//                 <option value="col-4">3 Cột</option>
//                 <option value="col-3">4 Cột</option>
//                 <option value="col-2">6 Cột</option>
//               </Input>
//             </FormGroup>
//           </Form>
//         </div>
//           <div className="row">
//             {this.renderStaffs()}
//           </div>
//       </div>
//     );
//   }
// }

// export default StaffList;
import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

  function RenderMenuItem({staff, onClick}) {
    return (
      <Card>
        <Link to={`/staffs/${staff.id}`}>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardImgOverlay>
            <CardTitle>{staff.name}</CardTitle>
          </CardImgOverlay>
        </Link>
      </Card>
    );
  }

  const StaffList = (props) => {

    const menu = props.staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-6 col-md-6 col-lg-2 my-1">
          <RenderMenuItem staff={staff}/>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Nhân Viên</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          {menu}
        </div>
      </div>
    );
  }

export default StaffList;