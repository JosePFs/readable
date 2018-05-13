import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from 'react-redux';
import Select from 'react-select';

import { 
  selectCategory,
  upVotePost,
  downVotePost,
  selectPost,
  fetchComments,
  deletePost,
  fetchPosts
} from '../actions';
import Vote from './Vote';
import Datetime from './Datetime';
import Actions from './Actions';
import { capitalize } from '../utils/helpers';

class Category extends Component {
  state = {
    orders: [],
    selectedOrder: ''
  }

  componentDidMount() {
    const orders = [
      {value:'timestamp', label: 'Newer'},
      {value:'voteScore', label: 'Votes'}
    ];
    this.setState({
      orders: orders,
      selectedOrder: orders[0]
    });
    if (this.props.params.category && this.props.params.category !== 'all') {
      this.props.getCategoryPosts(this.props.params.category);
    } else {
      this.props.getAllPosts();
    }
    this.props.selectPost('');
  }

  deletePost = (post) => {
    this.props.deletePost(post);
  }

  editPost = (post) => {
    this.props.selectPost(post);
    this.props.history.push(`/edit/post/${post.id}`);
  }

  handleChangeCategory = (selectedCategory) => {
    this.props.selectCategory(selectedCategory);
    this.props.history.push(`/${selectedCategory.value}`);
  }

  handleChangeOrder = (selectedOrder) => {
    this.setState({ selectedOrder });
  }

  handlePostSelection = (post) => {
    const { selectPost, getComments } = this.props;
    selectPost(post);
    getComments(post);
  }

  sortFunction = (postA, postB) => {
    if (this.state.selectedOrder.value === 'timestamp') {
      return this.orderByDate(postA, postB);
    }
    return this.orderByVotes(postA, postB);
  };

  orderByDate = (postA, postB) => {
    if (postA.timestamp > postB.timestamp) {
      return -1;
    }
    if (postA.timestamp < postB.timestamp) {
      return 1;
    }
    return 0;
  };

  orderByVotes = (postA, postB) => {
    if (postA.voteScore > postB.voteScore) {
      return -1;
    }
    if (postA.voteScore < postB.voteScore) {
      return 1;
    }
    return 0;
  };

  render() {
    const {
      categories,
      selectedCategory,
      posts,
      increaseVotePost,
      decreaseVotePost
    } = this.props;
    const { orders, selectedOrder } = this.state;

    if (categories.length > 0  &&
       !categories.find(element => element.value === selectedCategory.value)) {
      return <Redirect to='/category/was/not/found' />;
    }

    return (
      <div className='container'>
        <div className='nav'>
          <div className='selector-group'>
            <span className='selector-header'>Categories</span>
            <Select className='categories-selector'
              name="form-field-categories"
              placeholder={'Categories'}
              value={selectedCategory}
              onChange={this.handleChangeCategory}
              options={categories}
            />
          </div>
          <div className='selector-group'>
            <span className='selector-header'>Order by</span>
            <Select className='order-selector'
              name="form-field-order"
              placeholder={'Order'}
              value={selectedOrder}
              onChange={this.handleChangeOrder}
              options={orders}
            />
          </div>
          <Link to='/add/new/post' className='text-btn'>Add Post</Link>
        </div>
        <div className='content'>
          <ul className='posts'>
            {posts.length > 0 
              ? posts.filter(post => (
                selectedCategory.value === 'all' || post.category === selectedCategory.value)
              ).sort(this.sortFunction)
              .map((post) => (
                <li key={post.id} className='post'>
                  <div>
                    <Actions 
                      onEdit={() => this.editPost(post)}
                      onDelete={() => this.deletePost(post)} 
                    />
                    <Link onClick={() => this.handlePostSelection(post)} to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    <small className='post-author'>[{post.author} -</small>
                    <Datetime timestamp={post.timestamp} />]
                  </div>
                  <p>Comments {post.commentCount}</p>
                  <Vote 
                    item={post}
                    onIncrease={() => increaseVotePost(post)}
                    onDecrease={() => decreaseVotePost(post)}
                  />
                </li>
              ))
              : <div className='content-post'>No posts found</div>
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }, { match: { params} }) {
  let selectedCategory = categories.selected;
  if (params.category) {
    selectedCategory = { value: params.category, label: capitalize(params.category) };
  }
  return {
    categories: categories.categories,
    selectedCategory,
    posts: posts.posts,
    params
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectCategory: category => dispatch(selectCategory(category)),
    increaseVotePost: post => dispatch(upVotePost(post)),
    decreaseVotePost: post => dispatch(downVotePost(post)),
    getAllPosts: () => dispatch(fetchPosts()),
    getCategoryPosts: () => dispatch(fetchPosts()),
    selectPost: post => dispatch(selectPost(post)),
    getComments: post => dispatch(fetchComments(post)),
    deletePost: post => dispatch(deletePost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);