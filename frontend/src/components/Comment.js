import React, { Component } from 'react';
import { connect } from 'react-redux';
import CloseIcon from 'react-icons/lib/fa/close';
import SaveIcon from 'react-icons/lib/fa/floppy-o';

import Actions from './Actions';
import * as actions from '../actions/commentActions';

class Comment extends Component {

  state = {
    body: '',
    editing: false,
    submitted: false
  }

  componentDidMount() {
    this.setState({body: this.props.comment.body});
  }

  editComment = (comment) => {
    this.setState({editing: true});
  }

  update = (comment) => {
    if (this.state.body.length === 0) {
      this.setState({submitted: true});      
      return;
    }
    this.props.updateComment({id: comment.id, body: this.state.body, timestamp: Date.now()});
    this.setState({editing: false, submitted: false});
  }

  close = () => {
    this.setState({editing: false, body: this.props.comment.body});    
  }

  handleChangeBody = (event) => {
    this.setState({body: event.target.value});
  }

  getContent = () => {
    const { comment } = this.props;
    const { editing, body, submitted } = this.state;

    if (editing) {
      return (
        <div className='post-form'>
          <input autoFocus className={'text-input' + (submitted && body.length === 0 ? ' error' : '')} type="text" onChange={this.handleChangeBody} value={body} />
          <button title='Save'
            className='icon-btn'
            onClick={() => this.update(comment)}>
              <SaveIcon size={20}/>
          </button>
          <button title='Close'
            className='icon-btn'
            onClick={() => this.close()}>
              <CloseIcon size={20}/>
          </button>
        </div>
      );
    } else {
      return <p>{body}</p>;
    }
  }

  render() {
    const { comment, deleteComment } = this.props;

    return (
      <div>
        <Actions 
          onEdit={() => this.editComment(comment)}
          onDelete={() => deleteComment(comment)} 
        />
        {this.getContent()}
      </div>
    );
  }
}

function mapStateToProps ({ comments }, {comment}) {
  return {
    comment
  }
}

export default connect(
  mapStateToProps,
  actions
)(Comment);