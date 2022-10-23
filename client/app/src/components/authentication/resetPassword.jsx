import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import httpService from "../../services/httpservice";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
    },
    validate: function (values) {
      const schema = Joi.object({
        username: Joi.string().min(6).max(255).required(),
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
      try {
        console.log(error);
        await httpService.post("/resetPassword/", values);
        toast("check your email");
        navigate("/");
      } catch ({ response }) {
        console.log(response);
        setError(response.data);
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
            <label htmlFor="username" className="label mb-2">
              Username (required)
            </label>
            <br />
            <input
              className="input mb-3"
              type="text"
              id="username"
              {...form.getFieldProps("username")}
              error={form.touched.username && form.errors.username}
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

export default ResetPassword;
