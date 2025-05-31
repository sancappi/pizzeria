import { configureStore } from "@reduxjs/toolkit";
import autReducer from "../features/autenticacao/autSlice";
import carReducer from "../features/car/carSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistirAut = persistReducer(persistConfig, autReducer);
const persistirCar = persistReducer(persistConfig, carReducer);

export const storePizzaria = configureStore({
  reducer: {
    aut: persistirAut,
    cr: persistirCar
  },
  
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"]
    }
  })
});

export const persistorValores = persistStore(storePizzaria);

export type RootState = ReturnType<typeof storePizzaria.getState>;
export type AppDispatch = typeof storePizzaria.dispatch;
