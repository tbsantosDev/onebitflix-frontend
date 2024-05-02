import Head from "next/head";
import styles from '../styles/HomeNoAuth.module.scss'
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";


const HomeNoAuth = () => {
  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title" />
        <meta name="description" content="Tenha acesso aos melhores conteúdos de programação de forma fácil!" />
      </Head>
      <main>
        <div className={styles.sectionBackground}>
        <HeaderNoAuth />
        <PresentationSection />
        </div>
      </main>
    </>
  )
}

export default HomeNoAuth