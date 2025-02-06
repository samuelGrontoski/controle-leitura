package com.example.backend.service;

import com.example.backend.dto.LivroDTO;
import com.example.backend.entity.Leitura;
import com.example.backend.dto.LeituraDTO;
import com.example.backend.entity.Livro;
import com.example.backend.repository.LeituraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeituraService {

    @Autowired
    private LeituraRepository leituraRepository;

    public List<LeituraDTO> listarTodos() {
        List<Leitura> leituras = leituraRepository.findAll();
        return leituras.stream().map(LeituraDTO::new).toList();
    }

    public void inserir(LeituraDTO leitura) {
        Leitura leituraEntity = new Leitura(leitura);
        leituraRepository.save(leituraEntity);
    }

    public LeituraDTO alterar(LeituraDTO leitura) {
        Leitura leituraEntity = new Leitura(leitura);
        return new LeituraDTO(leituraRepository.save(leituraEntity));
    }

    public void excluir(Long id) {
        Leitura leitura = leituraRepository.findById(id).get();
        leituraRepository.delete(leitura);
    }

    public LeituraDTO buscarPorId(Long id) {
        return new LeituraDTO(leituraRepository.findById(id).get());
    }
}
