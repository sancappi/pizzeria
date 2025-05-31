import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removerProduto, limparCar } from "./carSlice";
import { useNavigate } from "react-router-dom";

interface mudarModalCar {
  modalCar: () => void;
  modalLogin: () => void;
}

const Car: React.FC<mudarModalCar> = ({ modalCar, modalLogin }) => {
  const estadoCar = useSelector((state: RootState) => state.cr.car);
  const perfil = useSelector((state: RootState) => state.aut.perfil);
  const [mensagem, setMensagem] = useState(""); 
  const ativar = useDispatch(); 
  const navigate = useNavigate(); 
  
  const removerItem = (id: any) => {
    ativar(removerProduto(id));
  };

  const limpar = () => {
    ativar(limparCar());
  };

  const concluir = () => {
    if (perfil === "cliente") {
      modalCar();
      navigate("/finalizar");
    } else if (perfil === "gerente") {
      setMensagem("Perfil não autorizado.");
    } else {
      modalCar();
      modalLogin();
    }
  };

  return (
    <div className="bg-gray-800/50 fixed inset-0 z-40 text-sm sm:text-md font-sans">
      <div className="p-2 w-50 h-100 sm:w-[300px] sm:h-[400px] bg-white absolute top-0 right-0 text-black shadow-lg flex flex-col">
        <div className="flex justify-end">
          <button onClick={modalCar} className="text-xl sm:text-2xl text-red-800 cursor-pointer">
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {estadoCar.length === 0 ? (
            <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            estadoCar.map((produto, i) => (
              <div className="mb-2 border-b pb-2" key={i}>

                <p className="font-semibold">{produto.nome}</p>
                <p>Valor: R$ {produto.preco.toFixed(2)}</p>

                <div className="w-20 flex justify-between bg-gray-100">
                  <button
                    onClick={() => removerItem(produto.id)}
                    className="text-red-800 hover:text-red-800 text-sm mt-1">
                    <FontAwesomeIcon icon={faMinus} className="mr-1" />
                  </button>
                  <p>1</p>
                  <button
                    onClick={() => removerItem(produto.id)}
                    className="text-red-800 hover:text-red-800 text-sm mt-1">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto border-t pt-2">
          <p className="font-bold">Total: R$ {estadoCar.reduce((a, i) => a + i.preco, 0).toFixed(2)}</p>
          <div className="flex flex-col gap-2">
            <button onClick={concluir}
              className="bg-green-800 text-white w-full py-1 mt-2 rounded hover:bg-green-900 cursor-pointer">
              Concluir 
            </button>
            <button onClick={limpar}
              className="bg-red-800 text-white w-full py-1 mb-2 rounded hover:bg-red-900 cursor-pointer">
              Limpar
            </button>
          </div>
          <p className="text-sm text-red-500 text-center">{mensagem}</p>
        </div>
      </div>
    </div>
  );
};

export default Car;
