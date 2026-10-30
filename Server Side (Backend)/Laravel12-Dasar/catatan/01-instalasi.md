# Materi 01 - Instalasi Laravel

Laravel itu framework PHP. Ibaratnya rumah yang kerangkanya udah jadi:
routing, koneksi database, keamanan, semuanya udah disiapin.
Kita tinggal ngisi kamar kamarnya (route, controller, model).

## Perintah yang dipake (urut)

```
cd ~/Desktop
mkdir latihan_laravel
cd latihan_laravel
composer create-project laravel/laravel:^11.0 project --no-install
```
- `cd` = pindah folder, `mkdir` = bikin folder baru
- `composer create-project` = ambil template project Laravel versi 11
- `--no-install` = jangan download library dulu, soalnya bakal keblokir masalah keamanan

Abis itu di `composer.json` bagian `"config"` ditambahin:

```json
"policy": {
    "advisories": {
        "block": false
    }
}
```
gunanya biar composer ga ngeblok Laravel 11 yang ada catatan keamanannya.

```
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```
- `composer install` = download semua library ke folder `vendor` (gede, jangan ikut di-zip)
- `cp .env.example .env` = bikin file pengaturan `.env` dari contohnya
- `php artisan key:generate` = bikin kunci rahasia aplikasi (ngisi `APP_KEY` di `.env`)
- `php artisan serve` = nyalain server di `http://127.0.0.1:8000`. terminal nya jangan ditutup

