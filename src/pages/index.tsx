import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Unite DAO - Schemas Dapp</title>
        <meta
          name="Unite DAO - Schema manager"
          content="Dapp to manage schemas in UniteDAO"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
