package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "livro")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Livro {
    @Id
    @GeneratedValue
    private Long id;
    private String titulo;
    private String autor;
    private String genero;
    private int num_paginas;
    private int ano_publicacao;
    private String capa_url;
}
