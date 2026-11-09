package com.devradar.service;

import com.devradar.dto.BookmarkRequest;
import com.devradar.dto.DeveloperProfileResponse;
import com.devradar.dto.PipelineStatsResponse;
import com.devradar.dto.UpdateBookmarkRequest;
import com.devradar.model.CandidateBookmark;
import com.devradar.model.CandidateStatus;
import com.devradar.model.User;
import com.devradar.repository.CandidateBookmarkRepository;
import com.devradar.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class CandidateBookmarkService {

    private final CandidateBookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final GitHubScoutService scoutService;

    public CandidateBookmarkService(CandidateBookmarkRepository bookmarkRepository,
                                  UserRepository userRepository,
                                  GitHubScoutService scoutService) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
        this.scoutService = scoutService;
    }

    public CandidateBookmark bookmarkCandidate(BookmarkRequest request, String recruiterUsername) {
        User recruiter = userRepository.findByUsername(recruiterUsername)
                .orElseThrow(() -> new IllegalArgumentException("Recruiter not found: " + recruiterUsername));

        String cleanUsername = request.getGithubUsername().trim().toLowerCase();

        // Check if already bookmarked by this recruiter
        Optional<CandidateBookmark> existing = bookmarkRepository.findByRecruiterAndGithubUsername(recruiter, cleanUsername);
        if (existing.isPresent()) {
            CandidateBookmark bookmark = existing.get();
            if (request.getRecruiterNotes() != null) bookmark.setRecruiterNotes(request.getRecruiterNotes());
            if (request.getRating() != null) bookmark.setRating(request.getRating());
            if (request.getStatus() != null) bookmark.setStatus(request.getStatus());
            return bookmarkRepository.save(bookmark);
        }

        // Fetch fresh profile from GitHub
        DeveloperProfileResponse profile = scoutService.scoutGitHubUser(cleanUsername);

        CandidateBookmark newBookmark = new CandidateBookmark(
                profile.getLogin(),
                profile.getName(),
                profile.getAvatarUrl(),
                profile.getBio(),
                profile.getCompany(),
                profile.getLocation(),
                profile.getPublicRepos(),
                profile.getFollowers(),
                profile.getTotalStars(),
                profile.getTopLanguage(),
                profile.getDevScore(),
                request.getRecruiterNotes(),
                request.getRating() != null ? request.getRating() : 3,
                request.getStatus() != null ? request.getStatus() : CandidateStatus.REVIEWING,
                recruiter
        );

        return bookmarkRepository.save(newBookmark);
    }

    @Transactional(readOnly = true)
    public List<CandidateBookmark> getMyBookmarks(String recruiterUsername) {
        User recruiter = userRepository.findByUsername(recruiterUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + recruiterUsername));
        return bookmarkRepository.findByRecruiterOrderBySavedAtDesc(recruiter);
    }

    public CandidateBookmark updateBookmark(Long id, UpdateBookmarkRequest request, String recruiterUsername) {
        CandidateBookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bookmark not found with ID: " + id));

        if (!bookmark.getRecruiter().getUsername().equals(recruiterUsername)) {
            throw new org.springframework.security.access.AccessDeniedException("Unauthorized to modify this bookmark");
        }

        if (request.getRecruiterNotes() != null) bookmark.setRecruiterNotes(request.getRecruiterNotes());
        if (request.getRating() != null) bookmark.setRating(request.getRating());
        if (request.getStatus() != null) bookmark.setStatus(request.getStatus());

        return bookmarkRepository.save(bookmark);
    }

    public void deleteBookmark(Long id, String recruiterUsername) {
        CandidateBookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bookmark not found with ID: " + id));

        if (!bookmark.getRecruiter().getUsername().equals(recruiterUsername)) {
            throw new org.springframework.security.access.AccessDeniedException("Unauthorized to delete this bookmark");
        }

        bookmarkRepository.delete(bookmark);
    }

    @Transactional(readOnly = true)
    public PipelineStatsResponse getPipelineStats(String recruiterUsername) {
        User recruiter = userRepository.findByUsername(recruiterUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + recruiterUsername));

        List<CandidateBookmark> bookmarks = bookmarkRepository.findByRecruiterOrderBySavedAtDesc(recruiter);

        long total = bookmarks.size();
        long reviewing = bookmarks.stream().filter(b -> b.getStatus() == CandidateStatus.REVIEWING).count();
        long scheduled = bookmarks.stream().filter(b -> b.getStatus() == CandidateStatus.INTERVIEW_SCHEDULED).count();
        long hired = bookmarks.stream().filter(b -> b.getStatus() == CandidateStatus.HIRED).count();
        long rejected = bookmarks.stream().filter(b -> b.getStatus() == CandidateStatus.REJECTED).count();

        Double avgScore = bookmarkRepository.getAverageDevScoreByRecruiter(recruiter);
        double roundedAvg = avgScore != null ? BigDecimal.valueOf(avgScore).setScale(1, RoundingMode.HALF_UP).doubleValue() : 0.0;

        Map<String, Long> byLang = bookmarks.stream()
                .filter(b -> b.getTopLanguage() != null)
                .collect(Collectors.groupingBy(CandidateBookmark::getTopLanguage, Collectors.counting()));

        return new PipelineStatsResponse(total, reviewing, scheduled, hired, rejected, roundedAvg, byLang);
    }

    @Transactional(readOnly = true)
    public boolean isBookmarked(String githubUsername, String recruiterUsername) {
        User recruiter = userRepository.findByUsername(recruiterUsername).orElse(null);
        if (recruiter == null) return false;
        return bookmarkRepository.existsByRecruiterAndGithubUsername(recruiter, githubUsername.trim().toLowerCase());
    }

    @Transactional(readOnly = true)
    public Long getBookmarkId(String githubUsername, String recruiterUsername) {
        User recruiter = userRepository.findByUsername(recruiterUsername).orElse(null);
        if (recruiter == null) return null;
        return bookmarkRepository.findByRecruiterAndGithubUsername(recruiter, githubUsername.trim().toLowerCase())
                .map(CandidateBookmark::getId)
                .orElse(null);
    }
}
