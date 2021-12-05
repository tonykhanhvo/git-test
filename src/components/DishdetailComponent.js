import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from "./CommentFormComponent";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

  function RenderDish({dish}) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function RenderComments({comments, addComment, dishId}) {
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
      return (
        <React.Fragment>
          {menu}
          <CommentForm dishId={dishId} addComment={addComment} />
        </React.Fragment>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  const DishDetail = (props) => {
    if(props.isLoading) {
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if(props.errMess) {
      return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    } else if (props.dish != null) {
      return (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <RenderDish dish={props.dish} />
              <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <RenderComments comments={props.comments}
                  addComment={props.addComment}
                  dishId={props.dish.id} />
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

export default DishDetail;