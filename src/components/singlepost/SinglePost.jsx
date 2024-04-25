import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./singlepost.css";
import PostContext from "../../Context/PostContext";
import UserContext from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

function SinglePost({ post }) {
  const [isShow, setIsShow] = useState(false);
  const { handleLike, handleSave } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const { addComment } = useContext(PostContext);
  const navigate = useNavigate();
  const [commentOption, setCommentOption] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="post-card">
      <h1>{post.title}</h1>
      <p className="text-wrapper">{post.description}</p>
      <img className="img-size" src={post.image} />

      <div className="icons">
        <i
          onClick={() => handleLike(user?.id, post)}
          className={`${
            post.likes.includes(user?.id)
              ? "fa-solid fa-thumbs-up like"
              : "fa-solid fa-thumbs-up"
          }`}
          title={post.likes.includes(user?.id) ? "dislike" : "like"}
        >
          {post.likes.length}
        </i>
        <i
          onClick={() => {
            setIsShow(!isShow);
            setCommentOption(!commentOption);
          }}
          className="fa-solid fa-message "
        ></i>
        <i
          onClick={() => handleSave(user?.id, post)}
          className={`${
            post.saved.includes(user?.id)
              ? "fa-solid fa-bookmark save"
              : "fa-solid fa-bookmark"
          }`}
        ></i>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {commentOption && (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => {
              addComment(post.id, { user: user.username, text: inputValue });
            }}
          >
            Add
          </button>
        </div>
      )}
      <hr />
      {isShow && (
        <div>
          {post?.comments.map((comment) => (
            <div>
              <h3>{comment.user}</h3>
              <p>{comment.text}</p>
              <hr />
            </div>
          ))}

          <span onClick={() => setIsShow(false)}>Show less</span>
        </div>
      )}
    </div>
  );
}

export default SinglePost;
