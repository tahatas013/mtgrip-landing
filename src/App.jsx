import React from 'react';
import Hero from './components/Hero';
import ProductSpecs from './components/ProductSpecs';
import InstallVideo from './components/InstallVideo';

function App() {
  return (
    <main
      className="w-full min-h-screen font-sans selection:bg-mtgrip selection:text-charcoal"
      style={{ overflowX: 'clip' }}
    >
      <Hero />
      <ProductSpecs />
      <InstallVideo />
    </main>
  );
}

export default App;
