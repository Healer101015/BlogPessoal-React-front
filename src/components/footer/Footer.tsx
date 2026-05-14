import { useContext } from "react";
import type { ReactNode } from "react";
import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
    let data = new Date().getFullYear();
    const { usuario } = useContext(AuthContext);

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="flex justify-center bg-indigo-900 text-white" >
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Blog Pessoal João Brito | Copyright: {data}
                    </p>
                    <p className="text-lg">Acesse nossas Redes Sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer">
                            <LinkedinLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                            <InstagramLogoIcon size={48} weight='bold' />
                        </a>
                        <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                            <FacebookLogoIcon size={48} weight='bold' />
                        </a>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Footer;