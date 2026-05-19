import React from 'react';
import Hero from './components/Hero';
import HorizontalSlider from './components/HorizontalSlider';
import ProductShowcase from './components/ProductShowcase';

function App() {
  return (
    <main
      className="w-full min-h-screen font-sans selection:bg-mtgrip selection:text-charcoal"
      style={{ overflowX: 'clip' }}
    >
      <Hero />
      <HorizontalSlider />
      <ProductShowcase />
    </main>
  );
}

export default App;
