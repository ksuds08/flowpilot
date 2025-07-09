import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About | FlowPilot</title>
        <meta name="description" content="Learn more about FlowPilot, the AI-native workflow assistant for solopreneurs." />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">About FlowPilot</h1>
        <p className="text-lg leading-7">
          FlowPilot helps solopreneurs streamline their client workflows with AI-powered task management and automation.
        </p>
      </main>
    </>
  );
}
