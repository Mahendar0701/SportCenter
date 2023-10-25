import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  // user_name: string;
  email: string;
  password: string;
  preferences?: {
    sports: string[]; // Assuming sports are represented as strings
    teams: string[]; // Assuming teams are represented as strings
  };
};

const SignupForm = () => {
  const [error] = useState(null);
  console.log(error);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password, preferences } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          // user_name,
          email,
          password,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      console.log("Sign-up successful");

      // After successful signup we have to redirect the user to the secured page. We will do that later.
      // extract the response body as JSON data
      const data = await response.json();
      // if successful, save the token in localStorage
      //   localStorage.setItem("authenticated", "true");
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("authenticated", "true");
      // return navigate("/dashboard");
      navigate("/");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Name:
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Enter User name..."
            autoFocus
            {...register("name", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          <input
            id="userEmail"
            type="text"
            placeholder="Enter email..."
            autoFocus
            {...register("email", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          <input
            id="userPassword"
            type="password"
            placeholder="Enter password..."
            autoFocus
            {...register("password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign up
        </button>
      </form>
      <div className="text-center mt-4">
        Have an account?{" "}
        <a
          href="/signin"
          id="signup-link"
          className="text-blue-500 hover:underline"
        >
          Sign In
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
