import Link from "next/link";
import styles from "../styles/BlogCard.module.css";
import Image from 'next/image';

const BlogPost = ({ title, author, coverPhoto, datePublished, slug }) => {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <Image src={coverPhoto.url} alt="" layout="fill" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <Image src={author.avatar.url} alt="" height:"50px" width:"50px" />
            <h3>{author.name}</h3>
          </div>
        </div>
        <div className={styles.date}>
          <h3>{datePublished}</h3>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
