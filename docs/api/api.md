# ByBee Project — API Documentation

**Status:** API design baseline v1.1 (conventions decided; endpoints still to be implemented)
**Backend:** Rust + Axum
**Database:** PostgreSQL through SQLx
**Last updated:** 28 October 2026
**Related:** `../use-case/UseCase.md`, `../erd/Erd.md`, `../business-plan/RancanganPaket.md`

## 1. Current implementation

The backend template provides:

- `GET /` returns a basic welcome response.
- `GET /health` returns a health-check response.

The local server listens on `127.0.0.1:3000`. All `/api/v1` routes below are **proposals**, not claims that they are implemented. The "Phase" column follows the roadmap in `business-plan.md`.

## 2. Conventions (decided)

| Topic | Decision |
|---|---|
| Prefix | All feature routes start with `/api/v1`. |
| Format | JSON (`application/json`), except file upload (`multipart/form-data`) and PDF export. |
| Field names | `snake_case`. |
| IDs | Returned as **strings** (database keys are `BIGINT`). |
| Timestamps | ISO 8601 in UTC, for example `2026-10-28T03:04:05Z`. |
| Money | Decimal **string**, for example `"199000.00"`, plus `currency`. |
| Validation | Always on the server. Unknown fields are rejected. |
| Authorization | Every protected route checks authentication and then ownership or membership. Role, company ID, plan, and ownership claims from the frontend are never trusted. |
| Secrets | Environment variables only. `.env` is never committed. |
| Output | Never return password hashes, session tokens, payment secrets, or unneeded personal data. |

## 3. Response format (decided)

Success (single item):

```json
{ "data": { "id": "123" } }
```

Success (list):

```json
{
  "data": [ { "id": "123" } ],
  "meta": { "page": 1, "page_size": 20, "total": 134 }
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields",
    "details": [ { "field": "email", "message": "must be a valid email" } ]
  }
}
```

### Error codes

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `BAD_REQUEST` | Malformed JSON or unreadable query string |
| 401 | `UNAUTHENTICATED` | Missing, invalid, or expired session |
| 403 | `FORBIDDEN` | Authenticated but not allowed |
| 403 | `COMPANY_NOT_VERIFIED` | Company must be verified first |
| 403 | `PLAN_LIMIT_REACHED` | Quota of the current plan is used up |
| 403 | `FEATURE_NOT_IN_PLAN` | Feature needs a higher plan |
| 403 | `TEMPLATE_LOCKED` | Template tier not allowed by the plan |
| 404 | `NOT_FOUND` | Missing, or intentionally hidden (another user's resource) |
| 409 | `CONFLICT` | Duplicate or conflicting state |
| 409 | `ALREADY_APPLIED` | Application already exists |
| 409 | `JOB_CLOSED` | Vacancy is closed, expired, or past its deadline |
| 409 | `INVALID_STATUS_TRANSITION` | Status change not allowed |
| 413 | `PAYLOAD_TOO_LARGE` | Upload too large |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | File type not allowed |
| 422 | `VALIDATION_ERROR` | Input is well formed but invalid |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Unexpected error. The body never contains internal details. |

## 4. Authentication (decided)

| Topic | Decision |
|---|---|
| Mechanism | **Server-side sessions.** The server issues a random token in a cookie (`HttpOnly`, `Secure`, `SameSite=Lax`). Only a **hash** of the token is stored in `sessions`. |
| Why not JWT | One backend and one database: sessions are simpler and can be revoked immediately. |
| Lifetime | 7 days sliding, 30 days absolute maximum. Logout and password change revoke sessions. |
| CSRF | `SameSite=Lax` plus a required custom header (`X-Requested-With: bybee`) and an `Origin` check on every `POST`, `PATCH`, `PUT`, `DELETE`. Frontend and API should share the same registrable domain. |
| Passwords | Argon2id. Minimum length 8. Compare against a short list of common passwords. |
| Verification | Email code (6 digits, 15 minutes, 5 attempts). Phone verification is not part of the MVP. |
| Password reset | Single-use code or link valid 30 minutes. The response is the same whether or not the email exists. |
| Login errors | One generic message ("Email or password is incorrect"). |
| Registration | A registered email returns `409 CONFLICT` for a better user experience, protected by rate limiting. |
| Roles | `job_seeker`, `company_member`, `admin` from `users.role`; company permissions from `company_members.member_role`. |

### Rate limits (starting values)

| Endpoint | Limit |
|---|---|
| `POST /auth/login` | 5 failures per 15 minutes per email and per IP |
| `POST /auth/register` | 10 per hour per IP |
| `POST /auth/verify-email` | 5 attempts per code |
| `POST /auth/resend-verification` | 1 per 60 seconds, 5 per hour |
| `POST /auth/forgot-password` | 5 per hour per IP |
| `POST /reports` | 10 per day per user |
| Other writes | 120 per minute per user |

## 5. Endpoint inventory

Access values: **Public**, **Auth** (any signed-in user), **Seeker**, **Member** (company member with the role shown), **Admin**.

### 5.1 System

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| GET | `/` | Welcome | Public | Done |
| GET | `/health` | Health check | Public | Done |
| GET | `/health/ready` | Readiness (checks database) | Internal | MVP |

### 5.2 Authentication and account

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| POST | `/api/v1/auth/register` | Create account (`account_type`, `full_name`, `email`, `password`, `company_name` for companies) | Public | MVP |
| POST | `/api/v1/auth/verify-email` | Confirm the code and sign in | Public | MVP |
| POST | `/api/v1/auth/resend-verification` | Send a new code | Public | MVP |
| POST | `/api/v1/auth/login` | Sign in | Public | MVP |
| POST | `/api/v1/auth/logout` | Revoke the current session | Auth | MVP |
| POST | `/api/v1/auth/forgot-password` | Request a reset | Public | MVP |
| POST | `/api/v1/auth/reset-password` | Set a new password with the code | Public | MVP |
| POST | `/api/v1/auth/change-password` | Change password (revokes other sessions) | Auth | MVP |
| GET | `/api/v1/users/me` | Own account and profile | Auth | MVP |
| PATCH | `/api/v1/users/me` | Update own profile | Auth | MVP |
| DELETE | `/api/v1/users/me` | Delete account (soft delete plus anonymization) | Auth | Phase 2 |
| PUT | `/api/v1/users/me/skills` | Replace own skill list | Seeker | MVP |

### 5.3 Master data and uploads

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| GET | `/api/v1/skills?q=` | Search skills | Public | MVP |
| GET | `/api/v1/job-categories` | List categories | Public | MVP |
| GET | `/api/v1/cv-templates` | List templates; each has `locked` for the current plan | Public | MVP |
| POST | `/api/v1/uploads` | Upload a file (`purpose`: `avatar`, `company_logo`, `portfolio_image`, `verification_document`) | Auth | MVP |

### 5.4 CVs and portfolios

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| GET | `/api/v1/cvs` | List own CVs | Seeker | MVP |
| POST | `/api/v1/cvs` | Create a CV (checks `max_cvs`, template tier) | Seeker | MVP |
| GET | `/api/v1/cvs/{cv_id}` | Read own CV | Seeker | MVP |
| PATCH | `/api/v1/cvs/{cv_id}` | Update own CV | Seeker | MVP |
| DELETE | `/api/v1/cvs/{cv_id}` | Delete own CV (applications keep their snapshot) | Seeker | MVP |
| POST | `/api/v1/cvs/{cv_id}/exports` | Render a PDF (watermark by plan); sets `exported_at` | Seeker | MVP |
| GET | `/api/v1/portfolios` | List own portfolios | Seeker | MVP |
| POST | `/api/v1/portfolios` | Create a portfolio (checks `max_portfolios`) | Seeker | MVP |
| GET | `/api/v1/portfolios/{portfolio_id}` | Read own portfolio with projects | Seeker | MVP |
| PATCH | `/api/v1/portfolios/{portfolio_id}` | Update (title, slug, visibility) | Seeker | MVP |
| DELETE | `/api/v1/portfolios/{portfolio_id}` | Delete | Seeker | MVP |
| POST | `/api/v1/portfolios/{portfolio_id}/projects` | Add a project (checks `max_projects_per_portfolio`) | Seeker | MVP |
| PATCH | `/api/v1/portfolios/{portfolio_id}/projects/{project_id}` | Update a project | Seeker | MVP |
| DELETE | `/api/v1/portfolios/{portfolio_id}/projects/{project_id}` | Delete a project | Seeker | MVP |
| PUT | `/api/v1/portfolios/{portfolio_id}/projects/order` | Reorder projects | Seeker | MVP |
| GET | `/api/v1/public/portfolios/{slug}` | Public or unlisted portfolio | Public | MVP |

### 5.5 Vacancies and applications (job seeker side)

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| GET | `/api/v1/jobs` | Search published vacancies | Public | MVP |
| GET | `/api/v1/jobs/{job_id}` | Vacancy details (increments views) | Public | MVP |
| GET | `/api/v1/public/companies/{slug}` | Public company page | Public | MVP |
| POST | `/api/v1/jobs/{job_id}/applications` | Apply (`cv_id`, optional `portfolio_id`, `cover_letter`) | Seeker | MVP |
| GET | `/api/v1/applications/me` | List own applications | Seeker | MVP |
| GET | `/api/v1/applications/{application_id}` | Read an application (applicant, or member of the company) | Auth | MVP |
| POST | `/api/v1/applications/{application_id}/withdraw` | Withdraw | Seeker | MVP |
| GET | `/api/v1/applications/{application_id}/history` | Status history (internal notes only for company members) | Auth | MVP |

### 5.6 Company side

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| GET | `/api/v1/companies` | Companies the user belongs to | Member | MVP |
| POST | `/api/v1/companies` | Create another company (caller becomes `owner`) | Member | MVP |
| GET | `/api/v1/companies/{company_id}` | Read company | Member | MVP |
| PATCH | `/api/v1/companies/{company_id}` | Update profile | Member: owner, admin | MVP |
| GET | `/api/v1/companies/{company_id}/members` | List members | Member | MVP |
| POST | `/api/v1/companies/{company_id}/members` | Invite a member | Member: owner, admin | MVP |
| PATCH | `/api/v1/companies/{company_id}/members/{member_id}` | Change role or disable | Member: owner, admin | MVP |
| POST | `/api/v1/companies/{company_id}/verifications` | Submit verification | Member: owner, admin | MVP |
| GET | `/api/v1/companies/{company_id}/verifications` | Verification history | Member: owner, admin | MVP |
| GET | `/api/v1/companies/{company_id}/jobs` | List own vacancies (all statuses) | Member | MVP |
| POST | `/api/v1/companies/{company_id}/jobs` | Create a draft | Member: owner, admin, hr | MVP |
| PATCH | `/api/v1/companies/{company_id}/jobs/{job_id}` | Edit | Member: owner, admin, hr | MVP |
| POST | `/api/v1/companies/{company_id}/jobs/{job_id}/submit` | Submit for review (checks verification and quota) | Member: owner, admin, hr | MVP |
| POST | `/api/v1/companies/{company_id}/jobs/{job_id}/close` | Close | Member: owner, admin, hr | MVP |
| GET | `/api/v1/companies/{company_id}/jobs/{job_id}/stats` | Statistics by plan level | Member: owner, admin, hr | Phase 2 |
| GET | `/api/v1/companies/{company_id}/applications` | Applicants (filters in section 6) | Member | MVP |
| PATCH | `/api/v1/applications/{application_id}/status` | Change status (`status`, `note`) | Member: all roles | MVP |
| GET | `/api/v1/companies/{company_id}/candidates` | Candidate search | Member: eligible plan | Phase 3 |

### 5.7 Plans, subscriptions, payments

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| GET | `/api/v1/plans?target_type=` | List active plans | Public | Phase 2 |
| GET | `/api/v1/subscriptions/me?company_id=` | Current plan and **entitlements** (the plan's `features`) | Auth | Phase 2 |
| POST | `/api/v1/subscriptions` | Start checkout (`plan_id`, `company_id` for company plans) | Auth (company: owner) | Phase 2 |
| POST | `/api/v1/subscriptions/{subscription_id}/cancel` | Stop renewal | Auth (company: owner) | Phase 2 |
| POST | `/api/v1/webhooks/payments/{provider}` | Payment notification | Public, signature required | Phase 2 |

### 5.8 Reports and administration

| Method | Path | Purpose | Access | Phase |
|---|---|---|---|---|
| POST | `/api/v1/reports` | Report a vacancy or company | Auth | MVP |
| GET | `/api/v1/admin/reports` | Review reports | Admin | MVP |
| PATCH | `/api/v1/admin/reports/{report_id}` | Set status (`investigating`, `resolved`, `dismissed`) | Admin | MVP |
| GET | `/api/v1/admin/company-verifications` | Verification queue | Admin | MVP |
| PATCH | `/api/v1/admin/company-verifications/{id}` | Approve, reject, or request revision; sets `companies.verified_at` | Admin | MVP |
| GET | `/api/v1/admin/jobs?status=pending_review` | Vacancy review queue | Admin | MVP |
| POST | `/api/v1/admin/moderation-actions` | Record an action and apply it in one transaction (`approve`/`reject` a vacancy, `hide`, `restore`, `suspend` a company or user) | Admin | MVP |
| GET | `/api/v1/admin/audit-logs` | Audit history | Admin | Phase 2 |
| GET/POST/PATCH | `/api/v1/admin/plans`, `/cv-templates`, `/job-categories`, `/skills` | Manage master data | Admin | Phase 2 |

Every administrator write also creates an `audit_logs` row.

## 6. List endpoints (decided)

| Topic | Decision |
|---|---|
| Pagination | `page` (default 1) and `page_size` (default 20, maximum 100). Response `meta` contains `page`, `page_size`, `total`. |
| Ordering | Always stable: a unique tie-breaker (`id`) is added after the sort field. |

**`GET /jobs` filters:** `q` (keyword in title and description), `category_id`, `location`, `workplace_type`, `employment_type`, `salary_min`, `skill_id` (repeatable), `posted_within_days`.
**`GET /jobs` sort:** `relevance` (default with `q`), `published_at`. Default ordering without `q`: `priority_score DESC, published_at DESC`. Promoted vacancies carry `is_promoted: true` in the response.

**`GET /companies/{id}/applications` filters:** `job_id`, `status`, `applied_from`, `applied_to`. Advanced filters (`skill_id`, `city`, `min_skill_match`) need `applicant_filter = advanced` in the plan, otherwise `403 FEATURE_NOT_IN_PLAN`. **Phone number is never a filter.**

**Sort fields** are whitelisted per endpoint. Unknown values return `422`.

## 7. Plan enforcement

The backend reads `plans.features` of the active subscription (or the Free plan) on every relevant request.

| Endpoint | Check | Error |
|---|---|---|
| `POST /cvs` | number of CVs below `max_cvs`; template tier in `template_tiers` | `PLAN_LIMIT_REACHED`, `TEMPLATE_LOCKED` |
| `POST /cvs/{id}/exports` | `remove_watermark` decides the watermark | none |
| `POST /portfolios` and `.../projects` | `max_portfolios`, `max_projects_per_portfolio` | `PLAN_LIMIT_REACHED` |
| `POST .../jobs/{id}/submit` | company verified; active vacancies (`pending_review` plus `published`) below `max_active_jobs` | `COMPANY_NOT_VERIFIED`, `PLAN_LIMIT_REACHED` |
| Admin approval of a vacancy | `expires_at = published_at + job_listing_days`; `priority_score = priority_level` | none |
| `GET .../applications` with advanced filters | `applicant_filter = advanced` | `FEATURE_NOT_IN_PLAN` |
| `GET .../jobs/{id}/stats` | `job_stats` level decides the metrics returned | none |

When a subscription ends, the rules in `RancanganPaket.md` section 4.2 apply: existing items stay, new ones beyond the Free limit are blocked.

## 8. Payment webhook

1. Read the raw body and verify the provider's signature. Invalid signature returns `401` and logs a warning.
2. Insert the event into `payment_events` with a unique event ID. A duplicate returns `200` and changes nothing.
3. Find the payment by `transaction_reference`. Compare the amount with `payments.amount`.
4. In one transaction, update the payment status and, when paid, activate the subscription and set `start_date` and `end_date`.
5. Always answer quickly; heavy work (emails) is queued.

## 9. File uploads

| Purpose | Types | Max size | Visibility |
|---|---|---|---|
| `avatar`, `company_logo`, `portfolio_image` | JPEG, PNG, WebP | 2 MB | Public |
| `verification_document` | PDF, JPEG, PNG | 5 MB | **Private**, admin and the uploading company only (time-limited link) |

Check the file's real type from its content, not only the extension or `Content-Type`. Rename files to random names. Store them in object storage, not in the application folder.

## 10. HTTP status-code baseline (decided)

| Code | Use |
|---|---|
| `200` | Successful read or update |
| `201` | Created |
| `204` | Success with no body (logout, delete) |
| `400` | Malformed request |
| `401` | Missing or invalid session |
| `403` | Authenticated but forbidden, plan limit |
| `404` | Not found, or hidden because it belongs to someone else |
| `409` | Duplicate, closed vacancy, invalid status transition |
| `413`, `415` | Upload too large, wrong type |
| `422` | **Validation errors** (decided: semantic validation uses `422`, matching Axum's JSON extractor for data errors) |
| `429` | Rate limit exceeded |
| `500` | Unexpected server error |

## 11. API testing checklist

- Public access works only for public routes; protected routes return `401` without a session.
- Ownership: user A cannot read, change, or delete user B's CV, portfolio, or application (`404`).
- Company permissions: each role in the permission matrix is tested for allowed and forbidden actions; a member of company X cannot touch company Y.
- Invalid payloads: missing fields, wrong types, oversized text, unknown fields, invalid enum values.
- Duplicates: apply twice, register the same email twice, double-click on checkout.
- Concurrency: two simultaneous applications from the same user; two simultaneous submits at the plan limit.
- Status rules: every forbidden transition returns `409 INVALID_STATUS_TRANSITION`.
- Plan limits on every endpoint in section 7, with a Free and a Pro account.
- Payment webhook: valid, forged signature, duplicate, amount mismatch, unknown reference.
- Database errors never leak SQL text or stack traces.
- Responses never contain `password_hash`, session tokens, verification code hashes, or other users' private data.
- Rate limits return `429` with a `Retry-After` header.

## 12. Implementation status

| Component | Status |
|---|---|
| Axum server | Running locally |
| `GET /`, `GET /health` | Template endpoints |
| PostgreSQL through SQLx | Planned |
| Migrations 001–010 | Planned (`Erd.md` section 6) |
| Authentication and sessions | Not implemented |
| CV, portfolio, jobs, applications | Proposed |
| Company, verification, moderation | Proposed |
| Subscription and payment | Proposed |

**Suggested build order:** migrations and database connection → error type and response format → sessions and auth → profile → CV → portfolio → jobs (public) → company and vacancies → applications → admin review → plans and payments.
