import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AudienceStrip from './components/AudienceStrip';
import WhySection from './components/WhySection';
import WorkflowSection from './components/WorkflowSection';
import TemplatesSection from './components/TemplatesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AudienceStrip />
        <WhySection />
        <WorkflowSection />
        <TemplatesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;
