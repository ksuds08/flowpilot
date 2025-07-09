import Head from 'next/head';

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Pricing | FlowPilot</title>
        <meta name="description" content="Choose the FlowPilot plan that fits your business." />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Pricing</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Starter</h2>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="space-y-1 mb-4">
              <li>Up to 3 active workflows</li>
              <li>Email support</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Get Started</button>
          </div>

          <div className="border rounded-lg p-6 shadow-md ring-2 ring-blue-600">
            <h2 className="text-2xl font-semibold mb-2">Pro</h2>
            <p className="text-3xl font-bold mb-4">$19/mo</p>
            <ul className="space-y-1 mb-4">
              <li>Unlimited workflows</li>
              <li>Priority email support</li>
              <li>Team collaboration</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Start Free Trial</button>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <ul className="space-y-1 mb-4">
              <li>Custom integrations</li>
              <li>Dedicated support</li>
              <li>On-premise options</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Contact Sales</button>
          </div>
        </div>
      </main>
    </>
  );
}
