"use client";

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Minha_Estante } from "./pages/Minha_Estante";
import { Minhas_Leituras } from "./pages/Minhas_Leituras";

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/minha_estante" element={<Minha_Estante/>}/>
        <Route path="/minhas_leituras" element={<Minhas_Leituras/>}/>
      </Routes>
    </BrowserRouter>
  );
}
