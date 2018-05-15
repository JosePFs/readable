import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import { saveComment } from '../actions/commentActions';

export class CommentForm extends Component {

  state = {
    body: '',
    author: '',
    submitted: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({submitted: true});
    const { selectedPostId, saveComment, onClose } = this.props;    
    const { body, author } = this.state; 
    if (body.length === 0) {
      return;
    }
    const timestamp = Date.now();
    const id = uuidv1();
    const authored = author || 'Anonymous';
    saveComment({ id, timestamp, author: authored, body, parentId: selectedPostId });
    onClose();
  }

  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  }

  handleChangeAuthor = (event) => {
    this.setState({ author: event.target.value });
  }

  render() {
    const { onClose } = this.props;
    const { body, author, submitted } = this.state;

    return (
      <form className='comment-form' onSubmit={this.handleSubmit}>
        <label className='label-text-input'>
          Author:
        </label>
        <input autoFocus className='text-input' placeholder='Anonymous' type="text" value={author} onChange={this.handleChangeAuthor} />        
        <label className='label-text-input'>
          Comment:
        </label>
        <input className={'text-input' + (submitted && body.length === 0 ? ' error' : '')} type="text" value={body} onChange={this.handleChangeBody} />        
        <div className='comment-form-btns'>
          <input readOnly className='text-btn text-btn--fixed' type="submit" value="Save" />
          <input onClick={() => onClose()} readOnly className='text-btn text-btn--fixed text-btn--cancel' type="cancel" value="Cancel" />
        </div>
      </form>
    )
  }
}

function mapStateToProps ({ post }) {
  return {
    selectedPostId: post.selected.id
  }
}

function mapDispatchToProps (dispatch) {
  return {
    saveComment: comment => dispatch(saveComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);