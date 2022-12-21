/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import Moment from "react-moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { AppContext } from "../../context/AppContext";
import {
  deleteDoc,
  setDoc,
  doc,
  onSnapshot,
  query,
  collection,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Post.module.css"

export default function Post({ id, post }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [appContext, setAppContext] = useContext(AppContext);
  const { data: session } = useSession();
  console.log(post.userImg);
  const router = useRouter();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };
  const openModal = () => {
    setAppContext({
      ...appContext,
      isModalOpen: true,
      post,
      postId: id,
    });

    console.log("opening model ", appContext.post);
  };
  return (
    <div>
      <div className={styles.post}>
        <div className={styles.poster}>
          <img className={styles.posterImg} src={post?.userImg} alt="" />
          <h3>{post?.username}</h3>
        </div>
        <p>{post?.text}</p>
        <img src={post?.image} alt="" className={styles.image} />
        <p>
          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
        </p>
        <div>
          {session.user.uid !== post?.id ? (
            <p></p>
          ) : (
            <RiDeleteBin5Line
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
              }}
            />
          )}

          <div
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}

            {likes.length > 0 && <span>{likes.length}</span>}
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
}
