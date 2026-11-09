package com.devradar.controller;

import com.devradar.dto.BookmarkRequest;
import com.devradar.dto.PipelineStatsResponse;
import com.devradar.dto.UpdateBookmarkRequest;
import com.devradar.model.CandidateBookmark;
import com.devradar.service.CandidateBookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@Tag(name = "Talent Pipeline", description = "Candidate bookmarking, review notes, and status management for Recruiters")
@SecurityRequirement(name = "bearerAuth")
public class BookmarkController {

    private final CandidateBookmarkService bookmarkService;

    public BookmarkController(CandidateBookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    @Operation(summary = "Get all bookmarked candidates for the current recruiter")
    public ResponseEntity<List<CandidateBookmark>> getMyPipeline(Authentication authentication) {
        return ResponseEntity.ok(bookmarkService.getMyBookmarks(authentication.getName()));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get recruitment pipeline stats (counts by status, average Dev Score, language distribution)")
    public ResponseEntity<PipelineStatsResponse> getStats(Authentication authentication) {
        return ResponseEntity.ok(bookmarkService.getPipelineStats(authentication.getName()));
    }

    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Bookmark a GitHub developer to your recruitment pipeline (Recruiter only)")
    public ResponseEntity<CandidateBookmark> bookmarkCandidate(
            @Valid @RequestBody BookmarkRequest request,
            Authentication authentication) {
        CandidateBookmark saved = bookmarkService.bookmarkCandidate(request, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Update candidate review notes, rating, or pipeline status (Recruiter only)")
    public ResponseEntity<CandidateBookmark> updateBookmark(
            @PathVariable Long id,
            @Valid @RequestBody UpdateBookmarkRequest request,
            Authentication authentication) {
        CandidateBookmark updated = bookmarkService.updateBookmark(id, request, authentication.getName());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    @Operation(summary = "Remove candidate from recruitment pipeline (Recruiter only)")
    public ResponseEntity<Void> deleteBookmark(
            @PathVariable Long id,
            Authentication authentication) {
        bookmarkService.deleteBookmark(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
