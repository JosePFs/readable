import React from 'react';
import AddIcon from 'react-icons/lib/fa/plus';
import MinusIcon from 'react-icons/lib/fa/minus';

export default function Vote ({ item, onIncrease, onDecrease }) {
  return (
    <div>
      <span>Vote score {item.voteScore}</span>
      <div className='vote-btns'>
        <button
          className='icon-btn'
          onClick={() => onIncrease()}>
            <AddIcon size={15}/>
        </button>|
        <button
          className='icon-btn'
          onClick={() => onDecrease()}>
            <MinusIcon size={15}/>
        </button>
      </div>
    </div>
  )
}