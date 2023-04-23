import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuth } from "../hooks/auth";
import { UserData } from "../../types/types";
import { Link } from "react-router-dom";
export const RegisterPage = () => {
  const { handleFormChange, handleRegisterSubmit, registerError } = useAuth();

  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });

  

  

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-y-10">
        <div className="-mt-[7rem] text-center font-inter text-4xl font-semibold text-darkFont">
          Register
        </div>

        <form
          onSubmit={(e) => handleRegisterSubmit(e, formData)}
          className="mx-auto flex max-w-xs flex-col justify-center gap-y-4 rounded-lg p-9 font-inter shadow-md backdrop-blur-3xl dark:text-white md:max-w-lg"
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border-b bg-transparent p-4"
            onChange={(event) => handleFormChange(event, setFormData)}
            required
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="border-b bg-transparent p-4"
            onChange={(event) => handleFormChange(event, setFormData)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="border-b bg-transparent p-4"
            onChange={(event) => handleFormChange(event, setFormData)}
            placeholder="Password"
            required
          />
          <div className="text-red-600">
            {registerError ? <div>{registerError}</div> : <div></div>
            }
          </div>
          <button
            type="submit"
            className="mt-4 border px-4 py-2 font-inter text-xl font-light hover:bg-slate-100  active:bg-slate-600 dark:text-white dark:hover:text-gray-700 "
          >
            Register
          </button>
        </form>
        <div className="dark:text-white font-inter center text-sm">Already have an account? <Link to="/login" className="text-darkFont font-bold">Login!</Link></div>
      </div>
    </>
  );
};
