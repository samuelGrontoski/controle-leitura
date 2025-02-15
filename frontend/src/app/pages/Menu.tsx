"use client";

import { MenuButton } from "../components/button_menu";
import { GiBookshelf } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

export function Menu() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="bg-foreground w-full h-20 text-background flex items-center justify-start gap-10">
        <div className="ml-8">
          <h1 className="text-xl font-bold">Sistema Gerenciador de Leituras</h1>
        </div>
        <div className="inline-flex items-center justify-center gap-2 content">
          <IoHome />
          <p>Menu</p>
        </div>
      </header>
      <main className="flex justify-center p-20 gap-8">
        <div className="grid grid-cols-2 gap-8">
          <MenuButton name={"Minha Estante"} link={"/minha_estante"} icon={GiBookshelf} />
          <MenuButton name={"Minhas Leituras"} link={"/minhas_leituras"} icon={GiSpellBook} />
        </div>
      </main>
      <footer className="absolute inset-x-0 bottom-0 h-20 flex items-center justify-center gap-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/samuelGrontoski/controle-leitura"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Repositório do Projeto
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/samuelGrontoski/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRegCopyright />
          Samuel Grontoski
        </a>
      </footer>
    </div>
  );
}
