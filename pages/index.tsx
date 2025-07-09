import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        FlowPilot
      </h1>
      <p className="text-lg text-gray-600">
        AI native client workflow assistant for solopreneurs
      </p>
    </main>
  );
};

export default Home;
