import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Context DAO - Schemas Dapp</title>
        <meta
          name="Context DAO - Schema manager"
          content="Dapp to manage schemas in Context DAO"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
