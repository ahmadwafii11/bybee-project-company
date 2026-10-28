# ByBee Project --- Use Case Documentation

**Status:** Draft\
**Last updated:** 27 October 2026

## 1. Actors

-   **Visitor:** views public pages and published vacancies.
-   **Job seeker:** manages profile, CVs, portfolios, and applications.
-   **Company member / employer:** manages a company and vacancies
    according to permissions.
-   **Administrator / moderator:** reviews reports, verification
    submissions, and moderation tasks.
-   **Payment provider:** may confirm payment outcomes if paid
    subscriptions are implemented.

The account-role model is not finalized.

## 2. Use case inventory

  --------------------------------------------------------------------------
  ID                Actor             Use case             Notes
  ----------------- ----------------- -------------------- -----------------
  UC-01             Visitor           Browse public        Only published
                                      vacancies            and visible
                                                           vacancies

  UC-02             Visitor/user      Register and sign in Verification
                                                           rules TBD

  UC-03             Job seeker        Manage profile and   Authenticated
                                      skills               

  UC-04             Job seeker        Create/edit CV       Template and plan
                                                           restrictions may
                                                           apply

  UC-05             Job seeker        Manage               Authenticated
                                      portfolio/projects   

  UC-06             Job seeker        Search/filter        Search filters
                                      vacancies            TBD

  UC-07             Job seeker        Apply for a vacancy  Vacancy must be
                                                           open

  UC-08             Job seeker        Track applications   Own applications
                                                           only

  UC-09             Employer          Manage company       Requires company
                                      profile              permission

  UC-10             Employer          Submit company       Requirements TBD
                                      verification         

  UC-11             Employer          Create/manage        Membership and
                                      vacancies            plan quotas
                                                           checked

  UC-12             Employer          Review applications  Must manage the
                                                           relevant vacancy

  UC-13             Employer          Update application   Allowed
                                      status               transitions TBD

  UC-14             User/employer     View/manage          Billing rules TBD
                                      subscription         

  UC-15             User              Report suspicious    Report reasons
                                      content              TBD

  UC-16             Administrator     Review               Admin permission
                                      reports/moderate     
                                      content              

  UC-17             Administrator     Review company       Admin permission
                                      verification         

  UC-18             Administrator     Inspect audit        Restricted access
                                      history              
  --------------------------------------------------------------------------

## 3. Core flow: apply for a job

1.  Job seeker signs in.
2.  Job seeker searches published vacancies.
3.  Job seeker opens a vacancy detail.
4.  System verifies the vacancy is open and visible.
5.  Job seeker selects a CV and submits the application.
6.  System validates ownership and required fields, then records the
    application.
7.  System records the initial status and timestamp.
8.  Employer reviews the application.
9.  Job seeker views the status visible to them.

**Open decision:** whether to preserve an immutable snapshot/version of
the CV at submission time.

## 4. Core flow: publish a vacancy

1.  Employer signs in.
2.  System checks company membership and permissions.
3.  Employer creates a vacancy draft.
4.  System validates required fields and subscription limits.
5.  Employer publishes the vacancy.
6.  Vacancy becomes visible according to status and dates.
7.  Employer updates or closes it if permitted.

**Open decisions:** approval requirements, quota counting, vacancy
duration, and status transitions.

## 5. Core flow: create a CV

1.  Job seeker opens the CV builder.
2.  User selects an available template.
3.  User enters supported profile, education, experience, and skills
    information.
4.  System validates and saves the CV.
5.  User previews the CV.
6.  User exports according to plan capabilities.

CV sections, export formats, and template limits need specification. Do
not promise universal ATS compatibility without testing.

## 6. Authorization principles

-   Users may manage their own profile, CVs, portfolios, and
    applications.
-   Company resources require appropriate company membership
    permissions.
-   Employers can only review applications associated with vacancies
    they may manage.
-   Administrative actions require explicit privileges and should be
    auditable.
-   Subscription entitlements must be enforced by the backend, not only
    the frontend.

## 7. Exceptions to test

Duplicate application; closed/expired vacancy; unauthorized access to
another user's CV/application; employer without company permission;
quota exceeded; payment pending/failure/duplicate callback; malicious
uploads if supported; report abuse.

## 8. Acceptance criteria baseline

For each use case, test success, invalid input, unauthenticated request,
unauthorized request, duplicate/conflicting operation, and database
failure/transaction behavior where applicable.
