import React from 'react';
import Hero from './components/Hero';
import HorizontalSlider from './components/HorizontalSlider';
import ProductFeatures from './components/ProductFeatures';
import InstallVideo from './components/InstallVideo';

function App() {
  return (
    <main
      className="w-full min-h-screen font-sans selection:bg-mtgrip selection:text-charcoal"
      style={{ overflowX: 'clip' }}
    >
      <Hero />
      <HorizontalSlider />
      <ProductFeatures />
      <InstallVideo />
    </main>
  );
}

export default App;
