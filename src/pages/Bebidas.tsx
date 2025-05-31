import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { listar } from "../services/produto";
import { Item } from "../types";
import { useDispatch } from "react-redux";
import { adicionarAoCar } from "../features/car/carSlice";

const Bebidas: React.FC = () => {
    const [bebidas, setBebidas] = useState<Item[]>([]);
    const ativar = useDispatch();

    useEffect(() => {
        const carregar = async () => {
            const res = await listar("bebida");
            setBebidas(res);
        };
        carregar();
    }, []);

    const adicionar = (item: Item) => {
        ativar(adicionarAoCar(item));
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center">
                <h1 className="w-full text-center bg-red-700 p-3 text-white text-2xl">
                    Escolha uma de nossas bebidas
                </h1>
                <div className="w-[90%] sm:w-[70%] min-h-screen grid grid-cols-2 md:grid-cols-4 gap-4 
                    font-sans text-sm mt-8 mb-4">
                    {bebidas.length === 0 ? (
                        <p className="col-span-full text-center text-xl sm:text-2xl">
                            Nenhuma bebida disponível no momento.
                        </p>
                    ) : (
                        bebidas.map((bebida) => (
                            <div key={bebida.id} className="shadow-xl p-2 rounded-md bg-white border-2 
                                border-gray-200 sm:h-80 ">
                                <img
                                    src={bebida.imagem}
                                    alt={bebida.descricao}
                                    className="w-full h-30 sm:h-40 object-cover rounded"
                                />
                                <div className="flex flex-col items-start">
                                    <p className="mt-2 text-center text-gray-400">
                                        {bebida.descricao}
                                    </p>
                                    <p className="text-center font-bold text-gray-600">
                                        R$ {bebida.preco.toFixed(2)}
                                    </p>
                                </div>
                                <div className=" w-full flex justify-end mt-4">
                                <button onClick={() => adicionar(bebida)} className="cursor-pointer bg-red-600  text-white p-2 sm:p-3 rounded-md">
                                    <FontAwesomeIcon icon={faCartPlus} className="" />
                                </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Bebidas;
