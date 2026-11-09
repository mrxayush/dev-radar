package com.devradar.dto;

import java.util.List;
import java.util.Map;

public class DeveloperProfileResponse {
    private String login;
    private String name;
    private String avatarUrl;
    private String htmlUrl;
    private String bio;
    private String company;
    private String location;
    private String blog;
    private int publicRepos;
    private int followers;
    private int following;
    private String memberSince;

    private int devScore;
    private String devScoreTier;
    private String topLanguage;
    private int totalStars;
    private int totalForks;
    private Map<String, Integer> languageBreakdown;
    private List<GitHubRepoDto> topRepositories;

    private boolean alreadyBookmarked;
    private Long existingBookmarkId;

    public DeveloperProfileResponse() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getHtmlUrl() {
        return htmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBlog() {
        return blog;
    }

    public void setBlog(String blog) {
        this.blog = blog;
    }

    public int getPublicRepos() {
        return publicRepos;
    }

    public void setPublicRepos(int publicRepos) {
        this.publicRepos = publicRepos;
    }

    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
    }

    public int getFollowing() {
        return following;
    }

    public void setFollowing(int following) {
        this.following = following;
    }

    public String getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(String memberSince) {
        this.memberSince = memberSince;
    }

    public int getDevScore() {
        return devScore;
    }

    public void setDevScore(int devScore) {
        this.devScore = devScore;
    }

    public String getDevScoreTier() {
        return devScoreTier;
    }

    public void setDevScoreTier(String devScoreTier) {
        this.devScoreTier = devScoreTier;
    }

    public String getTopLanguage() {
        return topLanguage;
    }

    public void setTopLanguage(String topLanguage) {
        this.topLanguage = topLanguage;
    }

    public int getTotalStars() {
        return totalStars;
    }

    public void setTotalStars(int totalStars) {
        this.totalStars = totalStars;
    }

    public int getTotalForks() {
        return totalForks;
    }

    public void setTotalForks(int totalForks) {
        this.totalForks = totalForks;
    }

    public Map<String, Integer> getLanguageBreakdown() {
        return languageBreakdown;
    }

    public void setLanguageBreakdown(Map<String, Integer> languageBreakdown) {
        this.languageBreakdown = languageBreakdown;
    }

    public List<GitHubRepoDto> getTopRepositories() {
        return topRepositories;
    }

    public void setTopRepositories(List<GitHubRepoDto> topRepositories) {
        this.topRepositories = topRepositories;
    }

    public boolean isAlreadyBookmarked() {
        return alreadyBookmarked;
    }

    public void setAlreadyBookmarked(boolean alreadyBookmarked) {
        this.alreadyBookmarked = alreadyBookmarked;
    }

    public Long getExistingBookmarkId() {
        return existingBookmarkId;
    }

    public void setExistingBookmarkId(Long existingBookmarkId) {
        this.existingBookmarkId = existingBookmarkId;
    }
}
