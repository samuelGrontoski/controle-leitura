CREATE TABLE livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    num_paginas INT NOT NULL,
    ano_publicacao INT NOT NULL,
    capa_url TEXT NOT NULL
);