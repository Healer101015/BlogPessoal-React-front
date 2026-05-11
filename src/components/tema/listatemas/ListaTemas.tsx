import { useContext, useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import CardTema from '../cardtema/CardTema';

function ListaTemas() {
    const [temas, setTemas] = useState<Tema[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTemas() {
        // TRAVA DE SEGURANÇA: Só tenta buscar se tiver um token válido
        if (token === '') {
            return;
        }

        setIsLoading(true);
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error: any) {
            console.error("Erro ao buscar temas:", error);
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
    }, [temas.length]);

    return (
        <>
            {isLoading && (
                <SyncLoader color="#312e81" size={32} />
            )}
            {(!isLoading && temas.length === 0) && (
                <span className="text-3xl text-center my-8">
                    Nenhum Tema foi encontrado!
                </span>
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTemas;