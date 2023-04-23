import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { AddContactWindowProps, BaseContact } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faUser,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

export const AddContactWindow = ({
  isAddWindowOpen,
  setIsAddWindowOpen,
}: AddContactWindowProps) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleContactChange = (
    event: ChangeEvent<HTMLInputElement>,
    setContactData: Dispatch<SetStateAction<BaseContact>>
  ) => {
    const { name, value }: HTMLInputElement = event.target;
    setContactData((prevContactData: BaseContact) => {
      return {
        ...prevContactData,
        [name]: value,
      };
    });
  };

  return (
    <>
      {/* background */}
      <div className="fixed bottom-0 left-0 right-0 top-0 h-screen w-screen bg-[rgb(0,0,0,0.7)] "></div>
      {/* main window */}
      <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-800 p-6">
        {/* close button */}
        <button onClick={() => setIsAddWindowOpen((prevState) => !prevState)}>
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-5 top-5 z-50 text-2xl text-white"
            data-tooltip-id="close-tooltip"
            data-tooltip-content="Close"
          />
          <Tooltip id="close-tooltip" />
        </button>

        {/* Add form */}
        <form onSubmit={() => console.log(contactData)}>
          {/* name */}
          <div className="mt-5 flex items-end  gap-5">
            <FontAwesomeIcon className="text-xl text-gray-500" icon={faUser} />
            <input
              type="text"
              className="border-b bg-transparent p-2 text-xl font-thin text-white outline-none"
              name="name"
              onChange={(event) => {
                handleContactChange(event, setContactData);
              }}
              placeholder="Name"
              required
              autoFocus
            />
          </div>

          {/* email */}
          <div className="mt-4 flex items-end  gap-5">
            <FontAwesomeIcon
              className="text-xl text-gray-500"
              icon={faEnvelope}
            />
            <input
              type="email"
              className="border-b bg-transparent p-2 text-xl font-thin text-white outline-none"
              name="email"
              onChange={(event) => {
                handleContactChange(event, setContactData);
              }}
              placeholder="Email"
              required
            />
          </div>

          {/* phone */}
          <div className="mt-4 flex items-end  gap-5">
            <FontAwesomeIcon className="text-xl text-gray-500" icon={faPhone} />
            <input
              type="text"
              className="border-b bg-transparent p-2 text-xl font-thin text-white outline-none"
              name="phone"
              onChange={(event) => {
                handleContactChange(event, setContactData);
              }}
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="mt-10 flex justify-center ">
            <button
              type="submit"
              className="mx-auto p-3 text-2xl text-white active:text-slate-500"
              data-tooltip-id="add-tooltip"
              data-tooltip-content="Add Contact"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="pl-3">Add</span>
              <Tooltip id="add-tooltip" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
