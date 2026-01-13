package com.NoBugs.backend.config;

import com.NoBugs.backend.entity.*;
import com.NoBugs.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final OrganizationRepository orgRepo;
    private final ScopeRepository scopeRepo;
    private final BugReportRepository bugRepo;
    private final PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    public DataSeeder(UserRepository userRepo,
                      OrganizationRepository orgRepo,
                      ScopeRepository scopeRepo,
                      BugReportRepository bugRepo,
                      PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.orgRepo = orgRepo;
        this.scopeRepo = scopeRepo;
        this.bugRepo = bugRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if(1 == 1) return;

        System.out.println("Seeding database...");
        
        User r1 = getOrCreateUser("alice", "alice@test.com", "test123", Role.RESEARCHER);
        User r2 = getOrCreateUser("bob", "bob@test.com", "test123", Role.RESEARCHER);
        User r3 = getOrCreateUser("charlie", "charlie@test.com", "test123", Role.RESEARCHER);

        List<User> researchers = List.of(r1, r2, r3);

        
        if (orgRepo.count() == 0) {

            for (int orgIndex = 1; orgIndex <= 5; orgIndex++) {

                User orgUser = getOrCreateUser(
                        "org" + orgIndex,
                        "org" + orgIndex + "@nobugs.com",
                        "org123",
                        Role.ORGANIZATION
                );

                Organization org = new Organization();
                org.setName("Organization " + orgIndex);
                org.setDescription("Demo organization " + orgIndex);
                org.setContactEmail("security@org" + orgIndex + ".com");
                org.setRegisteredBy(orgUser);
                org.setRegisteredByEmail(orgUser.getEmail());
                org.setPublic(true);
                org.setIsApproved(true);

                org = orgRepo.save(org);

                int scopeCount = randBetween(2, 4);

                for (int s = 1; s <= scopeCount; s++) {

                    Scope scope = new Scope();
                    scope.setOrganization(org);
                    scope.setTitle("Scope " + s + " of Org " + orgIndex);
                    scope.setTargetUrl("https://app" + s + ".org" + orgIndex + ".com");
                    scope.setDescription("Bug bounty scope");
                    scope.setInScopeRules("All subdomains allowed");
                    scope.setOutOfScopeRules("DoS, physical attacks");
                    scope.setType(ScopeType.PUBLIC);

                    scope = scopeRepo.save(scope);

                    int bugCount = randBetween(10, 20);

                    for (int b = 0; b < bugCount; b++) {
                        createBug(scope, researchers.get(random.nextInt(researchers.size())));
                    }
                }
            }

            System.out.println("Organizations, scopes and bugs seeded.");
        } else {
            System.out.println("Organizations already exist. Skipping org/scope/bug seeding.");
        }

        System.out.println("Seeding finished.");
    }

    private User getOrCreateUser(String username, String email, String password, Role role) {

        return userRepo.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setUsername(username);
            u.setEmail(email);
            u.setPassword(passwordEncoder.encode(password));
            u.setRole(role);
            u.setReputationPoints(0);
            return userRepo.save(u);
        });
    }

    private void createBug(Scope scope, User reporter) {

        BugReport bug = new BugReport();
        bug.setScope(scope);
        bug.setReporter(reporter);
        bug.setTitle(randomBugTitle());
        bug.setDescription("Automatically generated vulnerability report.");
        bug.setReporterSeverity(randomSeverity());
        bug.setStepsToReproduce("1. Open endpoint\n2. Send payload\n3. Observe issue");
        bug.setStatus(BugStatus.SUBMITTED);

        bug.setSubmittedAt(
                LocalDateTime.now().minusDays(randBetween(1, 60))
        );

        bugRepo.save(bug);
    }

    private Severity randomSeverity() {
        Severity[] values = Severity.values();
        return values[random.nextInt(values.length)];
    }

    private int randBetween(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    private String randomBugTitle() {
        String[] titles = {
                "SQL Injection in login",
                "Stored XSS in profile",
                "IDOR in API endpoint",
                "Broken access control",
                "CSRF on settings page",
                "File upload bypass",
                "Open redirect vulnerability"
        };
        return titles[random.nextInt(titles.length)];
    }
}
