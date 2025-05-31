import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Autenticar } from "../../types";

const initialState: Autenticar = {
    autenticado: false,
    perfil: null
};

const autSlice  = createSlice({
    name: "autenticar",
    initialState,
    reducers: {
        autTrue: (estado, acao: PayloadAction<string>) => {
            estado.autenticado = true;
            estado.perfil = acao.payload;
        },
        autFalse: (estado) => {
            estado.autenticado = false;
            estado.perfil = null;
        }
    }
});

export const {autTrue, autFalse} = autSlice.actions;
export default autSlice.reducer;