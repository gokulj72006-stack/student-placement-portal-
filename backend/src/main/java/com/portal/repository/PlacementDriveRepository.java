package com.portal.repository;

import com.portal.entity.Company;
import com.portal.entity.PlacementDrive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {
    List<PlacementDrive> findByStatus(String status);
    List<PlacementDrive> findByCompany(Company company);
    List<PlacementDrive> findByEligibilityCgpaLessThanEqual(Double cgpa);
}
