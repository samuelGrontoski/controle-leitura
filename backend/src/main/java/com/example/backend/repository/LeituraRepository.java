package com.example.backend.repository;

import com.example.backend.entity.Leitura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LeituraRepository extends JpaRepository<Leitura, UUID> {
}
