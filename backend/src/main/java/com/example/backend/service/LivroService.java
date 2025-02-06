package com.example.backend.service;

import com.example.backend.entity.Livro;
import com.example.backend.dto.LivroDTO;
import com.example.backend.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<LivroDTO> listarTodos() {
        List<Livro> livros = livroRepository.findAll();
        return livros.stream().map(LivroDTO::new).toList();
    }

    public void inserir(LivroDTO livro) {
        Livro livroEntity = new Livro(livro);
        livroRepository.save(livroEntity);
    }

    public LivroDTO alterar(LivroDTO livro) {
        Livro livroEntity = new Livro(livro);
        return new LivroDTO(livroRepository.save(livroEntity));
    }

    public void excluir(Long id) {
        Livro livro = livroRepository.findById(id).get();
        livroRepository.delete(livro);
    }

    public LivroDTO buscarPorId(Long id) {
        return new LivroDTO(livroRepository.findById(id).get());
    }
}
