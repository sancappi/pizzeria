import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, CarState } from "../../types";

const initialState: CarState = {
    car: [],
    contador: 0,
};

const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        adicionarAoCar(state, action: PayloadAction<Item>) {
            const produto = action.payload;
            const existe = state.car.find((p) => p.id === produto.id);
            if (!existe) {
                state.car.push(produto);
                state.contador += 1;
            }
        },
        
        removerProduto(state, action: PayloadAction<number>) {
            const id = action.payload;
            const novoCarrinho = state.car.filter((p) => p.id !== id);
            if (novoCarrinho.length !== state.car.length) {
                state.car = novoCarrinho;
                state.contador -= 1;
            }
        },

        limparCar(state) {
            state.car = [];
            state.contador = 0;
        },
    },
});

export const {adicionarAoCar, removerProduto, limparCar} = carSlice.actions;
export default carSlice.reducer;
