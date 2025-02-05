package com.example.backend.repositories;

import com.example.backend.domain.leituras.Leitura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LeiturasRepository extends JpaRepository<Leitura, UUID> {
}
