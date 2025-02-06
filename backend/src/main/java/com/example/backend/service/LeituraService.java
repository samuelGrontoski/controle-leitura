package com.example.backend.service;

import com.example.backend.entity.Leitura;
import com.example.backend.dto.LeituraDTO;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class LeituraService {

    public Leitura createLeitura(LeituraDTO data) {
        Leitura newLeitura = new Leitura();
        newLeitura.setData_inicio(new Date(data.data_inicio()));
        newLeitura.setData_termino(new Date(data.data_termino()));
        newLeitura.setPagina(data.pagina());

        return newLeitura;
    }
}
