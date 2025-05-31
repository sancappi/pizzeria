import React, {useState} from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import Car from "../features/car/Car";
import LoginCadastro from "./LoginCadastro";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const [modalCar, setModalCar] = useState<boolean>(false);
    const [modalLoginCadastro, setModalLoginCadastro] = useState<boolean>(false);
    const autenticado = useSelector((state: RootState) => state.aut.autenticado);
    const perfil = useSelector((state: RootState) => state.aut.perfil);
    const navegar = useNavigate();

    const alternarCar = () => {
        setModalCar(!modalCar);
    };

    const alternarLoginCadastro = () => {
        if (autenticado) {
            if (perfil === "cliente") {
                navegar("/perfil")
            } else {
                navegar("/gerir")
            }
        } else {
            setModalLoginCadastro(!modalLoginCadastro);
        }
    };

    return (
        <header className="z-20 sticky top-0 w-full md:min-h-16">
            <Desktop modalCar={alternarCar} modalLogin={alternarLoginCadastro}/>
            <Mobile modalCar={alternarCar} modalLogin={alternarLoginCadastro}/>
            {modalLoginCadastro && <LoginCadastro loginCadastro={alternarLoginCadastro}/>}
            {modalCar && <Car modalCar={alternarCar} modalLogin={alternarLoginCadastro}/>}
        </header>
    );
};

export default Header;