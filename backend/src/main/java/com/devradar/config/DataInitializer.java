package com.devradar.config;

import com.devradar.model.CandidateBookmark;
import com.devradar.model.CandidateStatus;
import com.devradar.model.Role;
import com.devradar.model.User;
import com.devradar.repository.CandidateBookmarkRepository;
import com.devradar.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            CandidateBookmarkRepository bookmarkRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // 1. Seed Recruiter (Admin privileges on talent pipeline)
            User recruiter = userRepository.findByUsername("recruiter").orElseGet(() -> {
                User u = new User("recruiter", passwordEncoder.encode("recruiter123"), Role.ROLE_RECRUITER);
                return userRepository.save(u);
            });

            // 2. Seed Candidate (Standard viewer)
            if (!userRepository.existsByUsername("candidate")) {
                User candidate = new User("candidate", passwordEncoder.encode("candidate123"), Role.ROLE_CANDIDATE);
                userRepository.save(candidate);
            }

            // 3. Seed Sample Bookmarked Profiles if empty
            if (bookmarkRepository.count() == 0) {
                CandidateBookmark c1 = new CandidateBookmark(
                        "torvalds",
                        "Linus Torvalds",
                        "https://avatars.githubusercontent.com/u/1024025",
                        "Creator of Linux and Git.",
                        "Linux Foundation",
                        "Portland, OR",
                        7,
                        210000,
                        198000,
                        "C",
                        98,
                        "Legendary operating systems pioneer. High-priority hire for Kernel & Infrastructure Architect.",
                        5,
                        CandidateStatus.HIRED,
                        recruiter
                );

                CandidateBookmark c2 = new CandidateBookmark(
                        "gaearon",
                        "Dan Abramov",
                        "https://avatars.githubusercontent.com/u/810438",
                        "Working on React and web infrastructure.",
                        "Bluesky",
                        "London, UK",
                        265,
                        86500,
                        94000,
                        "JavaScript",
                        94,
                        "Creator of Redux, core React team alumni. Scheduled for Principal Frontend Architect interview.",
                        5,
                        CandidateStatus.INTERVIEW_SCHEDULED,
                        recruiter
                );

                CandidateBookmark c3 = new CandidateBookmark(
                        "kelseyhightower",
                        "Kelsey Hightower",
                        "https://avatars.githubusercontent.com/u/118335",
                        "Cloud native pioneer, keynote speaker, developer advocate.",
                        "Independent",
                        "Portland, OR",
                        12,
                        45000,
                        61000,
                        "Go",
                        91,
                        "Kubernetes expert and keynote speaker. Reviewing for Cloud Platform Advisory role.",
                        4,
                        CandidateStatus.REVIEWING,
                        recruiter
                );

                bookmarkRepository.save(c1);
                bookmarkRepository.save(c2);
                bookmarkRepository.save(c3);
            }
        };
    }
}
