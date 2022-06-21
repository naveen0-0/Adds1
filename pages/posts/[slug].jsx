import styles from '../../styles/Slug.module.css'
import { fetchQuery } from '../../utils/util'
import Head from 'next/head'

const QUERY = `
query getBlog($slug:String){
    post(where:{slug:$slug}){
      id,
      title,
      slug,
      date_published,
      author{
        id,
        name,
        avatar{
          url
        }
      },
      content{
        html
      },
      coverPhoto{
        id,
        url
      }
    }
  }
`

const SLUGLIST = `
  {
    posts{
      slug
    }
  }
  `

const getFullBlog = async (slug) => {
  let data = await fetchQuery(QUERY,{ slug })
  return data
}

export async function getStaticPaths(){
  const { posts } = await fetchQuery(SLUGLIST)
  return {
    paths : posts.map((post) => ({params : { slug:post.slug }})),
    fallback:false
  }
}

export async function getStaticProps({ params }){
  const slug = params.slug
  const data = await getFullBlog(slug)
  const post = data.post;
  
  return{
    props:{
      post
    },
    revalidate:10
  }
}

export default function BlogPost({ post }){
  return(
    <div className={styles.container}>

      <Head>
        <title>{post.slug}</title>
      </Head>

      <div className={styles.title}>{post.title}</div>

      <div className={styles.author}>
        <div className={styles.authorImageContainer}>
          <img src={post.author.avatar.url} alt="Author Profile Image" className={styles.authorImage}/>
        </div>
        <div className={styles.authorName}>{post.author.name}</div>
      </div>

      <div className={styles.coverPhotoContainer}>
        <img src={post.coverPhoto.url} alt="Cover Photo" className={styles.coverPhoto}/>
      </div>

      <div className={styles.content} dangerouslySetInnerHTML={{__html:post.content.html}}></div>
    </div>
  )
}