import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { listar } from "../services/produto";
import { useDispatch } from "react-redux";
import { adicionarAoCar } from "../features/car/carSlice";
import { Item } from "../types";

const Pizzas: React.FC = () => {
    const [pizzas, setPizzas] = useState<Item[]>([]);
    const ativar = useDispatch();

    useEffect(() => {
        const carregar = async () => {
            const res = await listar("pizza");
            setPizzas(res);
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
                <h1 className="w-full text-center bg-red-700 p-4 text-white text-2xl">
                    Escolha uma de nossas pizzas
                </h1>
                <div className="font-sans text-sm w-[90%] sm:w-[70%] min-h-screen grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-4">
                    {pizzas.length === 0 ? (
                        <p className="col-span-full text-center text-xl sm:text-2xl">
                            Nenhuma pizza disponível no momento.
                        </p>
                    ) : (
                        pizzas.map((pizza) => (
                            <div key={pizza.id} className="shadow-xl p-2 rounded-md bg-white border-2 
                                border-gray-200 sm:h-80 ">
                                <img
                                    src={pizza.imagem}
                                    alt={pizza.descricao}
                                    className="w-full h-30 sm:h-40 object-cover rounded"
                                />
                                <div className="flex flex-col items-start">
                                    <p className="mt-2 text-center text-gray-400">
                                        {pizza.descricao}</p>
                                    <p className="text-center font-bold text-gray-600">
                                        R$ {pizza.preco.toFixed(2)}</p>
                                </div>
                                <div className=" w-full flex justify-end mt-4">
                                    <button onClick={() => adicionar(pizza)} className="cursor-pointer bg-red-600 
                                        text-white p-2 sm:p-3 rounded-md">
                                        <FontAwesomeIcon icon={faCartPlus} />
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

export default Pizzas;
