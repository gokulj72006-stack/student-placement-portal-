package com.portal.repository;

import com.portal.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByName(String name);
    List<Company> findByTier(String tier);
}
