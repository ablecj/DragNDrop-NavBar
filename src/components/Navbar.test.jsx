// Navbar.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar'; 

// Mocking useNavigate for testing
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Navbar Component', () => {
  test('renders navigation items correctly', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check if the navigation items are rendered
    const homeItem = screen.getByText(/home/i);
    const aboutItem = screen.getByText(/about/i);
    const servicesItem = screen.getByText(/services/i);
    const contactItem = screen.getByText(/contact/i);
    const addButton = screen.getByText(/add \+/i);

    expect(homeItem).toBeInTheDocument();
    expect(aboutItem).toBeInTheDocument();
    expect(servicesItem).toBeInTheDocument();
    expect(contactItem).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('opens the popup when Add button is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const addButton = screen.getByText(/add \+/i);
    fireEvent.click(addButton);

    // Check if the popup is displayed
    const popupTitle = screen.getByText(/add new menu item/i);
    expect(popupTitle).toBeInTheDocument();
  });

  test('adds a new menu item when input is provided and Add Item button is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Open the popup
    const addButton = screen.getByText(/add \+/i);
    fireEvent.click(addButton);

    // Fill the input fields
    const menuNameInput = screen.getByPlaceholderText(/menu name/i);
    const menuURLInput = screen.getByPlaceholderText(/menu url/i);
    fireEvent.change(menuNameInput, { target: { value: 'New Item' } });
    fireEvent.change(menuURLInput, { target: { value: '/new-item' } });

    // Click Add Item
    const addItemButton = screen.getByText(/add item/i);
    fireEvent.click(addItemButton);

    // Check if the new item is rendered
    const newItem = screen.getByText(/new item/i);
    expect(newItem).toBeInTheDocument();
  });

  test('closes the popup when Cancel button is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Open the popup
    const addButton = screen.getByText(/add \+/i);
    fireEvent.click(addButton);

    // Click Cancel
    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    // Check if the popup is closed
    const popupTitle = screen.queryByText(/add new menu item/i);
    expect(popupTitle).not.toBeInTheDocument();
  });
});
