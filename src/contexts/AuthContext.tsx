import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";

interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    // 1. Tenta recuperar os dados do localStorage ao iniciar a aplicação
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        const usuarioArmazenado = localStorage.getItem('usuario');
        if (usuarioArmazenado) {
            return JSON.parse(usuarioArmazenado);
        }
        return {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        };
    });

    const [isLoading, setIsLoading] = useState(false);

    // 2. Sempre que o estado do 'usuario' mudar e tiver um token válido, guarda no localStorage
    useEffect(() => {
        if (usuario.token !== "") {
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }
    }, [usuario]);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario);
            alert("Usuário logado com sucesso");
        } catch (error) {
            alert("Dados do usuário inconsistentes!");
        }
        setIsLoading(false);
    }

    function handleLogout() {
        // 3. Limpa o localStorage ao fazer logout para garantir que não ficam dados residuais
        localStorage.removeItem('usuario');
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        });
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}