import { useAuth } from "../hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPhone,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Contact } from "../../types/types";
import { Tooltip } from "react-tooltip";
import { ContactWindow } from "../components/ContactWindow";
import { useState } from "react";

export const ContactsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDisabled, setIsEditDisabled] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact|null>(null)
  const { cookies, Logout } = useAuth();

  const windowOpen = (contact: Contact) => {
    setSelectedContact(contact)
    setIsOpen((prevState) => !prevState)
  };

  const fetchAllContacts = async () => {
    const response = await api
      .get("/api/contacts/", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
    return response;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchAllContacts,
  });

  const Header = () => {
    return (
      <div className="flex justify-between border-b border-gray-500 px-3 py-6">
        <div className="text-4xl font-light text-white">Contacts</div>
        <button className="text-2xl text-white" onClick={Logout}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-white hover:opacity-10"
          />
        </button>
      </div>
    );
  };

  const ContactList = ({ data }: { data: Contact[] }) => {
    if (isLoading) {
      return <div className="loader"></div>;
    }

    if (isError) {
      return (
        <div>
          <div className="text-center font-inter text-white">
            An error has occured. Try logging in again
          </div>
          <div className="mt-3 text-center font-inter text-white">
            {(error as any)?.message}
          </div>
        </div>
      );
    }
    return (
      <>
        {data?.map((contact: Contact) => {
          return (
            <>
              <div
                className="flex cursor-pointer items-center justify-between border-b border-gray-600 p-6"
                onClick={() => windowOpen(contact)}
                key={contact._id}
              >
                <div className="flex">
                  <div className="relative rounded-full bg-slate-500 p-8">
                    <span className="child font-inter">
                      {contact.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="p-4 text-xl text-white">{contact.name}</div>
                </div>
                <div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      alert(
                        "This is just example application. Maybe in the future I will add this feature haha"
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="cursor-pointer p-5 text-xl text-gray-400"
                      data-tooltip-id="call-tooltip"
                      data-tooltip-content="Call"
                    />
                    <Tooltip id="call-tooltip" />
                  </button>

                  <button>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="p-5 pr-0 text-xl text-gray-400"
                      data-tooltip-id="edit-tooltip"
                      data-tooltip-content="Edit"
                    />
                    <Tooltip id="edit-tooltip" />
                  </button>
                </div>
              </div>
              
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="mx-auto h-screen max-w-4xl border border-gray-700">
        <Header />
        <ContactList data={data?.data} />
        {
          (isOpen && selectedContact) &&
          <ContactWindow isOpen={isOpen} data={selectedContact} setIsOpen={setIsOpen} isEditDisabled={isEditDisabled} setIsEditDisabled={setIsEditDisabled}  />
        }
      </div>
    </>
  );
};
