import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Select from 'react-select';
import { selectCategory, upVotePost, downVotePost, selectPost, fetchComments } from '../actions';
import Vote from './Vote';
import Datetime from './Datetime';

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
  }

  addPost = () => {
    
  }

  handleChangeCategory = (selectedCategory) => {
    this.props.selectCategory(selectedCategory);
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
          <Link to='/addpost' className='text-btn'>Add Post</Link>
        </div>
        <div className='content'>
          <ul className='posts'>
            {posts.filter(post => (
              selectedCategory.value === 'all' || post.category === selectedCategory.value)
            ).sort(this.sortFunction)
            .map((post) => (
              <li key={post.id} className='post'>
                <div>
                  <Link onClick={() => this.handlePostSelection(post)} to='/post'>{post.title}</Link>
                  <Datetime timestamp={post.timestamp} />
                </div>
                <p>Comments {post.commentCount}</p>
                <Vote 
                  item={post}
                  onIncrease={() => increaseVotePost(post)}
                  onDecrease={() => decreaseVotePost(post)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: categories.categories,
    selectedCategory: categories.selected,
    posts: posts.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectCategory: category => dispatch(selectCategory(category)),
    increaseVotePost: post => dispatch(upVotePost(post)),
    decreaseVotePost: post => dispatch(downVotePost(post)),
    selectPost: post => dispatch(selectPost(post)), 
    getComments: post => dispatch(fetchComments(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);