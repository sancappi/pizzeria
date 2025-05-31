import { API } from "./fluxo";
import { Item } from "../types";

export const adicionar = async (produto: FormData): Promise<number> => {
    try {
        const res = await fetch(`${API}/adicionar`, {
            credentials: "include",
            method: "POST",
            body: produto,
        });
        if (res.ok) return 1;
        throw new Error(res.statusText); 
    } catch(e) {
        console.error(e);
        return -1;
    }
};

export const buscar = async (item: {codigo: string, categoria: string}): Promise<any> => {
    try {
        const res = await fetch(`${API}/buscar/${item.codigo}`, {
            credentials: "include"
        });
        if (res.ok) {
            const dados = await res.json();
            return dados;
        }
        throw new Error(res.statusText);
    } catch(e) {
        console.error(e);
        return -1;
    }
};

export const listar = async (categoria: string): Promise<any> => {
    try {
        const res = await fetch(`${API}/listar/${categoria}`, {
            credentials: "include"
        });
        if (res.ok) {
            const dados = await res.json();
            return dados;
        }
        throw new Error(res.statusText);
    } catch(e) {
        console.error(e);
        return -1;
    }
};

export const listarDados = async (categoria: string): Promise<any> => {
    try {
        const res = await fetch(`${API}/listarDados`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({categoria}),
            headers: {"Content-Type": "application/json"}
        });
        if (res.ok) {
            const dados = await res.json();
            return dados;
        }
        throw new Error(res.statusText);
    } catch(e) {
        console.error(e);
        return -1;
    }
};

export const excluir = async (codigo: string): Promise<number> =>{
    try {
        const res = await fetch(`${API}/excluir/${codigo}`, {
            credentials: "include",
            method:"DELETE"
        });
        if (res.ok) return 1;
        throw new Error(res.statusText);
    } catch(e) {
        console.error(e);
        return -1;
    }
};

export const atualizar = async(dados: Item): Promise<number> => {
    try {
        const res = await fetch(`${API}/atualizar`, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify(dados),
            headers: {"Content-Type":"application/json"}
        });
        if (res.ok) {
            return 1;
        } 
        throw new Error(res.statusText);
    } catch(e) {
        console.error(e);
        return -1;
    }
};

