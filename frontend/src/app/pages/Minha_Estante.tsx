"use client";

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { IoHome } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

import { Projeto } from "../types/types";
import { LivroService } from '../service/LivroService';

const LivroCard = ({ livro, onClick }: { livro: Projeto.Livro; onClick: () => void }) => {
    return (
        <div
            className="flex flex-col items-center p-4 cursor-pointer hover:bg-gray-100 rounded-lg border-2 border-foreground transition-colors hover:shadow-lg hover:scale-110 duration-200"
            onClick={onClick}
        >
            <img src={livro.capa_url} alt={livro.titulo} className="w-32 h-48 object-cover rounded-md" />
            <h3 className="mt-2 text-center font-semibold">{livro.titulo}</h3>
        </div>
    );
};

export function Minha_Estante() {
    let livroVazio: Projeto.Livro = {
        id: 0,
        titulo: "",
        autor: "",
        genero: "",
        num_paginas: 0,
        ano_publicacao: 0,
        capa_url: ""
    };
    const [showNovoLivro, setShowNovoLivro] = useState(false);
    const [showDetalhesLivro, setShowDetalhesLivro] = useState(false);
    const [showEditarLivro, setShowEditarLivro] = useState(false);
    const [formDataEditar, setFormDataEditar] = useState<Projeto.Livro>(livroVazio);
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        genero: '',
        num_paginas: 0,
        ano_publicacao: 0,
        capa_url: '',
    });
    const [livros, setLivros] = useState<Projeto.Livro[]>([]);
    const [livroSelecionado, setLivroSelecionado] = useState<Projeto.Livro | null>(null);
    const livroService = new LivroService();

    // CRUD
    // Criar Livro
    const handleAbrirNovoLivro = () => {
        setShowNovoLivro(true);
    };

    const handleFecharNovoLivro = () => {
        setShowNovoLivro(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const novoLivro: Projeto.Livro = {
            titulo: formData.titulo,
            autor: formData.autor,
            genero: formData.genero,
            num_paginas: formData.num_paginas,
            ano_publicacao: formData.ano_publicacao,
            capa_url: formData.capa_url,
        };

        livroService.inserir(novoLivro)
            .then((response) => {
                setLivros([...livros, response.data]);
                setShowNovoLivro(false);
                setFormData(livroVazio);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Listar Livros
    useEffect(() => {
        livroService.listarTodos()
            .then((response) => {
                setLivros(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    // Abrir Detalhes do Livro
    const handleAbrirDetalhesLivro = (livro: Projeto.Livro) => {
        setLivroSelecionado(livro);
        setShowDetalhesLivro(true);
    };

    const handleFecharDetalhesLivro = () => {
        setShowDetalhesLivro(false);
    };

    // Editar Livro
    const handleAbrirEditarLivro = (livro: Projeto.Livro) => {
        setFormDataEditar(livro);
        setShowEditarLivro(true);
    };

    const handleFecharEditarLivro = () => {
        setShowEditarLivro(false);
    };

    const handleInputChangeEditar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataEditar({
            ...formDataEditar,
            [name]: value,
        });
    };

    const handleSubmitEditar = (e: React.FormEvent) => {
        e.preventDefault();

        livroService.alterar(formDataEditar)
            .then(() => {
                setLivros(livros.map(livro => livro.id === formDataEditar.id ? formDataEditar : livro));
                setShowEditarLivro(false);
                setShowDetalhesLivro(false);
            })
            .catch((error) => {
                console.log("Erro ao editar o livro:", error);
            });
    };

    // Excluir Livro
    const handleExcluirLivro = (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir este livro?");

        if (confirmacao) {
            livroService.excluir(id)
                .then(() => {
                    setLivros(livros.filter(livro => livro.id !== id));
                    setShowDetalhesLivro(false);
                })
                .catch((error) => {
                    console.log("Erro ao excluir o livro:", error);
                });
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
            <header className="bg-foreground w-full h-20 text-background flex items-center justify-start gap-10">
                <div className="ml-8">
                    <h1 className="text-xl font-bold text-background">Sistema Gerenciador de Leituras</h1>
                </div>
                <div className="inline-flex items-center justify-center gap-2 content">
                    <Link to={"/"} className="flex items-center gap-2">
                        <IoHome />
                        <p>Menu</p>
                    </Link>
                    <IoIosArrowForward />
                    <GiBookshelf />
                    <p>Minha Estante</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <button
                        onClick={handleAbrirNovoLivro}
                        className="mr-8 px-4 py-2 bg-aurora text-foreground rounded-md font-bold hover:shadow-lg hover:scale-110 duration-200"
                    >
                        Adicionar Livro
                    </button>
                </div>
            </header>
            <main className="flex p-20">
                <div className="grid grid-cols-8 gap-4 w-full">
                    {livros.map((livro) => (
                        <LivroCard
                            key={livro.id}
                            livro={livro}
                            onClick={() => handleAbrirDetalhesLivro(livro)}
                        />
                    ))}
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

            {showNovoLivro && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'start',
                        width: '400px',
                    }} className='text-background bg-foreground'>
                        <p className='font-bold text-gray-400 text-xl text-center my-4'>Adicionar novo livro</p>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='font-bold text-gray-400'>Título: </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='font-bold text-gray-400'>Autor: </label>
                                <input
                                    type="text"
                                    name="autor"
                                    value={formData.autor}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='font-bold text-gray-400'>Gênero: </label>
                                <input
                                    type="text"
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='font-bold text-gray-400'>Número de Páginas: </label>
                                <input
                                    type="number"
                                    name="num_paginas"
                                    value={formData.num_paginas}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='font-bold text-gray-400'>Ano de Publicação: </label>
                                <input
                                    type="number"
                                    name="ano_publicacao"
                                    value={formData.ano_publicacao}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='font-bold text-gray-400'>URL da Capa: </label>
                                <input
                                    type="url"
                                    name="capa_url"
                                    value={formData.capa_url}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" className='px-3 py-1 bg-blue-500 text-background rounded-md inline-flex items-center gap-1'>
                                    <FaRegSave />
                                    Salvar
                                </button>
                                <button type="button" onClick={handleFecharNovoLivro} className='px-3 py-1 bg-red-500 text-background rounded-md inline-flex items-center gap-1'>
                                    <MdOutlineCancel />
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDetalhesLivro && livroSelecionado && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'start',
                        width: '400px',
                    }} className='text-background bg-foreground'>
                        <div className='flex justify-end'>
                            <button
                                type="button"
                                onClick={handleFecharDetalhesLivro}
                                className='px-3 py-1 bg-aurora text-foreground font-bold rounded-md inline-flex items-center gap-1'
                            >
                                <IoMdClose />
                                Fechar
                            </button>
                        </div>
                        <p className='text-gray-400 font-bold text-xl text-center mt-2'>Detalhes do Livro</p>
                        <div className='my-3 flex justify-center'>
                            <img src={livroSelecionado.capa_url} alt={livroSelecionado.titulo} className="w-32 h-48 object-cover rounded-md" />
                        </div>
                        <div className='mb-3'>
                            <p className='text-center font-bold'>{livroSelecionado.titulo}</p>
                        </div>
                        <div className='mb-3'>
                            <label className='text-gray-400 font-bold'>Autor: </label>
                            <p>{livroSelecionado.autor}</p>
                        </div>
                        <div className='mb-3'>
                            <label className='text-gray-400 font-bold'>Gênero: </label>
                            <p>{livroSelecionado.genero}</p>
                        </div>
                        <div className='mb-3'>
                            <label className='text-gray-400 font-bold'>Número de Páginas: </label>
                            <p>{livroSelecionado.num_paginas}</p>
                        </div>
                        <div className='mb-3'>
                            <label className='text-gray-400 font-bold'>Ano de Publicação: </label>
                            <p>{livroSelecionado.ano_publicacao}</p>
                        </div>
                        <div className='flex justify-between'>
                            <button
                                type="button"
                                onClick={() => handleAbrirEditarLivro(livroSelecionado)}
                                className='px-3 py-1 bg-blue-500 text-foreground font-bold rounded-md inline-flex items-center gap-1'
                            >
                                <CiEdit />
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleExcluirLivro(livroSelecionado.id as number)}
                                className='px-3 py-1 bg-red-500 text-foreground font-bold rounded-md inline-flex items-center gap-1'
                            >
                                <FaRegTrashAlt />
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditarLivro && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'start',
                        width: '400px',
                    }} className='text-background bg-foreground'>
                        <p className='font-bold text-xl text-center'>Editar Livro</p>
                        <form onSubmit={handleSubmitEditar}>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Título: </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formDataEditar.titulo}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Autor: </label>
                                <input
                                    type="text"
                                    name="autor"
                                    value={formDataEditar.autor}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Gênero: </label>
                                <input
                                    type="text"
                                    name="genero"
                                    value={formDataEditar.genero}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Número de Páginas: </label>
                                <input
                                    type="number"
                                    name="num_paginas"
                                    value={formDataEditar.num_paginas}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Ano de Publicação: </label>
                                <input
                                    type="number"
                                    name="ano_publicacao"
                                    value={formDataEditar.ano_publicacao}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>URL da Capa: </label>
                                <input
                                    type="url"
                                    name="capa_url"
                                    value={formDataEditar.capa_url}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" className='px-3 py-1 bg-blue-500 text-background rounded-md inline-flex items-center gap-1'>
                                    <FaRegSave />
                                    Salvar
                                </button>
                                <button type="button" onClick={handleFecharEditarLivro} className='px-3 py-1 bg-red-500 text-background rounded-md inline-flex items-center gap-1'>
                                    <MdOutlineCancel />
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}