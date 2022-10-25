import { useFormik } from "formik";
import Joi from "joi";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpService from "../../services/httpservice";
import { toast } from "react-toastify";
const ResetPasswordConfirm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(params.token);
  });
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: function (value) {
      const schema = Joi.object({
        password: Joi.string().min(6).max(1024).required(),
        confirmPassword: Joi.string().min(6).max(1024).required(),
      });

      const { error } = schema.validate(value, { abortEarly: false });
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
      try {
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
          return setError("The passwords does not match");
        }
        console.log(values);
        const response = await httpService.put(
          `/resetPassword/confirmPassword/${token}`,
          values
        );
        const message = response.data.message;

        toast(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/home");
      } catch ({ response }) {
        setError(response.data.message);
      }
    },
  });
  return (
    <div className="container pb-5 min-vh-100 col-8">
      <div className="d-flex  justify-content-center align-items-center py-4">
        <div className="text-center page-header ">Reset Password</div>
      </div>

      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        ""
      )}

      <div className="d-flex justify-content-center main-form-page">
        <div className=" container form-container">
          <form
            className="p-4  text-center"
            noValidate
            onSubmit={form.handleSubmit}
          >
            <label htmlFor="password" className="label mb-2">
              New Password
            </label>
            <br />
            <input
              className="input mb-3"
              type="text"
              id="password"
              {...form.getFieldProps("password")}
              error={form.touched.password && form.errors.password}
            />
            <label htmlFor="confirmPassword" className="label mb-2">
              Confirm New Password
            </label>
            <br />
            <input
              className="input mb-3"
              type="text"
              id="confirmPassword"
              {...form.getFieldProps("confirmPassword")}
              error={
                form.touched.confirmPassword && form.errors.confirmPassword
              }
            />

            <div className="d-flex justify-content-center">
              <button className="btn btn-dark mt-3" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
