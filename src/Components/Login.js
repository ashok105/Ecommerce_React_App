import { Fragment } from "react";
import "../App.css";
import { useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import { object, string, number } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const logInFormValidation = object({
  email: string().email().required(),
  password: string().min(8).max(20).required(),
});

function Login() {

  const navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (value, key) => {
    setDetails({ ...details, [key]: value });
  };

  const submitHandler = () => {
    logInFormValidation
      .validate(details, { abortEarly: false })
      .then((res) => {
        //API CALL
        axios({
          url: "https://api.backendless.com/5297FB31-631D-42CA-FFA5-0DB47479DB00/D254504B-C041-4C9F-BAE9-958367DEA67A/users/login",
          method: "POST",
          data: {
            login: details.email,
            password: details.password,
          },
        })
          .then((res) => {
            if (res.status == "200") {
              let token = res.data["user-token"]
              localStorage.setItem('AuthToken',token);
              localStorage.setItem('username',res.data.name);
              navigate("/Products/Feed");
            }
          })
          .catch((err) => {
            toast.error(err.response.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      })
      .catch((err) => {
        err.inner.map((errMsg) => {
          toast.error(errMsg.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      });
  };

  return (
    <Fragment>
      <div className="Login-card" style={{ width: 500 }}>
        <div className="items">
          <h2>LogIn Here</h2>
          <p className="hint-text">
            LogIn your account. It's easy and only takes a minute.
          </p>
          <div className="container">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={details.email}
              onChange={(event) => {
                changeHandler(event.target.value, "email");
              }}
            />
            <input
              className="form-control mt-3"
              type="password"
              placeholder="Password"
              value={details.password}
              onChange={(event) => {
                changeHandler(event.target.value, "password");
              }}
            />
            <div>
              <button
                className="btn btn-success mt-3 Login-btn font-weight-bold"
                onClick={submitHandler}
              >
                LogIn Now
              </button>
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
            <p className="account-text mt-3">
              You don't have account? Create an account
              <a href="/SignUp">SignUp</a>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
