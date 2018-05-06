import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddIcon from 'react-icons/lib/fa/plus';
import MinusIcon from 'react-icons/lib/fa/minus';
import Select from 'react-select';
import { selectCategory, upVotePost, downVotePost } from '../actions'

class App extends Component {
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
          <button
            className='icon-btn'
            onClick={this.addPost}>
              Add Post 
              <AddIcon size={30}/>
          </button>
        </div>
        <div className='content'>
          <ul className='posts'>
            {posts.filter(post => (
              selectedCategory.value === 'all' || post.category === selectedCategory.value)
            ).sort(this.sortFunction)
            .map((post) => (
              <li key={post.id} className='post'>
                <div>
                  <span>{post.title} </span>
                  <small>
                    ({new Date(Number(post.timestamp)).getFullYear()}-
                    {("0" + new Date(Number(post.timestamp)).getMonth()).substr(-2)}-
                    {("0" + new Date(Number(post.timestamp)).getDay()).substr(-2)})                  
                  </small>
                </div>
                <p>Comments {post.commentCount}</p>
                <div>
                  <span>Vote score {post.voteScore}</span>
                  <div className='vote-btns'>
                    <button
                      className='icon-btn'
                      onClick={() => increaseVotePost(post)}>
                        <AddIcon size={15}/>
                    </button>|
                    <button
                      className='icon-btn'
                      onClick={() => decreaseVotePost(post)}>
                        <MinusIcon size={15}/>
                    </button>
                  </div>
                </div>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);