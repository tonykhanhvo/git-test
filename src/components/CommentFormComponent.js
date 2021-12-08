import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    }
    // this.handleBlur = this.handleBlur.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({isOpenModal: !this.state.isOpenModal})
  }

  handleSubmitComment(values) {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
        <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isOpenModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
              <Row>
                <Col><Label htmlFor="rating">Rating</Label></Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row>
                <Col><Label htmlFor="author">Your Name</Label></Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Your Full Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages= {{
                      required: 'Required ',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }} />
                </Col>
              </Row>
              <Row>
                <Col><Label htmlFor="comment">Comment</Label></Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6"
                    className="form-control"
                    validators={{required}} />
                  <Errors
                    className="text-danger"
                    model=".comment"
                    show="touched"
                    messages={{
                      required: 'Required'
                    }} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CommentForm;