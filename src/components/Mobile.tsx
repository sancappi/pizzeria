import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faClose, faShoppingCart, faStore, faUser, faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Modal } from "./Desktop";
import { useDispatch } from "react-redux";
import { autFalse } from "../features/autenticacao/autSlice";
import { useNavigate } from "react-router-dom";
import { sair } from "../services/fluxo";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const Mobile: React.FC<Modal> = ({modalCar, modalLogin}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const links: string = "underline px-3 py-2 duration-500 ease-in-out hover:bg-red-700";
    const ativar = useDispatch();
    const navegar = useNavigate();
    const autenticado = useSelector((state: RootState) => state.aut.autenticado);

    const menuLateral = () => {
        setMenuOpen(!menuOpen);
    };

    const deslogar = async () => {
        const res = await sair();
        if (res) {
            ativar(autFalse());
            navegar("/");
        }
    };

    return (
        <div className="relative bg-[#982B1C] flex justify-between items-center md:hidden w-full max-h-16 text-xl sm:text-2xl">
            <div className="">
                <aside className={`absolute top-0 z-50 bg-[#800000] w-[40%] h-screen transform transition-transform
                    transition-opacity duration-500 ease-in-out ${
                        menuOpen? "translate-x-0 opacity-100": "-translate-x-full opacity-0"
                    }`}>
                    
                    <div className="flex justify-end items-center text-[#800000]">
                        <button className="rounded-full m-2 text-md flex hover: bg-white cursor-pointer" onClick={menuLateral}>
                            <FontAwesomeIcon className="py-1 px-2 " icon={faClose}/>
                        </button>
                    </div>
                    <div className="text-white w-full flex flex-col mt-10 gap-2">
                        <div className={links}>
                            <NavLink to="/">
                                Início
                            </NavLink>
                        </div>
                        <div className={links}>
                            <NavLink to="/pizzas">
                                Pizzas
                            </NavLink>
                        </div>
                        <div className={links}>
                            <NavLink to="/bebidas">
                                Bebidas
                            </NavLink>
                        </div>
                        <div className={links}>
                            <a href="#contato" onClick={menuLateral}>
                                Contato
                            </a>
                        </div>
                        <div className={links}>
                            <a href="#endereco" onClick={menuLateral}>
                                Nosso endereço
                                <FontAwesomeIcon className="px-2" icon={faStore}/>
                            </a>
                        </div>
                    </div>
                </aside>
                {!menuOpen && (
                    <div>
                        <button onClick={menuLateral}>
                            <FontAwesomeIcon icon={faBars} className="ml-2 m-1 bg-white px-3 py-3 rounded text-[#800000] text-xl cursor-pointer"/>
                        </button>
                    </div>
                )}
            </div>
            <div className="flex text-white text-2xl">
                <div className="px-3 py-3">
                    <button className="cursor-pointer" onClick={modalLogin}>
                        <FontAwesomeIcon icon={faUser}/>
                    </button>
                 </div>

                 <div className="px-3 py-3">
                    <button className="cursor-pointer" onClick={modalCar}>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </button>
                 </div>
                 {autenticado && (
                    <div className="px-3 py-3">
                    <button className="cursor-pointer" onClick={deslogar}>
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                    </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mobile;
