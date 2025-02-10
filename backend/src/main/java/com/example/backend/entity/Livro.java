package com.example.backend.entity;

import com.example.backend.dto.LivroDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.Objects;

@Table(name = "livro")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "livro_seq")
    @SequenceGenerator(name = "livro_seq", sequenceName = "livro_seq", allocationSize = 1)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false)
    private String genero;

    @Column(nullable = false)
    private int num_paginas;

    @Column(nullable = false)
    private int ano_publicacao;

    @Column(nullable = false)
    private String capa_url;

    public Livro(LivroDTO livro) {
        BeanUtils.copyProperties(livro, this);
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Livro livro = (Livro) o;
        return Objects.equals(id, livro.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
