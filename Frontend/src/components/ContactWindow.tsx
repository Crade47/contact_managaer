import { Contact, ContactWindowProps } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPenToSquare,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";
export const ContactWindow = ({
  isOpen,
  data,
  setIsOpen,
  isEditDisabled,
  setIsEditDisabled,
}: ContactWindowProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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


  const handleEditSubmit = () =>{
    setIsEditDisabled(prevState=>!prevState);

  }

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
        <button
          data-tooltip-id="close-tooltip"
          data-tooltip-content="Close"
          onClick={handleCloseButton}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-5 top-5 z-50 text-2xl text-white"
          />
        </button>
        <Tooltip />
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
            className="bg-transparent text-center text-3xl text-white outline-none"
            value={data.name}
            disabled={isEditDisabled}
            ref={inputRef}
          />
          {/* edit or submit button */}
          {isEditDisabled ? (
            <button onClick={handleEditButtonClick}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="absolute mt-[21.5px] top-[50%] bottom-1/2 -translate-x-1/2 -translate-y-1/2 right-5 text-xl text-gray-500"
              />
            </button>
          ) : (
            <button type="submit" onClick={handleEditButtonClick}>
              <FontAwesomeIcon
                icon={faCheck}
                className=" absolute mt-[21px] top-[50%] bottom-1/2 -translate-x-1/2 -translate-y-1/2 right-5 text-2xl text-gray-500"
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
            value={data.email}
            disabled={isEditDisabled}
          />
        </div>
        {/* phone */}
        <div className="flex items-center gap-3 pt-4">
          <FontAwesomeIcon icon={faPhone} className="text-xl text-gray-500" />
          <input
            type="text"
            className="bg-transparent text-lg font-light text-gray-400  outline-none "
            value={data.phone}
            disabled={isEditDisabled}
          />
        </div>
      </div>
    </>
  );
};
