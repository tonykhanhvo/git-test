import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {

  constructor(props) {
    super(props);

  }

  renderComments(dish) {
    if (dish.comments != null) {
      const menu = dish.comments.map((comment) => {
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

  render() {
    const dish = this.props.dish;
    
    if (dish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              {this.renderComments(dish)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

export default DishDetail;