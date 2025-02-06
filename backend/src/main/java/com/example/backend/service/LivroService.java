package com.example.backend.service;

import com.example.backend.entity.Livro;
import com.example.backend.dto.LivroDTO;
import org.springframework.stereotype.Service;

@Service
public class LivroService {

    public Livro createLivro(LivroDTO data){
        Livro newLivro = new Livro();
        newLivro.setTitulo(data.titulo());
        newLivro.setAutor(data.autor());
        newLivro.setGenero(data.genero());
        newLivro.setNum_paginas(data.num_paginas());
        newLivro.setAno_publicacao(data.ano_publicacao());
        newLivro.setCapa_url(data.capa_url());

        return newLivro;
    }
}
