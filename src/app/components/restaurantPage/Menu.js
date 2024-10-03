import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({ items, cart, onAdd, onRemove }) => {
    return (
      <div className="p-4">
        {items.map((item) => (
          <MenuItem
            key={item._id}
            item={item}
            quantity={cart[item.dishName]?.quantity || 0}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    );
  };

export default Menu;