
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/auth";
import { UserData } from "../../types/types";
import { LoadingComponent } from "../components/LoadingComponent";
import { Link } from "react-router-dom";


export const LoginPage = () => {
  const { Login, handleFormChange, errorState, isLoading} = useAuth();

  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await Login(formData);
  };


  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-y-10">
        <div className="-mt-[7rem] text-center font-inter text-4xl font-semibold text-darkFont">
          Login
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xs flex-col justify-center gap-y-4 rounded-lg p-9 font-inter  dark:text-white md:max-w-lg"
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
            type="password"
            name="password"
            id="password"
            className="border-b bg-transparent p-4"
            onChange={(event) => handleFormChange(event, setFormData)}
            placeholder="Password"
            required
          />

          {errorState && (
            <h5 className="mt-2 font-normal text-red-700">{errorState}</h5>
          )}

          {isLoading ? (
            <LoadingComponent />
          ) : (
            <button
              type="submit"
              className="mt-4 border px-4 py-2 font-inter text-xl font-light hover:bg-slate-100  active:bg-slate-600 dark:text-white dark:hover:text-gray-700 "
            >
              Login
            </button>
          )}
        </form>
        <div className="dark:text-white font-inter center text-sm">Dont have an account? <Link to="/register" className="text-darkFont font-bold">Register!</Link></div>
      </div>
    </>
  );
};

