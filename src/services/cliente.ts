import { API } from "./fluxo";
import { Cadastro, Cartao } from "../types";

export const cadastrar = async (dados: Cadastro): Promise<number> => {
  try {
    const res = await fetch(`${API}/cadastrar`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(dados),
      headers: {"Content-type":"application/json"}
    });
    if (res.ok) {
      return 1;
    } else if (res.status === 409) {
      return 2;
    } else {
      throw new Error(res.statusText);
    }
  } catch(e) {
    console.error(e);
    return -1;
  }
};

export const deletar = async (): Promise<number> => {
  try {
    const res = await fetch(`${API}/deletar`, {
      credentials: "include",
    });
    if (res.ok) return 1; 
    throw new Error(res.statusText);
  } catch(e) {
    console.error(e);
    return -1;
  }
};

export const atualizarDados = async (dados: Cadastro): Promise<number> => {
  try {
    const res = await fetch(`${API}/atualizar`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(dados),
      headers: {"Content-Type":"application/json"}
    });
    if (res.ok) return 1;
    throw new Error(res.statusText);
  } catch(e) {
    console.error(e);
    return -1;
  }
};

export const cadastrarCartao = async (dados: Cartao): Promise<number> => {
  try {
    const res = await fetch(`${API}/cadastrar-cartao`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(dados),
      headers: {"Content-Type": "application/json"},
    });
    if (res.ok) return 1;
    throw new Error(res.statusText);
  } catch (e) {
    console.error(e);
    return -1;
  }
};

export const editarCartao = async (dados: Cartao): Promise<number> => {
  try {
    const res = await fetch(`${API}/editar-cartao`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(dados),
      headers: {"Content-Type": "application/json"},
    });
    if (res.ok) return 1;
    throw new Error(res.statusText);
  } catch (e) {
    console.error(e);
    return -1;
  }
};

export const excluirCartao = async (): Promise<number> => {
  try {
    const res = await fetch(`${API}/excluir-cartao`, {
      credentials: "include",
      method: "DELETE",
    });
    if (res.ok) return 1;
    throw new Error(res.statusText);
  } catch (e) {
    console.error(e);
    return -1;
  }
};
