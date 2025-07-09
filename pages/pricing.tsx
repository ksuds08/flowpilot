import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Head>
        <title>Contact | FlowPilot</title>
        <meta name="description" content="Get in touch with the FlowPilot team." />
      </Head>

      <main className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        {submitted ? (
          <p className="text-green-700 font-semibold">
            Thanks for reaching out! We’ll get back to you shortly.
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                required
                rows={5}
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </form>
        )}
      </main>
    </>
  );
}


