# Materi 02 - Struktur folder Laravel

| Folder / file | Isinya | Ibaratnya |
|---------------|--------|-----------|
| `routes/` | daftar alamat URL (`api.php`, `web.php`) | daftar menu di resto |
| `app/Http/Controllers/` | nerima request, ngolah, balikin response | koki |
| `app/Models/` | wakil tabel database di PHP | gudang bahan |
| `app/Http/Middleware/` | pengecekan sebelum masuk controller | satpam|
| `app/Http/Requests/` | aturan validasi input | form pemeriksaan |
| `database/migrations/` |tabel database |
| `database/seeders/` | data awal / data contoh |
| `bootstrap/app.php` | daftar route, middleware|
| `.env` | nama database, password, dll | kunci rumah |
| `vendor/` | library bawaan hasil `composer install` |
| `storage/logs/laravel.log` | catatan error |
