package com.example.backend.dto;

import com.example.backend.entity.Leitura;
import com.example.backend.entity.Livro;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LeituraDTO {

    private Long id;
    private Date data_inicio;
    private Date data_termino;
    private int pagina;
    private Livro livro;

    public LeituraDTO(Leitura leitura) {
        BeanUtils.copyProperties(leitura, this);
    }
}
