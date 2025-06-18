import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <h1> Infinite Scrolling Products</h1>
      <ProductList />
    </div>
  );
}

export default App;
