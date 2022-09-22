import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
const Login = () => {
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: function (values) {
      const schema = Joi.object({
        username: Joi.string().min(2).max(255).required(),
        email: Joi.string()
          .min(6)
          .max(1024)
          .email({ tlds: { allow: false } })
          .required(),
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
    },
  });
  return (
    <div className="container">
   <div className="d-flex  justify-content-center py-4">
        <div className="text-center page-header ">Login</div>
      </div>
      <div className="d-flex justify-content-center">
        <div className=" container form-container">
          <form className="p-4" noValidate onSubmit={form.handleSubmit} >

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

            <button className="btn btn-dark mt-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
