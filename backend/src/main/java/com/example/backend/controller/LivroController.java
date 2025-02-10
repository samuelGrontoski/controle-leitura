package com.example.backend.controller;

import com.example.backend.dto.LivroDTO;
import com.example.backend.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/livro")
@CrossOrigin
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<LivroDTO> listarTodos() {
        return livroService.listarTodos();
    }

    @PostMapping
    public void inserir(@RequestBody LivroDTO livro) {
        livroService.inserir(livro);
    }

    @PutMapping
    public LivroDTO alterar(@RequestBody LivroDTO livro) {
        return livroService.alterar(livro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        livroService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
