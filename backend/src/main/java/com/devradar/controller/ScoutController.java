package com.devradar.controller;

import com.devradar.dto.DeveloperProfileResponse;
import com.devradar.service.CandidateBookmarkService;
import com.devradar.service.GitHubScoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scout")
@Tag(name = "Developer Scout", description = "Live GitHub profile analysis and Dev Score computation")
public class ScoutController {

    private final GitHubScoutService scoutService;
    private final CandidateBookmarkService bookmarkService;

    public ScoutController(GitHubScoutService scoutService, CandidateBookmarkService bookmarkService) {
        this.scoutService = scoutService;
        this.bookmarkService = bookmarkService;
    }

    @GetMapping("/{username}")
    @Operation(summary = "Scout live GitHub developer profile, calculate Dev Score, and analyze top repositories")
    public ResponseEntity<DeveloperProfileResponse> scoutUser(
            @PathVariable String username,
            Authentication authentication) {

        DeveloperProfileResponse profile = scoutService.scoutGitHubUser(username);

        if (authentication != null && authentication.isAuthenticated()) {
            String loggedUser = authentication.getName();
            boolean bookmarked = bookmarkService.isBookmarked(username, loggedUser);
            profile.setAlreadyBookmarked(bookmarked);
            if (bookmarked) {
                profile.setExistingBookmarkId(bookmarkService.getBookmarkId(username, loggedUser));
            }
        }

        return ResponseEntity.ok(profile);
    }
}
