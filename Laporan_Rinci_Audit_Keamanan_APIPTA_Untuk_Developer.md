|||APIPTA | Laporan audit keamanan untuk developer Laporan Rinci Audit Keamanan APIPTA Penjelasan temuan dan rencana perbaikan untuk tim developer Tanggal audit 12 November 2026 | Versi laporan 2.0 Disusun untuk tim developer APIPTA, admin VM, DBA, dan pengelola storage. Pengirim laporan: Angki. Target aplikasi: apipta.makassarkota.go.id pada VM 103.151.20.87. Keputusan yang perlu ditindaklanjuti Akses ke API sensitif perlu segera dibatasi dan kontrol akses aplikasi diperbaiki. Pengujian baca anonim sudah membuktikan paparan 90 akun, termasuk hash password dan kolom data pribadi. Tiga masalah lain memperbesar risiko terhadap database, ketersediaan API, dan kerahasiaan dokumen.|
|---|---|---|
|ID|Prioritas|Masalah yang perlu diperbaiki|
|F01|Kritis P0|API sensitif tidak memverifikasi identitas dan hak akses pengguna.|
|F02|Tinggi P1|MySQL dipublikasikan ke jaringan luar dan root diizinkan dari host wildcard.|
|F03|Tinggi P1|Multer aktif 1.4.5-lts.1 berada dalam rentang versi rentan DoS.|
|F04|Tinggi P1 Status pelaksanaan audit 200 pada pemeriksaan akhir. berupa rekomendasi.|Integrasi MinIO menetapkan public read dan menerima listing anonim. P0 berarti perlu containment atau pembatasan sementara segera karena batas akses aplikasi sudah gagal. P1 berarti prioritas tinggi setelah atau bersamaan dengan containment. Urutan ini merupakan rekomendasi penanganan, bukan bukti bahwa seluruh dampak sudah terjadi. Audit dilakukan read-only. Tidak ada perubahan akun, data, konfigurasi, policy bucket, service, firewall, atau baseline. Tidak ada pengujian DoS. Empat kontainer tetap berjalan dan endpoint health HTTPS mengembalikan Belum ditemukan bukti malware aktif pada cakupan pemeriksaan. Keterbatasan log dan deteksi membuat audit ini belum dapat memastikan ada atau tidaknya kompromi historis. Seluruh perbaikan dalam laporan masih INTERNAL TERBATAS | 12 November 2026 | Halaman 1|

|dokumen.|APIPTA | Laporan audit keamanan untuk developer 1 Cakupan dan cara membaca laporan Sasaran pemeriksaan|Audit memeriksa konfigurasi host Ubuntu, jaringan dan firewall efektif, runtime Docker, autentikasi SSH, persistensi, integritas paket terpilih, source backend aktif, konfigurasi MySQL, TLS, serta integrasi storage yang dipakai APIPTA. Pemeriksaan source diprioritaskan pada batas identitas, akses data, upload, dan pengunduhan|
|---|---|---|
|Komponen|Kondisi yang diamati|Peran|
|VM APIPTA|Ubuntu 24.04.3 LTS; IP publik 103.151.20.87|Host Docker dan SSH|
|apipta_nginx|Nginx 1.29.8; publik 80 dan 443|TLS dan reverse proxy|
|apipta_frontend|Aplikasi React yang disajikan melalui serve|Antarmuka pengguna|
|apipta_backend|Node 18.20.8; Express 4.19.2; port internal 3200|API dan akses database atau storage|
|apipta_db|MySQL 8.0.46; port 3306 dipublikasikan|Data aplikasi|
|MinIO dependency|Endpoint yang dikonfigurasi 103.151.20.168:8899|Bucket inspektorat|
|memenuhi syarat.|Alur permintaan yang relevan Pengguna -> HTTPS Nginx -> /api/ -> backend -> MySQL -> / -> frontend Backend -> HTTP MinIO untuk menyimpan atau mengambil objek Pembatasan halaman atau tombol di frontend dapat dilewati dengan request HTTP langsung. Arti identitas temuan fakta, penyebab, dampak, perbaikan, serta bukti yang diperlukan untuk menutup temuan. kode belum diterapkan serta harus disesuaikan dan diuji oleh developer. 12. Rencana kerja dan bukti penutupan ada pada halaman 13 dan 18. Rujukan bukti: 01_identity, 07_layout, 08_container_config, 14_source_extended, 16_external_perimeter.|Antarmuka login tidak cukup menjadi kontrol keamanan. Setiap request yang masuk ke backend harus membawa identitas yang diverifikasi server, lalu diperiksa haknya terhadap tindakan dan objek tujuan. F berarti finding atau temuan. F01 sampai F04 adalah nomor pelacakan yang tetap untuk komunikasi, tiket, pengujian, dan penutupan. Nomor itu tidak berarti empat insiden berbeda sudah terjadi. Setiap bab menjelaskan Bukti live adalah hasil baca pada sistem berjalan. Verifikasi source membuktikan alur kode, tetapi tidak berarti dampak tulis sudah dijalankan. Risiko adalah akibat yang didukung kondisi tersebut. Rekomendasi dan contoh DTO adalah objek respons yang hanya memuat field yang diizinkan. Middleware adalah pemeriksaan pada jalur request sebelum controller. Guard adalah pemeriksaan yang menghentikan request bila identitas atau izin tidak Navigasi: F01 halaman 3 sampai 6; F02 halaman 7 sampai 8; F03 halaman 9 sampai 10; F04 halaman 11 sampai INTERNAL TERBATAS | 12 November 2026 | Halaman 2|

||APIPTA | Laporan audit keamanan untuk developer 2 F01 Paparan data pengguna tanpa login Prioritas Kritis P0 | Pemilik utama Developer APIPTA Apa yang salah dan mengapa penting Backend menerima request ke endpoint sensitif tanpa mewajibkan autentikasi. Pada endpoint daftar pengguna, server mengambil seluruh model pengguna dan mengirimkannya ke pemanggil. Akibatnya, pihak yang tidak login dapat membaca informasi yang seharusnya hanya tersedia bagi pengguna dengan hak yang sesuai. Autentikasi menjawab siapa pemanggilnya. Otorisasi menjawab apa yang boleh ia lakukan dan data siapa yang boleh ia akses. Keduanya harus berjalan pada server. Memastikan pengguna sudah membuka halaman login atau menyimpan role pada browser tidak memenuhi kedua pemeriksaan tersebut. Bukti pengujian live|
|---|---|
|Aspek|Hasil audit|
|Request|Satu GET /api/user/all tanpa Authorization dan tanpa Cookie.|
|Respons|HTTP 200; Content-Type application/json; ukuran 47.993 byte.|
|Jumlah|90 record pengguna; 90 field password berformat bcrypt.|
|Kolom lain|Nama, username, email, NIP, jabatan, entitas, role dan masa berlaku.|
|CORS|Origin asing pada request audit memperoleh Access-Control-Allow-Origin: *.|
|Bukti tersimpan|Hanya jumlah record, nama field dan metadata respons; nilai data pribadi serta hash tidak disimpan.|
|plaintext pengguna. berikutnya.|Dampak yang sudah terbukti Kerahasiaan akun dan data pribadi telah gagal pada pengujian baca anonim. Bcrypt melindungi password dengan hashing, tetapi hash tetap bersifat sensitif. Jika hash diperoleh pihak lain, tebakan password dapat dicoba secara offline tanpa pembatasan login aplikasi. Audit tidak melakukan cracking dan tidak memperoleh password Mengapa tingkat penanganannya kritis Selain akses baca yang terkonfirmasi, source aktif menunjukkan rute registrasi, perubahan pengguna, perubahan role dan penghapusan data tanpa guard. Alur perubahan akun menimbulkan risiko pengambilalihan akun dan perubahan data. Penilaian kritis menggabungkan paparan live dan jalur tulis yang terverifikasi source; pengambilalihan akun tidak diuji atau dinyatakan sudah terjadi. Rujukan bukti: 16_external_perimeter.json; 09_source_core.json; 14_source_extended.json. F01 berlanjut pada halaman INTERNAL TERBATAS | 12 November 2026 | Halaman 3|

-- page 1 --

APIPTA | Laporan audit keamanan untuk developer

# 3 F01 Alur kode dan batas akses yang gagal

## Lokasi kode yang perlu diperiksa developer

|File dan baris|Perilaku yang diamati|Akibat pada batas akses|
|---|---|---|
|app.js 24 sampai 26|Memasang cors(), express.json(), lalu router /api.|Tidak ada autentikasi global sebelum router.|
|routes/index.js 21 sampai 27|Register, login, daftar user, update dan delete diarahkan ke controller.|Rute sensitif tidak memasang middleware identitas atau permission.|
|UserController.js 100 sampai 112|User.findAll dengan include Role, kemudian model dikirim sebagai JSON.|Field password dan data pribadi tidak dibatasi oleh DTO.|
|UserController.js 119 sampai 137|ID dari params dan body diteruskan ke update pengguna.|Tidak ada verifikasi pemilik, role, atau daftar field yang boleh diubah.|
|UserController.js 6 sampai 21|Body diteruskan ke User.create setelah cek username.|Pembuatan akun dan pengisian atribut sensitif perlu dibatasi.|
|models/user.js 29 sampai 35|Model mengenali role_id.|Role harus ditetapkan atau divalidasi server, bukan dipercaya dari body.|

Lokasi di atas berada di /opt/apipta/apipta_be/. Nomor baris merujuk snapshot source saat audit. Hash app.js, router, UserController dan model user pada host sama dengan file di filesystem kontainer aktif, sehingga pemeriksaan tidak hanya mengandalkan salinan repository yang mungkin berbeda dari deployment.

## Contoh pola yang diamati

```
router.get("/user/all", rr.getall);
router.put("/user/:id", rr.UpdateUser);
router.delete("/user/:id", rr.delete);
// Di controller
const user = await db.User.findAll({ include: [...] });
return res.status(200).json({ data: user });
```
Kode di atas adalah cuplikan source yang dipersingkat. Tidak ada payload perubahan akun dalam laporan. Perubahan password dan penghapusan tidak dipanggil selama audit.

## Hal yang juga perlu diperbaiki

corsOptions didefinisikan tetapi tidak diteruskan ke cors(). Sekalipun origin sudah dibatasi, pemanggil non-browser tetap dapat mengirim request. CORS hanya mengatur pembacaan lintas origin oleh browser dan tidak menggantikan autentikasi. Setelah identitas diverifikasi, server masih harus menilai hak terhadap user ID, penugasan, file, dan resource lain.

*Rujukan bukti: 09_source_core.json dan perbandingan hash pada 14_source_extended.json.*

INTERNAL TERBATAS | 12 November 2026 | Halaman

-- page 4 --

# 4 F01 Urutan perbaikan aplikasi

## Perbaikan minimum yang perlu selesai bersama

1. Batasi akses ke API sensitif selama perbaikan. Pilih pembatasan jaringan atau maintenance yang tetap menyediakan jalur operasional yang disetujui pemilik layanan.
2. Pisahkan rute publik yang memang diperlukan, misalnya login dan health minimal. Registrasi internal sebaiknya hanya dapat dilakukan administrator atau melalui undangan yang diverifikasi.
3. Bangun sesi atau token yang diverifikasi server. Periksa masa berlaku, integritas, status akun dan pencabutan sesi. Jangan menjadikan objek user dari browser sebagai sumber identitas tepercaya.
4. Pasang pemeriksaan permission di semua rute terlindungi. Pada operasi berdasarkan ID, periksa hubungan pengguna terhadap objek, penugasan atau entitas, termasuk setiap objek dalam operasi massal.
5. Batasi field input dengan skema dan allowlist. Perubahan role, password, status akun atau atribut administratif memakai alur khusus dan izin khusus.
6. Gunakan DTO respons yang hanya memuat field yang diperlukan. Hapus password/hash dari daftar pengguna, login, update, relasi Role, ekspor, error, serta log.
## Pola penempatan middleware yang disarankan

```
// Rancangan ilustratif untuk ditinjau dan diuji
publicRouter.post("/login", loginRateLimit, login);
protectedRouter.use(requireAuthenticatedUser);
protectedRouter.get("/user/all",
requirePermission("users:list"), listUsersSafe);
protectedRouter.put("/user/:id",
requirePermission("users:update"),
authorizeTargetUser, validateUserPatch, updateUserSafe);
```
Nama middleware pada contoh adalah rancangan, bukan fungsi yang sudah tersedia. requireAuthenticatedUser harus benar-benar memverifikasi credential sesi atau token. authorizeTargetUser harus memeriksa objek tujuan dengan identitas server. Jangan hanya memeriksa apakah req.headers.authorization ada. Rujukan teknis: R1 dan R2 pada bagian referensi.

## Perlindungan data dan credential

Gunakan proyeksi query untuk menghindari pengambilan kolom password pada alur biasa, ditambah DTO sebagai kontrol akhir. Scope model dapat membantu, tetapi jangan menganggapnya cukup untuk semua query dan relasi. Login boleh mengambil hash secara internal hanya untuk verifikasi; respons login tetap tidak memuatnya. Jika memakai cookie, terapkan Secure, HttpOnly, SameSite dan proteksi CSRF sesuai alurnya.

Setelah akses ditutup, tinjau paparan hash serta secret yang pernah tersimpan pada source atau laporan. Pemilik layanan perlu menetapkan reset credential dan pencabutan sesi bila diperlukan; audit ini tidak menetapkan bahwa password pengguna sudah berhasil ditebak.

-- page 5 --

# 5 F01 Kriteria penerimaan perbaikan

Jalankan matriks ini di staging memakai dua pengguna dengan hak berbeda, satu administrator, dan record uji milik masing-masing. Pengujian tulis hanya memakai data uji yang telah disetujui. Hasil di bawah adalah target, bukan hasil retest yang sudah dilaksanakan.

|Uji|Skenario|Hasil yang diwajibkan|
|---|---|---|
|F01 T01|GET data terlindungi tanpa sesi atau token.|401; respons tidak berisi data pengguna.|
|F01 T02|Token invalid, kedaluwarsa atau telah dicabut.|401; controller data tidak dijalankan.|
|F01 T03|Pengguna biasa memanggil endpoint administratif.|403; tidak ada data admin yang dikirim.|
|F01 T04|Pengguna A membaca atau mengubah record milik B.|403 atau 404 sesuai kebijakan; data B tetap.|
|F01 T05|Body update menyertakan role_id atau atribut sensitif tanpa izin.|Ditolak; tidak ada perubahan privilege.|
|F01 T06|Registrasi anonim pada layanan internal.|Ditolak bila tidak ada alur registrasi publik yang disetujui.|
|F01 T07|Respons login, daftar user, update, relasi role dan error.|Tidak memiliki password, hash atau secret, termasuk nested object.|
|F01 T08|Admin sah menjalankan operasi yang diizinkan.|Fungsi tetap bekerja dan audit log tercatat.|
|F01 T09|Akses langsung memakai HTTP client di luar frontend.|Keputusan akses sama dengan aplikasi; CORS tidak menjadi satu-satunya kontrol.|
|F01 T10|Pergantian role atau penonaktifan akun saat sesi masih aktif.|Hak baru atau pencabutan berlaku sesuai kebijakan sesi.|

## Bukti yang dikembalikan developer

- Commit atau pull request yang menunjukkan pemasangan guard, pemeriksaan objek, validasi field, dan DTO.
- Daftar seluruh rute yang diklasifikasikan publik atau terlindungi beserta permission dan pemeriksaan ownership.
- Hasil test otomatis atau log pengujian staging dengan status HTTP dan bukti data uji tidak berubah saat ditolak.
- Sampel respons tersanitasi dan konfirmasi tidak ada hash atau secret pada log maupun ekspor.
## Syarat penutupan

F01 dapat diajukan untuk ditutup setelah akses anonim ditolak, akses lintas pengguna ditolak, respons aman, dan alur admin sah tetap lulus. Menghapus field password saja tidak menutup masalah otorisasi. Menambahkan token pada frontend saja juga belum cukup bila backend tidak memverifikasinya.

|Apa yang ditemukan|APIPTA | Laporan audit keamanan untuk developer 6 F02 MySQL dapat dijangkau dari luar Prioritas Tinggi P1 | Pemilik utama Admin VM dan DBA Database yang melayani backend juga dipublikasikan sebagai layanan jaringan host. Koneksi dari workstation audit ke IP publik pada port 3306 berhasil memperoleh greeting MySQL. Ini memperluas permukaan serangan dari API aplikasi ke protokol database secara langsung.|
|---|---|
|Bukti|Hasil|
|Binding Docker|0.0.0.0:3306 dan [::]:3306 diarahkan ke apipta_db.|
|Validasi eksternal|TCP reachable; greeting MySQL 8.0.46 diterima tanpa login.|
|UFW|Aktif; tampilan allow inbound hanya 22, 80 dan 443.|
|Aturan efektif|DNAT dan ACCEPT Docker menuju 172.18.0.2:3306; DOCKER-USER tanpa pembatas sumber.|
|Akun administratif|root@% tidak terkunci; memiliki FILE, SUPER, GRANT, CREATE USER dan SHUTDOWN.|
|Transport|require_secure_transport OFF; TLS tersedia tetapi tidak diwajibkan.|
|Akun aplikasi|userdb@% memiliki hak skema termasuk CREATE, DROP, ALTER, EVENT dan TRIGGER. Mengapa UFW aktif belum cukup Koneksi masuk ke port 3306 -> DNAT pada aturan Docker -> jalur FORWARD dan aturan DOCKER -> ACCEPT menuju kontainer database Trafik kontainer yang dipublikasikan dapat dialihkan sebelum pemeriksaan INPUT yang biasa dipakai UFW. Karena itu daftar allow UFW tidak cukup untuk menyimpulkan port database tertutup. Audit mengonfirmasi jalur tersebut melalui aturan efektif dan handshake eksternal. Rujukan Docker: R3 dan R4. Dampak dan batas kesimpulan Pihak luar dapat berinteraksi dengan layanan MySQL dan mencoba autentikasi atau menyerang celah protokol yang relevan. Jika credential root bocor atau berhasil ditebak, haknya sangat luas. root@% berarti host pemanggil tidak dibatasi oleh bagian host akun tersebut; wildcard bukan berarti password boleh kosong. Metadata menunjukkan tidak ada auth string kosong. Audit tidak melakukan login database dari Internet dan tidak membuktikan pengambilalihan DB. Listener IPv6 terlihat pada host. Keterjangkauan IPv6 publik tidak diuji, sehingga perlu masuk validasi perubahan. Membuka TLS saja tidak menghapus paparan port; kontrol jaringan dan akun tetap dibutuhkan. Rujukan bukti: 03_firewall, 08_container_config, 13_database, 16_external_perimeter, 18_db_data_hunt. INTERNAL TERBATAS | 12 November 2026 | Halaman 7|

|hak.|Perubahan yang disarankan deployment. services: db: backend:|APIPTA | Laporan audit keamanan untuk developer 7 F02 Perbaikan jaringan dan akun database 1. Jika database hanya dipakai backend, hapus publikasi ports database pada Compose. Backend mengakses nama service database pada jaringan Docker, bukan IP publik host. 2. Pertahankan volume database yang sudah ada. Perubahan jaringan tidak memerlukan penghapusan atau pembuatan ulang data. Admin perlu memeriksa hasil Compose dan menyiapkan rollback konfigurasi sebelum 3. Jika administrasi jarak jauh diperlukan, gunakan jaringan manajemen private atau SSH tunnel yang dibatasi. Pengecualian tidak boleh membuka 3306 ke semua sumber. 4. Batasi host akun root dan pisahkan akun aplikasi, migrasi, serta administrasi. Akun runtime umumnya tidak membutuhkan DROP, EVENT, TRIGGER atau perubahan struktur; pastikan kebutuhan aplikasi sebelum mencabut 5. Terapkan TLS untuk koneksi yang melintasi batas jaringan dan validasi sertifikat oleh client. Perubahan authentication plugin perlu diuji terhadap mysql2 dan tool admin, tidak dilakukan secara mendadak. Pola konfigurasi yang perlu ditinjau # Ilustrasi bagian service DB pada jaringan bersama networks: [apipta-net] # Tidak menerbitkan ports 3306 ke host # Pertahankan image, environment, volume dan setting lainnya networks: [apipta-net] # DB_HOST memakai nama service yang benar pada Compose Cuplikan tidak boleh menggantikan file Compose lengkap. Admin harus menggunakan nama service dan volume yang benar pada deployment APIPTA, mempertahankan data, serta menjalankan perubahan melalui proses deployment terkontrol. Binding 127.0.0.1:3306:3306 dapat dipertimbangkan bila akses lokal host benar-benar diperlukan; itu pengecualian yang harus dibuktikan kebutuhannya.|
|---|---|---|
|Uji|Dari jaringan luar|Kriteria lulus 3306 tidak menerima handshake; periksa IPv4 dan IPv6 yang digunakan.|
||Dari backend|Koneksi ke service DB berhasil; operasi aplikasi normal lulus.|
||Akun runtime|Hak sesuai kebutuhan; tidak memiliki privilege admin global atau DDL yang tidak diperlukan.|
||Akses admin|Hanya jalur manajemen yang disetujui; penggunaan akun dapat ditelusuri.|
||Rollback dan data|Konfigurasi dapat dipulihkan; volume dan record aplikasi tetap utuh. Bukti penutupan: diff Compose, daftar binding aktif, uji eksternal dari sudut yang sama, grant tersanitasi, dan pengujian backend. Tampilan UFW saja bukan bukti penutupan F02. INTERNAL TERBATAS | 12 November 2026 | Halaman 8|

|Kondisi yang terverifikasi|APIPTA | Laporan audit keamanan untuk developer 8 F03 Upload memakai Multer rentan DoS Prioritas Tinggi P1 | Pemilik utama Developer APIPTA DoS atau Denial of Service adalah gangguan yang membuat layanan tidak tersedia bagi pengguna sah. Kontainer backend aktif memasang Multer versi 1.4.5-lts.1, dibaca dari node_modules pada filesystem kontainer aktif. Pemeriksaan tidak hanya menggunakan rentang dependency pada package.json. Router menggunakan memoryStorage dan upload.single atau upload.fields pada rute permintaan dan audit KKA.|
|---|---|
|Kontrol atau komponen|Hasil audit|
|Multer aktif|1.4.5-lts.1; versi terpasang pada runtime.|
|Parser upload|multer.memoryStorage(); tidak ada limits atau fileFilter pada inisialisasi yang ditinjau.|
|Batas reverse proxy|client_max_body_size 100M pada Nginx.|
|Akses upload|Rute upload tidak memasang autentikasi sebelum parser multipart.|
|Resource kontainer|Tidak ada limit memori, CPU atau PID yang dikonfigurasi pada backend.|
|Pengujian berbahaya|Tidak ada malformed upload, stress test atau percobaan crash.|
|dan R6. APIPTA. Rujukan: R8.|Hubungan dengan advisory resmi CVE-2025-7338 mencakup Multer mulai 1.4.4-lts.1 sampai sebelum 2.0.2 dan menjelaskan DoS akibat exception yang tidak tertangani pada request malformed. CVE-2026-3520 mencakup versi sebelum 2.1.1 dan menjelaskan DoS melalui rekursi tidak terkendali. Versi APIPTA berada dalam kedua rentang tersebut. Rujukan langsung: R5 Kecocokan versi dan tersedianya jalur upload cukup untuk memprioritaskan perbaikan. Audit ini tidak menyatakan payload tertentu telah diuji berhasil, service pernah crash akibat CVE tersebut, atau celah telah dieksploitasi pihak lain. Status EPSS dan CISA KEV tidak diverifikasi. Mengapa batas Nginx belum menutup masalah Batas 100M mengendalikan ukuran body yang diterima proxy, tetapi tidak memperbaiki bug parser. memoryStorage juga menampung isi file dalam memori proses; beberapa request serentak dapat menaikkan konsumsi walaupun setiap request berada di bawah batas proxy. Pembatas parser, autentikasi, concurrency dan kuota kontainer melengkapi patch dependency, bukan menggantikannya. Backend memakai Node 18.20.8 yang berada pada lini EOL. Migrasi runtime perlu menjadi bagian rencana kompatibilitas dependency, tanpa mengasumsikan semua advisory Node otomatis dapat dieksploitasi pada Rujukan bukti: 09_source_core dan versi terpasang pada 14_source_extended; Nginx pada 07_layout. INTERNAL TERBATAS | 12 November 2026 | Halaman 9|

|});|APIPTA | Laporan audit keamanan untuk developer Urutan implementasi terkontrol. upload sah. Ilustrasi pembatas parser const upload = multer({limits: {}|9 F03 Perbaikan upload dan pengujian 1. Migrasikan Multer ke rilis yang didukung dan periksa advisory terbaru sebelum menetapkan versi. Rilis 2.5.0 tercatat tersedia pada audit. Kunci versi hasil pengujian dalam lockfile dan bangun ulang image secara 2. Jalankan autentikasi dan pemeriksaan permission sebelum parsing upload. Tetapkan batas fileSize, files, fields dan parts sesuai kebutuhan bisnis. Nilai batas harus sama atau lebih ketat daripada batas proxy yang disetujui. 3. Periksa tipe konten dari isi file, tidak hanya ekstensi atau MIME yang dikirim client. Gunakan nama objek yang dibuat server, cegah HTML atau SVG aktif disajikan inline pada origin aplikasi bila tidak diperlukan. 4. Batasi request serentak dan penggunaan memori. Tinjau penyimpanan streaming atau area sementara yang sesuai, serta cleanup pada abort dan error. Pasang batas kontainer dan monitoring tanpa mengganggu ukuran // Contoh parameter untuk staging, bukan nilai produksi final storage: multer.memoryStorage(), fileSize: 10 * 1024 * 1024, files: 1, fields: 12, parts: 13 router.post("/permintaan", requireAuthenticatedUser, requireUploadPermission, upload.single("file"), validateFileContent, controller.add); Batas 10 MiB dan jumlah field pada contoh adalah usulan ilustratif yang harus disesuaikan spesifikasi. Jika memoryStorage dipertahankan, hitung penggunaan pada request serentak dan sisakan ruang untuk proses backend. Rujukan API limits dan memoryStorage: R7.|
|---|---|---|
||Uji staging|Kriteria lulus|
||File normal dan pengguna sah|Format yang disetujui berhasil diunggah dan diproses.|
||Anonim atau tidak berhak|Ditolak sebelum parser menerima seluruh file.|
||Ukuran atau jumlah berlebih|Ditolak terkontrol; proses tidak crash atau menyisakan buffer.|
||Ekstensi dan isi tidak sesuai|Ditolak berdasarkan validasi konten.|
||Abort dan multipart malformed|Error tertangani; worker tetap tersedia pada pengujian terisolasi.|
||Upload serentak terbatas|Memori dan latency dalam batas yang disetujui. Bukti penutupan: versi dari image yang benar-benar berjalan, lockfile dan digest image, hasil uji staging, serta konfigurasi limits. Mengubah package.json tanpa rebuild dan rollout image belum menutup F03. INTERNAL TERBATAS | 12 November 2026 | Halaman 10|

||APIPTA | Laporan audit keamanan untuk developer|10 F04 Storage dokumen mengizinkan akses anonim Prioritas Tinggi P1 | Pemilik utama Developer dan admin storage Dua jalur akses yang perlu dipahami ditutup agar pembatasan dokumen benar-benar berlaku.|Dokumen disimpan pada bucket MinIO inspektorat. Source backend menetapkan policy yang mengizinkan principal anonim melakukan listing dan mengambil objek. Pada saat yang sama, endpoint file backend mengambil objek memakai credential server tanpa memeriksa identitas atau hak pemanggil. Kedua jalur perlu|
|---|---|---|---|
|Jalur||Fakta audit|Batas validasi|
|Akses ke bucket||Request ListObjectsV2 anonim dari VM dengan max- keys=0 mendapat HTTP 200 ListBucketResult.|Tidak ada nama atau isi objek diminta; hanya izin listing dari sudut VM terbukti.|
|Policy startup||services/minio.js membuat Principal * dengan ListBucket dan GetObject; log menyatakan public policy berhasil dipasang.|Download anonim objek tidak diuji.|
|API file||GET /api/file/:objectName dan route download memanggil getObject dengan credential server.|Tidak ada permintaan dokumen nyata selama audit.|
|Transport storage||Client memakai useSSL: false ke endpoint yang dikonfigurasi.|Tidak dilakukan packet capture atau pembacaan trafik pihak lain.|
|audit VM storage.||Alur source yang menyebabkan policy kembali publik manual di storage dapat dibatalkan oleh startup backend jika perilaku itu tetap dipertahankan. Backend start -> module MinIO dimuat -> initBucket() -> setBucketPolicy(public read) -> bucket kembali mengikuti policy dari aplikasi Dampak dan apa yang belum dapat disimpulkan dokumen. Klasifikasi dokumen dan policy terkini perlu dikonfirmasi pengelola data.|services/minio.js baris 31 sampai 49 membangun policy public read. initBucket pada baris 53 sampai 72 memeriksa bucket dan memanggil setBucketPolicy, lalu dipanggil ketika modul dimuat. Artinya, perbaikan policy Jika dokumen bersifat internal, izin anonim menghilangkan batas kerahasiaannya bagi pihak yang dapat mencapai endpoint tersebut. Izin listing juga dapat membantu enumerasi nama objek. Namun audit hanya membuktikan zero-key listing dari VM APIPTA, bukan bahwa seluruh Internet dapat mengunduh semua Rujukan bukti: 14_source_extended, 17_deep_validation dan 19_validation_followup. Dependency storage diperiksa terbatas tanpa INTERNAL TERBATAS | 12 November 2026 | Halaman 11|

|pencatatannya. Alur akses yang dituju|APIPTA | Laporan audit keamanan untuk developer 11 F04 Rancangan akses dokumen yang dibatasi Kontrol yang perlu dipasang pada kedua jalur 1. Jadikan bucket private dan hilangkan izin anonim yang tidak disetujui. Kelola policy lewat admin storage atau mekanisme deployment yang dikendalikan, bukan pengaturan public policy setiap backend start. 2. Backend memverifikasi identitas dan mencari metadata file berdasarkan ID aplikasi. Pastikan file terkait dengan penugasan, entitas atau pihak yang boleh mengaksesnya sebelum memakai credential server. 3. Jangan menganggap nama objek sulit ditebak sebagai otorisasi. objectName yang dikirim client harus dipetakan ke resource yang diizinkan, termasuk ketika URL diubah atau dibagikan. 4. Gunakan streaming lewat endpoint berotorisasi atau presigned URL singkat sesuai kebutuhan. URL bertanda tangan bertindak sebagai credential akses bagi pemegangnya; batasi masa berlaku, cakupan, dan 5. Aktifkan TLS antarlayanan dengan validasi sertifikat. Credential aplikasi hanya boleh mengakses bucket dan operasi yang dibutuhkan, serta tidak perlu berhak mengubah policy saat runtime. 6. Tinjau route Nginx /storage agar tidak menyediakan jalur langsung yang menghindari pemeriksaan backend. Sajikan format berisiko sebagai attachment atau melalui origin terpisah sesuai kebutuhan. Request file dengan sesi terverifikasi -> cari metadata file pada database -> periksa hak terhadap penugasan atau entitas -> ambil objek private atau terbitkan URL singkat -> catat actor, objek, hasil dan request ID|
|---|---|
|Uji|Kriteria lulus|
|Listing anonim ke storage|AccessDenied dari sudut jaringan yang diperbolehkan untuk pengujian.|
|File tanpa login lewat API|401; dokumen tidak dikirim.|
|File milik pengguna atau penugasan lain|403 atau 404; perubahan ID atau objectName tidak melewati kontrol.|
|Pengguna yang sah|Dokumen yang memang berhak diakses tetap terbuka.|
|Restart atau deploy backend|Policy tetap private; aplikasi tidak mengubahnya menjadi public.|
|Presigned URL bila dipakai|Kedaluwarsa sesuai kebijakan; tidak memberi akses ke objek lain.|
|TLS dan hak credential|Sertifikat diverifikasi; akses bucket lain atau perubahan policy ditolak. Bukti penutupan: policy tersanitasi, diff source startup dan file endpoint, hasil negatif anonim dan lintas objek, uji restart di staging, serta bukti trafik menggunakan TLS. Mengubah bucket menjadi private saja belum menutup endpoint file yang tidak berotorisasi. INTERNAL TERBATAS | 12 November 2026 | Halaman 12|

-- page 6 --

# 12 Urutan penanganan dan pembagian tanggung jawab

Perbaikan F01 sampai F04 saling berkaitan. Batas akses API dan bucket perlu diperbaiki bersama, sedangkan isolasi database dapat dikerjakan admin paralel dengan perubahan aplikasi. Tabel berikut adalah usulan urutan, bukan jadwal yang sudah disepakati atau perubahan yang sudah diterapkan.

|Tahap|Tindakan|Pelaksana dan bukti|
|---|---|---|
|Segera|Containment API sensitif; hentikan akses DB dari luar; koordinasikan pembatasan storage.|Pemilik layanan, admin VM dan storage; catatan perubahan serta uji konektivitas.|
|Sebelum coding selesai|Inventaris rute, role, objek, file dan alur bisnis yang harus tetap bekerja.|Developer dan pemilik proses; matriks permission yang disetujui.|
|Perbaikan utama|Auth server, otorisasi objek, DTO, registrasi terbatas, private storage, penghapusan policy reset.|Developer; PR, test negatif dan hasil staging.|
|Target usulan 72 jam setelah containment|Patch Multer, migrasi Node, pembatasan upload dan resource sesuai kompatibilitas.|Developer dan admin; image digest, versi runtime dan uji regresi.|
|Deployment terkontrol|Review, backup terverifikasi, rollout terbatas, monitoring error dan rollback bila perlu.|Developer dan admin; checklist rilis dan validasi data.|
|Retest dan penutupan|Uji ulang tiap kriteria penerimaan dari sudut anonim, user, admin dan jaringan luar.|Tim keamanan bersama developer; bukti per ID dan keputusan penutupan.|

## Kebutuhan pengujian lintas komponen

Gunakan staging yang mencerminkan konfigurasi proxy, middleware, image, role dan policy storage produksi. Perbaikan yang lulus unit test tetapi gagal saat melalui Nginx belum cukup. Uji login, daftar pengguna yang berhak, penugasan, permintaan, upload, pembacaan dokumen, serta jalur administrator secara menyeluruh dengan data uji.

## Pengamanan selama rollout

Simpan konfigurasi sebelum perubahan dan pastikan jalur rollback tidak menghapus volume database. Validasi backup lewat proses restore yang sesuai sebelum perubahan besar. Hindari mengubah firewall atau SSH sebelum jalur administrasi pengganti teruji. Perubahan policy storage harus dikoordinasikan agar dokumen sah tetap dapat diakses melalui jalur yang sudah berotorisasi.

Karena hash pengguna telah dapat dibaca secara anonim, pemilik layanan perlu menilai periode paparan, distribusi hash, kebutuhan reset password, serta pencabutan sesi. Kesimpulan insiden harus mempertimbangkan log dan konteks pengguna; jumlah pihak lain yang menyalin data belum diketahui.

-- page 13 --

# 13 Penguatan tambahan pada host dan deployment

Observasi berikut menambah konteks perbaikan, tetapi tidak dihitung sebagai temuan F baru dan tidak otomatis membuktikan kompromi. Penanganannya dapat mengikuti perbaikan prioritas utama, dengan pekerjaan admin dibedakan dari perubahan kode.

|Area|Kondisi snapshot|Tindak lanjut yang disarankan|
|---|---|---|
|SSH dan akses admin|Password login dan port 22 publik; kominfo anggota sudo, docker dan lxd.|Key-only setelah akses pengganti teruji; batasi sumber admin dan review pemilik key.|
|Kernel dan proses lama|Kernel berjalan 6.8.0-142; paket 6.8.0-147 terpasang; reboot-required ada.|Reboot terencana setelah containment dan backup; verifikasi kernel aktif sesudahnya.|
|Container user dan kuota|Frontend dan backend berjalan sebagai root; tanpa memory, CPU atau PID limit.|Uji user non-root, cap-drop dan no-new-privileges sesuai kebutuhan; pasang kuota.|
|Healthcheck|Empat kontainer running dengan restart count 0; tanpa healthcheck.|Tambahkan healthcheck yang mengukur kesiapan secara ringan dan tidak mengubah data.|
|Secret dan file config|Credential literal ditemukan pada Compose dan config DB dengan mode 0664.|Pindah ke pengelolaan secret; batasi permission dan akses build; rotasi terencana.|
|Logging|json-file tanpa opsi rotasi explicit pada inspect; general/slow query log DB OFF.|Validasi kebijakan daemon; rotasi dan retensi yang memadai; hindari hash/PII pada log.|
|HTTP headers|Root tidak memuat HSTS, CSP, X-Content-Type- Options dan X-Frame-Options.|Terapkan header dengan uji kompatibilitas. Prioritaskan auth sebelum hardening header.|
|Backup|Dump inisialisasi lama ditemukan; job backup khusus tidak terlihat.|Minta bukti backup eksternal atau snapshot dan hasil restore; jangan mengandalkan dump lama.|
|Deteksi dan baseline|Auditd tidak aktif; AV/FIM terpilih tidak tersedia pada pemeriksaan.|Bangun telemetry dan baseline setelah penilaian insiden serta remediasi memadai.|

## Hal yang tidak perlu disimpulkan berlebihan

Mode 1777 pada data directory MySQL perlu ditinjau, tetapi parent /var/lib/docker membatasi traverse sehingga audit tidak menyatakan semua user host bisa menulis ke sana. Proses atau library berlabel deleted dapat berasal dari upgrade paket yang belum dimuat ulang. Tidak ada privileged container, host PID/network mode, atau mount docker.sock yang ditemukan pada kontainer yang diperiksa.

*Rujukan bukti: 05_auth, 08_container_config, 10_integrity, 13_database, 17_deep_validation, 21_final_health.*

||APIPTA | Laporan audit keamanan untuk developer 14 Aktivitas serangan dan hasil hunting Brute force SSH selama tujuh hari|Pada rentang 5 November sekitar 05.16 sampai 12 November 2026 sekitar 05.16 WITA, agregasi auth log memeriksa 314.393 baris dan menghitung 84.232 kejadian Failed password. Sebanyak 48.581 menyasar root. Perhitungan tidak menambahkan Invalid user dan PAM error agar kejadian yang sama tidak dihitung berulang.|
|---|---|---|
|IP sumber|Failed password|Interpretasi|
|176.53.159.197|3.361|Brute force teramati|
|176.53.159.198|3.253|Brute force teramati|
|109.160.32.46|2.394|Brute force teramati|
|109.160.32.112|2.117|Masih terlihat pada snapshot awal|
|222.210.35.197|1.394 diperiksa. Tidak dilakukan blokir IP atau perubahan SSH dalam audit. Trafik web dan koreksi false positive mengembalikan JSON pengguna dan menjadi bukti F01. Hasil hunting yang relevan menghasilkan persistensi asing yang terkonfirmasi. pernah dimanfaatkan pihak lain.|Brute force teramati Accepted login pada agregat hanya untuk kominfo dengan password. Kepemilikan seluruh sumber login belum diverifikasi, sehingga audit tidak menyebutnya login penyerang. Tidak ada accepted root pada rentang yang Log Nginx Docker selama 72 jam, dibatasi maksimum 20.000 baris, menghasilkan 6.245 request yang berhasil diparse sebelum probe audit. Terdapat 4.115 status 200, 1.126 status 301, 707 status 304 dan 73 status 500, ditambah status lain. Probe .env, Git, WordPress atau PHP tidak otomatis menunjukkan eksploitasi berhasil. GET /, /.env, /.git/config, /package.json dan path acak menghasilkan HTML SPA identik sepanjang 1.687 byte. Karena itu respons 200 tersebut bukan bukti kebocoran file. Sebaliknya /api/user/all benar-benar Snapshot 150 proses tidak menunjukkan variabel GSOCKET, GS_SECRET, LD_PRELOAD atau LD_AUDIT yang dicari. Temp host dan empat kontainer diperiksa, termasuk 544 file temp frontend. Sebanyak 65 file backend terpilih tidak menghasilkan kandidat signature eksekusi atau malware. Cron dan systemd yang diperiksa tidak Verifikasi dpkg pada paket eksekusi, autentikasi dan cron terpilih tidak menunjukkan perbedaan. Kernel taint 0; dispatcher eBPF HID yang diperiksa memiliki map kosong. Hasil ini terbatas: dependencies, full disk, memori kernel independen dan histori lengkap tidak dipindai. Log tidak cukup untuk memastikan apakah kelemahan API Rujukan bukti: 12_auth_summary, 15_web_telemetry, 17_deep_validation, 19_validation_followup, 21_final_health. INTERNAL TERBATAS | 12 November 2026 | Halaman 15|

-- page 14 --

# 15 Inventaris rute yang perlu ditinjau ulang

Inventaris berikut dikelompokkan dari router yang dibaca saat audit. Tabel bukan pernyataan bahwa seluruh endpoint telah dipanggil secara live. Tujuannya membantu developer memastikan pemasangan guard tidak berhenti pada endpoint yang dijadikan contoh F01.

|Kelompok|Contoh rute yang ditemukan|Kontrol minimum|
|---|---|---|
|Identitas|POST /api/login; POST /api/register|Login memverifikasi credential; registrasi dibatasi; rate-limit; respons aman.|
|Pengguna|GET /api/user/all; PUT dan DELETE /api/user/:id|Permission admin atau aturan yang disetujui; pemeriksaan target; allowlist field; DTO.|
|Role|POST dan GET /api/roles; GET /api/roles/user; PUT dan DELETE /api/roles/:id|Akses administratif; cegah role escalation dan hash nested pada relasi user.|
|Penugasan|POST dan GET /api/penugasan; GET, PUT, DELETE /api/penugasan/:id|Identitas dan akses terhadap penugasan atau entitas.|
|Permintaan|POST, GET /api/permintaan; GET, PUT, DELETE /api/permintaan/:id; POST /api/permintaan/status|Hak atas record; pembatasan transisi status; upload berotorisasi.|
|Audit KKA|/api/audit_kka; /api/audit_kka/:id; /api/audit_kka/penugasan/:id_penugasan|Hubungan user dengan penugasan dan dokumen; pembatasan field per role.|
|File audit|/api/audit_kka/user/file; /api/audit_kka/obrik/file; /api/audit_kka/bpkp/file|Hak upload, baca dan update objek; validasi file; batas parser.|
|File MinIO|GET /api/file/:objectName dan /api/file/download/:objectName|Otorisasi objek berdasarkan metadata aplikasi; bucket private.|
|Kompilasi dan tindak lanjut|/api/kompilasi, /api/rekomendasi, /api/aksi dan operasi ID terkait|Izin per tindakan dan objek; input skema; audit perubahan.|
|Chat dan notifikasi|/api/chats, /api/chats/:pengirim, /api/notif dan rute pengguna|Pemilik atau penerima diverifikasi server; cegah perubahan melalui GET.|
|Health|GET /api/health|Hanya informasi minimal yang diperlukan; tidak membuka secret atau data bisnis.|

Source juga mendefinisikan GET /api/notif/read/:id/:id_user ke controller baca yang memperbarui status.

Jangan mengasumsikan semua metode GET bebas perubahan. Audit tidak memanggil rute itu. Developer perlu memindahkan operasi yang mengubah state ke metode dan kontrol yang sesuai, terutama bila memakai sesi cookie.

*Rujukan bukti: routes/index.js pada 09_source_core dan NotifController pada 14_source_extended.*

|||APIPTA | Laporan audit keamanan untuk developer 16 Paket bukti dan batas kesimpulan Indeks bukti untuk tiap temuan||
|---|---|---|---|
||ID|File bukti utama|Kegunaan|
||F01|09_source_core; 14_source_extended; 16_external_perimeter|Alur router dan controller, kesamaan hash host dengan live, metadata respons anonim.|
||F02|03_firewall; 08_container_config; 13_database; 16_external_perimeter; 18_db_data_hunt|Aturan efektif, port Docker, akun/grant/config, handshake eksternal.|
||F03|07_layout; 09_source_core; 14_source_extended|Batas Nginx, inisialisasi upload, versi paket terpasang.|
||F04|14_source_extended; 17_deep_validation; 19_validation_followup|Policy source, log startup sukses, zero-key listing anonim.|
||Kesehatan akhir|21_final_health|Status kontainer, restart count, service dan health HTTPS.|
||independen. terverifikasi. tereksploitasi.|Cara menjaga bukti tetap aman akun serta record dummy untuk retest. Batas pemeriksaan yang perlu tetap dicatat snapshot tanpa retest. scan atau pengambilan memori. Kondisi yang mendukung operasi saat audit tidak menutup kelemahan aplikasi.|Nama pada tabel merujuk file JSON dalam direktori evidence audit. Paket audit asli juga memuat FINDINGS.json, COVERAGE.json dan SHA256SUMS.txt. Laporan ini mengemas ulang bukti untuk tindak lanjut developer; file bukti asli tetap dipertahankan. Hash manifest membuktikan konsistensi file tersimpan, bukan keaslian host Bagikan laporan pada pihak yang menangani perbaikan. Bila developer memerlukan file JSON, distribusikan paket evidence tersanitasi melalui kanal internal yang disetujui. Jangan memasukkan nilai credential, hash password pengguna, isi dokumen atau data pribadi ke tiket, screenshot, log pengujian, atau repository. Gunakan-Audit dilakukan pada snapshot 12 November 2026. Laporan ini tidak menyatakan kondisi deployment setelah-Tidak ada mutasi API, upload uji, DoS, cracking password, exploit container, pengunduhan dokumen, full disk-Kebijakan jaringan upstream, backup eksternal, histori pengakses data dan pemilik semua login admin belum-Bukti live dan source mendukung empat temuan; tidak ada klaim bahwa semua dampak potensial sudah TLS/domain valid, TLSv1.3 berhasil dinegosiasikan dan HTTP mengalihkan ke HTTPS. Sertifikat berlaku sampai 8 Februari 2027 23.59.59 UTC atau 9 Februari 2027 07.59.59 WITA. Pemeriksaan akhir menemukan empat kontainer berjalan, restart count 0, tanpa service systemd gagal, dan /api/health berstatus 200. Hasil tersebut INTERNAL TERBATAS | 12 November 2026 | Halaman 17|

||APIPTA | Laporan audit keamanan untuk developer 17 Referensi dan serah terima perbaikan Referensi teknis primer R1 Express middleware R2 Sequelize scopes R3 Docker port publishing R4 Docker dan UFW R5 Multer CVE 2025 7338 R6 Multer CVE 2026 3520 R7 Multer README dan limits R8 Node end of life R9 Multer rilis 2 5 0 Data yang diminta saat developer mengembalikan hasil|Referensi dibaca untuk menjelaskan mekanisme dan arah perbaikan. Fakta deployment tetap berasal dari evidence audit, sedangkan nomor versi rilis dan advisory perlu diperiksa kembali sebelum implementasi. Rekomendasi patch harus diuji terhadap kebutuhan dan kompatibilitas APIPTA.|
|---|---|---|
|ID|Isian pada tiket perbaikan|Bukti wajib|
|F01|PIC, PR/commit, versi image, tanggal rollout, status test|Matriks izin, test anonim/lintas objek dan DTO tanpa hash.|
|F02|PIC admin/DBA, diff Compose/grant, rencana rollout|Binding aktual, uji eksternal dan uji koneksi backend.|
|F03|PIC, lockfile, versi paket dan digest runtime|Test upload normal, oversize, abort dan malformed di staging.|
|F04|PIC aplikasi/storage, policy dan perubahan startup Status penutupan yang disarankan pengganti perbaikan akar masalah. operasional yang disetujui pemilik layanan.|Penolakan anonim, uji hak file dan policy tetap private setelah restart. Gunakan status Terbuka, Dalam perbaikan, Siap retest, dan Ditutup. Status Siap retest memerlukan bukti implementasi pada deployment yang benar. Status Ditutup ditetapkan setelah kriteria penerimaan lulus dan fungsi bisnis yang sah tetap berjalan. Tindakan sementara seperti pembatasan IP dicatat sebagai mitigasi, bukan Permintaan kepada tim developer: konfirmasikan PIC setiap ID, urutan containment dan jadwal perbaikan; kembalikan bukti per ID tanpa secret atau data pengguna. Seluruh tindakan perlu mengikuti proses perubahan INTERNAL TERBATAS | 12 November 2026 | Halaman 18|

-- page 16 --
