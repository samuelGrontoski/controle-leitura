"use client";

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { IoHome } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

import { Projeto } from "../types/types";
import { LeituraService } from '../service/LeituraService';
import { LivroService } from '../service/LivroService';

const LeituraCard = ({ leitura, onClick }: { leitura: Projeto.Leitura; onClick: () => void }) => {
    if (!leitura.livro) {
        return null;
    }

    const totalPaginas = leitura.livro.num_paginas;
    const paginasLidas = leitura.pagina;
    const progresso = Math.floor((paginasLidas / totalPaginas) * 100);

    return (
        <div
            className="flex flex-col items-center p-4 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors border-2 border-foreground hover:shadow-lg hover:scale-110 duration-200 gap-2"
            onClick={onClick}
        >
            <h3 className="text-center font-semibold">{leitura.livro.titulo}</h3>
            <div className="mt-2 text-center w-full">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                        className="h-2.5 rounded-full"
                        style={{
                            width: `${progresso}%`,
                            backgroundColor: progresso === 100 ? '#10B981' : '#FBBF24',
                        }}
                    ></div>
                </div>
                <div className='flex justify-between'>
                    <p className={`text-sm font-semibold ${progresso === 100 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {progresso}%
                    </p>
                    <p className="text-sm text-gray-600">
                        {paginasLidas} de {totalPaginas}
                    </p>
                </div>
            </div>
            <p className="text-sm text-gray-600">Início: {new Date(leitura.data_inicio).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Término: {new Date(leitura.data_termino).toLocaleDateString()}</p>
        </div>
    );
};

export function Minhas_Leituras() {
    let leituraVazia: Projeto.Leitura = {
        data_inicio: new Date(),
        data_termino: new Date(),
        pagina: 0,
        livro: {
            id: 0,
            titulo: "",
            autor: "",
            genero: "",
            num_paginas: 0,
            ano_publicacao: 0,
            capa_url: "",
        },
    };

    const [showNovaLeitura, setShowNovaLeitura] = useState(false);
    const [showDetalhesLeitura, setShowDetalhesLeitura] = useState(false);
    const [showEditarLeitura, setShowEditarLeitura] = useState(false);
    const [formDataEditar, setFormDataEditar] = useState<Projeto.Leitura>({
        data_inicio: new Date(),
        data_termino: new Date(),
        pagina: 0,
        livro: {
            id: 0,
            titulo: "",
            autor: "",
            genero: "",
            num_paginas: 0,
            ano_publicacao: 0,
            capa_url: "",
        },
    });
    const [formData, setFormData] = useState<Projeto.Leitura>({
        data_inicio: new Date(),
        data_termino: new Date(),
        pagina: 0,
        livro: {
            id: 0,
            titulo: "",
            autor: "",
            genero: "",
            num_paginas: 0,
            ano_publicacao: 0,
            capa_url: "",
        },
    });
    const [leituras, setLeituras] = useState<Projeto.Leitura[]>([]);
    const [livros, setLivros] = useState<Projeto.Livro[]>([]);
    const [leituraSelecionada, setLeituraSelecionada] = useState<Projeto.Leitura | null>(null);
    const leituraService = new LeituraService();
    const livroService = new LivroService();

    // CRUD
    // Criar Leitura
    const handleAbrirNovaLeitura = () => {
        setShowNovaLeitura(true);
    };

    const handleFecharNovaLeitura = () => {
        setShowNovaLeitura(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "data_inicio" || name === "data_termino") {
            setFormData({
                ...formData,
                [name]: new Date(value),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleLivroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const livroId = parseInt(e.target.value);
        const livroSelecionado = livros.find(livro => livro.id === livroId);
        if (livroSelecionado) {
            setFormData({
                ...formData,
                livro: livroSelecionado,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.pagina > formData.livro.num_paginas) {
            alert("O número de páginas lidas não pode ser maior que o número total de páginas do livro.");
            return;
        }

        leituraService.inserir(formData)
            .then((response) => {
                setLeituras([...leituras, response.data]);
                setShowNovaLeitura(false);
                setFormData(leituraVazia);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Listar Leituras e Livros
    useEffect(() => {
        leituraService.listarTodos()
            .then((response) => {
                setLeituras(response.data);
            }).catch((error) => {
                console.log(error);
            });

        livroService.listarTodos()
            .then((response) => {
                setLivros(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    // Abrir Detalhes da Leitura
    const handleAbrirDetalhesLeitura = (leitura: Projeto.Leitura) => {
        setLeituraSelecionada(leitura);
        setShowDetalhesLeitura(true);
    };

    const handleFecharDetalhesLeitura = () => {
        setShowDetalhesLeitura(false);
    };

    // Editar Leitura
    const handleAbrirEditarLeitura = (leitura: Projeto.Leitura) => {
        setFormDataEditar({
            ...leitura,
            data_inicio: new Date(leitura.data_inicio),
            data_termino: new Date(leitura.data_termino),
        });
        setShowEditarLeitura(true);
    };

    const handleFecharEditarLeitura = () => {
        setShowEditarLeitura(false);
    };

    const handleInputChangeEditar = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "data_inicio" || name === "data_termino") {
            setFormDataEditar({
                ...formDataEditar,
                [name]: new Date(value),
            });
        } else {
            setFormDataEditar({
                ...formDataEditar,
                [name]: value,
            });
        }
    };

    const handleLivroChangeEditar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const livroId = parseInt(e.target.value);
        const livroSelecionado = livros.find(livro => livro.id === livroId);
        if (livroSelecionado) {
            setFormDataEditar({
                ...formDataEditar,
                livro: livroSelecionado,
            });
        }
    };

    const handleSubmitEditar = (e: React.FormEvent) => {
        e.preventDefault();

        if (formDataEditar.pagina > formDataEditar.livro.num_paginas) {
            alert("O número de páginas lidas não pode ser maior que o número total de páginas do livro.");
            return;
        }

        leituraService.alterar(formDataEditar)
            .then(() => {
                setLeituras(leituras.map(leitura => leitura.id === formDataEditar.id ? formDataEditar : leitura));
                setShowEditarLeitura(false);
                setShowDetalhesLeitura(false);
            })
            .catch((error) => {
                console.log("Erro ao editar a leitura:", error);
            });
    };

    // Excluir Leitura
    const handleExcluirLeitura = (id: number) => {
        const confirmacao = window.confirm("Tem certeza que deseja excluir esta leitura?");

        if (confirmacao) {
            leituraService.excluir(id)
                .then(() => {
                    setLeituras(leituras.filter(leitura => leitura.id !== id));
                    setShowDetalhesLeitura(false);
                })
                .catch((error) => {
                    console.log("Erro ao excluir a leitura:", error);
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
                        onClick={handleAbrirNovaLeitura}
                        className="mr-8 px-4 py-2 bg-aurora text-foreground rounded-md font-bold hover:shadow-lg hover:scale-110 duration-200"
                    >
                        Adicionar Leitura
                    </button>
                </div>
            </header>
            <main className="flex p-20">
                <div className="grid grid-cols-8 gap-4 w-full">
                    {leituras.map((leitura) => (
                        <LeituraCard
                            key={leitura.id}
                            leitura={leitura}
                            onClick={() => handleAbrirDetalhesLeitura(leitura)}
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

            {showNovaLeitura && (
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
                        <p className='text-gray-400 font-bold text-xl text-center'>Adicionar nova leitura</p>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Livro: </label>
                                <select
                                    name="livro"
                                    value={formData.livro.id}
                                    onChange={handleLivroChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                >
                                    <option value="">Selecione o livro</option>
                                    {livros.map((livro) => (
                                        <option key={livro.id} value={livro.id}>{livro.titulo}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Página: </label>
                                <input
                                    type="number"
                                    name="pagina"
                                    value={formData.pagina}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Data de Início: </label>
                                <input
                                    type="date"
                                    name="data_inicio"
                                    value={formData.data_inicio.toISOString().split('T')[0]}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Data de Término: </label>
                                <input
                                    type="date"
                                    name="data_termino"
                                    value={formData.data_termino.toISOString().split('T')[0]}
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
                                <button type="button" onClick={handleFecharNovaLeitura} className='px-3 py-1 bg-red-500 text-background rounded-md inline-flex items-center gap-1'>
                                    <MdOutlineCancel />
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDetalhesLeitura && leituraSelecionada && (
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
                                onClick={handleFecharDetalhesLeitura}
                                className='px-3 py-1 bg-aurora text-foreground font-bold rounded-md inline-flex items-center gap-1'
                            >
                                <MdOutlineCancel />
                                Fechar
                            </button>
                        </div>
                        <div className='my-3 flex justify-center'>
                            <img src={leituraSelecionada.livro.capa_url} alt={leituraSelecionada.livro.titulo} className="w-32 h-48 object-cover rounded-md" />
                        </div>
                        <p className='font-bold text-xl text-center mb-4'>{leituraSelecionada.livro.titulo}</p>
                        <div className="w-full">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div
                                    className="h-2.5 rounded-full"
                                    style={{
                                        width: `${Math.floor((leituraSelecionada.pagina / leituraSelecionada.livro.num_paginas) * 100)}%`,
                                        backgroundColor: Math.floor((leituraSelecionada.pagina / leituraSelecionada.livro.num_paginas) * 100) === 100 ? '#10B981' : '#FBBF24',
                                    }}
                                ></div>
                            </div>
                            <div className='flex justify-between mt-2'>
                                <p className={`text-sm font-semibold ${Math.floor((leituraSelecionada.pagina / leituraSelecionada.livro.num_paginas) * 100) === 100 ? 'text-green-500' : 'text-yellow-500'}`}>
                                    {Math.floor((leituraSelecionada.pagina / leituraSelecionada.livro.num_paginas) * 100)}%
                                </p>
                                <p className="text-sm text-gray-400 font-bold">
                                    {leituraSelecionada.pagina} de {leituraSelecionada.livro.num_paginas}
                                </p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className="text-sm text-gray-400 font-bold">Início: {new Date(leituraSelecionada.data_inicio).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-400 font-bold">Término: {new Date(leituraSelecionada.data_termino).toLocaleDateString()}</p>
                        </div>
                        <div className='flex justify-between mt-6'>
                            <button
                                type="button"
                                onClick={() => handleAbrirEditarLeitura(leituraSelecionada)}
                                className='px-3 py-1 bg-blue-500 text-foreground font-bold rounded-md inline-flex items-center gap-1'
                            >
                                <CiEdit />
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleExcluirLeitura(leituraSelecionada.id as number)}
                                className='px-3 py-1 bg-red-500 text-foreground font-bold rounded-md inline-flex items-center gap-1'
                            >
                                <FaRegTrashAlt />
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditarLeitura && (
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
                        <p className='text-gray-400 font-bold text-xl text-center'>Editar Leitura</p>
                        <form onSubmit={handleSubmitEditar}>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Livro: </label>
                                <select
                                    name="livro"
                                    value={formDataEditar.livro.id}
                                    onChange={handleLivroChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                >
                                    <option value="">Selecione um livro</option>
                                    {livros.map((livro) => (
                                        <option key={livro.id} value={livro.id}>{livro.titulo}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Página: </label>
                                <input
                                    type="number"
                                    name="pagina"
                                    value={formDataEditar.pagina}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Data de Início: </label>
                                <input
                                    type="date"
                                    name="data_inicio"
                                    value={formDataEditar.data_inicio.toISOString().split('T')[0]}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='text-gray-400 font-bold'>Data de Término: </label>
                                <input
                                    type="date"
                                    name="data_termino"
                                    value={formDataEditar.data_termino.toISOString().split('T')[0]}
                                    onChange={handleInputChangeEditar}
                                    required
                                    className='w-full p-1 border-2 border-gray-300 rounded-md text-foreground'
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" className='px-3 py-1 bg-blue-500 text-foreground font-bold rounded-md inline-flex items-center gap-1'>
                                    <FaRegSave />
                                    Salvar
                                </button>
                                <button type="button" onClick={handleFecharEditarLeitura} className='px-3 py-1 bg-red-500 text-foreground font-bold rounded-md inline-flex items-center gap-1'>
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