import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";
import LikePng from "../../assets/like.png";
import { useState, useRef } from "react";
const graphcms = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/cl9kbzpde310d01t9go1tdb92/master"
);
const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

const Article = ({ post }) => {
  const [happyCount, setHappyCount] = useState(0);
  const [unhappyCount, setUnhappyCount] = useState(0);
  const handleChangeHappy = () => {
    setHappyCount(happyCount + 1);
  };
  const handleChangeUnhappy = () => {
    setUnhappyCount(unhappyCount + 1);
  };
  const buttonRefh = useRef(null);
  const buttonRefun = useRef(null);
  const handleClickDish = (e) => {
    if (buttonRefun != null) {
      buttonRefh.current.disabled = true;
      buttonRefun.current.disabled = true;
    }
    buttonRefh.current.disabled = true;
  };
  const handleClickDisun = (e) => {
    if (buttonRefh != null) {
      buttonRefun.current.disabled = true;
      buttonRefh.current.disabled = true;
    }
    buttonRefun.current.disabled = true;
  };

  const doubleClickHappy = (e) => {
    handleChangeHappy();
    handleClickDish();
  };
  const doubleClickUnhappy = (e) => {
    handleChangeUnhappy();
    handleClickDisun();
  };
  return (
    <>
      <a href="/" className={styles.buttonBck}>
        Back
      </a>
      <div className={styles.blog}>
        <h3>{post.title}</h3>
        <img
          src={post.coverPhoto.url}
          className={styles.cover}
          alt="coverPhoto"
        />
        <div className={styles.title}>
          <img src={post.author.avatar.url} alt="avturl" />
          <div className={styles.authtext}>
            <h6>By {post.author.name}</h6>
            <h6 className={styles.date}>{post.datePublished}</h6>
          </div>
        </div>
        <div className={styles.like}>
          <button
            className={styles.happy}
            ref={buttonRefh}
            onClick={doubleClickHappy}
          >
            &#128515;
            <span className={styles.counter}>{happyCount}</span>
          </button>

          <button
            className={styles.unhappy}
            ref={buttonRefun}
            onClick={doubleClickUnhappy}
          >
            &#128533;
            <span className={styles.counter}>{unhappyCount}</span>
          </button>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </div>
    </>
  );
};

export default Article;
