/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { AppContext } from "../../context/AppContext";
import Moment from "react-moment";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import styles from "./Modal.module.css"

const Modal = () => {
  const [input, setInput] = useState("");
    const [appContext, setAppContext] = useContext(AppContext);
  const { data: session } = useSession();
  const router = useRouter();

  const closeModal = () => {
    setAppContext({ ...appContext, isModalOpen: false });
  };

  const post = appContext.post;

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", appContext.postId, "comments"), {
      comment: input,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setAppContext({ ...appContext, isModalOpen: false });
    setInput("");

    router.push(`/${appContext.postId}`);
  };

  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
      >
        <MdClose onClick={closeModal} />

        <div>
          <div>
            <img src={post?.userImg} alt="" />
          </div>

          <div>
            <div>
              <h1>{post?.username}</h1>
              <h2>
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </h2>
            </div>
            <p>{post?.text}</p>

            <img
              src={post?.image}
              alt=""
            />

            <p>
              Replying to: <span>@{post?.tag}</span>
            </p>
          </div>

          <div className={styles.image}>
            <img src={session?.user?.image} alt="" />
          </div>

          <div>
            <textarea
              rows="4"
              placeholder="Your reply"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div>
              <div>
                <BsImage />
              </div>

              <button
                disabled={!input.trim()}
                onClick={sendComment}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
