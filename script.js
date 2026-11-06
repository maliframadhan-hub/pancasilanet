window.tailwind = window.tailwind || {};
window.tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        patriot: {
                            navy: '#0b132b',
                            dark: '#1c2541',
                            card: '#162238',
                            crimson: '#e63946',
                            crimsonGlow: '#ff4d5a',
                            gold: '#ffb703',
                            goldHover: '#fb8500',
                            accent: '#48cae4',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    boxShadow: {
                        glowRed: '0 0 25px rgba(230, 57, 70, 0.4)',
                        glowGold: '0 0 25px rgba(255, 183, 3, 0.35)',
                        glowCyan: '0 0 25px rgba(72, 202, 228, 0.3)',
                    }
                }
            }
        }

// Global State & Data
        function updateFooterClock() {
            const now = new Date();
            const dateElement = document.getElementById('footer-current-date');
            const timeElement = document.getElementById('footer-current-time');
            dateElement.textContent = new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(now);
            timeElement.textContent = new Intl.DateTimeFormat('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            }).format(now);
            timeElement.dateTime = now.toISOString();
        }

        // Tab Navigation
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

            document.getElementById(`tab-${tabId}`).classList.remove('hidden');
            const activeNav = document.getElementById(`nav-${tabId}`);
            if (activeNav) activeNav.classList.add('active');

            if (tabId === 'matriks') selectSilaTab(1);
            if (tabId === 'simulator') startRandomSimRun();
            if (tabId === 'komitmen') renderPledgeCards();
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const toggle = document.getElementById('menu-toggle');
            const isOpening = menu.classList.contains('hidden');

            menu.classList.toggle('hidden', !isOpening);
            toggle.setAttribute('aria-expanded', String(isOpening));
            toggle.setAttribute('aria-label', isOpening ? 'Tutup menu navigasi' : 'Buka menu navigasi');
        }

        function toggleTheme() {
            const isDark = document.documentElement.classList.toggle('dark');
            const toggle = document.getElementById('theme-toggle');
            const label = isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap';

            toggle.setAttribute('aria-pressed', String(isDark));
            toggle.setAttribute('aria-label', label);
            toggle.setAttribute('title', label);
            toggle.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
        }

        // Sila Matrix Detailed Data
        const silaMatrixData = {
            1: {
                title: "Sila 1: Ketuhanan Yang Maha Esa",
                subtitle: "Toleransi & Adab Beragama di Ruang Digital",
                colorClass: "patriot-gold",
                dos: [
                    "Menghormati perayaan dan simbol keagamaan pengguna lain di media sosial.",
                    "Menyebarkan konten positif berbasis moralitas dan kedamaian.",
                    "Menjaga kerukunan antar umat beragama dalam diskusi online."
                ],
                donts: [
                    "Melakukan ujaran kebencian (hate speech) berbasis SARA.",
                    "Memprovokasi isu penodaan agama atau sekte di kolom komentar.",
                    "Menyebarkan hoaks bernuansa bentrokan antar-keyakinan."
                ],
                uuIte: "Pasal 28 Ayat (2) UU ITE: Larangan menyebarkan informasi yang menimbulkan rasa kebencian atau permusuhan berdasarkan SARA (Ancaman 6 tahun penjara).",
                caseStudy: "Kasus unggahan meme bernuansa penghinaan simbol agama yang memicu kerusuhan publik."
            },
            2: {
                title: "Sila 2: Kemanusiaan yang Adil dan Beradab",
                subtitle: "Anti-Cyberbullying & Empati Siber",
                colorClass: "patriot-crimson",
                dos: [
                    "Menggunakan bahasa yang sopan dan santun saat mengkritik.",
                    "Melindungi data pribadi diri sendiri dan orang lain (Privacy Protection).",
                    "Memberikan dukungan moral kepada korban perundungan siber."
                ],
                donts: [
                    "Melakukan cyberbullying, body shaming, atau tuduhan tanpa bukti.",
                    "Melakukan Doxxing (menyebarkan identitas pribadi/nik/alamat orang lain secara ilegal).",
                    "Menjadikan musibah atau kemalangan orang lain sebagai bahan lelucon (dark jokes melampaui batas)."
                ],
                uuIte: "Pasal 27A & Pasal 27 Ayat (1) UU ITE: Penyerangan kehormatan, nama baik, dan pencemaran nama baik di ruang digital.",
                caseStudy: "Penyebaran foto pribadi mantan pasangan (Revenge Porn) dan perundungan massal netizen."
            },
            3: {
                title: "Sila 3: Persatuan Indonesia",
                subtitle: "Anti-Hoaks & Keutuhan NKRI",
                colorClass: "emerald-400",
                dos: [
                    "Mengutamakan persatuan dan keutuhan bangsa di atas kepentingan kelompok.",
                    "Memverifikasi kebenaran informasi sebelum membagikannya (Tabayyun).",
                    "Mempromosikan kekayaan budaya nusantara dan prestasi anak bangsa."
                ],
                donts: [
                    "Menyebarkan hoaks kebencanaan atau politik yang meresahkan masyarakat.",
                    "Mengadu domba antarsuku, antarwilayah, atau antarorganisasi.",
                    "Mendukung aksi separatisme atau radikalisme siber."
                ],
                uuIte: "Pasal 28 Ayat (1) & (3) UU ITE: Menyebarkan berita bohong yang merugikan dan menyesatkan masyarakat.",
                caseStudy: "Penyebaran hoaks bahaya vaksin dan berita palsu manipulasi pemilu yang mengancam stabilitas nasional."
            },
            4: {
                title: "Sila 4: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
                subtitle: "Musyawarah & Netiket Berpendapat",
                colorClass: "patriot-accent",
                dos: [
                    "Menyampaikan aspirasi dan kritik secara konstruktif dan etis.",
                    "Menghargai perbedaan opini politik dalam diskusi publik.",
                    "Menggunakan saluran resmi atau dialog santun untuk menyelesaikan konflik online."
                ],
                donts: [
                    "Menggunakan bot account atau buzzer jahat untuk merekayasa opini publik.",
                    "Melakukan intimidasi siber kepada pihak yang berbeda pendapat.",
                    "Memotong pembicaraan atau memanipulasi fakta dalam debat online."
                ],
                uuIte: "Pasal 29 UU ITE: Larangan mengirimkan informasi elektronik yang berisi ancaman kekerasan atau menakut-nakuti.",
                caseStudy: "Serangan tuduhan pengkhianatan dan manipulasi tren topik media sosial menggunakan akun terkoordinasi."
            },
            5: {
                title: "Sila 5: Keadilan Sosial bagi Seluruh Rakyat Indonesia",
                subtitle: "Menghormati Hak Cipta & HAKI Karya",
                colorClass: "purple-400",
                dos: [
                    "Mencantumkan sumber/kredit pencipta saat membagikan foto, ilustrasi, atau artikel.",
                    "Mendukung kreator konten lokal dan produk dalam negeri.",
                    "Mendorong akses informasi yang adil dan inklusif bagi penyandang disabilitas."
                ],
                donts: [
                    "Melakukan plagiarisme karya digital atau mengklaim buatan sendiri.",
                    "Mendistribusikan software/film/musik bajakan demi keuntungan pribadi.",
                    "Melakukan penipuan transaksi belanja online (Online Shop Fraud)."
                ],
                uuIte: "UU Hak Cipta No. 28 Tahun 2014 & Pasal 34 UU ITE: Larangan memproduksi/mendistribusikan perangkat pembuat kejahatan siber & pelanggaran HAKI.",
                caseStudy: "Pencurian karya seni digital ilustrator lokal yang dijual kembali dalam bentuk barang komersial tanpa izin."
            }
        };

        function selectSilaTab(silaNum) {
            document.querySelectorAll('.sila-select-btn').forEach(b => b.classList.remove('active', 'border-patriot-gold'));
            document.getElementById(`sila-btn-${silaNum}`).classList.add('active', 'border-patriot-gold');

            const data = silaMatrixData[silaNum];
            const contentBox = document.getElementById('sila-content-box');

            contentBox.innerHTML = `
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                    <div>
                        <span class="text-xs font-extrabold uppercase text-${data.colorClass} tracking-widest">${data.subtitle}</span>
                        <h3 class="text-2xl font-black text-white mt-1">${data.title}</h3>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">Modul Pembelajaran</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Do's -->
                    <div class="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                        <h4 class="font-bold text-emerald-400 text-sm flex items-center gap-2">
                            <i class="fa-solid fa-circle-check"></i> Anjuran Perilaku (Do's)
                        </h4>
                        <ul class="space-y-2 text-xs text-slate-300">
                            ${data.dos.map(d => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-400 mt-0.5"></i> <span>${d}</span></li>`).join('')}
                        </ul>
                    </div>

                    <!-- Don'ts -->
                    <div class="p-5 rounded-2xl bg-patriot-crimson/10 border border-patriot-crimson/30 space-y-3">
                        <h4 class="font-bold text-patriot-crimsonGlow text-sm flex items-center gap-2">
                            <i class="fa-solid fa-circle-xmark"></i> Larangan Perilaku (Don'ts)
                        </h4>
                        <ul class="space-y-2 text-xs text-slate-300">
                            ${data.donts.map(d => `<li class="flex items-start gap-2"><i class="fa-solid fa-xmark text-patriot-crimson mt-0.5"></i> <span>${d}</span></li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- UU ITE & Legal Context -->
                <div class="p-4 rounded-2xl bg-patriot-navy border border-slate-700 space-y-2">
                    <span class="text-xs font-bold text-patriot-gold flex items-center gap-2">
                        <i class="fa-solid fa-scale-balanced"></i> Payung Hukum & UU ITE Relevan:
                    </span>
                    <p class="text-xs text-slate-300 leading-relaxed">${data.uuIte}</p>
                </div>
            `;
        }

        // Dilemma Simulator Data & Logic
        const simScenarios = [
            {
                title: "Hoaks Berita Kebencanaan Alam",
                sila: "Sila #3 Persatuan",
                desc: "Anda menerima pesan berantai di grup obrolan keluarga yang menyebutkan akan terjadi tsunami susulan dalam 2 jam ke depan akibat gempa di daerah lain. Pesan tersebut tidak menyertakan sumber resmi BMKG dan terlihat sangat provokatif.",
                options: [
                    {
                        text: "Meneruskan (Share) pesan tersebut ke grup obrolan lain agar semua teman bersiap-siap.",
                        score: 0,
                        heading: "Keputusan Berisiko Tinggi",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Menyebarkan informasi yang belum diverifikasi dapat memicu kepanikan massal dan melanggar Sila 3 (Persatuan Indonesia).",
                        legal: "Pasal 28 Ayat (1) UU ITE tentang penyebaran berita bohong yang menimbulkan kerugian.",
                        social: "Memicu trauma, kecemasan massal, dan gangguan lalu lintas evakuasi."
                    },
                    {
                        text: "Mengecek situs resmi BMKG/Kominfo, dan memberi tahu anggota grup bahwa berita tersebut belum terkonfirmasi.",
                        score: 25,
                        heading: "Keputusan Sangat Tepat!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Sangat Bijak! Anda menerapkan prinsip Saring Sebelum Sharing dan menjaga ketenangan publik.",
                        legal: "Aman dari sanksi hukum dan membantu aparat menanggulangi hoaks.",
                        social: "Menjaga kondusivitas masyarakat dan mengedukasi anggota grup."
                    }
                ]
            },
            {
                title: "Perundungan Siber (Cyberbullying) Rekan Kerja",
                sila: "Sila #2 Kemanusiaan",
                desc: "Di media sosial X (Twitter), ada akun anonim yang mengunggah foto rekan kerja Anda disertai ejekan fisik dan tuduhan bohong yang memicu hinaan dari netizen lain.",
                options: [
                    {
                        text: "Mendukung rekan kerja secara pribadi, serta melaporkan (report) unggahan tersebut ke platform.",
                        score: 25,
                        heading: "Keputusan Sangat Tepat!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Langkah ini mencerminkan Sila 2 (Kemanusiaan yang Beradab) dengan menunjukkan empati siber.",
                        legal: "Membantu pengumpulan bukti pelanggaran Pasal 27A UU ITE.",
                        social: "Meringankan beban psikologis korban perundungan."
                    },
                    {
                        text: "Ikut membagikan unggahan tersebut agar semakin viral dan ramai dibicarakan.",
                        score: 0,
                        heading: "Keputusan Melanggar Etika",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Tindakan ini memperparah cyberbullying dan merusak kehormatan orang lain.",
                        legal: "Dapat dijerat Pasal 27A UU ITE terkait pencemaran nama baik.",
                        social: "Memperluas dampak perundungan dan merusak kesehatan mental korban."
                    }
                ]
            },
            {
                title: "Plagiarisme Karya Seni Digital AI",
                sila: "Sila #5 Keadilan",
                desc: "Anda menemukan ilustrasi buatan desainer lokal yang sangat bagus. Anda ingin menggunakannya sebagai poster komersial acara Anda.",
                options: [
                    {
                        text: "Mengunduh gambar, menghapus watermark pencipta, dan menjual merchandise dengannya.",
                        score: 0,
                        heading: "Pelanggaran Hak Cipta",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Melanggar Sila 5 (Keadilan Sosial) karena merampas hak ekonomi dan moral pencipta karya.",
                        legal: "Pelanggaran UU Hak Cipta No. 28/2014 dan UU ITE.",
                        social: "Mematikan ekosistem kreator digital lokal."
                    },
                    {
                        text: "Menghubungi pencipta karya untuk meminta izin lisensi resmi atau mencantumkan kredit secara lengkap.",
                        score: 25,
                        heading: "Keputusan Sangat Beradab!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Menghormati HAKI adalah wujud keadilan sosial dan pengakuan atas karya cipta insan kreatif.",
                        legal: "Sesuai dengan ketentuan lisensi Hak Kekayaan Intelektual.",
                        social: "Mendukung perkembangan industri kreatif lokal."
                    }
                ]
            },
            {
                title: "Provokasi Kebencian Berbasis SARA",
                sila: "Sila #1 Ketuhanan",
                desc: "Sebuah unggahan di media sosial menuduh kelompok agama tertentu sebagai penyebab masalah di lingkungan sekitar. Unggahan itu belum terbukti, tetapi mulai memancing komentar penuh kebencian.",
                options: [
                    {
                        text: "Membagikan unggahan itu agar orang lain ikut memperingatkan kelompok tersebut.",
                        score: 0,
                        heading: "Keputusan Berisiko Tinggi",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Menyebarkan tuduhan tanpa bukti dapat memperluas kebencian dan merusak kerukunan antarumat beragama.",
                        legal: "Ketentuan UU ITE melarang penyebaran informasi yang menimbulkan kebencian atau permusuhan berbasis SARA.",
                        social: "Meningkatkan prasangka dan berisiko memicu konflik di masyarakat."
                    },
                    {
                        text: "Tidak ikut menyebarkannya, memeriksa sumber tepercaya, lalu melaporkan konten yang menghasut kebencian.",
                        score: 25,
                        heading: "Keputusan Bijak dan Toleran!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Anda menjaga martabat sesama, mengedepankan verifikasi, dan mencegah ujaran kebencian menyebar.",
                        legal: "Mendukung upaya mencegah penyebaran konten yang melanggar ketentuan UU ITE.",
                        social: "Membantu menjaga kerukunan dan mencegah konflik berbasis SARA."
                    }
                ]
            },
            {
                title: "Perbedaan Pendapat di Forum Warga",
                sila: "Sila #4 Kerakyatan",
                desc: "Dalam forum daring warga, pendapat Anda tentang suatu kebijakan berbeda dengan mayoritas. Sejumlah anggota mulai menyerang pribadi dan meminta Anda diam.",
                options: [
                    {
                        text: "Menjawab dengan alasan dan sumber yang jelas, tetap santun, serta mengajak kembali berdiskusi pada pokok masalah.",
                        score: 25,
                        heading: "Keputusan Demokratis!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Menyampaikan aspirasi secara santun dan rasional mencerminkan musyawarah serta penghormatan terhadap perbedaan.",
                        legal: "Mendukung kebebasan berpendapat yang dijalankan secara bertanggung jawab dan sesuai hukum.",
                        social: "Membuka ruang dialog yang sehat dan mendorong keputusan bersama."
                    },
                    {
                        text: "Membalas dengan hinaan dan mengajak teman-teman menyerang akun orang yang tidak setuju.",
                        score: 0,
                        heading: "Keputusan Memperkeruh Konflik",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Serangan pribadi dan pengerahan massa digital menghilangkan kesempatan bermusyawarah dan dapat merugikan orang lain.",
                        legal: "Ujaran atau ancaman tertentu dapat melanggar ketentuan hukum yang berlaku di ruang digital.",
                        social: "Memperbesar polarisasi dan membuat warga enggan menyampaikan pendapat."
                    }
                ]
            },
            {
                title: "Menyebarkan Tangkapan Layar Percakapan Pribadi",
                sila: "Sila #2 Kemanusiaan",
                desc: "Seorang teman mengirimkan tangkapan layar percakapan pribadi dengan anggota keluarga yang sedang mengalami masalah. Nama dan nomor telepon terlihat, lalu teman Anda meminta agar gambar itu disebarkan ke grup lain.",
                options: [
                    {
                        text: "Meneruskan tangkapan layar agar orang lain ikut membicarakan masalah tersebut.",
                        score: 0,
                        heading: "Keputusan Mengabaikan Privasi",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Menyebarkan percakapan pribadi tanpa izin dapat mempermalukan dan merugikan orang lain.",
                        legal: "Data pribadi dan komunikasi seseorang harus ditangani dengan menghormati privasi serta ketentuan yang berlaku.",
                        social: "Dapat merusak kepercayaan dan memperbesar tekanan yang dialami pihak terkait."
                    },
                    {
                        text: "Tidak meneruskannya, meminta izin pemilik percakapan, dan menghapus atau menyamarkan data pribadi sebelum berbagi bila memang diperlukan.",
                        score: 25,
                        heading: "Keputusan Penuh Empati!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Menghormati privasi dan menjaga martabat orang lain mencerminkan nilai kemanusiaan yang beradab.",
                        legal: "Membatasi penyebaran data pribadi dan meminta persetujuan sebelum membagikan informasi sensitif.",
                        social: "Menjaga rasa aman dan kepercayaan dalam berkomunikasi."
                    }
                ]
            },
            {
                title: "Tautan Hadiah yang Meminta Kode OTP",
                sila: "Sila #5 Keadilan",
                desc: "Anda menerima pesan yang mengatasnamakan toko daring terkenal. Pesan itu menjanjikan hadiah dan meminta Anda membuka tautan lalu mengirimkan kode OTP untuk mengklaimnya.",
                options: [
                    {
                        text: "Membuka tautan dan mengirimkan kode OTP agar hadiah tidak kedaluwarsa.",
                        score: 0,
                        heading: "Keputusan Berisiko Tinggi",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Kode OTP bersifat rahasia. Memberikannya dapat membuka akses ke akun atau transaksi Anda.",
                        legal: "Jangan membagikan kode autentikasi; laporkan dugaan penipuan kepada platform atau penyedia layanan terkait.",
                        social: "Berisiko menimbulkan kerugian finansial dan penyalahgunaan identitas."
                    },
                    {
                        text: "Tidak membuka tautan atau membagikan OTP, lalu memeriksa promo melalui aplikasi atau situs resmi.",
                        score: 25,
                        heading: "Keputusan Aman dan Bertanggung Jawab!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Memeriksa kanal resmi dan melindungi kredensial membantu mencegah penipuan digital.",
                        legal: "Simpan bukti pesan dan laporkan melalui kanal resmi jika terindikasi sebagai penipuan.",
                        social: "Melindungi diri sendiri serta membantu mencegah orang lain menjadi korban."
                    }
                ]
            },
            {
                title: "Video Deepfake tentang Keadaan Darurat",
                sila: "Sila #3 Persatuan",
                desc: "Sebuah video yang tampak menampilkan pejabat mengumumkan keadaan darurat tersebar luas. Rekaman itu tidak mencantumkan sumber dan berisi ajakan mengungsi, sehingga warga mulai panik.",
                options: [
                    {
                        text: "Meneruskan video dengan pesan agar semua orang segera mengungsi.",
                        score: 0,
                        heading: "Keputusan Memicu Kepanikan",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Menyebarkan video yang belum terverifikasi dapat menimbulkan kepanikan dan mengganggu upaya penanganan keadaan darurat.",
                        legal: "Informasi mengenai keadaan darurat perlu diverifikasi melalui sumber resmi sebelum disebarkan.",
                        social: "Dapat menyebabkan kepanikan, kemacetan, dan menyulitkan masyarakat memperoleh informasi akurat."
                    },
                    {
                        text: "Memeriksa pengumuman dari instansi resmi, mencari konfirmasi dari beberapa sumber tepercaya, dan tidak menyebarkan video sebelum jelas.",
                        score: 25,
                        heading: "Keputusan Bijak dan Terverifikasi!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Memeriksa konteks dan sumber sebelum berbagi adalah bentuk tanggung jawab untuk menjaga persatuan.",
                        legal: "Gunakan kanal resmi kebencanaan atau pemerintah untuk memperoleh informasi darurat yang dapat dipercaya.",
                        social: "Mengurangi kepanikan dan membantu warga mengambil tindakan yang tepat."
                    }
                ]
            },
            {
                title: "Serangan Akun Terkoordinasi di Ruang Diskusi",
                sila: "Sila #4 Kerakyatan",
                desc: "Dalam diskusi kebijakan publik, banyak akun baru mengirim komentar identik dan menyerang pribadi seorang warga yang berbeda pendapat. Anda diminta ikut membalas agar diskusi terlihat ramai.",
                options: [
                    {
                        text: "Ikut menyerang orang tersebut dan mengajak teman membuat komentar serupa.",
                        score: 0,
                        heading: "Keputusan Merusak Musyawarah",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Serangan terkoordinasi menggantikan dialog dengan intimidasi dan menghambat partisipasi yang sehat.",
                        legal: "Laporkan konten yang melanggar aturan platform; hindari ancaman atau serangan terhadap individu.",
                        social: "Membungkam perbedaan pendapat dan memperkuat polarisasi."
                    },
                    {
                        text: "Menanggapi substansi dengan sopan, melaporkan akun yang melanggar aturan, dan tidak ikut mengerahkan massa.",
                        score: 25,
                        heading: "Keputusan Demokratis!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Musyawarah digital membutuhkan argumen yang beradab dan ruang aman bagi perbedaan pendapat.",
                        legal: "Gunakan fitur pelaporan platform dan sampaikan kritik tanpa ancaman atau penghinaan.",
                        social: "Membantu menjaga diskusi terbuka, tertib, dan berfokus pada masalah."
                    }
                ]
            },
            {
                title: "Konten AI yang Menghina Simbol Keagamaan",
                sila: "Sila #1 Ketuhanan",
                desc: "Di grup percakapan, seseorang membagikan gambar buatan AI yang mengubah simbol keagamaan menjadi bahan ejekan. Gambar itu diberi keterangan seolah-olah kejadian nyata dan mulai memancing kemarahan.",
                options: [
                    {
                        text: "Membagikan ulang gambar itu dengan komentar provokatif agar semakin banyak orang melihatnya.",
                        score: 0,
                        heading: "Keputusan Memperluas Provokasi",
                        badgeClass: "bg-patriot-crimson text-white",
                        feedback: "Menyebarkan konten penghinaan dan keterangan palsu dapat melukai umat beragama serta memicu permusuhan.",
                        legal: "Konten yang menghasut kebencian berbasis SARA dapat melanggar hukum dan aturan platform.",
                        social: "Merusak kerukunan dan meningkatkan risiko konflik antarumat."
                    },
                    {
                        text: "Tidak menyebarkannya, menjelaskan bahwa gambar perlu diverifikasi, dan melaporkannya jika melanggar aturan.",
                        score: 25,
                        heading: "Keputusan Toleran dan Bertanggung Jawab!",
                        badgeClass: "bg-emerald-500 text-slate-900",
                        feedback: "Menghormati keyakinan orang lain dan menahan diri dari provokasi mencerminkan toleransi.",
                        legal: "Laporkan konten yang diduga melanggar aturan platform atau ketentuan hukum melalui kanal resmi.",
                        social: "Membantu meredakan ketegangan dan menjaga kerukunan di ruang digital."
                    }
                ]
            }
        ];

        let currentSimIndex = 0;
        let simScenarioOrder = [];

        function startRandomSimRun() {
            simScenarioOrder = simScenarios.map((_, index) => index);

            for (let index = simScenarioOrder.length - 1; index > 0; index--) {
                const randomIndex = Math.floor(Math.random() * (index + 1));
                [simScenarioOrder[index], simScenarioOrder[randomIndex]] = [simScenarioOrder[randomIndex], simScenarioOrder[index]];
            }

            loadSimScenario(0);
        }

        function loadSimScenario(position) {
            currentSimIndex = position;
            const sc = simScenarios[simScenarioOrder[position]];
            
            document.getElementById('sim-scenario-num').innerText = `Kasus ${position + 1} dari ${simScenarios.length}`;
            document.getElementById('sim-scenario-title').innerText = sc.title;
            document.getElementById('sim-sila-tag').innerText = sc.sila;
            document.getElementById('sim-scenario-desc').innerText = sc.desc;
            document.getElementById('sim-result-box').classList.add('hidden');
            document.querySelector('#sim-result-box button[onclick="nextSimScenario()"]').innerHTML =
                position === simScenarios.length - 1
                    ? 'Ulangi dengan Kasus Acak <i class="fa-solid fa-shuffle ml-1"></i>'
                    : 'Kasus Acak Berikutnya <i class="fa-solid fa-arrow-right ml-1"></i>';

            const container = document.getElementById('sim-options-container');
            container.innerHTML = '';

            sc.options.forEach((opt, optIdx) => {
                const btn = document.createElement('button');
                btn.className = "w-full text-left p-4 rounded-2xl bg-patriot-navy border border-slate-700 hover:border-patriot-gold hover:bg-slate-800 transition-all text-xs sm:text-sm font-medium text-slate-200 flex justify-between items-center group";
                btn.innerHTML = `
                    <span>${opt.text}</span>
                    <i class="fa-solid fa-chevron-right text-slate-500 group-hover:text-patriot-gold transition-colors"></i>
                `;
                btn.onclick = () => evalSimOption(opt);
                container.appendChild(btn);
            });
        }

        function evalSimOption(opt) {
            const resBox = document.getElementById('sim-result-box');
            resBox.classList.remove('hidden');

            const badge = document.getElementById('sim-result-badge');
            badge.className = `text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${opt.badgeClass}`;
            badge.innerText = opt.heading;

            document.getElementById('sim-result-heading').innerText = opt.heading;
            document.getElementById('sim-result-score').innerText = `+${opt.score} Poin`;
            document.getElementById('sim-result-text').innerText = opt.feedback;
            document.getElementById('sim-result-legal').innerText = opt.legal;
            document.getElementById('sim-result-social').innerText = opt.social;
        }

        function nextSimScenario() {
            if (currentSimIndex < simScenarios.length - 1) {
                loadSimScenario(currentSimIndex + 1);
            } else {
                startRandomSimRun();
            }
        }

        // Pledges Data & Wall Render
        let pledgeList = [
            { name: "Drs. Heru Prasetyo", instansi: "Kemenkominfo", sila: "Sila 3", text: "Saya berkomitmen tidak membagikan berita apa pun sebelum memverifikasi sumber resminya.", likes: 14 },
            { name: "Anisa Pertiwi", instansi: "Universitas Indonesia", sila: "Sila 2", text: "Saya berjanji menjaga kesantunan di kolom komentar dan menolak segala bentuk cyberbullying.", likes: 21 },
            { name: "Rian Hidayat", instansi: "Kreator Konten", sila: "Sila 5", text: "Saya akan selalu menghargai karya seniman lain dengan mencantumkan lisensi dan kredit resmi.", likes: 9 }
        ];

        function renderPledgeCards() {
            const container = document.getElementById('pledge-cards-grid');
            container.innerHTML = '';
            document.getElementById('pledge-total-count').innerText = `${pledgeList.length} Komitmen`;

            pledgeList.forEach((p, idx) => {
                const card = document.createElement('div');
                card.className = "glass-panel p-5 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between";
                card.innerHTML = `
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-patriot-crimson/20 text-patriot-crimsonGlow border border-patriot-crimson/30">${p.sila}</span>
                            <i class="fa-solid fa-quote-right text-slate-600 text-sm"></i>
                        </div>
                        <p class="text-slate-200 text-xs sm:text-sm italic leading-relaxed">"${p.text}"</p>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                            <h5 class="text-xs font-bold text-white">${p.name}</h5>
                            <span class="text-[10px] text-slate-400 block">${p.instansi}</span>
                        </div>
                        <button onclick="likePledge(${idx})" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-patriot-crimson/20 text-slate-300 hover:text-patriot-crimson text-xs font-bold transition-all flex items-center gap-1.5">
                            <i class="fa-solid fa-heart text-patriot-crimson"></i> <span>${p.likes}</span>
                        </button>
                    </div>
                `;
                container.prepend(card);
            });
        }

        function likePledge(idx) {
            pledgeList[idx].likes += 1;
            renderPledgeCards();
        }

        function submitPledge(e) {
            e.preventDefault();
            const name = document.getElementById('input-pledge-name').value;
            const instansi = document.getElementById('input-pledge-instansi').value;
            const sila = document.getElementById('input-pledge-sila').value;
            const text = document.getElementById('input-pledge-text').value;

            pledgeList.push({ name, instansi, sila, text, likes: 1 });
            renderPledgeCards();

            document.getElementById('input-pledge-name').value = '';
            document.getElementById('input-pledge-instansi').value = '';
            document.getElementById('input-pledge-text').value = '';
        }

        // Handout Download Simulation
        function downloadHandoutTXT() {
            const txt = `
=============================================================
HANDOUT PRESENTASI: ETIKA DIGITAL BERBASIS PANCASILA
Tema: Bijak Berdigital, Berpancasila
=============================================================

1. SILA 1 (KETUHANAN YANG MAHA ESA):
   - Toleransi antarumat beragama di media sosial.
   - Menolak ujaran kebencian (Hate Speech) berbasis SARA.
   - Payung Hukum: Pasal 28 Ayat (2) UU ITE.

2. SILA 2 (KEMANUSIAAN YANG ADIL DAN BERADAB):
   - Menolak perundungan siber (Cyberbullying) dan Doxxing.
   - Menjaga kesantunan dan empati digital.
   - Payung Hukum: Pasal 27A UU ITE.

3. SILA 3 (PERSATUAN INDONESIA):
   - Mencegah hoaks dan provokasi pemecah belah bangsa.
   - Metode 5 Langkah "Saring Sebelum Sharing".
   - Payung Hukum: Pasal 28 Ayat (1) UU ITE.

4. SILA 4 (KERAKYATAN YANG DIPIMPIN OLEH HIKMAT KETUHANAN...):
   - Kebebasan berpendapat yang santun dan rasional (Netiket).
   - Menghargai musyawarah dan perbedaan opini politik.

5. SILA 5 (KEADILAN SOSIAL BAGI SELURUH RAKYAT INDONESIA):
   - Menghormati Hak Kekayaan Intelektual (HAKI) dan Hak Cipta.
   - Menolak plagiarisme dan konten bajakan.

=============================================================
Dokumen Sosialisasi Etika Digital Berbasis Pancasila • 2026
            `;
            const blob = new Blob([txt], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Handout-Etika-Digital-Pancasila.txt';
            a.click();
        }

        // Initialize App
        window.onload = function() {
            updateFooterClock();
            window.setInterval(updateFooterClock, 1000);
            selectSilaTab(1);
            renderPledgeCards();
        };
