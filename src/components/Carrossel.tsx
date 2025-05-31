import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { listarDados } from "../services/produto";
import { NavLink } from "react-router-dom";
import { Item } from "../types";

const Carrossel: React.FC = () => {
    const [exibirPizza, setExibirPizza] = useState<number>(0);
    const [exibirBebida, setExibirBebida] = useState<number>(0);
    const [pizzas, setPizzas] = useState<Item[]>([]);
    const [bebidas, setBebidas] = useState<Item[]>([]);

    useEffect(() => {
        const carregar = async () => {
            const dadosPizzas = await listarDados("pizza");
            const dadosBebidas = await listarDados("bebida");
            if (dadosPizzas) setPizzas(dadosPizzas.slice(0, 10));
            if (dadosBebidas) setBebidas(dadosBebidas.slice(0, 10));
        };
        carregar();
    }, []);

    const proximo = (atual: number, setFunc: React.Dispatch<React.SetStateAction<number>>,
        array: Item[], visiveis: number = 4) => {
        if (atual < array.length - visiveis) setFunc(atual + 1);
        setFunc(0);
    };

    const anterior = (atual: number, setFunc: React.Dispatch<React.SetStateAction<number>>,
        array: Item[]) => {
        if (atual > 0) setFunc(atual - 1);
        setFunc(array.length - 4);
    };

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full relative p-4 flex flex-col justify-center items-center">
                <div className="w-[80%] text-3xl md:text-4xl font-bold text-red-800 flex justify-end items-center gap-8 p-2 rounded-2xl">
                    <h2 className="text-white md:text-red-800">Pizzas</h2>
                    <NavLink to="/pizzas" className="bg-white flex rounded-full">
                        <FontAwesomeIcon className="p-2" icon={faArrowRight} />
                    </NavLink>
                </div>
                {pizzas.length > 0 && (
                    <div className="absolute w-[91%] md:w-[900px] top-1/2 flex justify-between px-4 text-2xl text-green-800 sm:text-3xl">
                        <button
                            onClick={() => anterior(exibirPizza, setExibirPizza, pizzas)}
                            className="cursor-pointer bg-white rounded-md flex"
                        >
                            <FontAwesomeIcon className="p-2" icon={faArrowLeft} />
                        </button>
                        <button
                            onClick={() => proximo(exibirPizza, setExibirPizza, pizzas)}
                            className="cursor-pointer bg-white rounded-md flex"
                        >
                            <FontAwesomeIcon className="p-2" icon={faArrowRight} />
                        </button>
                    </div>
                )}

                <div className="w-full sm:w-[90%] flex gap-3 mt-4 justify-center items-center overflow-hidden font-sans text-sm">
                    {pizzas.length > 0
                        ? pizzas.slice(exibirPizza, exibirPizza + 4).map((pizza) => (
                              <div key={pizza.id}
                                  className="min-w-34 sm:w-44 sm:h-64 md:w-50 md:h-68 p-2 rounded bg-white"
                              >
                                  <div className="h-30 bg-gray-200">
                                      <img
                                          src={pizza.imagem}
                                          alt={pizza.descricao}
                                          className="w-full h-full object-cover"
                                      />
                                  </div>
                                  <div className="flex flex-col items-start mt-2">
                                        <p className="mt-2 text-center text-gray-400">
                                        {pizza.descricao}
                                    </p>
                                    <p className="text-center font-bold text-gray-600">
                                        R$ {pizza.preco.toFixed(2)}
                                    </p>
                                    </div>
                                    <div className=" w-full flex justify-end mt-4">
                                        <button className="cursor-pointer bg-red-600  text-white p-2 sm:p-3 rounded-md">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </button>
                                    </div>
                              </div>
                          )) : <p className="text-2xl sm:text-3xl"></p>}
                </div>
            </div>
            <div className="w-full text-center relative p-4 flex flex-col justify-center items-center">
                <div className="w-[80%] rounded-2xl text-3xl md:text-4xl font-bold text-red-800 flex items-center justify-end gap-8 p-2">
                    <h2 className="text-white md:text-red-800">Bebidas</h2>
                    <NavLink to="/bebidas" className="bg-white flex rounded-full">
                        <FontAwesomeIcon className="p-2" icon={faArrowRight} />
                    </NavLink>
                </div>
                {bebidas.length > 0 && (
                    <div className="absolute w-[91%] md:w-[900px] top-1/2 flex justify-between px-4 text-2xl text-green-800 sm:text-3xl">
                        <button
                            onClick={() => anterior(exibirBebida, setExibirBebida, bebidas)}
                            className="cursor-pointer bg-white rounded-md flex">
                            <FontAwesomeIcon className="p-2" icon={faArrowLeft} />
                        </button>
                        <button
                            onClick={() => proximo(exibirBebida, setExibirBebida, bebidas)}
                            className="cursor-pointer bg-white rounded-md flex">
                            <FontAwesomeIcon className="p-2" icon={faArrowRight} />
                        </button>
                    </div>
                )}

                <div className="w-full sm:w-[90%] flex gap-3 mt-4 justify-center items-center text-[0.8rem] overflow-hidden">
                    {bebidas.length > 0
                        ? bebidas.slice(exibirBebida, exibirBebida + 4).map((bebida) => (
                              <div key={bebida.id}
                                  className="min-w-34 sm:w-44 sm:h-64 md:w-50 md:h-68 p-2 rounded shadow bg-white font-sans text-sm">
                                  <div className="h-30 bg-gray-200">
                                      <img src={bebida.imagem} alt={bebida.descricao}
                                          className="w-full h-full object-cover "/>
                                  </div>
                                  <div className="flex flex-col items-start mt-2 ">
                                    <p className="mt-2 text-center text-gray-400">
                                        {bebida.descricao}
                                    </p>
                                    <p className="text-center font-bold text-gray-600">
                                        R$ {bebida.preco.toFixed(2)}
                                    </p>
                                    </div>
                                    <div className=" w-full flex justify-end mt-4">
                                        <button className="cursor-pointer bg-red-600 text-white p-2 sm:p-3 rounded-md">
                                            <FontAwesomeIcon icon={faCartPlus} />
                                        </button>
                                    </div>
                              </div>
                          ))
                        : <p className="text-2xl sm:text-3xl">Ainda não há bebidas disponíveis.</p>}
                </div>
            </div>
        </div>
    );
};

export default Carrossel;
