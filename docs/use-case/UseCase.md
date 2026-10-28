# ByBee Project — Use Case Documentation

**Status:** Baseline v1.1 (open decisions resolved; items marked *confirm* need owner approval)
**Last updated:** 28 October 2026
**Related:** `use-case-diagrams.md` (diagrams and flowcharts), `../erd/Erd.md`, `../business-plan/RancanganPaket.md`, `../api/api.md`

## 1. Actors

| Actor | Database role | Description |
|---|---|---|
| **Visitor** | none | Views public pages, published vacancies, and public portfolios. |
| **Job seeker** | `users.role = job_seeker` | Manages profile, CVs, portfolios, applications, and an optional Pro subscription. |
| **Company member / employer** | `users.role = company_member` plus `company_members.member_role` | Manages a company and its vacancies according to the member role (see section 5). |
| **Administrator / moderator** | `users.role = admin` | Reviews company verification, vacancies, reports, and manages plans and master data. |
| **Payment provider** (external) | none | Sends payment outcome notifications (webhooks). |
| **Email provider** (external) | none | Delivers verification codes and notifications. |
| **Scheduler** (system) | none | Closes expired vacancies, expires subscriptions, sends renewal reminders. |

**Account-role model (decided):**

- One account has exactly one `users.role`. A person who is both a job seeker and an employer uses two accounts (*confirm*).
- A `company_member` user may belong to several companies; the `UNIQUE (company_id, user_id)` constraint allows this.
- The user who creates a company becomes its `owner`.

## 2. Use case inventory

Existing IDs UC-01 to UC-18 are unchanged. UC-19 onward are additions required to make the flows work end to end.

| ID | Actor | Use case | Phase | Notes (resolved) |
|---|---|---|---|---|
| UC-01 | Visitor | Browse public vacancies | MVP | Only `published` vacancies not past `deadline` or `expires_at`. |
| UC-02 | Visitor/user | Register, verify email, sign in, reset password | MVP | Email verification is mandatory. Phone/WhatsApp is optional and unverified in MVP. Sign-in by email only in MVP. |
| UC-03 | Job seeker | Manage profile and skills | MVP | Authenticated. |
| UC-04 | Job seeker | Create/edit CV | MVP | Template tier and CV count limited by plan. |
| UC-05 | Job seeker | Manage portfolio/projects | MVP | Visibility: private, unlisted, public. Limits by plan. |
| UC-06 | Job seeker | Search/filter vacancies | MVP | Filters: keyword, category, location, workplace type, employment type, salary, skill. |
| UC-07 | Job seeker | Apply for a vacancy | MVP | Vacancy must be open. One application per vacancy. A CV snapshot is stored. |
| UC-08 | Job seeker | Track applications | MVP | Own applications only. Internal notes are not shown. |
| UC-09 | Employer | Manage company profile | MVP | `owner` and `admin` members. |
| UC-10 | Employer | Submit company verification | MVP | Required before any vacancy can be sent for review. Free for all plans. |
| UC-11 | Employer | Create/manage vacancies | MVP | Draft, submit for review, close. Plan quota checked on submit. |
| UC-12 | Employer | Review applications | MVP | Must be a member with permission on that company. |
| UC-13 | Employer | Update application status | MVP | Transitions follow section 4.2. |
| UC-14 | User/employer | Purchase and manage subscription | Phase 2 | Company plans: `owner` only. Manual renewal. See `RancanganPaket.md`. |
| UC-15 | User | Report suspicious content | MVP | Login required. Targets: vacancy or company. |
| UC-16 | Administrator | Review reports and moderate content | MVP | Writes `moderation_actions` and `audit_logs`. |
| UC-17 | Administrator | Review company verification | MVP | Approve, reject, or request revision. |
| UC-18 | Administrator | Inspect audit history | Phase 2 | Restricted access. |
| UC-19 | Job seeker | Export CV to PDF | MVP | Watermark unless the plan removes it. |
| UC-20 | Job seeker | Withdraw an application | MVP | Allowed until the application is in a final status. |
| UC-21 | Visitor | View public/unlisted portfolio by slug | MVP | Private portfolios return not found. |
| UC-22 | Employer | Manage company team | MVP | Invite, change role, disable members. `owner` and `admin`. |
| UC-23 | Administrator | Review vacancy before publishing | MVP | `pending_review` to `published` or `rejected`. |
| UC-24 | Payment provider | Send payment notification | Phase 2 | Signature checked, idempotent. |
| UC-25 | Administrator | Manage plans, CV templates, categories, skills | Phase 2 | Plan changes affect new subscriptions only. |
| UC-26 | User | Delete account and personal data | Phase 2 | Soft delete plus anonymization (section 6). |
| UC-27 | Employer | Search candidates beyond applicants | Phase 3 (optional) | Only candidates with `is_discoverable = true`. Verified company and eligible plan. |
| UC-28 | Scheduler | Close expired vacancies/subscriptions, send reminders | MVP | Runs periodically. |

## 3. Core flows

### 3.1 Register and verify

1. Visitor chooses account type (job seeker or company) and enters name, email, password. Company registration also enters the company name.
2. System validates input and checks that the email is not registered.
3. System creates the account with `account_status = 'pending'` and sends a one-time code (`verification_codes`).
4. User enters the code. The code expires in 15 minutes and allows 5 attempts.
5. System sets `email_verified_at`, changes the status to `active`, and signs the user in.
6. For a company account the system creates the company and a `company_members` row with `member_role = 'owner'`.

**Alternate flows:** wrong or expired code, resend code (60-second cooldown, maximum 5 per hour), email already registered.

### 3.2 Apply for a job

1. Job seeker signs in.
2. Job seeker searches published vacancies and opens a vacancy detail.
3. System verifies the vacancy is `published`, not past `deadline`, and not past `expires_at`.
4. System checks that the user has not already applied.
5. Job seeker selects a CV, optionally a public or unlisted portfolio, and writes a cover letter.
6. System validates ownership of the CV and portfolio.
7. In one transaction the system stores the application with status `submitted`, **copies the CV into `cv_snapshot`**, writes the first `application_status_history` row, and increments statistics.
8. Employer reviews the application.
9. Job seeker sees the status and its timestamps. Internal notes stay hidden.

**Decision:** the CV is stored as an immutable snapshot at submission. Later edits or deletion of the CV do not change what the employer sees.

### 3.3 Publish a vacancy

1. Employer signs in; system checks company membership and role (`owner`, `admin`, or `hr`).
2. Employer creates a draft.
3. Employer clicks **Submit for review**.
4. System checks, in order: the company is verified; required fields are valid; the number of active vacancies (`pending_review` plus `published`) is below the plan limit.
5. Status becomes `pending_review`.
6. Administrator approves (status `published`, `published_at` set, `expires_at = published_at + plan listing days`, priority from plan) or rejects with a reason (status `rejected`; the employer edits and resubmits).
7. The vacancy closes automatically at the earlier of `deadline` and `expires_at`, or manually by the employer.

**Decisions:** every new vacancy is reviewed in MVP. Edits to a published vacancy do not trigger a new review but are written to `audit_logs`, and admins can hide it at any time. A closed vacancy cannot be reopened; the employer duplicates it into a new draft.

### 3.4 Create and export a CV

1. Job seeker opens the CV builder and selects a template. Templates above the user's tier are shown locked.
2. User enters profile, education, experience, skills. Sections are stored in `cvs.cv_data`.
3. System validates and saves. Creating a new CV is blocked at the plan's `max_cvs`.
4. User previews the CV.
5. User exports a PDF. Free plan adds a watermark. The system records `exported_at`.

**Supported sections (MVP):** personal info, summary, work experience, education, skills, certifications, projects, languages. **Export format:** PDF with selectable text. ATS compatibility must be tested with real ATS tools before it is advertised.

### 3.5 Purchase a subscription

1. User (or company `owner`) opens the plan list filtered by `target_type`.
2. System creates a `subscriptions` row (`pending`) and a `payments` row (`pending`), then returns the payment provider's checkout URL.
3. Payment provider notifies the system (webhook). The system verifies the signature and looks up the payment by `transaction_reference`.
4. If paid: payment `paid`, subscription `active`, `start_date` and `end_date` set. Duplicate notifications change nothing.
5. If failed or expired: payment `failed` or `cancelled`; subscription stays `pending` and is cancelled by the scheduler after the payment expires.

### 3.6 Verify a company

1. Employer (`owner` or `admin`) completes the company profile and uploads documents: legal document (for example NIB) and/or proof of official email domain or website.
2. System creates a `company_verifications` row with `pending`.
3. Administrator reviews and chooses approve, request revision (notes required), or reject (reason required).
4. On approval the system sets `companies.verified_at` and records `moderation_actions` and `audit_logs`.

## 4. Status models

### 4.1 Vacancy (`jobs.job_status`)

| From | To | By |
|---|---|---|
| `draft` | `pending_review` | Employer (`owner`/`admin`/`hr`) |
| `pending_review` | `published` or `rejected` | Administrator |
| `rejected` | `draft` | Employer (edit) |
| `published` | `closed` | Employer, Scheduler, or Administrator (hide) |

### 4.2 Application (`applications.application_status`)

| From | Allowed next | By |
|---|---|---|
| `submitted` | `reviewing`, `rejected`, `withdrawn` | Employer / applicant |
| `reviewing` | `shortlisted`, `rejected`, `withdrawn` | Employer / applicant |
| `shortlisted` | `interview`, `rejected`, `withdrawn` | Employer / applicant |
| `interview` | `accepted`, `rejected`, `withdrawn` | Employer / applicant |
| `accepted`, `rejected`, `withdrawn` | none (final) | n/a |

Employers cannot move an application backwards or set `withdrawn`. Applicants can only set `withdrawn`. Each change creates an `application_status_history` row.

### 4.3 Company verification (`company_verifications.verification_status`)

`pending` to `approved`, `rejected`, or `needs_revision`. `needs_revision` returns to `pending` when the employer resubmits. A rejected company may submit a new request (a new row).

### 4.4 Subscription and payment

- Subscription: `pending` to `active` (payment confirmed) or `cancelled`. `active` to `expired` (end date), `cancelled` (owner cancels renewal), or `past_due` (reserved for auto-renew, unused while renewal is manual).
- Payment: `pending` to `paid`, `failed`, or `cancelled`. `paid` to `refunded` (admin only).

## 5. Authorization principles

- Users manage only their own profile, CVs, portfolios, and applications. Another user's resource returns `404`, not `403`.
- Company resources need membership with `member_status = 'active'` and a suitable role.
- Employers see only applications for vacancies of companies they belong to.
- Administrative actions require `users.role = admin` and are written to `audit_logs`.
- Subscription entitlements are enforced by the backend, never only by the frontend.
- Role, company ID, plan, and ownership are never taken from the request body as proof.

### Company member permissions

| Action | owner | admin | hr | recruiter |
|---|:-:|:-:|:-:|:-:|
| Edit company profile | ✅ | ✅ | — | — |
| Submit verification | ✅ | ✅ | — | — |
| Manage members | ✅ | ✅ (not owners) | — | — |
| Purchase or cancel subscription | ✅ | — | — | — |
| Create, edit, submit, close vacancies | ✅ | ✅ | ✅ | — |
| View applications | ✅ | ✅ | ✅ | ✅ |
| Update application status | ✅ | ✅ | ✅ | ✅ |
| View vacancy statistics | ✅ | ✅ | ✅ | — |

## 6. Data retention and deletion (proposal, *confirm with legal advice*)

| Data | Rule |
|---|---|
| Deleted account | `account_status = 'deleted'`. Profile fields (name, phone, photo, bio, city) are anonymized. CVs, portfolios, skills, and sessions are deleted. |
| Applications of a deleted account | Kept for the employer record but `cv_snapshot` and `cover_letter` are cleared after 12 months. |
| Payments and subscriptions | Kept for financial record-keeping. Retention period must be confirmed. |
| Audit logs | Kept at least 12 months. |
| Verification documents | Kept while the company exists; deleted on request after the legal retention period. |

## 7. Exceptions to test

Duplicate application; closed or expired vacancy; application after deadline; unauthorized access to another user's CV or application; recruiter trying to publish a vacancy; employer from another company changing an application; unverified company submitting a vacancy; quota exceeded; template locked for the plan; payment pending, failed, expired; duplicate or forged payment callback; subscription expiry with active vacancies above the Free limit; malicious uploads (wrong type, oversized, disguised files); report abuse; repeated login or code attempts; deleting a CV already used in an application.

## 8. Acceptance criteria (examples)

| ID | Given / When / Then |
|---|---|
| UC-07-A | Given a published vacancy and a job seeker with a CV, when they apply, then the response is `201`, the application is `submitted`, `cv_snapshot` is filled, and a history row exists. |
| UC-07-B | Given the same user already applied, when they apply again, then the response is `409 ALREADY_APPLIED` and no new row is created. |
| UC-07-C | Given a vacancy past its deadline, when a user applies, then the response is `409 JOB_CLOSED`. |
| UC-11-A | Given an unverified company, when a `hr` member submits a vacancy, then the response is `403 COMPANY_NOT_VERIFIED` and the status stays `draft`. |
| UC-11-B | Given a Free company with one active vacancy, when it submits a second, then the response is `403 PLAN_LIMIT_REACHED`. |
| UC-13-A | Given an application in `submitted`, when an employer sets `interview`, then the response is `409 INVALID_STATUS_TRANSITION`. |
| UC-04-A | Given a Free job seeker with 2 CVs, when they create a third, then the response is `403 PLAN_LIMIT_REACHED`. |
| UC-19-A | Given a Free user, when they export a CV, then the PDF contains the ByBee watermark. |
| UC-24-A | Given a payment notification received twice, when both are processed, then the subscription is activated once. |

For every use case also test: success, invalid input, unauthenticated request, unauthorized request, duplicate or conflicting operation, and transaction rollback when a database step fails.

## 9. Decision log

| # | Decision | Status |
|---|---|---|
| D-01 | One role per account; separate accounts for seeker and employer | *Confirm* |
| D-02 | Email verification mandatory; phone login deferred | *Confirm* |
| D-03 | Company must be verified before submitting vacancies | *Confirm* |
| D-04 | All new vacancies reviewed by admin in MVP | *Confirm* |
| D-05 | CV snapshot stored on application | Decided (required) |
| D-06 | Strict forward-only application statuses | Decided |
| D-07 | Manual subscription renewal in MVP | *Confirm* |
| D-08 | Active vacancy = `pending_review` or `published` | Decided |
| D-09 | Candidate search (UC-27) deferred to Phase 3 | *Confirm* |
| D-10 | Retention periods in section 6 | *Confirm with legal advice* |
