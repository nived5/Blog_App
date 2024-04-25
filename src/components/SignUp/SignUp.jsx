import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./signup.css";
import { toast } from "react-toastify";
import UserContext from "../../Context/UserContext";
import {v4 as idGenerator} from "uuid";

function SignUp() {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "username should contain atleast 3 charecters")
        .max(25, "username is too long")
        .required("username is required"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email")
        .required("email is required"),
      password: Yup.string()
        .min(8, "password should contain atleast ")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "password should contain Uppercase special characters and numbers"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "password mudt be same")
        .required("please confirm your password"),
    }),
    onSubmit: async (values) => {
      
        const users = JSON.parse( localStorage.getItem("users"))
        if(!users){
          localStorage.setItem("users",JSON.stringify([{id:idGenerator(),...values}]));
          setUser(values);
          toast.success("Successfully signed up")
          navigate("/")
        }else{
          const userWithEmail = users.findIndex(user=>user.email === values.email)
          if(userWithEmail === -1){
            localStorage.setItem("users",JSON.stringify([...users,{id:idGenerator(),...values}]));
            setUser(values);
            toast.success("successfully signed up")
            navigate("/")
          }
          else{
            toast.error("Email already taken",{position:"top-center"})
          }
        }
        console.log(values);
      
    },
  });
  return (
    <>
      <div className="wrapper">
        <div className="signup-wrapper">
          <h1>SignUp Page</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter user name"
                className="label"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <p>{formik.errors.username}</p>
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="label"
              />
              <p>{formik.errors.email}</p>
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter the password"
                className="label"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <p>{formik.errors.password}</p>
            </div>

            <div>
              <label>Confirm password</label>{" "}
              <input
                type="Password"
                placeholder="Re-enter the password"
                className="label"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <p>{formik.errors.confirmPassword}</p>
            </div>

            <div className="buttons">
              <div>
                <button className="button-style" type="submit">
                  SignUp
                </button>
              </div>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
