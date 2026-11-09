package com.devradar.dto;

import com.devradar.model.CandidateStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class UpdateBookmarkRequest {

    private String recruiterNotes;

    @Min(1)
    @Max(5)
    private Integer rating;

    private CandidateStatus status;

    public UpdateBookmarkRequest() {
    }

    public UpdateBookmarkRequest(String recruiterNotes, Integer rating, CandidateStatus status) {
        this.recruiterNotes = recruiterNotes;
        this.rating = rating;
        this.status = status;
    }

    public String getRecruiterNotes() {
        return recruiterNotes;
    }

    public void setRecruiterNotes(String recruiterNotes) {
        this.recruiterNotes = recruiterNotes;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public CandidateStatus getStatus() {
        return status;
    }

    public void setStatus(CandidateStatus status) {
        this.status = status;
    }
}
