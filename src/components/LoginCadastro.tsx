import React, {useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { useDispatch } from "react-redux";
import { autTrue } from "../features/autenticacao/autSlice";
import { entrar } from "../services/fluxo";
import { cadastrar } from "../services/cliente";
import { Cadastro, Entrar } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface FecharModal {
    loginCadastro: () => void;
}

const LoginCadastro: React.FC<FecharModal> = ({loginCadastro}) => {
    
    const [loginForm, setLoginForm] = useState(true);
    const ativar = useDispatch();
    const [mensagem, setMensagem] = useState({mensagem: "", estilo: ""});

    const { register: registerLogin, handleSubmit: login, reset: resetLogin, setValue: setValueLogin} = useForm<Entrar>();
    const {register: registerCadastro, handleSubmit: cadastro} = useForm<Cadastro>();

    const logar: SubmitHandler<Entrar> = async (dados) => {
        const perfil = await entrar(dados);

        if (perfil === "gerente" || perfil === "cliente") {
            ativar(autTrue(perfil));
            loginCadastro();
        } else if (perfil === 0) {
            setMensagem({mensagem: "Senha ou e-mail incorretos.", estilo: "text-red-400"});
            setValueLogin("email", "");
            setValueLogin("senha", "");
            setTimeout(() => {
                setMensagem({mensagem: "", estilo: ""});
            }, 3000);
        } else {
            setMensagem({mensagem: "Erro interno do servidor.", estilo: "text-red-400"})
            setValueLogin("email", "");
            setValueLogin("senha", "");
            setTimeout(() => {
                setMensagem({mensagem: "", estilo: ""});
            }, 3000);
        }
    };

    const cadastrarUsuario: SubmitHandler<Cadastro> = async (dados) => {
        const res = await cadastrar(dados);
        if (res === 0) {
            setMensagem({mensagem: "E-mail já cadastrado.", estilo: "text-red-400"});
        } else if (res === -1) {
            setMensagem({mensagem: "Erro interno do servidor.", estilo: "text-red-400"});       
        } else {
            setMensagem({mensagem: "sucesso!" , estilo: "text-green-400"});
        }
    };

    const alterarForm = () => {
        resetLogin();
        setLoginForm(!loginForm);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center text-xl sm:text-2xl">
            <div className="bg-white p-3 rounded-md w-[90%] max-w-[400px]">
                <div className="flex justify-end items-center mb-3">
                    <button onClick={loginCadastro} className="text-red-800 text-2xl cursor-pointer">
                        <FontAwesomeIcon icon={faClose}/>
                    </button>
                </div>

                {loginForm ? (
                    <div key="login">
                        <form onSubmit={login(logar)} className="h-full flex flex-col items-center justify-center" noValidate>
                            <div className="flex flex-col gap-4 w-[96%]">                            
                                <input type="text" placeholder="Seu e-mail" className="p-2 sm:p-3 rounded border-2 border-gray-300"
                                    {...registerLogin("email", {
                                        required: "Digite seu e-mail",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Formato de e-mail inválido."
                                        }
                                    })}/>

                                <input type="password" placeholder="Sua senha" className="p-2 sm:p-3 rounded border-2 border-gray-300"                            
                                    {...registerLogin("senha", {
                                        required: "Sua senha",
                                    })}/>
                            </div>
                            <div className={mensagem.estilo}>{mensagem.mensagem}</div>
                            <button type="submit" className="bg-red-800 w-[96%] text-white mt-6 p-1 sm:p-2 cursor-pointer
                                rounded-md">Entrar
                            </button>
                            <div className="mt-4 text-center">
                                <button onClick={alterarForm} className="text-blue-600 cursor-pointer">
                                    Não tem conta? Cadastre-se.
                                </button>
                            </div>
                        </form>
                    </div> ) : (
                        <div key="cadastro">
                        <form onSubmit={cadastro(cadastrarUsuario)} noValidate>
                            <div className="flex flex-col gap-4 w-[96%]">
                                    <input type="text" placeholder="Nome completo" className="p-2 sm:p-3 rounded border-2 border-gray-300"
                                        {...registerCadastro("nome",
                                        { required: "Digite seu nome completo" })}
                                    />
                    
                                    <input type="email" placeholder="E-mail" className="p-2 sm:p-3 rounded border-2 border-gray-300"
                                        {...registerCadastro("email", {
                                        required: "Digite seu e-mail",
                                        pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Formato de e-mail inválido"
                                        }
                                    })}/>
                    
                                    <input type="password" placeholder="Senha" className="p-2 sm:p-3 rounded border-2 border-gray-300"
                                        {...registerCadastro("senha", { 
                                        })}/>
                    
                                    <input type="password" placeholder="Confirme a senha" className="p-2 sm:p-3 rounded border-2 border-gray-300"
                                        {...registerCadastro("senhaConfirmar", 
                                            { required: "Confirme sua senha" })}/>
            
                                    <select {...registerCadastro("perfil")} className="hidden">
                                        <option value="cliente"></option>
                                    </select>
                            </div>
                            <div className={mensagem.estilo}>{mensagem.mensagem}</div>
                            <button type="submit" className="bg-red-800 w-[96%] text-white mt-6 p-1 sm:p-2 cursor-pointer
                                rounded-md">
                                Cadastrar
                            </button>
                            <div className="mt-4 text-center">
                                <button onClick={alterarForm} className="text-blue-600 cursor-pointer">
                                    Já tem uma conta? Faça login.
                                </button>
                            </div>
                      </form>
                      </div>
                    )}
            </div>
        </div>
    )
}


export default LoginCadastro;