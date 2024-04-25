import React, { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import PostContext from "../../Context/PostContext";
import SinglePost from "../singlepost/SinglePost";
import "./profile.css";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostContext);
  const [likedPost] = useState(
    posts.filter((post) => post.likes.includes(user.id))
  );
  const [savedPost] = useState(
    posts.filter((post) => post.saved.includes(user.id))
  );

  return (
    <>
      <div className="post-wrapper1">
        <div className="post-card1">
          {likedPost.map((post) => (
            <div className="profile">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <Link to={`/post/${post.id}`} >Show more</Link>
            </div>
          ))}
        </div >
        <div className="post-card1">{savedPost.map((post) => (
          <div className="profile" >
            <h1>{post.title}</h1>
            <h3>{post.body}</h3>
          </div>
        ))}</div>
        
      </div>
    </>
  );
}

export default Profile;
