import React from 'react';
import { Button, Form, FormFeedback, FormGroup, Modal, ModalBody, ModalHeader, Label, Input } from 'reactstrap';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      rating: '1',
      author: '',
      comment: '',
      touched: {
        author: false,
        comment: false,
      }
    }
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({isOpenModal: !this.state.isOpenModal})
  }

  handleBlur = (field) => (event) => {
    this.setState({
      touched: {...this.state.touched, [field]: true}
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmitComment(event) {
    event.preventDefault();
    alert('Rating: ' + this.state.rating + ' Your Name: ' + this.state.author + ' Comment: ' +
      this.state.comment)
  }

  validate(author, comment) {
    const errors = {
      author: '',
      comment: '',
    };

    if(this.state.touched.author && author.length < 3) {
      errors.author = "Must be greater than 2 characters"
    } else if (this.state.touched.author && author.length > 15) {
      errors.author = "Must be 15 characters or less"
    }

    if(this.state.touched.comment && comment.length == 0) {
      errors.comment = 'Please tell me your feedback'
    }

    return errors;
  }

  render() {
    const errors = this.validate(this.state.author, this.state.comment);

    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
        <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isOpenModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmitComment}>
              <FormGroup>
              <Label htmlFor="rating">Rating</Label>
                <Input type="select" id="rating" name="rating"
                  value={this.state.rating}
                  onChange={this.handleInputChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </ Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Input type="text" id="author" name="author"
                  value={this.state.author}
                  valid={errors.author === ""}
                  invalid={errors.author !== ""}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur('author')} />
                <FormFeedback>{errors.author}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Input type="textarea" id="comment" name="comment" rows="6"
                  value={this.state.comment}
                  valid={errors.comment === ""}
                  invalid={errors.comment !== ""}
                  onBlur={this.handleBlur("comment")}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.comment}</FormFeedback>
              </FormGroup>
              <Button type="submit" color="primary">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CommentForm;