import { useState } from 'react';

export default function NewWorkflow() {
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/generate-workflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal }),
    });

    const data = await res.json();
    setResult(data.workflow || data.error);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create a New Workflow</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Describe your goal..."
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Workflow'}
        </button>
      </form>
      {result && (
        <pre style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>{result}</pre>
      )}
    </div>
  );
}
