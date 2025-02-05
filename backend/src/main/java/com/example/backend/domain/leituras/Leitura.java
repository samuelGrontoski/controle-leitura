package com.example.backend.domain.leituras;

import com.example.backend.domain.livro.Livro;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Table(name = "leitura")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Leitura {
    @Id
    private UUID id;
    private Date data_inicio;
    private Date data_termino;
    private int pagina;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;
}
