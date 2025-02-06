package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "leitura")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Leitura {
    @Id
    @GeneratedValue
    private Long id;
    private Date data_inicio;
    private Date data_termino;
    private int pagina;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;
}
