# ByBee Project — Business Plan

> Dokumen terkait: [`VisiMisi.md`](./VisiMisi.md), [`RancanganPaket.md`](./RancanganPaket.md). Bila angka paket berbeda, **`RancanganPaket.md` yang berlaku**.

> Versi: 1.0 (draft yang disempurnakan dari *ByBee Project Plan.docx*)
> Status: hipotesis yang perlu divalidasi. Angka harga dan proyeksi adalah **asumsi**, bukan fakta pasar.

---

## 1. Ringkasan Eksekutif

**ByBee Project** adalah platform karier all-in-one untuk pasar Indonesia. Pengguna dapat membuat **CV/resume interaktif** (berbasis template, ramah ATS), membangun **portofolio online**, lalu langsung **melamar lowongan** di platform yang sama. Perusahaan memasang lowongan dan mencari kandidat dari satu dashboard.

**Pembeda utama:** CV + portofolio + lamaran berada dalam satu alur. Saat melamar, HRD melihat CV *dan* portofolio kandidat tanpa berpindah platform. Bagi desainer, developer, dan fresh graduate, portofolio sering menentukan lolos atau tidaknya seleksi.

**Model bisnis:** freemium. Pencari kerja bisa memakai fitur dasar gratis dan membayar untuk Pro. Perusahaan bisa memasang lowongan terbatas secara gratis dan berlangganan tahunan untuk fitur penuh.

---

## 2. Masalah dan Peluang

| Pihak | Masalah | Solusi ByBee |
|---|---|---|
| Fresh graduate / pencari kerja | Membuat CV yang rapi dan lolos ATS itu sulit; portofolio tersebar di banyak tempat | Template CV ATS + portofolio publik satu link |
| Desainer / developer / kreator | Platform loker umum tidak menonjolkan portofolio | Halaman portofolio yang ikut terkirim saat melamar |
| UMKM / startup | Memasang loker di portal besar mahal; kandidat sulit disaring | Loker murah/gratis, filter kandidat berbasis skill |
| Semua pihak | Loker palsu dan penipuan rekrutmen | Verifikasi perusahaan, moderasi loker, fitur report |

---

## 3. Target Pasar

**Segmen utama (beachhead):** mahasiswa tingkat akhir, fresh graduate, dan pekerja kreatif/IT usia 20–30 tahun di kota-kota besar Indonesia.
**Segmen perusahaan:** startup, agensi kreatif, software house, dan UMKM yang rutin merekrut tetapi anggaran rekrutmennya kecil.

> **Rekomendasi:** fokus ke satu niche dulu (misalnya *kreator & IT*), bukan semua industri. Dengan begitu pasokan loker dan pencari kerja bisa menumpuk di satu tempat.

---

## 4. Layanan dan Prioritas

Plan awal memuat empat layanan. Saya menyarankan memecahnya menjadi **inti (MVP)** dan **pengembangan lanjutan**, sesuai tingkat kepastian yang sudah Anda tandai.

| # | Layanan | Status | Fase |
|---|---|---|---|
| 1 | CV & Resume Interaktif (template, edit, unduh PDF) | Inti | Fase 1 |
| 2 | Portofolio online (halaman publik/unlisted/private) | Inti | Fase 1 |
| 3 | Info Loker & lamaran (sisi pencari kerja dan perusahaan) | Inti | Fase 1 |
| 4 | Langganan Pro, pembayaran, verifikasi perusahaan | Inti (monetisasi) | Fase 2 |
| 5 | Resource desain (template, aset, panduan) | Perlu didefinisikan | Fase 3 |
| 6 | Jasa pembuatan landing page perusahaan | Belum pasti | Fase 4 (opsional) |
| 7 | Crawling data insight perusahaan | Belum pasti, **berisiko hukum** | Ditunda |

**Catatan tentang "Resource Desain".** Plan menyebut layanan ini di judul, tetapi isinya belum dijelaskan dan belum ada tabelnya di database. Tentukan dulu bentuknya: kumpulan template gratis, panduan menulis CV, atau aset desain yang dijual. Sampai itu jelas, anggap ini fase 3.

**Catatan tentang crawling data sosial media.** Mengambil data dari sosial media biasanya melanggar syarat layanan platformnya. Jika memuat data pribadi, juga berpotensi melanggar UU Pelindungan Data Pribadi (UU No. 27 Tahun 2022). Jika tetap ingin dikembangkan, batasi pada data publik perusahaan dari sumber resmi atau API resmi, dan minta pendapat ahli hukum dulu.

---

## 5. Model Pendapatan

Rincian fitur, batas, dan aturan paket ada di [`RancanganPaket.md`](./RancanganPaket.md). Ringkasannya:

### 5.1 Pencari Kerja

| Paket | Inti paket | Harga usulan |
|---|---|---|
| **Free** | Template dasar, PDF dengan watermark, 2 versi CV, 1 portofolio (5 proyek) | Rp 0 |
| **Pro Bulanan** | Tanpa watermark, template premium terpilih, 10 versi CV, portofolio lanjutan | Rp 29.000 / bulan |
| **Pro Tahunan** | Semua template premium, 30 versi CV, portofolio lanjutan | Rp 179.000 / tahun (hemat ±49%) |

Melamar lowongan **tetap gratis** untuk semua paket.

Opsi tambahan yang bisa diuji: **paket 7 hari** atau **sekali bayar per CV** untuk pengguna yang hanya butuh CV saat melamar.

### 5.2 Perusahaan

| Paket | Inti paket | Harga usulan |
|---|---|---|
| **Free** | 1 lowongan aktif, tayang 30 hari, filter pelamar dasar, statistik dasar | Rp 0 |
| **Pro Bulanan** | 10 lowongan aktif, tayang 60 hari, filter pelamar lanjutan, statistik terbatas, prioritas tayang | Rp 199.000 / bulan |
| **Pro Tahunan** | 30 lowongan aktif, tayang 150 hari, filter lanjutan, statistik lengkap, prioritas tayang | Rp 1.990.000 / tahun (hemat ±17%) |

Opsi untuk perusahaan kecil: **bayar per lowongan** (misal Rp 150.000 per posting), supaya tidak harus langsung berlangganan.

> **Badge Verified tidak dijual.**
> Plan awal menyebut *badge centang kuning sebagai tanda perusahaan resmi* sebagai benefit langganan. Jika badge itu bisa dibeli, pencari kerja bisa tertipu karena perusahaan palsu pun bisa tampak "resmi". Rancangan paket terbaru sudah memisahkannya:
> - **Verified** (centang): gratis dan sama untuk semua paket, diberikan setelah admin memeriksa dokumen perusahaan (tabel `company_verifications`). Perusahaan **harus terverifikasi** sebelum lowongannya bisa ditinjau.
> - **Pro** (label paket): tanda langganan, tampilannya berbeda dan tidak mengklaim "resmi". Lowongan dengan prioritas diberi label "Promoted".

### 5.3 Pendapatan lain (opsional, fase lanjut)

- Loker "featured" / boost per posting.
- Penjualan resource desain dan template premium.
- Jasa landing page (`service_packages`, `service_orders` di schema).
- Kerja sama dengan kampus/bootcamp (lisensi massal untuk alumni).

---

## 6. Estimasi Biaya

Bagian "Estimasi Biaya" pada plan awal masih kosong. Tabel di bawah adalah **estimasi awal**. Biaya tenaga kerja pengembang tidak dihitung.

### Biaya bulanan tetap (tahap awal)

| Komponen | Estimasi / bulan | Dasar |
|---|---|---|
| VPS (4 GB RAM) | ± Rp 320.000 | Paket VPS 4 GB di penyedia lokal berkisar Rp 100.000–320.000/bulan menurut daftar [whtop](https://www.whtop.com/id/plans/domainesia.com/148845) |
| Domain (.com / .id) | ± Rp 15.000 | Asumsi ±Rp 180.000/tahun; **cek harga resmi registrar** |
| Backup & object storage (foto, logo, dokumen) | ± Rp 50.000 | Asumsi |
| Email transaksional (OTP, notifikasi) | Rp 0–100.000 | Biasanya ada tier gratis |
| Lain-lain (monitoring, cadangan) | ± Rp 50.000 | Asumsi |
| **Total** | **± Rp 0,5 juta / bulan** | |

### Biaya variabel

| Komponen | Catatan |
|---|---|
| Payment gateway (Midtrans / Xendit / Duitku) | Dipotong per transaksi (persentase atau flat per metode). **Cek tarif terbaru** sebelum menentukan harga |
| OTP WhatsApp | Lihat bagian 9; tarif per pesan mengikuti penyedia resmi |

### Titik impas (break-even) kasar

Dengan biaya tetap ± Rp 500.000/bulan dan asumsi potongan gateway ±5%:

- Pencari kerja Pro Bulanan Rp 29.000 → bersih ± Rp 27.500 → **± 19 pelanggan aktif** (Pro Tahunan: ± 36).
- Perusahaan Pro Bulanan Rp 199.000 → bersih ± Rp 189.000 → **± 3 perusahaan** (Pro Tahunan: ± 4).

Perhitungan per paket ada di `RancanganPaket.md` bagian 6.

Angka ini kecil, jadi hambatan utamanya adalah **mendapatkan pengguna**, bukan biaya server.

---

## 7. Strategi Go-To-Market

Masalah terbesar platform dua sisi adalah *cold start*: pencari kerja tidak datang bila belum ada loker, dan perusahaan tidak datang bila belum ada kandidat.

1. **Sisi pencari kerja dulu.** CV builder dan portofolio berguna tanpa loker, jadi ini pintu masuk yang aman. Targetkan mahasiswa lewat kampus, komunitas, dan konten (tips CV ATS, template gratis).
2. **Loker awal dikurasi manual.** Ajak 20–50 startup dan agensi kenalan untuk memasang loker gratis di tahun pertama dengan imbalan masukan.
3. **Loop viral portofolio.** Setiap halaman portofolio publik membawa tautan "Dibuat dengan ByBee" (dan CV gratis membawa watermark).
4. **SEO.** Halaman loker dan portofolio publik harus bisa dirayapi mesin pencari (SSR atau pre-render untuk halaman publik; lihat catatan di `docs/review`).
5. **Kemitraan.** Kampus, bootcamp, dan komunitas desainer/developer.

---

## 8. Analisis Persaingan

| Pesaing | Kekuatan | Celah yang bisa diisi ByBee |
|---|---|---|
| Portal loker besar (mis. JobStreet, Glints, Kalibrr) | Basis pengguna besar, merek kuat | Portofolio bukan fokus; biaya posting untuk UMKM relatif besar |
| LinkedIn | Jaringan profesional global | Kurang cocok untuk fresh graduate lokal dan UMKM |
| Pembuat CV (Canva, dll.) | Desain bagus, template banyak | Tidak terhubung ke lamaran kerja |

> Data harga dan fitur pesaing berubah cepat. Lakukan riset pesaing langsung (daftar sebagai pengguna dan perusahaan) sebelum menetapkan harga final.

### SWOT ringkas

| | |
|---|---|
| **Kekuatan** | Alur CV → portofolio → lamaran terpadu; fokus lokal; biaya operasional rendah |
| **Kelemahan** | Merek baru; tim kecil; bergantung pada dua sisi pasar |
| **Peluang** | Banyak fresh graduate; UMKM butuh rekrutmen murah; niche kreator/IT |
| **Ancaman** | Pemain besar menambah fitur portofolio; loker palsu merusak reputasi; regulasi data pribadi |

---

## 9. Teknologi dan Keputusan Teknis

| Area | Plan awal | Rekomendasi |
|---|---|---|
| Frontend | ReactJS | React + TypeScript + Vite (sesuai struktur folder) |
| Backend | Rust | Axum + sqlx + Tokio; hash password Argon2id |
| Database | PostgreSQL | Tetap. Tambah ekstensi `citext` dan `pg_trgm` untuk pencarian |
| Hosting | "Domainesia or whatever" | Putuskan satu penyedia VPS lokal; pakai Docker Compose + Nginx + HTTPS |
| Verifikasi pendaftaran | WhatsApp JS | **Jangan pakai library tidak resmi.** Mulai dari **verifikasi email**; tambahkan OTP WhatsApp lewat **WhatsApp Business Platform (API resmi)** atau penyedia resmi bila diperlukan |
| Pembayaran | belum ada | Payment gateway lokal (Midtrans / Xendit / Duitku) dengan webhook (lihat `docs/api/api.md` bagian 8) |
| Penyimpanan file | belum ada | Object storage (S3-compatible) untuk foto, logo, dokumen verifikasi |
| Ekspor PDF CV | "unduh" | Tentukan: render PDF di server (Chromium) atau di browser. Pastikan PDF punya lapisan teks agar terbaca ATS |

**Mengapa tidak memakai WhatsApp JS (library tidak resmi).** Library seperti `whatsapp-web.js` mengotomasi WhatsApp Web, melanggar ketentuan WhatsApp, dan nomor yang dipakai bisa diblokir. Untuk fitur verifikasi yang menentukan pendaftaran, risiko ini terlalu besar.

---

## 10. Kepatuhan, Keamanan, dan Kepercayaan

1. **Pelindungan data pribadi (UU No. 27/2022).** CV dan profil berisi data pribadi. Wajib ada Kebijakan Privasi, persetujuan eksplisit, dan mekanisme hapus akun.
2. **Kandidat yang bisa dicari HRD harus opt-in.** Pencarian kandidat oleh perusahaan hanya menampilkan pengguna yang mengaktifkan "terbuka untuk dihubungi". Nomor telepon baru terbuka setelah kandidat melamar atau memberi izin. Filter berdasarkan nomor telepon seperti di plan awal sebaiknya diganti dengan *kontak yang diizinkan kandidat*.
3. **Anti loker palsu.** Alur loker: `draft → pending_review → published`; perusahaan baru perlu diverifikasi sebelum lowongannya tampil; ada tombol *report* dan antrean moderasi admin.
4. **Keamanan akun.** Argon2id, rate limit login dan OTP, pesan error login yang tidak membocorkan apakah email terdaftar, reset password, token JWT dalam cookie `HttpOnly`.
5. **Syarat dan ketentuan** untuk pengguna dan perusahaan, termasuk aturan konten portofolio.
6. **Audit log** untuk tindakan admin (sudah ada tabel `audit_logs` dan `moderation_actions`).

---

## 11. Roadmap

| Fase | Fokus | Hasil yang bisa dilihat |
|---|---|---|
| **0. Fondasi** | Setup repo, CI, Docker Compose, migrasi database, auth (email), role | Registrasi/login berjalan |
| **1. MVP** | Profil, CV builder + template gratis + ekspor PDF, portofolio publik, daftar loker + lamaran, dashboard perusahaan (posting loker, lihat pelamar) | Pengguna bisa membuat CV, portofolio, dan melamar |
| **2. Monetisasi** | Paket Pro, pembayaran + webhook, verifikasi perusahaan, moderasi admin, report | Pendapatan pertama |
| **3. Pertumbuhan** | Pencarian kandidat (opt-in), filter lanjutan, notifikasi, SEO, resource desain | Pertumbuhan dan retensi |
| **4. Ekspansi** | Jasa landing page, OTP WhatsApp resmi, analitik perusahaan | Pendapatan tambahan |

---

## 12. Indikator Keberhasilan (KPI)

| Area | KPI |
|---|---|
| Akuisisi | Pendaftar baru per minggu; persentase pendaftar yang memverifikasi email |
| Aktivasi | % pengguna yang menyelesaikan CV pertama; % yang menerbitkan portofolio |
| Marketplace | Loker aktif; rata-rata lamaran per loker; waktu rata-rata sampai lamaran pertama |
| Monetisasi | Konversi Free → Pro; jumlah perusahaan berlangganan; MRR |
| Retensi | Pengguna aktif bulanan; churn langganan |
| Kepercayaan | Jumlah report; waktu rata-rata penanganan report; % perusahaan terverifikasi |

---

## 13. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Cold start dua sisi | Platform terlihat sepi | Mulai dari CV/portofolio; kurasi loker awal; fokus niche |
| Loker palsu / penipuan | Reputasi rusak | Verifikasi perusahaan; moderasi; report |
| Pelanggaran data pribadi | Sanksi hukum, hilang kepercayaan | Opt-in kandidat; kebijakan privasi; hak hapus data |
| Ketergantungan library WhatsApp tidak resmi | Nomor diblokir, registrasi macet | Email dulu; API resmi |
| Crawling sosial media | Risiko hukum dan teknis | Tunda; hanya sumber resmi |
| Harga tidak sesuai pasar | Konversi rendah | Uji harga dengan survei dan A/B test |
| Terlalu banyak layanan sekaligus | Tim kecil kewalahan | Ikuti roadmap fase |

---