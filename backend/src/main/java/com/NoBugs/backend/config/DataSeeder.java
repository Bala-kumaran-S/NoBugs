package com.NoBugs.backend.config;

import com.NoBugs.backend.entity.*;
import com.NoBugs.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
@Profile("seed")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final OrganizationRepository orgRepo;
    private final ScopeRepository scopeRepo;
    private final BugReportRepository bugRepo;
    private final PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    @Override
    public void run(String... args) {

        System.out.println("Seeding realistic demo data...");

        User admin = createUser(
                "platform_admin",
                "admin@nobugs-platform.com",
                "admin123",
                Role.ADMIN
        );

        List<User> researchers = List.of(
                createUser("alice", "alice@researcher.com", "test123", Role.RESEARCHER),
                createUser("bob", "bob@researcher.com", "test123", Role.RESEARCHER),
                createUser("charlie", "charlie@researcher.com", "test123", Role.RESEARCHER),
                createUser("david", "david@researcher.com", "test123", Role.RESEARCHER)
        );

        List<String> orgNames = List.of(
                "NovaStack Technologies",
                "BlueOrbit Systems",
                "AstraCore Labs",
                "CloudNest Solutions",
                "VertexOne Software",
                "IronGate Security",
                "ZenithSoft Pvt Ltd",
                "Nimbus Digital Services"
        );

        for (String orgName : orgNames) {

            User orgUser = createUser(
                    orgName.toLowerCase().replace(" ", "") + "@org.com",
                    "security@" + domainify(orgName),
                    "org123",
                    Role.ORGANIZATION
            );

            Organization org = new Organization();
            org.setName(orgName);
            org.setDescription(orgName + " public bug bounty program");
            org.setContactEmail("security@" + domainify(orgName));
            org.setRegisteredBy(orgUser);
            org.setRegisteredByEmail(orgUser.getEmail());
            org.setPublic(true);
            org.setIsApproved(true);

            org = orgRepo.save(org);

            int scopeCount = randBetween(2, 5);

            for (int i = 0; i < scopeCount; i++) {

                Scope scope = new Scope();
                scope.setOrganization(org);
                scope.setTitle(realisticScopeTitle(i));
                scope.setTargetUrl(realisticDomain(orgName, i));
                scope.setDescription("Production asset under bug bounty scope");
                scope.setInScopeRules("Web, API, auth related vulnerabilities");
                scope.setOutOfScopeRules("DoS, social engineering, physical attacks");
                scope.setType(ScopeType.PUBLIC);

                scope = scopeRepo.save(scope);

                int bugCount = randBetween(3, 6);

                for (int b = 0; b < bugCount; b++) {
                    createBug(scope, researchers.get(random.nextInt(researchers.size())));
                }
            }
        }

        System.out.println("Demo data seeding completed.");
    }

    private User createUser(String username, String email, String password, Role role) {
        User u = new User();
        u.setUsername(username);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(password));
        u.setRole(role);
        u.setReputationPoints(0);
        return userRepo.save(u);
    }

    private void createBug(Scope scope, User reporter) {

        BugReport bug = new BugReport();
        bug.setScope(scope);
        bug.setReporter(reporter);
        bug.setTitle(randomBugTitle());
        bug.setDescription("Security vulnerability identified during testing.");
        bug.setReporterSeverity(randomSeverity());
        bug.setStepsToReproduce(
                "1. Access the endpoint\n" +
                "2. Inject crafted payload\n" +
                "3. Observe unexpected behavior"
        );
        bug.setStatus(randomStatus());
        bug.setSubmittedAt(
                LocalDateTime.now().minusDays(randBetween(1, 45))
        );

        bugRepo.save(bug);
    }

    private String randomBugTitle() {
        String[] titles = {
                "Reflected XSS in search endpoint",
                "IDOR in user profile API",
                "Broken access control in admin panel",
                "JWT token reuse vulnerability",
                "Missing rate limiting on login",
                "File upload validation bypass",
                "Open redirect in OAuth flow"
        };
        return titles[random.nextInt(titles.length)];
    }

    private Severity randomSeverity() {
        Severity[] values = Severity.values();
        return values[random.nextInt(values.length)];
    }

    private BugStatus randomStatus() {
        BugStatus[] statuses = {
                BugStatus.SUBMITTED,
                BugStatus.IN_REVIEW,
                BugStatus.ACCEPTED,
                BugStatus.DUPLICATE,
                BugStatus.INFORMATIONAL
        };
        return statuses[random.nextInt(statuses.length)];
    }

    private int randBetween(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    private String domainify(String orgName) {
        return orgName.toLowerCase().replace(" ", "").replace("pvtltd", "") + ".com";
    }

    private String realisticScopeTitle(int index) {
        return switch (index) {
            case 0 -> "Main Web Application";
            case 1 -> "Public REST API";
            case 2 -> "Authentication Service";
            case 3 -> "Admin Dashboard";
            default -> "Mobile Backend";
        };
    }

    private String realisticDomain(String orgName, int index) {
        String base = domainify(orgName);
        return switch (index) {
            case 0 -> "https://www." + base;
            case 1 -> "https://api." + base;
            case 2 -> "https://auth." + base;
            case 3 -> "https://admin." + base;
            default -> "https://mobile." + base;
        };
    }
}
