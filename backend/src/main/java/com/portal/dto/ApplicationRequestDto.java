package com.portal.dto;

public class ApplicationRequestDto {
    private Long studentId;
    private Long driveId;
    private String notes;

    public ApplicationRequestDto() {}
    public ApplicationRequestDto(Long studentId, Long driveId, String notes) {
        this.studentId = studentId;
        this.driveId = driveId;
        this.notes = notes;
    }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getDriveId() { return driveId; }
    public void setDriveId(Long driveId) { this.driveId = driveId; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
