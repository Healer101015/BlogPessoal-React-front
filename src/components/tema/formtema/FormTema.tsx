import { useContext, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ClipLoader } from 'react-spinners';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormTema() {
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        if (token === '') return; // Trava de segurança

        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'info');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate('/temas');
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        if (token === '') return; // Trava de segurança

        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                ToastAlerta('Tema atualizado com sucesso', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Tema', 'erro');
                }
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                ToastAlerta('Tema cadastrado com sucesso', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o Tema', 'erro');
                }
            }
        }
        setIsLoading(false);
        retornar();
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name="descricao"
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                >
                    {isLoading ? <ClipLoader size={24} color="#FFF" /> : (id === undefined ? 'Cadastrar' : 'Atualizar')}
                </button>
            </form>
        </div>
    );
}

export default FormTema;