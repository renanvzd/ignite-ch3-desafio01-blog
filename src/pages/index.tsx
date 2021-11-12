import Head from 'next/head';
import Prismic from '@prismicio/client';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';
import { formatDate } from '../utils';

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

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);

  const formattedPosts = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: formatDate(post.first_publication_date),
    };
  });

  const [posts, setPosts] = useState<Post[]>(formattedPosts);

  async function handleLoadMorePosts(): Promise<void> {
    const newPosts = await fetch(nextPage).then(response => response.json());

    setNextPage(newPosts.next_page);

    const newFormattedPosts = newPosts.results.map(post => {
      return {
        ...post,
        first_publication_date: formatDate(post.first_publication_date),
      };
    });

    setPosts([...posts, ...newFormattedPosts]);
  }
  return (
    <>
      <Head>
        <title>Home | Posts</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          {posts?.map(post => (
            <div className={styles.containerPost}>
              <Link key={post.uid} href={`/post/${post.uid}`}>
                <a>
                  <div className={styles.titlePost}>{post.data.title}</div>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.subsection}>
                    <div className={styles.schedule}>
                      <AiOutlineSchedule color="#BBBBBB" />
                      <span>{post.first_publication_date}</span>
                    </div>

                    <div className={styles.author}>
                      <FiUser color="#BBBBBB" />
                      <span>{post.data.author}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
          {nextPage && (
            <button type="button" onClick={handleLoadMorePosts}>
              <div className={styles.loadMorePosts}>
                <p>Carregar mais posts...</p>
              </div>
            </button>
          )}
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
