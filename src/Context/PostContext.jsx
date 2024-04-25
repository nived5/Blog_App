import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const PostContext = createContext([]);
export const PostDataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const handleLike = (userId, likedPost) => {
    const index = likedPost.likes.findIndex((ele) => ele === userId);
    index === -1
      ? setPosts(
          posts.map((post) =>
            post.id === likedPost.id
              ? { ...post, likes: [...post.likes, userId] }
              : post
          )
        )
      : setPosts(
          posts.map((post) =>
            post.id === likedPost.id
              ? { ...post, likes: post.likes.filter((x) => x !== userId) }
              : post
          )
        );
  };

  const handleSave = (userId, savedPost) => {
    const index = savedPost.saved.findIndex((ele) => ele === userId);
    index === -1
      ? setPosts(
          posts.map((post) =>
            post.id === savedPost.id
              ? { ...post, saved: [...post.saved, userId] }
              : post
          )
        )
      : setPosts(
          posts.map((post) =>
            post.id === savedPost.id
              ? { ...post, saved: post.saved.filter((x) => x !== userId) }
              : post
          )
        );
  };

  useEffect(() => {
    setLoading(true);
  axios
    .get("http://127.0.0.1:8000/post_add")
    .then((res) => {
      setPosts(
        res.data.map((post) => {
          return { ...post, likes: [] ,saved:[], comments:[]};
        })
      );
      setLoading(false);
    })
  .catch((err) => console.log(err));
  }, []);

  const addComment = (id, comment) => {
    setPosts(
      posts.map((ele) => {
        if (ele.id === id) {
          return { ...ele, comments: [...ele.comments, comment] };
        } else {
          return ele;
        }
      })
    );
  };
  const logout = () => {
    localStorage.removeItem("blogger");
    setUser(null);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        handleLike,
        handleSave,
        setLoading,
        setPosts,
        addComment,
        logout,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export default PostContext;
