import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { atualizarDados, editarCartao, cadastrarCartao, excluirCartao} from "../../services/cliente";
import { DadosCliente, DadosCartao } from "../../types";

const PerfilCliente: React.FC = () => {
    const [edicaoPerfil, setPerfil] = useState(false);
    const [edicaoCartao, setCartao] = useState(false);
    const [cartaoExiste, setCartaoExiste] = useState(false);
    const { register: registerCliente, handleSubmit: handleSubmitCliente,
        } = useForm<DadosCliente>();
    const {register: registerCartao, handleSubmit: handleSubmitCartao, reset: resetCartao,
        } = useForm<DadosCartao>();

    const perfil = async (dados: DadosCliente) => {
        const dadosPerfil = {
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            perfil: "cliente",
        };

        const res = await atualizarDados(dadosPerfil);
        if (res === 1) setPerfil(false);
    };

    const cartao = async (dados: DadosCartao) => {
        const res = cartaoExiste ? await editarCartao(dados)
            : await cadastrarCartao(dados);
        if (res === 1) {
            setCartao(false);
            setCartaoExiste(true);
        } else {
        }
    };

    const excluir = async () => {
        const res = await excluirCartao();
        if (res === 1) {
            resetCartao();
            setCartaoExiste(false);
            setCartao(false);
        }
    };

    return (
        <div className="h-screen">
            <Header />
            <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4 gap-4">
                <section className="bg-white p-6 rounded shadow w-full max-w-4xl space-y-4">
                    <form noValidate onSubmit={handleSubmitCliente(perfil)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                className="p-3 rounded border-2 border-gray-300 w-full"
                                {...registerCliente("email", { required: "Digite seu e-mail" })}
                            />
                            <input
                                type="text"
                                placeholder="Seu nome completo"
                                className="p-3 rounded border-2 border-gray-300 w-full"
                                {...registerCliente("nome", { required: "Digite seu nome" })}
                            />
                            <input
                                type="password"
                                placeholder="Sua senha"
                                className="p-3 rounded border-2 border-gray-300 w-full"
                                {...registerCliente("senha", { required: "Digite sua senha" })}
                            />
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                className="p-3 rounded border-2 border-gray-300 w-full"
                                {...registerCliente("senhaConfirmar", { required: "Confirme sua senha" })}
                            />
                        </div>
                        <div className="flex justify-center mt-4 w-full bg-red-800 rounded text-white cursor-pointer">
                            {edicaoPerfil ? (
                                <button type="submit" className="p-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faSave} />
                                    Salvar
                                </button>
                            ) : (
                                <button type="button" onClick={() => setPerfil(true)} className="p-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                    Editar
                                </button>
                            )}
                        </div>
                    </form>
                </section>
                <section className="bg-white p-6 rounded shadow w-full max-w-4xl space-y-4">
                    <form noValidate onSubmit={handleSubmitCartao(cartao)}>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Nome do titular"
                                className="p-3 border-2 border-gray-300 rounded w-full"
                                {...registerCartao("nomeTitular", { required: "Digite o nome do titular" })}
                            />
                            <div className="flex flex-wrap gap-4">
                                <input
                                    type="text"
                                    placeholder="CPF/CNPJ"
                                    className="rounded border-2 border-gray-300 w-48"
                                    {...registerCartao("cpfCnpj", { required: "Digite o CPF/CNPJ" })}
                                />
                                <input
                                    type="text"
                                    placeholder="Número do cartão"
                                    className="p-3 border-2 border-gray-300 rounded flex-1 min-w-[200px]"
                                    {...registerCartao("numero", { required: "Digite o número do cartão" })}
                                />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    className="p-3 border-2 border-gray-300 rounded w-24"
                                    {...registerCartao("cvv", { required: "Digite o CVV" })}
                                />
                                <input
                                    type="text"
                                    placeholder="Validade (MM/AA)"
                                    className="p-3 border-2 border-gray-300 rounded w-28"
                                    {...registerCartao("validade", { required: "Digite a validade" })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 w-full">
                            {edicaoCartao ? (
                                <>
                                    <button type="submit" className="p-3 bg-red-800 text-white rounded flex items-center gap-2">
                                        <FontAwesomeIcon icon={faSave} />
                                        Salvar
                                    </button>
                                    {cartaoExiste && (
                                        <button
                                            type="button"
                                            onClick={excluir}
                                            className="p-3 bg-gray-300 text-black rounded flex items-center gap-2">
                                            Excluir Cartão
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setCartao(true)}
                                    className="p-3 bg-red-800 text-white rounded flex items-center gap-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                    Editar
                                </button>
                            )}
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PerfilCliente;
