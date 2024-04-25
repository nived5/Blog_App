import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import UserContext from "../../Context/UserContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email")
        .required("email is required"),
      password: Yup.string().min(8, "Enter correct password "),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users"));

      if (users) {
        console.log(users)
        const user = users.find((user) => user.email === values.email);
        
        if (user) {
          if (user.password === values.password) {
            setUser(user);
            localStorage.setItem("blogger",JSON.stringify(user))
            toast.success("Successfully loggedin");
            navigate("/");
          } else {
            toast.error("Incorrect password", { position: "top-center" });
          }
        } else {
          toast.error("user not found please sign up", {
            position: "top-center",
          });
        }
      } else {
        toast.error("user not found please sign up", {
          position: "top-center",
        });
      }

     
    },
  });
  return (
    <>
      <div className="log-wrapper">
        <div className="login-wrapper">
          <h1>Login here</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Email</label>{" "}
            </div>
            <input
              type="text"
              className="label"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.email}</p>
            <div>
              <label>Password</label>
            </div>
            <input
              type="password"
              className="label"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.password}</p>

            <div className="buttons">
              <div>
                <button className="button-style1" type="submit">
                  Login
                </button>
              </div>
            </div>

            <h4>Do you have an account?</h4>
            <Link to="/signup">Sign up</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
