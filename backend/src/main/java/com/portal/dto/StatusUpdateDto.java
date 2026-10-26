package com.portal.dto;

public class StatusUpdateDto {
    private String status;
    private String currentRound;
    private String interviewTime;
    private String notes;
    private String offerCtc;

    public StatusUpdateDto() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCurrentRound() { return currentRound; }
    public void setCurrentRound(String currentRound) { this.currentRound = currentRound; }

    public String getInterviewTime() { return interviewTime; }
    public void setInterviewTime(String interviewTime) { this.interviewTime = interviewTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getOfferCtc() { return offerCtc; }
    public void setOfferCtc(String offerCtc) { this.offerCtc = offerCtc; }
}
