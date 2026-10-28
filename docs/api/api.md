# ByBee Project --- API Documentation

**Status:** Initial API design draft\
**Backend:** Rust + Axum\
**Database:** PostgreSQL; SQLx connection planned\
**Last updated:** 27 October 2026

## 1. Current implementation

The current backend template provides: - `GET /` --- basic welcome
response. - `GET /health` --- health-check response. The local server
listens on `127.0.0.1:3000`.

All `/api/v1` routes below are proposals, not claims that they are
implemented.

## 2. API conventions to adopt

-   Prefix feature routes with `/api/v1`.
-   Use JSON unless a route explicitly handles files.
-   Validate all input on the server.
-   Authenticate protected routes and enforce resource-level
    authorization.
-   Never trust role, company ID, subscription status, or ownership
    claims supplied only by the frontend.
-   Keep secrets in environment variables; never commit `.env`.
-   Never return password hashes, payment secrets, or unnecessary
    personal data.

## 3. Proposed response format

Success:

``` json
{ "data": { "id": "resource-id" } }
```

Error:

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields",
    "details": []
  }
}
```

These are proposed conventions; settle on one format and apply it
consistently.

## 4. Proposed endpoint inventory

  ---------------------------------------------------------------------------------------------------------------
  Method             Path                                             Purpose              Access
  ------------------ ------------------------------------------------ -------------------- ----------------------
  GET                `/`                                              Welcome              Public

  GET                `/health`                                        Health check         Public/internal

  POST               `/api/v1/auth/register`                          Register             Public

  POST               `/api/v1/auth/login`                             Sign in              Public

  POST               `/api/v1/auth/logout`                            End session, if      Authenticated
                                                                      applicable           

  GET                `/api/v1/users/me`                               Read own profile     Authenticated

  PATCH              `/api/v1/users/me`                               Update own profile   Authenticated

  GET                `/api/v1/cv-templates`                           List templates       Public/authenticated
                                                                                           TBD

  GET/POST           `/api/v1/cvs`                                    List/create own CVs  Authenticated

  GET/PATCH/DELETE   `/api/v1/cvs/{cv_id}`                            Read/update/delete   Authenticated +
                                                                      owned CV             ownership

  GET/POST           `/api/v1/portfolios`                             List/create own      Authenticated
                                                                      portfolios           

  GET                `/api/v1/jobs`                                   Search published     Public
                                                                      vacancies            

  GET                `/api/v1/jobs/{job_id}`                          Vacancy details      Public, subject to
                                                                                           visibility

  POST               `/api/v1/jobs/{job_id}/applications`             Apply                Authenticated job
                                                                                           seeker

  GET                `/api/v1/applications/me`                        List own             Authenticated
                                                                      applications         

  GET/POST           `/api/v1/companies`                              List authorized      Authenticated
                                                                      companies/create     
                                                                      company              

  POST               `/api/v1/companies/{company_id}/jobs`            Create vacancy       Authorized company
                                                                                           member

  GET                `/api/v1/companies/{company_id}/applications`    List company         Authorized company
                                                                      applicants           member

  PATCH              `/api/v1/applications/{application_id}/status`   Update application   Authorized employer
                                                                      status               

  GET                `/api/v1/plans`                                  List plans           Public

  GET                `/api/v1/subscriptions/me`                       Read own             Authenticated
                                                                      subscription         

  POST               `/api/v1/subscriptions`                          Start checkout       Authenticated; payment
                                                                                           integration required

  POST               `/api/v1/reports`                                Report content       Authenticated

  GET                `/api/v1/admin/reports`                          Review reports       Administrator

  POST               `/api/v1/admin/moderation-actions`               Record moderation    Administrator
                                                                      action               
  ---------------------------------------------------------------------------------------------------------------

Implement incrementally after requirements and authorization rules are
finalized.

## 5. Authentication decisions still required

Choose cookie sessions or bearer tokens; expiry/renewal; password
hashing and reset flow; email verification; logout/revocation;
role/permission model; CSRF protection if cookie-based; rate limits for
sensitive endpoints.

## 6. List endpoints

Choose consistent pagination (`page`/`page_size` or cursor), maximum
page size, allowed sort fields, filters, and stable ordering. Candidate
vacancy filters include keyword, category, location, work arrangement,
and employment type; confirm actual supported fields.

## 7. HTTP status-code baseline

  Code    Intended use
  ------- ---------------------------------------
  `200`   Successful read/update
  `201`   Created
  `204`   Success with no body
  `400`   Malformed request
  `401`   Missing/invalid authentication
  `403`   Authenticated but forbidden
  `404`   Not found or intentionally concealed
  `409`   Duplicate/conflicting state
  `422`   Semantic validation error, if adopted
  `429`   Rate limit exceeded
  `500`   Unexpected server error

Choose consistently whether semantic validation uses `400` or `422`.

## 8. API testing checklist

Test public access, unauthenticated rejection, resource ownership,
company permissions, invalid payloads, duplicate submissions, safe
database errors, backend-enforced subscription limits, and
sensitive-field filtering.

## 9. Implementation status

  Component                           Status
  ----------------------------------- -----------------------------
  Axum server                         Running locally
  `GET /`, `GET /health`              Template endpoints
  PostgreSQL through SQLx             Planned / not yet confirmed
  Authentication                      Not implemented
  CV, portfolio, jobs, applications   Proposed
  Subscription/payment                Proposed
