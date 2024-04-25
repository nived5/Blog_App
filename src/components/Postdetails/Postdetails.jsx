import { useContext, useEffect, useState } from "react";
import PostContext from "../../Context/PostContext";
import UserContext from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Postdetails() {
  const { id } = useParams();
  const [postDetails, setPost] = useState({});
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res => setPost(res.data).catch))
      .catch(err => console.log(err));
  },[id]);

  return (
    <div>
      <h2>{postDetails.title}</h2>
    </div>
  );
}

export default Postdetails;
