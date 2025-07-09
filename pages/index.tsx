import React from 'react';
import Link from 'next/link';

const HomePage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Welcome to Flowpilot</h1>
    <p>Your AI workflow assistant for solopreneurs.</p>
    <p>
      <Link href="/about">Learn more</Link>
    </p>
  </div>
);

export default HomePage;
