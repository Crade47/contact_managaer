
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useAuth } from "../hooks/auth";
import { UserData } from "../../types/types";
import { Navigate } from "react-router-dom";


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

  const LoadingComponent = () => {
    return (
      <>
          <div className="flex pt-9 justify-center ">

            <div className="flex animate-pulse space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            </div>
          </div>
        
      </>
    );
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-y-10">
        <div className="-mt-[7rem] text-center font-inter text-4xl font-semibold text-darkFont">
          Login
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xs flex-col justify-center gap-y-4 rounded-lg bg-slate-700 p-9 font-inter shadow-md backdrop-blur-3xl dark:text-white md:max-w-lg"
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
      </div>
    </>
  );
};
