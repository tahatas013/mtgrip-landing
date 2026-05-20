import React from 'react';
import Hero from './components/Hero';
import UseCases from './components/UseCases';
import ProductSpecs from './components/ProductSpecs';
import InstallVideo from './components/InstallVideo';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <main
      className="w-full min-h-screen font-sans selection:bg-mtgrip selection:text-charcoal"
      style={{ overflowX: 'clip' }}
    >
      <LanguageSwitcher />
      <Hero />
      <UseCases />
      <ProductSpecs />
      <InstallVideo />
    </main>
    </LanguageProvider>
  );
}

export default App;
