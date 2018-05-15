import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, withRouter } from "react-router-dom";
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-circle-left';
import uuidv1 from 'uuid/v1';

import { savePost, updatePost } from '../actions/postActions';
import { capitalize } from '../utils/helpers';

export class PostForm extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
    voteScore: 1,
    submitted: false
  }

  componentDidMount() {
    const { categorySelected, postSelected } = this.props;

    if (postSelected) {
      this.setState({
        id: postSelected.id,
        title: postSelected.title,
        body: postSelected.body,
        category: { value: postSelected.category, label: capitalize(postSelected.category)},
        author: postSelected.author,
        voteScore: postSelected.voteScore 
      });
    } else if (categorySelected) {
      this.setState({category: categorySelected});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({submitted: true});
    const { id, title, author, body, category, voteScore } = this.state;
    if (title.length === 0 || body.length === 0 || !category) {
      return;
    }
    const authored = author.trim() || 'Anonymous';
    const timestamp = Date.now();
    const post = {
      id: '',
      timestamp,
      title: capitalize(title).trim(),
      body,
      category: category.value,
      author: authored,
      voteScore
    };
    if (id) {
      post.id = id;
      this.props.updatePost(post);      
    } else {
      post.id = uuidv1();
      this.props.savePost(post);      
    }
    this.props.history.push('/');
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeAuthor = (event) => {
    this.setState({ author: event.target.value });
  }

  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
  }

  handleChangeCategory = (category) => {
    this.setState({ category });
  }

  render() {
    const { categories, postSelected } = this.props;
    const { title, author, body, category, submitted } = this.state;

    return (
      <div className='container'>
        <div className='nav'>
          <Link to='/' className='back-btn'><ArrowLeftIcon size={25}/> Back</Link>
        </div>
        <div className='content content-form'>
          <h3>Add post</h3>
          <form className='post-form' onSubmit={this.handleSubmit}>
            <label className='label-text-input'>
              Author:
            </label>
            <input disabled={postSelected} placeholder='Anonymous' className='text-input' type="text" value={author} onChange={this.handleChangeAuthor} />
            <label className='label-text-input'>
              Title:
            </label>
            <input className={'text-input' + (submitted && title.length === 0 ? ' error' : '')} type="text" value={title} onChange={this.handleChangeTitle} />        
            <label className='label-text-input'>
              Body:
            </label>
            <textarea className={'text-input textarea-input' + (submitted && body.length === 0 ? ' error' : '')} type="textarea" value={body} onChange={this.handleChangeBody} />        
            <div className='selector-group'>
            {!postSelected && 
              <div> 
                <label className='label-text-input'>
                  Category:
                </label>
                <Select 
                  className={submitted && !category ? 'category-selector-error' : 'category-selector'}
                  name="form-field-categories"
                  placeholder={'Categories'}
                  value={category}
                  onChange={this.handleChangeCategory}
                  options={categories}
                />
              </div>}
          </div>
            <div className='post-form-btns'>
              <input readOnly className='text-btn text-btn--fixed' type="submit" value="Save" />
              <Link title='Back' to='/' className='text-btn text-btn--cancel post-cancel-btn'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ post, category }, { history, match: { params} }) {
  return {
    postSelected: post.selected,
    categories: category.categories.slice(1),
    categorySelected: category.selected.value !== 'all' ? category.selected : '',
    history,
    params 
  }
}

function mapDispatchToProps (dispatch) {
  return {
    savePost: post => dispatch(savePost(post)),
    updatePost: post => dispatch(updatePost(post)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostForm));