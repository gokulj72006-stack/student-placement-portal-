package com.portal.dto;

import java.util.Map;

public class DashboardStatsDto {
    private long totalStudents;
    private long totalCourses;
    private long totalDrives;
    private long totalApplications;
    private long offersExtended;
    private double highestCtcLpa;
    private double averageCtcLpa;
    private double placementRatePct;
    private Map<String, Long> departmentPlacements;
    private Map<String, Long> tierDistribution;

    public DashboardStatsDto() {}

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }

    public long getTotalDrives() { return totalDrives; }
    public void setTotalDrives(long totalDrives) { this.totalDrives = totalDrives; }

    public long getTotalApplications() { return totalApplications; }
    public void setTotalApplications(long totalApplications) { this.totalApplications = totalApplications; }

    public long getOffersExtended() { return offersExtended; }
    public void setOffersExtended(long offersExtended) { this.offersExtended = offersExtended; }

    public double getHighestCtcLpa() { return highestCtcLpa; }
    public void setHighestCtcLpa(double highestCtcLpa) { this.highestCtcLpa = highestCtcLpa; }

    public double getAverageCtcLpa() { return averageCtcLpa; }
    public void setAverageCtcLpa(double averageCtcLpa) { this.averageCtcLpa = averageCtcLpa; }

    public double getPlacementRatePct() { return placementRatePct; }
    public void setPlacementRatePct(double placementRatePct) { this.placementRatePct = placementRatePct; }

    public Map<String, Long> getDepartmentPlacements() { return departmentPlacements; }
    public void setDepartmentPlacements(Map<String, Long> departmentPlacements) { this.departmentPlacements = departmentPlacements; }

    public Map<String, Long> getTierDistribution() { return tierDistribution; }
    public void setTierDistribution(Map<String, Long> tierDistribution) { this.tierDistribution = tierDistribution; }
}
