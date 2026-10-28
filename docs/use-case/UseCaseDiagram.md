# ByBee Project — Use Case & Alur Sistem

> Dokumen pendamping [`UseCase.md`](./UseCase.md) (keputusan, ID use case, aturan akses). Dokumen ini menyempurnakan bagian *Desain Sistem* di plan awal. Semua diagram memakai [Mermaid](https://mermaid.js.org/) dan tampil otomatis di GitHub/GitLab.
> Nama tabel dan status mengacu ke `backend/migrations` dan `docs/erd/erd.md`.

---

## 1. Aktor

Plan awal memiliki tiga aktor. Setelah dicocokkan dengan schema database, daftarnya menjadi:

| Aktor | Role di database | Keterangan |
|---|---|---|
| **Tamu (Guest)** | — | Pengunjung belum login. Dapat melihat loker publik, portofolio publik, dan halaman landing |
| **Pencari Kerja** (*Pengguna* di plan awal) | `users.role = job_seeker` | Membuat CV, portofolio, melamar loker, berlangganan Pro |
| **Anggota Perusahaan** (*HRD / Perwakilan Perusahaan* di plan awal) | `users.role = company_member` + `company_members.member_role` (`owner`, `admin`, `hr`, `recruiter`) | Mengelola profil perusahaan, memasang loker, mengelola pelamar |
| **Admin ByBee** | `users.role = admin` | Verifikasi perusahaan, moderasi loker dan report, kelola paket |
| **Payment Gateway** (sistem eksternal) | — | Memproses pembayaran dan mengirim webhook |
| **Penyedia Email / WhatsApp** (sistem eksternal) | — | Mengirim kode verifikasi dan notifikasi |

**Perubahan dari plan awal**

- Tugas admin di plan awal hanya *maintenance website dan database*. Itu pekerjaan operasional/DevOps, bukan use case aplikasi. Peran admin di aplikasi adalah **verifikasi, moderasi, dan manajemen paket**.
- Aktor **Tamu** ditambahkan karena sebagian fitur (lihat loker, lihat portofolio publik) tidak memerlukan login.
- Use case "Free and Pro" digabung ke satu use case; perbedaan Free/Pro diatur oleh **aturan paket** (lihat bagian 5), bukan use case terpisah.

---

## 2. Diagram Use Case

Mermaid tidak punya diagram use case native, jadi diagram di bawah memakai flowchart dengan aktor di sisi kiri/kanan.

### 2.1 Gambaran Umum

```mermaid
flowchart LR
    G([Tamu])
    JS([Pencari Kerja])
    CM([Anggota Perusahaan])
    AD([Admin ByBee])
    PG([Payment Gateway])
    NP([Penyedia Email / WA])

    subgraph SYS[Sistem ByBee Project]
        direction TB
        UC1(Daftar & Verifikasi Akun)
        UC2(Login / Logout)
        UC3(Kelola Profil & Skill)
        UC4(Buat & Ekspor CV)
        UC5(Kelola Portofolio)
        UC6(Cari & Lihat Loker)
        UC7(Lamar Loker)
        UC8(Pantau / Tarik Lamaran)
        UC9(Berlangganan Paket)
        UC10(Kelola Profil Perusahaan)
        UC11(Ajukan Verifikasi Perusahaan)
        UC12(Kelola Lowongan)
        UC13(Kelola Pelamar)
        UC14(Cari Kandidat - Fase 3)
        UC15(Kelola Anggota Tim)
        UC16(Laporkan Loker / Perusahaan)
        UC17(Verifikasi Perusahaan)
        UC18(Moderasi Loker & Report)
        UC19(Kelola Paket & Template)
        UC20(Lihat Audit Log)
        UC21(Lihat Portofolio Publik)
    end

    G --- UC1
    G --- UC2
    G --- UC6
    G --- UC21

    JS --- UC2
    JS --- UC3
    JS --- UC4
    JS --- UC5
    JS --- UC6
    JS --- UC7
    JS --- UC8
    JS --- UC9
    JS --- UC16

    CM --- UC2
    CM --- UC10
    CM --- UC11
    CM --- UC12
    CM --- UC13
    CM --- UC14
    CM --- UC15
    CM --- UC9
    CM --- UC16

    AD --- UC17
    AD --- UC18
    AD --- UC19
    AD --- UC20

    UC1 --- NP
    UC9 --- PG
    UC13 --- NP
```

### 2.2 Relasi antar use case

```mermaid
flowchart LR
    UC7(Lamar Loker) -. include .-> UC4a(Pilih / Buat CV)
    UC7 -. include .-> UC2a(Login)
    UC12(Kelola Lowongan) -. include .-> UC2a
    UC12 -. extend .-> UC9a(Berlangganan Paket)
    UC4(Ekspor CV tanpa watermark) -. extend .-> UC9a
    UC14(Cari Kandidat) -. include .-> UC11a(Perusahaan Terverifikasi)
    UC14 -. extend .-> UC9a
```

> `include` = selalu dijalankan sebagai bagian dari use case. `extend` = hanya terjadi bila kondisi terpenuhi (misalnya batas paket Free terlampaui).

---

## 3. Katalog Use Case

Katalog use case (ID UC-01 sampai UC-28), fase, dan catatan keputusan ada di [`UseCase.md`](./UseCase.md). File ini hanya berisi **diagram dan flowchart**, jadi tidak ada daftar ID ganda di sini.

---

## 4. Alur Utama (Flowchart)

### 4.1 Registrasi dan Login

Flowchart di plan awal sudah menggambarkan registrasi dengan nama, email, nomor WhatsApp, dan password, serta login dengan email atau nomor WhatsApp. Versi di bawah mempertahankan alur itu dengan perbaikan berikut:

- Pilihan **tipe akun** (pencari kerja atau perusahaan) saat registrasi. Plan awal belum punya flowchart registrasi perusahaan.
- Akun baru dibuat berstatus `pending` dan menjadi `active` setelah verifikasi (konsisten dengan `account_status`).
- Login memakai **email** pada MVP; login dengan nomor WA menunggu verifikasi nomor (fase lanjut).
- Pesan error login **tidak membocorkan** apakah email terdaftar ("Email belum terdaftar" memudahkan penyerang menebak akun).
- Ada **batas percobaan** (rate limit) dan **kirim ulang kode**.
- Ada alur **lupa password**.

```mermaid
flowchart TD
    A([Mulai]) --> B[Tampilkan halaman awal]
    B --> C{Pilih aksi}

    C -- Daftar --> R1[Pilih tipe akun:<br/>Pencari Kerja / Perusahaan]
    R1 --> R2[Isi nama, email, nomor WA opsional,<br/>password, konfirmasi password]
    R2 --> R3{Validasi input<br/>dan email unik?}
    R3 -- Tidak --> R2e[Tampilkan pesan error<br/>pada kolom terkait] --> R2
    R3 -- Ya --> R4[Buat akun status pending<br/>Kirim kode verifikasi]
    R4 --> R5[Pengguna memasukkan kode]
    R5 --> R6{Kode benar<br/>dan belum kedaluwarsa?}
    R6 -- Tidak --> R7{Percobaan<br/>masih tersisa?}
    R7 -- Ya --> R5
    R7 -- Tidak --> R8[Blokir sementara<br/>Tawarkan kirim ulang] --> Z
    R6 -- Ya --> R9[Akun menjadi active]
    R9 --> R10{Tipe akun<br/>perusahaan?}
    R10 -- Ya --> R11[Lengkapi profil perusahaan<br/>buat companies + company_members owner]
    R10 -- Tidak --> R12[Lengkapi profil dasar]
    R11 --> Z
    R12 --> Z

    C -- Login --> L1["Isi email dan password<br/>(nomor WA menyusul setelah terverifikasi)"]
    L1 --> L2{Kredensial benar<br/>dan akun active?}
    L2 -- Tidak --> L3[Tampilkan pesan umum:<br/>Email/nomor atau password salah]
    L3 --> L4{Gagal berulang?}
    L4 -- Ya --> L5[Terapkan rate limit] --> Z
    L4 -- Tidak --> L1
    L2 -- Ya --> L6[Terbitkan sesi<br/>Perbarui last_login_at]
    L6 --> L7[Arahkan ke dashboard<br/>sesuai role]
    L7 --> Z

    C -- Lupa password --> F1[Isi email] --> F2[Kirim tautan reset<br/>respons selalu sama] --> Z

    Z([Selesai])
```

### 4.2 Membuat CV dan Portofolio

```mermaid
flowchart TD
    A([Pencari Kerja login]) --> B{Pilih menu}

    B -- CV Builder --> C1[Pilih template<br/>cv_templates]
    C1 --> C2{Template premium<br/>dan belum Pro?}
    C2 -- Ya --> C3[Tawarkan upgrade] --> C1
    C2 -- Tidak --> C4[Isi dan edit data CV<br/>disimpan ke cvs.cv_data]
    C4 --> C5[Pratinjau]
    C5 --> C6{Unduh PDF?}
    C6 -- Tidak --> C4
    C6 -- Ya --> C7{Pengguna Pro?}
    C7 -- Ya --> C8[PDF tanpa watermark]
    C7 -- Tidak --> C9[PDF dengan watermark ByBee]
    C8 --> C10[Catat exported_at]
    C9 --> C10

    B -- Portofolio --> P1[Buat / pilih portofolio]
    P1 --> P2[Isi judul, deskripsi, slug]
    P2 --> P3[Tambah proyek:<br/>nama, tautan, repo, gambar, tanggal]
    P3 --> P4[Atur urutan proyek]
    P4 --> P5{Pilih visibilitas}
    P5 -- private --> P6[Hanya pemilik]
    P5 -- unlisted --> P7[Siapa pun yang punya tautan]
    P5 -- public --> P8[Tampil publik dan dapat dicari]
```

### 4.3 Mencari dan Melamar Loker

```mermaid
flowchart TD
    A([Mulai]) --> B[Buka daftar loker published]
    B --> C[Cari / filter:<br/>kategori, lokasi, tipe kerja, gaji, skill]
    C --> D[Buka detail loker]
    D --> E{Ingin melamar?}
    E -- Tidak --> Z([Selesai])
    E -- Ya --> F{Sudah login?}
    F -- Tidak --> F1[Login / daftar] --> G
    F -- Ya --> G{Sudah pernah melamar<br/>loker ini?}
    G -- Ya --> G1[Tampilkan status lamaran] --> Z
    G -- Tidak --> H{Loker masih terbuka?<br/>deadline belum lewat}
    H -- Tidak --> H1[Tampilkan: lowongan ditutup] --> Z
    H -- Ya --> I[Pilih CV, portofolio public/unlisted opsional,<br/>dan isi surat lamaran]
    I --> J[Kirim lamaran status submitted<br/>salin CV ke cv_snapshot]
    J --> K[Catat application_status_history]
    K --> L[Notifikasi ke perusahaan]
    L --> Z
```

### 4.4 Memasang Lowongan (Perusahaan)

```mermaid
flowchart TD
    A([Anggota perusahaan login]) --> B[Buka menu Lowongan]
    B --> C[Buat lowongan baru<br/>status draft]
    C --> D[Isi judul, deskripsi, kategori, tipe kerja,<br/>lokasi, gaji, deadline, skill]
    D --> F{Perusahaan sudah<br/>terverifikasi?}
    F -- Tidak --> F1[Arahkan ajukan verifikasi<br/>loker tetap draft] --> Z
    F -- Ya --> E{Loker aktif sudah mencapai<br/>batas paket?}
    E -- Ya --> E1[Tawarkan berlangganan] --> D
    E -- Tidak --> G[Kirim untuk ditinjau<br/>status pending_review]
    G --> H{Admin meninjau}
    H -- Setuju --> I[Status published<br/>isi published_at]
    H -- Tolak --> J[Status rejected<br/>dengan alasan] --> D
    I --> K[expires_at = published_at + masa tayang paket<br/>tayang hingga deadline atau expires_at]
    K --> L[Tutup manual atau otomatis<br/>status closed]
    L --> Z([Selesai])
```

### 4.5 Mengelola Pelamar dan Mencari Kandidat

```mermaid
flowchart TD
    A([Anggota perusahaan login]) --> B{Pilih menu}

    B -- Pelamar --> P1[Pilih lowongan]
    P1 --> P2[Lihat daftar pelamar<br/>CV, portofolio, surat lamaran]
    P2 --> P2a[Filter pelamar: status, tanggal;<br/>skill dan kota untuk paket Pro]
    P2a --> P3[Ubah status:<br/>reviewing, shortlisted, interview,<br/>accepted, rejected]
    P3 --> P4[Catat application_status_history<br/>dengan catatan]
    P4 --> P5[Notifikasi ke pelamar]

    B -- Cari kandidat - Fase 3 --> K1{Perusahaan terverifikasi<br/>dan paket mengizinkan?}
    K1 -- Tidak --> K2[Tampilkan syarat / tawarkan upgrade]
    K1 -- Ya --> K3[Filter: skill, kota, level]
    K3 --> K4[Hanya tampilkan pengguna<br/>yang mengaktifkan terbuka untuk dihubungi]
    K4 --> K5[Lihat profil dan portofolio publik]
    K5 --> K6[Hubungi kandidat lewat platform<br/>kontak penuh hanya dengan izin kandidat]
```

### 4.6 Langganan dan Pembayaran

```mermaid
flowchart TD
    A([Pengguna login]) --> B[Pilih paket dari plans<br/>sesuai target_type]
    B --> C[Buat subscriptions status pending<br/>dan payments status pending]
    C --> D[Arahkan ke payment gateway]
    D --> E{Hasil pembayaran}
    E -- Berhasil --> F[Webhook diterima dan diverifikasi<br/>tanda tangan dan transaction_reference]
    F --> G[payments = paid<br/>subscriptions = active<br/>isi start_date dan end_date]
    E -- Gagal / kedaluwarsa --> H[payments = failed / cancelled<br/>subscriptions tetap pending]
    G --> I[Fitur Pro aktif]
    I --> J[Pengingat H-7 dan H-1<br/>perpanjangan manual]
    J --> K{Dibayar sebelum end_date?}
    K -- Ya --> M[Periode baru dimulai pada end_date lama]
    K -- Tidak --> L[subscriptions = expired<br/>fitur kembali ke Free<br/>item yang ada tetap, item baru dibatasi]
```

### 4.7 Verifikasi Perusahaan dan Moderasi (Admin)

```mermaid
flowchart TD
    A([Admin login]) --> B{Antrean}

    B -- Verifikasi perusahaan --> V1[Buka pengajuan pending]
    V1 --> V2[Periksa dokumen dan profil]
    V2 --> V3{Keputusan}
    V3 -- Setuju --> V4[approved]
    V3 -- Perlu revisi --> V5[needs_revision + catatan]
    V3 -- Tolak --> V6[rejected + alasan]
    V4 --> V7[Catat moderation_actions dan audit_logs]
    V5 --> V7
    V6 --> V7

    B -- Loker pending_review --> J1[Periksa isi loker]
    J1 --> J2{Layak tayang?}
    J2 -- Ya --> J3[published]
    J2 -- Tidak --> J4[rejected + alasan]
    J3 --> V7
    J4 --> V7

    B -- Report --> R1[Tinjau report open]
    R1 --> R2[investigating]
    R2 --> R3{Terbukti melanggar?}
    R3 -- Ya --> R4[Sembunyikan / suspend<br/>resolved]
    R3 -- Tidak --> R5[dismissed]
    R4 --> V7
    R5 --> V7
```

---

## 5. Status dan Aturan Bisnis

### 5.1 Status lamaran (`applications.application_status`)

```mermaid
stateDiagram-v2
    [*] --> submitted
    submitted --> reviewing
    submitted --> rejected
    submitted --> withdrawn
    reviewing --> shortlisted
    reviewing --> rejected
    reviewing --> withdrawn
    shortlisted --> interview
    shortlisted --> rejected
    shortlisted --> withdrawn
    interview --> accepted
    interview --> rejected
    interview --> withdrawn
    accepted --> [*]
    rejected --> [*]
    withdrawn --> [*]
```

### 5.2 Status lowongan (`jobs.job_status`)

```mermaid
stateDiagram-v2
    [*] --> draft
    draft --> pending_review: kirim untuk ditinjau
    pending_review --> published: disetujui admin
    pending_review --> rejected: ditolak admin
    rejected --> draft: diperbaiki
    published --> closed: ditutup / kedaluwarsa
    closed --> [*]
```

### 5.3 Status langganan (`subscriptions.subscription_status`)

```mermaid
stateDiagram-v2
    [*] --> pending
    pending --> active: pembayaran berhasil
    pending --> cancelled: dibatalkan
    active --> expired: end_date tercapai
    active --> past_due: perpanjangan gagal
    active --> cancelled: dihentikan
    past_due --> active: dibayar
    past_due --> expired
    expired --> [*]
    cancelled --> [*]
```

### 5.4 Aturan bisnis utama

| Kode | Aturan | Ditegakkan di |
|---|---|---|
| BR-01 | Satu pengguna hanya boleh melamar satu kali per loker | Database (`UNIQUE (job_id, user_id)`) |
| BR-02 | Hanya loker `published` yang tampil ke publik | Backend (query) |
| BR-03 | Lamaran hanya diterima sebelum `deadline` dan saat loker `published` | Backend |
| BR-04 | Satu langganan milik **satu** pengguna **atau** satu perusahaan | Database (CHECK pada `subscriptions`) |
| BR-05 | Paket harus cocok dengan target (`plans.target_type`) | Backend |
| BR-06 | Satu pemilik hanya boleh punya satu langganan `active` per target | Disarankan: *partial unique index* |
| BR-07 | Template `is_premium` hanya bisa dipakai pengguna Pro | Backend |
| BR-08 | CV gratis diekspor dengan watermark | Backend (PDF) |
| BR-09 | Hanya anggota perusahaan dengan role sesuai yang dapat mengelola loker/pelamar | Backend (middleware peran) |
| BR-10 | Loker hanya bisa dikirim untuk ditinjau bila perusahaan terverifikasi, dan hanya tayang setelah disetujui admin | Backend (`pending_review`) |
| BR-11 | Perubahan status lamaran selalu dicatat di `application_status_history` | Backend (transaksi) |
| BR-12 | Kandidat hanya muncul di pencarian jika mengaktifkan opt-in (fase 3) | Kolom `user_profiles.is_discoverable` (S12 di `Erd.md`) |
| BR-13 | Masa tayang loker: Free 30 hari, Pro Bulanan 60 hari, Pro Tahunan 150 hari | Backend + `plans.features.job_listing_days` |
| BR-14 | Tindakan admin dicatat di `moderation_actions` dan `audit_logs` | Backend |

### 5.5 Matriks hak akses

| Fitur | Tamu | Pencari Kerja | Anggota Perusahaan | Admin |
|---|:-:|:-:|:-:|:-:|
| Lihat loker published | ✅ | ✅ | ✅ | ✅ |
| Lihat portofolio public / unlisted | ✅ | ✅ | ✅ | ✅ |
| Kelola CV dan portofolio sendiri | — | ✅ | — | — |
| Melamar loker | — | ✅ | — | — |
| Kelola profil perusahaan | — | — | ✅ (owner/admin) | — |
| Posting dan edit loker | — | — | ✅ (owner/admin/hr/recruiter) | — |
| Kelola pelamar | — | — | ✅ | — |
| Cari kandidat | — | — | ✅ (terverifikasi + paket) | — |
| Kelola anggota tim | — | — | ✅ (owner/admin) | — |
| Berlangganan | — | ✅ | ✅ | — |
| Verifikasi perusahaan, moderasi, audit log | — | — | — | ✅ |
| Kelola paket, template, kategori | — | — | — | ✅ |

---

## 6. Catatan Perbaikan dari Plan Awal

1. Flowchart plan awal untuk **HRD/perwakilan perusahaan**, **menu portofolio**, **menu info loker**, **posting job**, dan **menu kandidat** masih berupa judul tanpa gambar. Bagian 4.2 sampai 4.5 mengisi kekosongan itu.
2. Use case plan awal menggabungkan "Upload Portofolio and Find Job". Di sini dipisah karena aktornya, prasyarat, dan tabelnya berbeda.
3. Use case yang belum ada di plan awal tetapi dibutuhkan schema: **lamar loker, pantau lamaran, langganan, verifikasi perusahaan, laporan, moderasi, kelola anggota tim**.
4. Nomor WhatsApp muncul di flowchart registrasi, tetapi **belum ada kolomnya di tabel `users`** (hanya `user_profiles.phone`). Pada MVP nomor bersifat opsional dan belum dipakai untuk login; lihat S1 di `docs/erd/Erd.md`.
