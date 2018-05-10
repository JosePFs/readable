import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link } from "react-router-dom";
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-circle-left';
import uuidv1 from 'uuid/v1';

export class PostForm extends Component {

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
    voteScore: 1
  }

  handleSubmit = (event) => {
    event.preventDefault();    
    const { title, author, body, category } = this.state;
    if (body.length === 0 || category.length === 0) {
      return;
    }
    const authored = author || 'Anonymous';
    const timestamp = Date.now();
    const uuid = uuidv1();
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
    const { categories } = this.props;
    const { title, author, body, category } = this.state;

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
            <input placeholder='Anonymous' className='text-input' type="text" value={author} onChange={this.handleChangeAuthor} />        
            <label className='label-text-input'>
              Title:
            </label>
            <input className='text-input' type="text" value={title} onChange={this.handleChangeTitle} />        
            <label className='label-text-input'>
              Body:
            </label>
            <textarea className='text-input textarea-input' type="textarea" value={body} onChange={this.handleChangeBody} />        
            <div className='selector-group'>
            <label className='label-text-input'>
              Category:
            </label>
            <Select className='category-selector'
              name="form-field-categories"
              placeholder={'Categories'}
              value={category}
              onChange={this.handleChangeCategory}
              options={categories}
            />
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

function mapStateToProps ({ categories }) {
  return {
    categories: categories.categories.slice(1)
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);