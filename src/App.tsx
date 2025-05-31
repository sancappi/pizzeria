import React from 'react';
import {Routes, Route} from "react-router-dom";
import Inicio from './pages/Inicio';
import Bebidas from './pages/Bebidas';
import Pizzas from './pages/Pizzas';
import Gerenciar from './pages/gerente/Gerenciar';
import PerfilCliente from './pages/cliente/PerfilCliente';
import Checkout from '../../figma/Checkout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/bebidas" element={<Bebidas/>}/>
      <Route path="/pizzas" element={<Pizzas/>}/>
      <Route path="/gerir" element={<Gerenciar/>}/>
      <Route path='/perfil' element={<PerfilCliente/>}/>
      <Route path="/finalizar" element={<Checkout/>}/>
    </Routes>
  );
}

export default App;
