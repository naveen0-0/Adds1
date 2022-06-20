import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { BlogCard } from '../components/BlogCard';
import { fetchQuery } from '../utils/util'



export async function getStaticProps(){
  const { posts } = await fetchQuery(`
        {
            posts {
            id,
            title,
            slug,
            coverPhoto {
              url
            }
            author{
              name,
              avatar {
                url
              }
            }
          }
        }
      `);
  return {
    props : {
      posts
    },
    revalidate:10
  }
}

export default function Home({ posts }) {

  useEffect(() => {
    console.log(posts);
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Marco Palini | Blogs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={styles.blogs}>
        {posts.map(post => <BlogCard
          key={post.id}
          title={post.title}
          slug={post.slug}
          coverPhoto={post.coverPhoto}
          author={post.author}
        />)}
      </div>

    </div>
  )
}
