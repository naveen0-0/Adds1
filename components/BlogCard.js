import styles from '../styles/Home.module.css';
import Link from 'next/link'

export function BlogCard({ title, slug, coverPhoto, author }){

  return (
    <>
      <Link href={`/posts/${slug}`}>
        <div className={styles.blog}>
          <div className={styles.coverPhotoContainer}>
            <img src={coverPhoto.url} alt="coverPhoto" className={styles.coverPhoto}/>
          </div>

          <div className={styles.title}>
            {title}
          </div>

          <div className={styles.author}>
            <div className={styles.authorImgContainer}>
              <img src={author.avatar.url} alt="authorImage" className={styles.authorImg}/>
            </div>
            <div className={styles.authorName}>{author.name}</div>
          </div>
        </div>
      </Link>
    </>
  )
}