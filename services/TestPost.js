import db from '../firebase'

 export const postsFirstBatch = async function () {
    try {
      const data = await db
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();

      let posts = [];
      let lastKey = "";
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          postContent: doc.data().postContent,
        });
        lastKey = doc.data().createdAt;
      });

      return { posts, lastKey };
    } catch (e) {
      console.log(e);
    }
  }


  export const postsNextBatch = async (key) => {
    try {
      const data = await db
        .collection("posts")
        .orderBy("createdAt", "desc")
        .startAfter(key)
        .limit(10)
        .get();

      let posts = [];
      let lastKey = "";
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          postContent: doc.data().postContent,
        });
        lastKey = doc.data().createdAt;
      });
      return { posts, lastKey };
    } catch (e) {
      console.log(e);
    }
  }

