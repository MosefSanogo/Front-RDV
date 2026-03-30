import { createContext } from "react";
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}
export interface Service {
    id: string;
    nom: string;
    email: string;
    tel: string;
    description: string;
    adresse: string;
    image_url: string;
    category: string;
    ville: string;
}
interface AuthContextType {
    isAuth: boolean;
    login: (data: Service) => void;
    logout: () => void;
    user: Service | null;
    setUser: (service: Service | null) => void;
}
export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    login: ()=>{},
    logout: ()=>{},
    user: null,
    setUser: ()=>{},
});