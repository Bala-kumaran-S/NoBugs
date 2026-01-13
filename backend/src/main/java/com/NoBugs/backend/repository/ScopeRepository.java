package com.NoBugs.backend.repository;

import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.entity.ScopeType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScopeRepository extends JpaRepository<Scope, Long> {

    List<Scope> findByOrganizationId(Long organizationId);

    List<Scope> findByType(ScopeType type);

    List<Scope> findByOrganization(Organization organization);
}
