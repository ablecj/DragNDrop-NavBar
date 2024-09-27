import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
import '../app.css';

// setting the react-dnd functions 
const ItemTypes = {
    NAVITEM: 'navItem',
  };
  
  // Draggable Navbar Item component
  const DraggableNavbarItem = ({ item, index, moveItem, navigate }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.NAVITEM,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: ItemTypes.NAVITEM,
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveItem(draggedItem.index, index);
          draggedItem.index = index; // Update the index of the dragged item
        }
      },
    });
  
    return (
      <div ref={(node) => drag(drop(node))} className="navbar-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <a
          href={item.url}
          onClick={(e) => {
            e.preventDefault();
            navigate(item.url); // Use navigate for client-side routing
          }}
        >
          {item.name}
        </a>
      </div>
    );
  };


const Navbar = () => {
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'Home', url: '/' },
        { id: '2', name: 'New properties', url: '/newproperties' },
        { id: '3', name: 'About', url: '/About' },
        { id: '4', name: 'Contact Us', url: '/contact' },
      ]);
    
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [newMenuName, setNewMenuName] = useState('');
      const [newMenuURL, setNewMenuURL] = useState('');
      
      const navigate = useNavigate();
    
      // Move item function to reorder menu items
      const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...menuItems];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setMenuItems(updatedItems);
      };
    
      // Add new menu item
      const handleAddMenuItem = () => {
        if (newMenuName && newMenuURL) {
          const newItem = {
            id: `${menuItems.length + 1}`, // Ensure unique ID for each new item
            name: newMenuName,
            url: newMenuURL,
          };
          setMenuItems([...menuItems, newItem]);
    
          // Reset state and close popup
          setNewMenuName('');
          setNewMenuURL('');
          setIsPopupOpen(false);
        } else {
          console.log('Please enter both Menu Name and URL');
        }
      };
    
      return (
        <DndProvider backend={HTML5Backend}>
          <div>
            {/* Navigation Bar */}
            <nav className="navbar">
              <div className="menu-items">
                {menuItems.map((item, index) => (
                  <DraggableNavbarItem
                    key={item.id}
                    item={item}
                    index={index}
                    moveItem={moveItem}
                    navigate={navigate} // Pass navigate down to the item
                  />
                ))}
              </div>
              
              {/* Button to open the popup for adding a menu item */}
              <div className="navbar-item add-btn" onClick={() => setIsPopupOpen(true)}>
                Add +
              </div>
            </nav>
    
            {/* Popup for adding a new menu item */}
            {isPopupOpen && (
              <div className="popup">
                <div className="popup-content">
                  <h2>Add New Menu Item</h2>
                  <input
                    type="text"
                    placeholder="Menu Name"
                    value={newMenuName}
                    onChange={(e) => setNewMenuName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Menu URL"
                    value={newMenuURL}
                    onChange={(e) => setNewMenuURL(e.target.value)}
                  />
                  <div className='button_container'>
                  <button onClick={handleAddMenuItem} className='add_item_btn'>Add Item</button>
                  <button onClick={() => setIsPopupOpen(false)} className='cancel_btn'>Cancel</button>
                  </div>
                </div>
              </div>
            )}
    
            {/* Overlay to close the popup when clicking outside */}
            {isPopupOpen && (
              <div className="overlay" onClick={() => setIsPopupOpen(false)}></div>
            )}
          </div>
        </DndProvider>
      );
}

export default Navbar
