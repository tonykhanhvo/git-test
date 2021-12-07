import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from "./CommentFormComponent";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

  function RenderDish({dish}) {
    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform in
          transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
          <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  }

  function RenderComments({comments, postComment, dishId}) {
    if (comments != null) {
      const menu = comments.map((comment) => {
        let date = new Date(comment.date);
        return (
          <Fade in>
            <div key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author}, {date.toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})}</p>
            </div>
          </Fade>
        );
      });
      return (
        <React.Fragment>
          <Stagger in>
            {menu}
          </Stagger>
          <CommentForm dishId={dishId} postComment={postComment} />
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
                  postComment={props.postComment}
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