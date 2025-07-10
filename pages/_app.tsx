import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <>
        <nav style=https://operator.chatgpt.com/c/686fceef14ec8192a95f598b5d18999e#cua_citation-%20padding:%20'1rem',%20borderBottom:%20'1px%20solid%20#eaeaea'%20>
          <Link href="/" style=https://operator.chatgpt.com/c/686fceef14ec8192a95f598b5d18999e#cua_citation-%20marginRight:%20'1rem'%20>Home</Link>
          <Link href="/about" style=https://operator.chatgpt.com/c/686fceef14ec8192a95f598b5d18999e#cua_citation-%20marginRight:%20'1rem'%20>About</Link>
          <Link href="/contact" style=https://operator.chatgpt.com/c/686fceef14ec8192a95f598b5d18999e#cua_citation-%20marginRight:%20'1rem'%20>Contact</Link>
          <Link href="/new" style=https://operator.chatgpt.com/c/686fceef14ec8192a95f598b5d18999e#cua_citation-%20marginRight:%20'1rem'%20>New Workflow</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
        <Component {...pageProps} />
      </>
    </ClerkProvider>
  );
}

