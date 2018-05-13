import React from 'react';
import MinusIcon from 'react-icons/lib/fa/minus';
import EditIcon from 'react-icons/lib/fa/pencil';

export default function Actions ({ onEdit, onDelete }) {
  return (
    <div className='post-btns'>
        <button title='Edit'
          className='icon-btn'
          onClick={() => onEdit()}>
            <EditIcon size={15}/>
        </button>|
        <button title='Delete'
          className='icon-btn'
          onClick={() => onDelete()}>
            <MinusIcon size={15}/>
        </button>
      </div>
  )
}