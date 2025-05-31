import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-[#982B1C] h-80 md:h-100 static bottom-0 grid grid-rows-[0.6fr_2fr_0.8fr] text-white">
            <div className=" flex items-center justify-center text-2xl md:text-3xl">
                <div className="">
                    <a href="">
                        <FontAwesomeIcon icon={faFacebook} className="p-2"/>
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faInstagram} className="p-2"/>
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faTwitter} className="p-2"/>
                    </a>
                </div>
            </div>
            
            <div className="border-t flex text-sm sm:text-xl md:text-2xl">
                <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <div className="flex items-center md:justify-end">
                        <img src={logo} alt="" className="rounded-full w-26 h-26 border-2 "/>
                    </div>
                    <div className="flex flex-col justify-center ">
                        <p id="contato">Telefone: (00) 0000-0000 </p>
                        <p id="endereco">Endereço: R. das Flores - Flores, 12536-080</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center border-t">
                <div className= "text-xl sm:text-2xl flex flex-col gap-1 justify-center items-center">
                    <p className="">Todos os direitos reservados</p>
                    <p>@2025</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;