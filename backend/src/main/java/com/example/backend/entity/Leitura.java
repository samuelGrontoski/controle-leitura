package com.example.backend.entity;

import com.example.backend.dto.LeituraDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Table(name = "leitura")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Leitura {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private Date data_inicio;

    @Column(nullable = false)
    private Date data_termino;

    @Column(nullable = false)
    private int pagina;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    public Leitura(LeituraDTO leitura) {
        BeanUtils.copyProperties(leitura, this);
    }
}
