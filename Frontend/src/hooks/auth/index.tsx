import { ChangeEvent, createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { UserContextValue, UserData } from '../../../types/types';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';



const UserContext = createContext<UserContextValue>({} as UserContextValue);

export const UserProvider = ({children}:{children:ReactNode}) =>{

    const [ cookies, setCookies, removeCookies ] = useCookies();
    const [errorState, setErrorState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const Login = async (data:UserData) => {
        try {
            setIsLoading(true)
            setErrorState(null)
            const res = await api.post('api/users/login',data)
            
            setCookies('token', res.data.token);
            navigate("/contacts")

        } catch (error: Error | AxiosError) {
            
            setErrorState(error?.response.data.message);
            
        } finally{
            setIsLoading(false)
        }
        
    }

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>, setFormData: React.Dispatch<React.SetStateAction<UserData>>) => {
        const { name, value }: HTMLInputElement = event.target;
        setFormData((prevFormData:UserData):UserData => {
          return {
            ...prevFormData,
            [name]: value,
          };
        });

      };
    

    const Logout = () =>{
        ['token'].forEach(obj => removeCookies(obj));
    }

    const value:UserContextValue = useMemo(
        ()=>({
            cookies:{token: cookies.token},
            Login,
            Logout,
            handleFormChange,
            errorState,
            isLoading,
        }),
        [cookies,errorState,isLoading]
    )

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext);