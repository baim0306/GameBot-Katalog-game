# 🎮 GameBot - Simple Game Catalog

Aplikasi Web katalog game sederhana yang menampilkan daftar game, dilengkapi dengan fitur pencarian, filter genre, dan pengurutan (sorting).

## 🚀 Status Proyek

| Kategori | Status |
| :--- | :--- |
| Frontend | HTML, Tailwind CSS, Vanilla JavaScript (DOM Manipulation) |
| Backend | Node.js (Express) |
| Data | Data diambil dari API publik melalui server side fetching. |

---

## 🧭 Table of Content
* [Tentang](#tentang)
* [Fitur Utama](#fitur-utama)
* [Teknologi](#teknologi)
* [Instalasi Lokal](#instalasi-lokal)
* [Screenshot](#screenshot)
* [Link](#link)

---

## 💡 Tentang

Proyek **GameBot** ini adalah aplikasi web sederhana yang dibangun sebagai sarana pembelajaran untuk menguasai konsep dasar *full-stack web development*, khususnya:

1.  **Server-Side Fetching:** Mengambil data dari API eksternal di sisi *server* (Express) sebelum mengirimkannya ke *client*.
2.  **Manajemen State Sederhana:** Menggunakan URL Query Parameters (`?search=...`, `?genre=...`) untuk mengelola *state* aplikasi.
3.  **DOM Manipulation:** Menggunakan Vanilla JavaScript untuk merender data dan mengelola interaksi pengguna di sisi *client* (lihat `public/script.js`).

**PEMBERITAHUAN:** Aplikasi ini dibuat murni untuk tujuan edukasi dan **tidak berafiliasi, didukung, atau disahkan** oleh penyedia data game mana pun atau pihak ketiga lainnya.

---

## ✨ Fitur Utama

* **Tampilan Katalog:** Menampilkan daftar game dalam format *card* yang informatif.
* **Pencarian (Search):** Mencari game berdasarkan *query* input melalui *event listener* `keydown` (Enter).
* **Filter Genre:** Memfilter daftar game dengan memilih genre dari *sidebar*.
* **Pengurutan (Sorting):** Mengurutkan game berdasarkan tanggal rilis (Terbaru/Terlama) dan rating (Tertinggi).
* **Navigasi Responsif:** *Sidebar* yang dapat di-*toggle* untuk navigasi filter.
* **Halaman Detail:** Navigasi ke `/game/{id}` saat *card* game diklik.

---

## 🛠️ Teknologi

* **Frontend:**
    * **HTML5**
    * **Vanilla JavaScript**
    * **Tailwind CSS** (Digunakan untuk styling dan layout, seperti yang terlihat pada `gameCard` function).
* **Backend:**
    * **Node.js**
    * **Express.js**
* **Dependencies Tambahan (Server):**
    * **dotenv:** Untuk mengelola variabel lingkungan, seperti API Key, secara aman.

---

## ⚙️ Instalasi Lokal

Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone Repositori:**
    ```bash
    git clone [https://github.com/baim0306/GameBot-Katalog-game.git](https://github.com/baim0306/GameBot-Katalog-game.git)
    cd https://github.com/baim0306/GameBot-Katalog-game.git
    ```

2.  **Instal Dependencies Server:**
    ```bash
    npm install
    ```
    *(Asumsi Anda menggunakan `npm` dan memiliki file `package.json` di root folder.)*

3.  **Konfigurasi API Key (Jika Ada):**
    Buat file `.env` di root folder dan masukkan API Key yang diperlukan oleh *server* Express Anda.
    ```
    # Contoh
    RAWG_API_KEY=your_api_key_here 
    ```

4.  **Jalankan Server:**
    ```bash
    node index.js 
    # atau jika menggunakan nodemon: 
    # npm start
    ```

5.  **Akses Aplikasi:**
    Buka *browser* Anda dan kunjungi `http://localhost:3000` (atau port yang Anda gunakan).

---

## 🖼️ Screenshot

### Halaman Beranda (Home Page)
![Screenshot Halaman Utama](public/assets/images/home-page.jpg)

### Halaman Detail Game (Detail Page)
![Screenshot Halaman Detail Game](public/assets/images/game-page.jpg)

---

## 🔗 Link

* **Live Demo:** ([https://game-bot-katalog-game.vercel.app/](https://game-bot-katalog-game.vercel.app/))
* **API Data:** (`https://rawg.io/apidocs`)

---