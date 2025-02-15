package com.example.backend.controller;

import com.example.backend.dto.LeituraDTO;
import com.example.backend.service.LeituraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/minhas_leituras")
@CrossOrigin(origins = "http://localhost:3000")
public class LeituraController {

    @Autowired
    private LeituraService leituraService;

    @GetMapping
    public List<LeituraDTO> listarTodos() {
        return leituraService.listarTodos();
    }

    @PostMapping
    public void inserir(@RequestBody LeituraDTO leitura) {
        leituraService.inserir(leitura);
    }

    @PutMapping("/{id}")
    public LeituraDTO alterar(@PathVariable("id") Long id, @RequestBody LeituraDTO leitura) {
        leitura.setId(id);
        return leituraService.alterar(leitura);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        leituraService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
