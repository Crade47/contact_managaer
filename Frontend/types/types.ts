import { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";

export interface UserData{
    username?:string,
    email:string,
    password:string
}

export interface UserContextValue {
    cookies: {
      token: string | undefined;
    },
    Login: (userData: UserData) => void,
    Logout: () => void,
    handleFormChange: (event: ChangeEvent<HTMLInputElement>, setFormData: React.Dispatch<React.SetStateAction<UserData>>) => void,
    errorState: string | null,
    isLoading: boolean,
    handleRegisterSubmit: (event: FormEvent, formData: UserData) => void,
    registerError: string | null
  };

export interface BaseContact{
  email:string,
  name: string,
  phone: string
}

export interface Contact extends BaseContact{

  createdAt:Date,
  updatedAt:Date,
  user_id:string,
  _id: string
}

export interface ContactWindowProps{
  isOpen: boolean,
  data: Contact,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  isEditDisabled: boolean,
  setIsEditDisabled:Dispatch<SetStateAction<boolean>>,
  handleContactChange: (event: ChangeEvent<HTMLInputElement>, setContactData: Dispatch<SetStateAction<Contact>>) => void,
  handleUpdateContact: (event: MouseEvent<HTMLButtonElement, MouseEvent>,contactData:Contact) => void,
  handleDeleteContact: (event:MouseEvent<HTMLButtonElement, MouseEvent>, contactData:Contact) => void,
}

export interface AddContactWindowProps{
  isAddWindowOpen: boolean,
  setIsAddWindowOpen:Dispatch<SetStateAction<boolean>>,
  handleAddContact: (event: FormEvent<HTMLFormElement>,contactData: BaseContact) => void;
}
