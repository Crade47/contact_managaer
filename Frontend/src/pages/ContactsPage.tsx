import { useAuth } from "../hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faPhone,
  faCircleInfo,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Contact } from "../../types/types";
import { Tooltip } from 'react-tooltip'

export const ContactsPage = () => {
  const { cookies, Logout } = useAuth();
  const queryClient = useQueryClient();

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

  const ContactList = () => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["contacts"],
      queryFn: fetchAllContacts,
    });
    if (isLoading) {
      return <div className="loader"></div>;
    }

    if (isError) {
      return (
        <div>
          <div className="text-center font-inter text-white">
            An error has occured. Try logging in again
          </div>
          <div>{error?.message}</div>
        </div>
      );
    }
    return (
      <>
        {data?.data.map((contact: Contact) => {
          return (
            <>
              <div className="flex items-center justify-between border-b border-gray-600 p-6">
                <div className="flex">
                  <div className="relative rounded-full bg-slate-500 p-8">
                    <span className="child font-inter">
                      {contact.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="p-4 text-xl text-white">{contact.name}</div>
                </div>
                <div>
                  <button>
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="p-5 text-xl text-gray-400 cursor-pointer"
                      data-tooltip-id="call-tooltip" 
                      data-tooltip-content="Call"
                    />
                    <Tooltip id="call-tooltip"/>
                  </button>

                  <button >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="p-5 text-xl text-gray-400"
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
      <Header />
      <ContactList />
    </>
  );
};
