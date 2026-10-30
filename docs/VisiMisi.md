# Definisi, Visi, dan Misi ByBee Career

**Status:** Draf yang sudah diselaraskan dengan `RancanganPaket.md`, `UseCase.md`, dan `Erd.md`
**Terakhir diperbarui:** 28 Oktober 2026

## 1. Definisi

ByBee Career merupakan platform karier digital. Pengguna dapat membuat **CV dan portofolio profesional**, lalu **melamar lowongan** di platform yang sama. Perusahaan dapat **memasang lowongan dan mengelola pelamar** dari satu dashboard.

Cakupan produk utama:

| Termasuk produk utama | Lini terpisah (tidak mengganggu produk utama) |
|---|---|
| CV builder dan ekspor PDF | Jasa pembuatan landing page perusahaan (opsional, fase akhir) |
| Portofolio online | Resource desain (belum didefinisikan; fase akhir) |
| Lowongan dan lamaran | Crawling data insight perusahaan (ditunda karena risiko hukum) |
| Verifikasi perusahaan dan moderasi | |
| Langganan Pro (pencari kerja dan perusahaan) | |


## 2. Visi

Menjadi platform yang memudahkan pencari kerja mempersiapkan dan menampilkan kompetensinya secara profesional.

## 3. Misi

1. Menyediakan alat pembuatan CV dan portofolio yang mudah digunakan.
2. Membantu pengguna menemukan peluang kerja yang relevan.
3. Menyediakan fitur rekrutmen yang transparan dan tepercaya bagi perusahaan.

### Misi diterjemahkan menjadi fitur dan ukuran

Setiap misi perlu punya fitur yang menjalankannya dan angka yang bisa diukur. Tanpa itu, misi hanya menjadi slogan.

| Misi | Fitur yang mewujudkan | Fase | Indikator keberhasilan |
|---|---|---|---|
| 1. Alat CV dan portofolio mudah digunakan | CV builder, template ATS, ekspor PDF, portofolio dengan tautan publik | MVP | % pendaftar yang menyelesaikan CV pertama; % yang menerbitkan portofolio |
| 2. Peluang kerja yang relevan | Pencarian dan filter loker (kata kunci, kategori, lokasi, tipe kerja); *skill* pada profil dan loker | MVP | Waktu dari pendaftaran sampai lamaran pertama |
| 2. (lanjutan) | Rekomendasi loker berdasarkan kecocokan skill (`user_skills` dan `job_skills`) | Fase 3 | Persentase lamaran yang berasal dari rekomendasi |
| 3. Rekrutmen transparan dan tepercaya | Verifikasi perusahaan (badge *Verified*), tinjauan loker sebelum tayang, tombol laporkan, status lamaran yang terlihat pelamar | MVP | Jumlah laporan per 1.000 loker; waktu penanganan laporan; % loker yang ditinjau dalam target waktu |


## 4. Nilai Utama

- **Kepercayaan.** Badge *Verified* hanya diberikan lewat pemeriksaan dokumen. Badge itu tidak bisa dibeli.
- **Privasi.** Data pribadi pengguna tidak dibuka tanpa persetujuan. Pencarian kandidat hanya untuk pengguna yang memilih ikut serta (opt-in).
- **Kemudahan.** Pengguna bisa membuat CV dan melamar dalam satu alur.
- **Transparansi.** Pelamar melihat status lamarannya; perusahaan melihat syarat paket dengan jelas.

## 5. Proposisi Nilai

| Untuk | Nilai yang ditawarkan |
|---|---|
| Pencari kerja | CV rapi dan ramah ATS, portofolio satu tautan, lamaran dengan CV dan portofolio dalam satu tempat |
| Perusahaan | Memasang lowongan gratis atau murah, pelamar terkumpul di satu dashboard, lowongan palsu disaring lewat verifikasi dan moderasi |
