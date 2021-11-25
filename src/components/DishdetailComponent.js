import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from "./CommentFormComponent";

  function RenderDish({dish}) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function RenderComments({comments}) {
    if (comments != null) {
      const menu = comments.map((comment) => {
        let date = new Date(comment.date);
        return (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {date.toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}</p>
          </div>
        );
      });
      return menu;
    } else {
      return (
        <div></div>
      );
    }
  }

  class DishDetail extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        isOpenModal: false,
      }
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState({
        isOpenModal: !this.state.isOpenModal,
      })
    }

    handleSubmit(event) {
      event.preventDefault();
      this.toggleModal();
      alert('Rating: ' + this.rating.value + ' Your Name: ' + this.author.value +
        ' Comment: ' + this.comment.value);
    }

    render() {
      if (this.props.dish != null) {
        return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>{this.props.dish.name}</h3>
                  <hr />
                </div>
              </div>
              <div className="row">
                <RenderDish dish={this.props.dish} />
                <div className="col-12 col-md-5 m-1">
                  <h4>Comments</h4>
                  <RenderComments comments={this.props.comments} />
                  <CommentForm />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <div></div>
        );
      }
    }
  }

export default DishDetail;