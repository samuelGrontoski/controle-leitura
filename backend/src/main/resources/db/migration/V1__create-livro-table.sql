CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE livro (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    num_paginas INT NOT NULL,
    ano_publicacao INT NOT NULL,
    capa_url VARCHAR(250) NOT NULL
);