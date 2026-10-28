# Rancangan Paket ByBee Project

**Status:** Draf yang bisa langsung diimplementasikan. Semua angka bertanda *usulan* adalah hipotesis yang perlu diuji, bukan data pasar.
**Terakhir diperbarui:** 28 Oktober 2026

Model bisnis ByBee Project dalam mengambil keuntungan dari layanan platform. Beberapa sumber pendapatan di bawah ini akan diuji.

## 1. Prinsip

1. Semua batas paket disimpan di **`plans.features` (JSONB)**, bukan ditulis di kode. Mengubah kuota atau harga cukup mengubah data.
2. Batas paket **selalu dicek di backend**, bukan hanya disembunyikan di tampilan.
3. Verifikasi perusahaan **gratis dan sama untuk semua paket**. Badge *Verified* tidak bisa dibeli.
4. Pengguna tanpa langganan aktif memakai paket **Free**, yang juga dicatat sebagai baris di tabel `plans` supaya logika batasnya seragam.

---

## 2. Paket Pencari Kerja

Model bisnis dengan target segmentasi pelanggan pencari kerja.

| Fitur | Free | Pro Bulanan | Pro Tahunan |
|---|---|---|---|
| Harga usulan | Gratis | Rp 29.000 / bulan | Rp 179.000 / tahun |
| Template CV ATS | Template dasar | Template dasar + template premium *terpilih* | Template dasar + **semua** template premium |
| Edit CV | Ya | Ya | Ya |
| Variasi desain CV (warna, font) | Terbatas: 3 palet warna, 2 font | Standar: 8 palet warna, 5 font | Lengkap: semua palet dan font |
| Ekspor CV ke PDF | Dengan watermark ByBee | Tanpa watermark | Tanpa watermark |
| Versi CV tersimpan | Maksimal 2 | Maksimal 10 | Maksimal 30 |
| Portofolio online | Dasar: 1 portofolio, maksimal 5 proyek, ada tulisan "Dibuat dengan ByBee" | Kustomisasi lanjutan: maksimal 3 portofolio, 20 proyek, tema dan urutan bagian dapat diatur, tulisan ByBee dapat dihapus | Sama dengan Pro Bulanan |
| Pembaruan template premium | Tidak | Ya | Ya |
| Melamar lowongan | Tanpa batas | Tanpa batas | Tanpa batas |

**Catatan:**

- Angka batas (2 versi CV, 5 proyek, jumlah palet, dll.) adalah **usulan** agar tabel "terbatas / dasar / beberapa" menjadi angka yang bisa diuji. Ubah sesuai kebutuhan.
- **Melamar lowongan tetap gratis.** Pencari kerja yang tidak bisa melamar akan meninggalkan platform, dan itu merugikan sisi perusahaan.
- Pro Tahunan Rp 179.000 setara Rp 14.900/bulan, **hemat ±49%** dibanding 12 bulan Pro Bulanan (Rp 348.000). Selisih sebesar ini mendorong orang langsung memilih tahunan. Jika Anda lebih ingin pemasukan bulanan yang berulang, naikkan harga tahunan.
- Pro Bulanan dan Pro Tahunan berbeda di **fitur** (template, jumlah CV), bukan hanya harga. Itu bisa dilakukan, tetapi menambah pekerjaan: tiap template perlu level akses. Alternatif yang lebih sederhana: fitur Pro Bulanan dan Pro Tahunan **sama**, hanya harga berbeda.

---

## 3. Paket HRD atau Perwakilan Perusahaan

Model bisnis dengan target segmentasi pelanggan HRD atau perwakilan perusahaan.

| Fitur | Free | Pro Bulanan | Pro Tahunan |
|---|---|---|---|
| Harga usulan | Gratis | Rp 199.000 / bulan | Rp 1.990.000 / tahun |
| Lowongan aktif* | Maksimal 1 | Maksimal 10 | Maksimal 30 |
| Masa tayang per lowongan (usulan) | 30 hari | 60 hari | 150 hari |
| Mengelola lowongan | Ya, sesuai peran anggota | Ya, sesuai peran anggota | Ya, sesuai peran anggota |
| Melihat pelamar | Ya, sesuai peran anggota | Ya | Ya |
| Filter pelamar | Dasar: status dan tanggal | Lanjutan: ditambah skill, kota, kecocokan skill | Lanjutan |
| Statistik performa lowongan | Dasar | Terbatas | Lengkap |
| Prioritas penayangan | Tidak | Ya | Ya |
| Verifikasi perusahaan dan badge Verified | Sama untuk semua paket | Sama untuk semua paket | Sama untuk semua paket |

\* **Lowongan aktif** berarti lowongan berstatus `pending_review` atau `published`. Draf, lowongan ditolak, dan lowongan ditutup tidak dihitung.

**Definisi statistik (usulan):**

| Tingkat | Isi |
|---|---|
| Dasar | Jumlah dilihat dan jumlah pelamar per lowongan |
| Terbatas | Dasar + rasio dilihat menjadi melamar + tren 30 hari |
| Lengkap | Terbatas + perbandingan antar lowongan + riwayat lebih dari 30 hari + ekspor CSV |

**Definisi prioritas penayangan (usulan):** lowongan dari paket Pro diurutkan lebih tinggi daripada lowongan Free pada hasil pencarian yang relevansinya setara. Ini *boost*, bukan posisi teratas mutlak, dan lowongan diberi label "Promoted" agar jujur kepada pencari kerja.

**Catatan:**

- Pro Tahunan Rp 1.990.000 setara 10 bulan Pro Bulanan (Rp 2.388.000), **hemat ±17%** atau gratis 2 bulan. Wajar.
- Pro Tahunan memberi kuota 30 lowongan, tiga kali Pro Bulanan. Perusahaan yang butuh banyak lowongan akan terdorong ke tahunan. Pastikan itu memang tujuan Anda.
- Plan awal menyebut "unlimited lowongan" dan "badge centang kuning sebagai tanda perusahaan resmi". Rancangan baru ini **sudah lebih baik**: kuota jelas dan verifikasi tidak dijual. Pertahankan.
- Plan awal juga menyebut filter berdasarkan nomor telepon. Di sini filter hanya untuk **pelamar**, tanpa nomor telepon, sehingga lebih aman bagi privasi.

---

## 4. Aturan Paket

### 4.1 Kuota dan masa berlaku

| Aturan | Keputusan |
|---|---|
| Pemilik langganan | Pencari kerja: akun pengguna. Perusahaan: perusahaan itu sendiri, **hanya peran `owner`** yang boleh membeli atau membatalkan |
| Langganan aktif | Satu pemilik hanya boleh punya **satu** langganan `active` |
| Pembayaran | Langganan menjadi `active` hanya setelah pembayaran berstatus `paid` (dari webhook payment gateway) |
| Perpanjangan | **Manual** pada tahap awal. `auto_renew` tetap `false`. Sistem mengirim pengingat 7 hari dan 1 hari sebelum `end_date`. Perpanjangan otomatis perlu pembayaran berulang dari penyedia dan ditunda |
| Ganti paket | Pembelian paket baru dilakukan saat sisa masa berlaku ≤ 7 hari. Periode baru mulai pada `end_date` paket lama |
| Pembatalan | Menghentikan perpanjangan. Akses tetap sampai `end_date`. Tidak ada pengembalian dana pro rata |
| Pengembalian dana | Hanya untuk tagihan ganda atau fitur yang terbukti tidak dapat digunakan, diputuskan admin (`payments.payment_status = 'refunded'`) |
| Pajak | **Belum ditentukan.** Tentukan apakah harga sudah termasuk pajak sebelum rilis |

> Aturan pembatalan dan pengembalian dana mempengaruhi hak konsumen. Minta konsultan hukum memeriksa Syarat dan Ketentuan sebelum rilis.

### 4.2 Saat langganan berakhir (turun ke Free)

| Sumber daya | Perlakuan |
|---|---|
| Lowongan yang sudah tayang | **Tetap tayang sampai `expires_at`-nya sendiri.** Tidak dihapus mendadak |
| Lowongan baru | Tidak bisa dikirim untuk ditinjau jika jumlah lowongan aktif sudah mencapai batas Free |
| Versi CV melebihi batas Free | Tetap bisa dilihat dan diekspor (dengan watermark). **Tidak bisa membuat versi baru** sampai di bawah batas |
| Portofolio melebihi batas | Tetap tampil. Tidak bisa membuat portofolio atau proyek baru melebihi batas |
| Template premium | CV yang sudah memakainya tetap tersimpan. Ekspor memakai watermark sampai pengguna berlangganan lagi atau memilih template dasar |

### 4.3 Aturan lowongan

| Aturan | Keputusan |
|---|---|
| Syarat tayang | Perusahaan harus **terverifikasi** sebelum lowongan bisa dikirim untuk ditinjau |
| Tinjauan | Semua lowongan baru melewati `pending_review` (ditinjau admin) pada MVP. Ketika sudah banyak, perusahaan tepercaya dapat dilonggarkan |
| Masa tayang | `expires_at = published_at + masa tayang paket`. Lowongan tutup pada yang lebih awal antara `deadline` dan `expires_at` |
| Prioritas | Skor prioritas ditetapkan saat lowongan tayang berdasarkan paket saat itu |

---

## 5. Implementasi di Database

Setiap baris di bawah menjadi satu baris `plans` (kombinasi `plan_name`, `target_type`, `billing_period` harus unik). Nilai `null` berarti tanpa batas.

### Pencari kerja

```json
// Free  (plan_name: "Free", target_type: "job_seeker", billing_period: "free", price: 0)
{
  "template_tiers": ["basic"],
  "design_options": "limited",
  "remove_watermark": false,
  "max_cvs": 2,
  "max_portfolios": 1,
  "max_projects_per_portfolio": 5,
  "portfolio_customization": "basic",
  "premium_template_updates": false
}
```

```json
// Pro Bulanan  (plan_name: "Pro", target_type: "job_seeker", billing_period: "monthly", price: 29000)
{
  "template_tiers": ["basic", "premium"],
  "design_options": "standard",
  "remove_watermark": true,
  "max_cvs": 10,
  "max_portfolios": 3,
  "max_projects_per_portfolio": 20,
  "portfolio_customization": "advanced",
  "premium_template_updates": true
}
```

```json
// Pro Tahunan  (plan_name: "Pro", target_type: "job_seeker", billing_period: "yearly", price: 179000)
{
  "template_tiers": ["basic", "premium", "premium_plus"],
  "design_options": "full",
  "remove_watermark": true,
  "max_cvs": 30,
  "max_portfolios": 3,
  "max_projects_per_portfolio": 20,
  "portfolio_customization": "advanced",
  "premium_template_updates": true
}
```

### Perusahaan

```json
// Free  (plan_name: "Free", target_type: "company", billing_period: "free", price: 0)
{
  "max_active_jobs": 1,
  "job_listing_days": 30,
  "applicant_filter": "basic",
  "job_stats": "basic",
  "priority_level": 0
}
```

```json
// Pro Bulanan  (plan_name: "Pro", target_type: "company", billing_period: "monthly", price: 199000)
{
  "max_active_jobs": 10,
  "job_listing_days": 60,
  "applicant_filter": "advanced",
  "job_stats": "limited",
  "priority_level": 1
}
```

```json
// Pro Tahunan  (plan_name: "Pro", target_type: "company", billing_period: "yearly", price: 1990000)
{
  "max_active_jobs": 30,
  "job_listing_days": 150,
  "applicant_filter": "advanced",
  "job_stats": "full",
  "priority_level": 1
}
```

> Berkas JSON tidak mengizinkan komentar `//`. Komentar di atas hanya penjelasan. Saat membuat seed SQL, hapus komentarnya.

**Dampak pada schema (rincian di `docs/erd/Erd.md`):**

- Level template ("terpilih" dan "semua") membutuhkan kolom `cv_templates.access_tier` (`basic`, `premium`, `premium_plus`) menggantikan `is_premium`.
- Masa tayang dan prioritas membutuhkan `jobs.expires_at` dan `jobs.priority_score`.
- Statistik lowongan membutuhkan penghitung tayangan (`jobs.view_count` dan tabel `job_stats_daily`).

---

## 6. Keekonomian Paket

Biaya tetap tahap awal ± Rp 500.000/bulan (lihat `business-plan.md`).

| Skenario | Pendapatan bersih per pelanggan / bulan* | Pelanggan untuk menutup biaya tetap |
|---|---|---|
| Pencari kerja Pro Bulanan (Rp 29.000) | ± Rp 27.500 | ± 19 |
| Pencari kerja Pro Tahunan (Rp 179.000) | ± Rp 14.200 | ± 36 |
| Perusahaan Pro Bulanan (Rp 199.000) | ± Rp 189.000 | ± 3 |
| Perusahaan Pro Tahunan (Rp 1.990.000) | ± Rp 157.500 | ± 4 |

\* Asumsi potongan payment gateway ±5%. **Ini hanya asumsi.**

**Dua hal yang perlu diperhatikan:**

1. **Perusahaan menutup biaya lebih cepat.** Tiga sampai empat perusahaan berbayar sudah menutup biaya server, sedangkan pencari kerja butuh puluhan. Artinya sisi perusahaan perlu mendapat porsi usaha penjualan yang besar sejak awal.
2. **Biaya per transaksi pada harga kecil.** Sebagian metode pembayaran memotong biaya tetap per transaksi. Pada harga Rp 29.000, biaya tetap beberapa ribu rupiah bisa memakan porsi persentase yang besar. Cek tarif resmi penyedia dan dorong metode dengan potongan persentase kecil (misalnya QRIS atau dompet digital).

---