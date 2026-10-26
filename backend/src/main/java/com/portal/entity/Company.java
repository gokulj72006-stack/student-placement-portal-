package com.portal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 120)
    private String name;

    @Column(nullable = false, length = 100)
    private String industry;

    @Column(length = 255)
    private String website;

    @Column(length = 500, name = "logo_url")
    private String logoUrl;

    @Column(nullable = false, length = 120)
    private String location;

    @Column(nullable = false, length = 30)
    private String tier = "TIER_1_DREAM"; // SUPER_DREAM, TIER_1_DREAM, REGULAR

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Company() {
        this.createdAt = LocalDateTime.now();
    }

    public Company(String name, String industry, String website, String logoUrl, String location, String tier) {
        this();
        this.name = name;
        this.industry = industry;
        this.website = website;
        this.logoUrl = logoUrl;
        this.location = location;
        this.tier = tier != null ? tier : "TIER_1_DREAM";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
