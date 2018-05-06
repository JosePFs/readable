import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddIcon from 'react-icons/lib/fa/plus-circle';
import Select from 'react-select';
import { selectCategory } from '../actions'

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

  render() {
    const { categories, selectedCategory } = this.props;
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
      </div>
    )
  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories: categories.categories,
    selectedCategory: categories.selected
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectCategory: category => dispatch(selectCategory(category)) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);