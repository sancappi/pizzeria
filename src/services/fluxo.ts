export const API = import.meta.env.VITE_APP_API; 
import { Entrar } from "../types";

export const entrar = async (dados: Entrar): Promise<any> => {
    try {
        const res = await fetch(`${API}/entrar`, {
            credentials: "include",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dados),
        });
        if (res.status === 404) {
            return 2;
        } else if (res.status === 409) {
            return -1
        } else if (res.ok) {
            const info = await res.json();
            return info.perfil;
        } else {
            throw new Error(res.statusText);
        }
    } catch(e) {
        console.error(e);
        return -1;
    }
};

export const sair = async (): Promise<number> => {
    try {
        const res = await fetch(`${API}/sair`, {
            credentials: "include"
        });
        if (res.ok) return 1;
        throw new Error(res.statusText);
    } catch (e) {
        console.error(e);
        return -1;
    }
};