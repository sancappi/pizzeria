import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sair } from "../services/fluxo";
import { autFalse } from "../features/autenticacao/autSlice";
import { useDispatch } from "react-redux";

export interface Modal {
    modalCar: () => void;
    modalLogin: () => void;
}

const Desktop: React.FC<Modal> = ({modalCar, modalLogin}) => {
    const autenticado = useSelector((state: RootState) => state.aut.autenticado);
    const navegar = useNavigate();
    const ativar = useDispatch();

    const deslogar = async () => {
        const res = await sair();
        if (res) {
            ativar(autFalse());
            navegar("/");
        }
    };

    return (
        <div className="w-full h-16 flex justify-between hidden md:flex bg-red-800">
            <NavLink className="flex content-centr items-center ml-8" to="/">
                <img
                    className="mt-5 w-30 h-30 transition-transform cursor-pointer duration-600 ease-in-out hover:scale-125
                        hover:bg-white rounded-full border-2 border-white"
                    src={logo}
                    alt="Logo da pizzaria."/>
            </NavLink>

            <div className="flex content-center items-center w-[70%] mr-12 text-white sm:text-2xl md:text-2xl">
                <nav className="font-bold w-[70%] min-w-[460px] flex justify-between">
                    <NavLink className="duration-500 ease-in-out hover:bg-red-900 px-2 py-2 rounded" to="/">
                        Início
                    </NavLink>
                    <NavLink className="duration-500 ease-in-out hover:bg-red-900 px-2 py-2 rounded" to="/pizzas">
                        Pizzas
                    </NavLink>
                    <NavLink className="duration-500 ease-in-out hover:bg-red-900 px-2 py-2 rounded" to="/bebidas">
                        Bebidas
                    </NavLink>
                    <a href="#contato" className="duration-500 hover:bg-red-900 px-3 py-2 rounded">
                        Contato
                    </a>
                    <a href="#endereco" className="duration-500 hover:bg-red-900 px-3 py-2 rounded">
                        Nosso endereço
                    </a>
                </nav>

                <div className="absolute sm:right-6 lg:right-20 flex gap-2 text-xl">
                    <button className="px-2 py-2 rounded duration-500 ease-in-out hover:bg-red-900 cursor-pointer" 
                        onClick={modalLogin}>
                        <FontAwesomeIcon icon={faUser}/>
                    </button>
                    <button className="px-2 py-2 rounded duration-500 ease-in-out hover:bg-red-900 cursor-pointer" onClick={modalCar}>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </button>
                    {autenticado && (
                        <div className="px-3 py-3">
                            <button className="cursor-pointer" onClick={deslogar}>
                                <FontAwesomeIcon icon={faRightFromBracket}/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Desktop;