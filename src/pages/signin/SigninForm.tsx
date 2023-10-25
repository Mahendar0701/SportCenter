// /* eslint-disable @typescript-eslint/no-unused-vars */
// // import React, { useState } from "react";
// // import { API_ENDPOINT } from "../../config/constants";
// // import { useNavigate } from "react-router-dom";

// // const SigninForm: React.FC = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   // Then we will define the handle submit function
// //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();

// //     try {
// //       const response = await fetch(`/${API_ENDPOINT}users/sign_in`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Sign-in failed");
// //       }

// //       console.log("Sign-in successful");

// //       // Extract the response body as JSON data
// //       const data = await response.json();
// //       console.log("data", data);

// //       // After successful signin, first we will save the token in localStorage
// //       localStorage.setItem("authToken", data.auth_token);
// //       localStorage.setItem("userData", JSON.stringify(data.user));
// //       // navigate("/dashboard");
// //       navigate("/account");

// //       // After successful signin we have to redirect the user to the secured page. We will do that later.
// //     } catch (error) {
// //       console.error("Sign-in failed:", error);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div>
// //         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
// //         <input
// //           type="email"
// //           name="email"
// //           id="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
// //         />
// //       </div>
// //       <div>
// //         <label className="block text-gray-700 font-semibold mb-2">
// //           Password:
// //         </label>
// //         <input
// //           type="password"
// //           name="password"
// //           id="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
// //         />
// //       </div>
// //       <button
// //         type="submit"
// //         className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
// //       >
// //         Sign In
// //       </button>
// //     </form>
// //   );
// // };

// // export default SigninForm;

// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// import { API_ENDPOINT } from "../../config/constants";
// import { useNavigate } from "react-router-dom";

// type Inputs = {
//   email: string;
//   password: string;
//   preferences?: {
//     sports: string[];
//     teams: string[];
//   };
// };

// const SigninForm = () => {
//   const [error] = useState(null);

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();

//   const onSubmit: SubmitHandler<Inputs> = async (data) => {
//     const { email, password } = data;
//     try {
//       const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, preferences: ["cricket"] }),
//       });

//       if (!response.ok) {
//         throw new Error("Sign-in failed");
//       }
//       // console.log("Sign-in successful",data);

//       const data = await response.json();
//       console.log("Sign-in successful", data);
//       // After successful signin, first we will save the token in localStorage
//       localStorage.setItem("authToken", data.auth_token);
//       localStorage.setItem("userData", JSON.stringify(data.user));
//       localStorage.setItem("authenticated", "true");
//       // return navigate("/dashboard");
//       navigate("/");
//       // window.location.reload();
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };
//   return (
//     // <form onSubmit={handleSubmit}>
//     <div>
//       <div>
//         <h1>Don't have an account </h1>
//         <a
//           href="/signup"
//           id="logout-link"
//           className="px-3 py-1 my-3 bg-red-200 hover:bg-red-300 rounded"
//           // onClick={logoutHandle}
//         >
//           Sign Up
//         </a>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           {error && <span>{error}</span>}
//           <label className="block text-gray-700 font-semibold mb-2">
//             Email:
//           </label>
//           {/* <input
//           type="email"
//           name="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         /> */}
//           <input
//             id="email"
//             type="text"
//             placeholder="Enter email..."
//             autoFocus
//             {...register("email", { required: true })}
//             className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
//               errors.email ? "border-red-500" : ""
//             }`}
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Password:
//           </label>
//           {/* <input
//           type="password"
//           name="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         /> */}
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter project name..."
//             autoFocus
//             {...register("password", { required: true })}
//             className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
//               errors.password ? "border-red-500" : ""
//             }`}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SigninForm;

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  preferences?: {
    sports: string[];
    teams: string[];
  };
};

const SigninForm = () => {
  const [error] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, preferences: ["cricket"] }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      const data = await response.json();
      console.log("Sign-in successful", data);

      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("authenticated", "true");

      navigate("/");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="bg-white p-6 w-full max-w-lg mx-auto rounded-md ">
      <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email:
          </label>
          <input
            id="email"
            type="text"
            placeholder="Enter email..."
            autoFocus
            {...register("email", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password..."
            autoFocus
            {...register("password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign In
        </button>
      </form>
      <div className="text-center mt-4">
        Don't have an account?{" "}
        <a
          href="/signup"
          id="signup-link"
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default SigninForm;
