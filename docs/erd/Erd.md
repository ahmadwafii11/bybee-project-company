# ByBee Project --- ERD Documentation

**Status:** Draft logical model\
**Database target:** PostgreSQL\
**Last updated:** 27 October 2026

## 1. Purpose

This is the proposed relational data model, not a final migration
contract. Confirm business rules before production implementation.

## 2. Proposed tables

  ------------------------------------------------------------------------------
  Domain                  Tables                         Purpose
  ----------------------- ------------------------------ -----------------------
  Identity                `users`, `user_profiles`       Authentication identity
                                                         and profile

  Company                 `companies`,                   Company, membership,
                          `company_members`,             verification
                          `company_verifications`        

  CV and portfolio        `cv_templates`, `cvs`,         CVs, portfolios,
                          `portfolios`,                  projects, skills
                          `portfolio_projects`,          
                          `skills`, `user_skills`        

  Jobs                    `job_categories`, `jobs`,      Vacancies, categories,
                          `job_skills`                   required skills

  Applications            `applications`,                Applications and status
                          `application_status_history`   history

  Subscriptions           `plans`, `subscriptions`,      Plans, subscriptions,
                          `payments`                     payment records

  Governance              `reports`,                     Reports, moderation,
                          `moderation_actions`,          audit trail
                          `audit_logs`                   
  ------------------------------------------------------------------------------

## 3. Relationship overview

-   A user has one profile in the proposed baseline and may create
    multiple CVs and portfolios.
-   A portfolio contains multiple projects.
-   Users and skills have a many-to-many relationship through
    `user_skills`.
-   A company has members and may have verification records.
-   A company publishes jobs; jobs may belong to a category and
    associate with skills through `job_skills`.
-   Users submit applications to jobs; applications may reference a CV
    and have status-history records.
-   Plans are associated with subscriptions; subscriptions may have
    payment records.
-   Reports may lead to moderation actions; audit logs record important
    events.

## 4. Conceptual ERD

``` mermaid
erDiagram
    USERS ||--o| USER_PROFILES : has
    USERS ||--o{ CVS : creates
    CV_TEMPLATES ||--o{ CVS : formats
    USERS ||--o{ PORTFOLIOS : owns
    PORTFOLIOS ||--o{ PORTFOLIO_PROJECTS : contains
    USERS ||--o{ USER_SKILLS : has
    SKILLS ||--o{ USER_SKILLS : assigned
    COMPANIES ||--o{ COMPANY_MEMBERS : has
    USERS ||--o{ COMPANY_MEMBERS : joins
    COMPANIES ||--o{ COMPANY_VERIFICATIONS : submits
    COMPANIES ||--o{ JOBS : publishes
    JOB_CATEGORIES ||--o{ JOBS : categorizes
    JOBS ||--o{ JOB_SKILLS : requires
    SKILLS ||--o{ JOB_SKILLS : listed
    USERS ||--o{ APPLICATIONS : submits
    JOBS ||--o{ APPLICATIONS : receives
    CVS ||--o{ APPLICATIONS : referenced_by
    APPLICATIONS ||--o{ APPLICATION_STATUS_HISTORY : tracks
    PLANS ||--o{ SUBSCRIPTIONS : selected_for
    USERS ||--o{ SUBSCRIPTIONS : owns
    SUBSCRIPTIONS ||--o{ PAYMENTS : records
    USERS ||--o{ REPORTS : submits
    REPORTS ||--o{ MODERATION_ACTIONS : reviewed_by
    USERS ||--o{ AUDIT_LOGS : performs
```

The diagram is conceptual. Decide whether applications store an
immutable CV snapshot, how exact cardinalities work, and what deletion
rules apply.

## 5. Suggested integrity and security practices

-   Store password hashes, never plaintext passwords.
-   Use foreign keys, suitable indexes, and transactions.
-   Restrict CV, application, company, and payment access by ownership
    and role.
-   Do not store payment-card details; store only necessary
    payment-provider references.
-   Define retention/deletion and audit policies for personal data.
-   Choose one consistent ID strategy and timestamp convention before
    migrations.

## 6. Migration mapping

Planned files currently include: - `001_create_users.sql` -
`002_create_profiles.sql` - `003_create_companies.sql` -
`004_create_cv_portfolios.sql` - `005_create_jobs.sql` -
`006_create_applications.sql` - `007_create_subscriptions.sql` -
`008_create_action_user.sql` -

Review coverage: skills, company verification, reports, moderation,
audit logs, and payments may require additional migrations.

## 7. Decisions still open

User roles and permissions; whether a user may belong to multiple
companies; profile differences between job seekers and recruiters; CV
snapshot/versioning for applications; allowed job/application statuses;
subscription renewal/cancellation/refund/quota rules; verification and
moderation states; deletion and retention rules.
