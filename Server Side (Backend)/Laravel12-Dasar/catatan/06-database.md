# Materi 06 - Database, .env, migration, seeder

## 1. Sambungin Laravel ke MySQL lewat `.env`

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=latihan_laravel
DB_USERNAME=root
DB_PASSWORD=
```
Database `latihan_laravel` nya bikin dulu di phpMyAdmin (klik New, isi nama, Create).

## 2. Perintah migration & seeder

| Perintah | Gunanya |
|----------|---------|
| `php artisan make:migration create_kelas_table` | bikin file migration baru |
| `php artisan migrate` | jalanin semua migration yang belum jalan (bikin tabel) |
| `php artisan migrate:rollback` | batalin migration terakhir (jalanin down()) |
| `php artisan migrate:fresh` | hapus SEMUA tabel terus bikin ulang dari awal |
| `php artisan migrate:fresh --seed` | sama kaya atas + langsung isi data contoh |
| `php artisan db:seed` | jalanin seeder doang |

php artisan migrate:fresh --seed
