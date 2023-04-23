import { Contact, ContactWindowProps } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPenToSquare,
  faXmark,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
export const ContactWindow = ({
  isOpen,
  data,
  setIsOpen,
  isEditDisabled,
  setIsEditDisabled,
  handleContactChange,
  handleUpdateContact,
  handleDeleteContact
}: ContactWindowProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [contactData, setContactData] = useState({
    ...data,
    name: data.name,
    email: data.email,
    phone: data.phone,
  });
  const handleEditButtonClick = () => {
    setIsEditDisabled((prevState) => !prevState);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleCloseButton = () => {
    setIsEditDisabled(true);
    setIsOpen((prevState) => !prevState);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      {/* background */}
      <div className="fixed bottom-0 left-0 right-0 top-0 h-screen w-screen bg-[rgb(0,0,0,0.7)] "></div>

      {/* main window */}
      <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-800 p-6">
        {/* close button  */}
        <button onClick={handleCloseButton}>
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-5 top-5 z-50 text-2xl text-white"
            data-tooltip-id="close-tooltip"
            data-tooltip-content="Close"
          />
          <Tooltip id="close-tooltip" />
        </button>
        {/* profile picture  */}
        <div className="relative mx-auto max-w-[2rem] rounded-full border bg-slate-500 p-12">
          <span className="child font-inter text-2xl font-semibold">
            {data.name[0].toUpperCase()}
          </span>
        </div>
        {/* name */}
        <div className="mt-6 flex  items-center">
          <input
            type="text"
            className="bg-transparent text-center text-3xl text-white "
            defaultValue={data.name}
            disabled={isEditDisabled}
            ref={inputRef}
            name="name"
            onChange={(event) => {
              handleContactChange(event, setContactData);
            }}
          />
          {/* edit or submit button */}
          {isEditDisabled ? (
            <button onClick={handleEditButtonClick}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="absolute bottom-1/2 right-5 top-[50%] mt-[21.5px] -translate-x-1/2 -translate-y-1/2 text-xl text-gray-500"
              />
            </button>
          ) : (
            <button
              type="submit"
              onClick={(event) => {
                setIsEditDisabled((prevState) => !prevState);
                handleUpdateContact(event, contactData);
              }}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className=" absolute bottom-1/2 right-5 top-[50%] mt-[21px] -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-500"
              />
            </button>
          )}
        </div>
        {/* email */}
        <div className="flex items-center gap-3 pt-9">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-xl text-gray-500"
          />
          <input
            type="email"
            className="bg-transparent text-lg font-light text-gray-400 outline-none"
            defaultValue={data.email}
            disabled={isEditDisabled}
            name="email"
            onChange={(event) => handleContactChange(event, setContactData)}
          />
        </div>
        {/* phone */}
        <div className="flex items-center gap-3 pt-4">
          <FontAwesomeIcon icon={faPhone} className="text-xl text-gray-500" />
          <input
            type="text"
            className="bg-transparent text-lg font-light text-gray-400  outline-none "
            defaultValue={data.phone}
            disabled={isEditDisabled}
            name="phone"
            onChange={(event) => handleContactChange(event, setContactData)}
          />
        </div>
        {/* delete button */}
        <div
          data-tooltip-id="delete-tooltip"
          data-tooltip-content="Delete"
          className="absolute bottom-8 right-8"
        >
          <button onClick={(event) => handleDeleteContact(event, contactData)}>
            <FontAwesomeIcon icon={faTrash} className="text-xl text-gray-500" />
          </button>
          <Tooltip id="delete-tooltip" />
        </div>
      </div>
    </>
  );
};
