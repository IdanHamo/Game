import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      password: "",
    },
    validate: function (values) {
      const schema = Joi.object({
        username: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};

      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }

      return errors;
    },
    async onSubmit(values) {
      console.log(values);
      try {
        await login(values);

        toast("Logged in successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        navigate("/");
      } catch ({ response }) {
        setError(response.data.message);
      }
      console.log(values);
    },
  });
  return (
    <div className="container pb-5 min-vh-100">
      <div className="d-flex  justify-content-center align-items-center py-4">
        <div className="text-center page-header ">Login</div>
      </div>

      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        ""
      )}

      <div className="d-flex justify-content-center main-form-page">
        <div className=" container form-container">
          <div className="row">
            <form
              className="p-4 col-md-8"
              noValidate
              onSubmit={form.handleSubmit}
            >
              <label htmlFor="username" className="label mb-2">
                Username (required)
              </label>
              <br />
              <input
                className="input mb-3"
                type="text"
                id="username"
                {...form.getFieldProps("username")}
                error={form.touched.username && form.errors.email}
              />

              <label htmlFor="password" className="label mb-2">
                Password (required)
              </label>
              <br />
              <input
                className="input mb-3"
                type="password"
                id="password"
                {...form.getFieldProps("password")}
                error={form.touched.password && form.errors.password}
              />
              <div className="d-flex justify-content-center">
                <button className="btn btn-dark mt-3" type="submit">
                  Submit
                </button>
              </div>
              <div className="d-flex justify-content-around buttons my-4">
                <Link to="/registration">Registration</Link>
                <a href="#">Reset password</a>
              </div>
            </form>
            <div className="semi-login col-md-4 d-flex flex-column">
              <h3 className="semi-login-headline text-center my-4">
                Don't you have an account ?
              </h3>
              <div className="flex-fill  d-flex justify-content-center align-items-center mb-5">
                <Link
                  to="/registration"
                  className=" login-btn col-lg-5  col-md-8 col-sm-10 col-10 text-center  "
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{
  /* <form className="p-4" noValidate onSubmit={form.handleSubmit}>
  <label htmlFor="username" className="label mb-2">
    Username (required)
  </label>
  <br />
  <input
    className="input mb-3"
    type="text"
    id="username"
    {...form.getFieldProps("username")}
    error={form.touched.username && form.errors.email}
  />

  <label htmlFor="password" className="label mb-2">
    Password (required)
  </label>
  <br />
  <input
    className="input mb-3"
    type="password"
    id="password"
    {...form.getFieldProps("password")}
    error={form.touched.password && form.errors.password}
  />
  <div className="d-flex justify-content-center">
    <button className="btn btn-dark mt-3" type="submit">
      Submit
    </button>
  </div>
  <div className="d-flex justify-content-around buttons my-4">
    <Link to="/registration">Registration</Link>
    <a href="#">Reset password</a>
  </div>
</form>; */
}
