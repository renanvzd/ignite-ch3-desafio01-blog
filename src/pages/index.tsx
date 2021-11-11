import { GetStaticProps } from 'next';
import Head from 'next/head';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | Posts</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <h1>Como utilizar hooks</h1>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.subsection}>
            <div className={styles.schedule}>
              <AiOutlineSchedule color="#BBBBBB" />
              <span>15 Mar 2021</span>
            </div>

            <div className={styles.author}>
              <FiUser color="#BBBBBB" />
              <span>Renan Veronez Drechsler</span>
            </div>
          </div>
        </section>

        <section className={styles.hero}>
          <h1>Criando um app CRA do zero</h1>
          <p>
            Tudo sobre como criar a sua primeira aplicação utilizando Create
            React App
          </p>
          <div className={styles.subsection}>
            <div className={styles.schedule}>
              <AiOutlineSchedule color="#BBBBBB" />
              <span>19 Abr 2021</span>
            </div>

            <div className={styles.author}>
              <FiUser color="#BBBBBB" />
              <span>Renan Veronez</span>
            </div>
          </div>
        </section>

        <div className={styles.loadMorePosts}>
          <p>Carregar mais posts</p>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
