import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #eaeaea' }}>
        <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link href="/about" style={{ marginRight: '1rem' }}>About</Link>
        <Link href="/contact" style={{ marginRight: '1rem' }}>Contact</Link>
              <Link href="/new" style={{ marginRight: '1rem' }}>New Workflow</Link>
        <Link href="/pricing">Pricing</Link>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
