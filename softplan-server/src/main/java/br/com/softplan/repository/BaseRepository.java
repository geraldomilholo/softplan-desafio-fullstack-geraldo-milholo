package br.com.softplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.softplan.model.BaseEntity;

@Repository
public interface BaseRepository<T extends BaseEntity> extends JpaRepository<T, String> {

}
