import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./blogs.css";
import SinglePost from "../singlepost/SinglePost";
import PageLoading from "../pageLoading/PageLoading";
import PostContext from "../../Context/PostContext";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import convertToBase64 from "../../utils/covertToBase64";
import { v4 as idGenerator } from "uuid";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// ReactModal.setAppElement('#yourAppElement');

function Blogs() {
  let subtitle;

  const { posts, setPosts } = useContext(PostContext);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [image64, setImage64] = useState(null);
  const [imageErr, setimageErr] = useState("");
  const [loading, setLoading] = useState(false);

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const getBase64Image = async (file) => {
    try {
      const base64 = await convertToBase64(file);
      setImage64(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: { title: "", description: "" },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "title is too long")
        .required("This field is required"),
      description: Yup.string()
        .min(100, "Too short")
        .max(1000, "Exceeding the limit")
        .required("This filed is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (image64) {
          await axios.post("http://127.0.0.1:8000/post_add", {
            _id: idGenerator(),
            title: values.title,
            description: values.description,
            image: image64,
          });
          setImage64(null);
          setIsOpen(false);
          formik.resetForm();
          setLoading(false);
          toast.success("post added", { position: "top-center" });
        } else {
          setimageErr("please add an image ");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/post_add")
      .then((res) => {
        setPosts(
          res.data.map((post) => {
            return { ...post, likes: [], saved: [], comments: [] };
          })
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [formik.handleSubmit]);

  return (
    <div className="post-wrapper">
      {loading ? (
        <PageLoading />
      ) : (
        posts.map((post) => <SinglePost post={post} key={post.id} />)
      )}
      <div className="add-icon" onClick={() => setIsOpen(true)}>
        <div className="icon">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div>
        <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <ReactModal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {user ? (
              <>
                <div className="modal-wrapper">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Post</h2>
                  <i class="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  <div className="title">
                    <label>Title</label>{" "}
                    <input
                      type="text"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />{" "}
                    <p>{formik.errors.title}</p>
                  </div>

                  <div className="description">
                    <label>Description</label>{" "}
                    <input
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    <p>{formik.errors.title}</p>{" "}
                  </div>

                  <div>
                    <img src={image64} alt="" className="image-size" />
                  </div>
                  <div>
                    <label>Add image</label>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => getBase64Image(e.target.files[0])}
                  ></input>
                  {loading ? (
                    <i className="fa-solid fa-spinner"></i>
                  ) : (
                    <button type="submit">Submit</button>
                  )}
                </form>
              </>
            ) : (
              <div>
                <h2 className="font">please Login</h2>
                <button className="button" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            )}
          </ReactModal>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
