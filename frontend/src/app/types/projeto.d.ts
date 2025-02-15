declare namespace Projeto {
    type Livro = {
        id?: number;
        titulo: string;
        autor: string;
        genero: string;
        num_paginas: number;
        ano_publicacao: number;
        capa_url: string;
    }

    type Leitura = {
        id?: number;
        data_inicio: Date;
        data_termino: Date;
        pagina: number;
        livro: Livro;
    }
}