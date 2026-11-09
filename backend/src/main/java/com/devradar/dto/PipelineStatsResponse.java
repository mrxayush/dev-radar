package com.devradar.dto;

import java.util.Map;

public class PipelineStatsResponse {
    private long totalCandidates;
    private long reviewingCount;
    private long scheduledCount;
    private long hiredCount;
    private long rejectedCount;
    private double averageDevScore;
    private Map<String, Long> candidatesByLanguage;

    public PipelineStatsResponse() {
    }

    public PipelineStatsResponse(long totalCandidates, long reviewingCount, long scheduledCount,
                                 long hiredCount, long rejectedCount, double averageDevScore,
                                 Map<String, Long> candidatesByLanguage) {
        this.totalCandidates = totalCandidates;
        this.reviewingCount = reviewingCount;
        this.scheduledCount = scheduledCount;
        this.hiredCount = hiredCount;
        this.rejectedCount = rejectedCount;
        this.averageDevScore = averageDevScore;
        this.candidatesByLanguage = candidatesByLanguage;
    }

    public long getTotalCandidates() {
        return totalCandidates;
    }

    public void setTotalCandidates(long totalCandidates) {
        this.totalCandidates = totalCandidates;
    }

    public long getReviewingCount() {
        return reviewingCount;
    }

    public void setReviewingCount(long reviewingCount) {
        this.reviewingCount = reviewingCount;
    }

    public long getScheduledCount() {
        return scheduledCount;
    }

    public void setScheduledCount(long scheduledCount) {
        this.scheduledCount = scheduledCount;
    }

    public long getHiredCount() {
        return hiredCount;
    }

    public void setHiredCount(long hiredCount) {
        this.hiredCount = hiredCount;
    }

    public long getRejectedCount() {
        return rejectedCount;
    }

    public void setRejectedCount(long rejectedCount) {
        this.rejectedCount = rejectedCount;
    }

    public double getAverageDevScore() {
        return averageDevScore;
    }

    public void setAverageDevScore(double averageDevScore) {
        this.averageDevScore = averageDevScore;
    }

    public Map<String, Long> getCandidatesByLanguage() {
        return candidatesByLanguage;
    }

    public void setCandidatesByLanguage(Map<String, Long> candidatesByLanguage) {
        this.candidatesByLanguage = candidatesByLanguage;
    }
}
