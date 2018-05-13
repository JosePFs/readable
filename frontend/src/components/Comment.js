import React, { Component } from 'react';
import { connect } from 'react-redux';
import CloseIcon from 'react-icons/lib/fa/close';
import SaveIcon from 'react-icons/lib/fa/floppy-o';

import Actions from './Actions';
import { deleteComment, updateComment } from '../actions';

class Comment extends Component {

  state = {
    body: '',
    editing: false
  }

  componentDidMount() {
    this.setState({body: this.props.comment.body});
  }

  editComment = (comment) => {
    this.setState({editing: true});
  }

  update = (comment) => {
    this.props.updateComment({id: comment.id, body: this.state.body, timestamp: Date.now()});
    this.setState({editing: false});
  }

  close = () => {
    this.setState({editing: false, body: this.props.comment.body});    
  }

  handleChangeBody = (event) => {
    this.setState({body: event.target.value});
  }

  render() {
    const { comment, deleteComment } = this.props;
    const { editing, body } = this.state;

    return (
      <div>
        <Actions 
          onEdit={() => this.editComment(comment)}
          onDelete={() => deleteComment(comment)} 
        />
        {editing
          ? <div className='post-form'>
              <input autoFocus className='text-input' type="text" onChange={this.handleChangeBody} value={body} />
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
          : <p>{body}</p> 
        }
      </div>
    );
  }
}

function mapStateToProps ({ comments }, {comment}) {
  return {
    comment
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: comment => dispatch(deleteComment(comment)),    
    updateComment: comment => dispatch(updateComment(comment)),    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);