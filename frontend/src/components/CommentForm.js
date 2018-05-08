import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CommentForm extends Component {

  state = {
    body: '',
    author: ''
  }

  handleSubmit = (event) => {
    const { body, author } = this.state; 
    if (body.length === 0) {
      return;
    }
    const authored = author || 'Anonymous';
    event.preventDefault();
  }

  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  }

  handleChangeAuthor = (event) => {
    this.setState({ author: event.target.value });
  }

  render() {
    const { onCancel } = this.props;
    const { body, author } = this.state;

    return (
      <form className='comment-form' onSubmit={this.handleSubmit}>
        <label className='label-text-input'>
          Author:
        </label>
        <input className='text-input' type="text" value={author} onChange={this.handleChangeAuthor} />        
        <label className='label-text-input'>
          Comment:
        </label>
        <input className='text-input' type="text" value={body} onChange={this.handleChangeBody} />        
        <div className='comment-form-btns'>
          <input readOnly className='text-btn text-btn--fixed' type="submit" value="Save" />
          <input onClick={() => onCancel()} readOnly className='text-btn text-btn--fixed text-btn--cancel' type="cancel" value="Cancel" />
        </div>
      </form>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);