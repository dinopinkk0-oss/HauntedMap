// ══════════════════════════════════════════════════════
//  WEBGIS HOROR — script.js
//  Data: Excel Data_Haunted_Map (32 lokasi, WGS84 Zone 49S)
// ══════════════════════════════════════════════════════

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';
const OSRM = 'https://router.project-osrm.org/route/v1';

// ── DATA LOKASI — sumber: Excel Data_Haunted_Map.xlsx ─
// Kolom: Id | Nama_Lokasi | Latitude | Longitude | Link_Googlemaps | Link Sumber | Foto | Kisah_Pendek
const LOCATIONS = [
  {id:1,nama:"Jembatan Gondolayu",lat:-7.782975796279988,lon:110.37093289524728,
   link_gmaps:"https://maps.app.goo.gl/oVNLdkTeAEkdDUjf6",link_sumber:"https://youtu.be/5mUjwKME00g?si=CrvQXSsZvSiYodoi",
   kategori:"penampakan",level:"tinggi",persen:78,
   deskripsi:"Jembatan Gondolayu dikenal sebagai salah satu lokasi paling angker di Jogja, terutama pada malam hari. Banyak pengendara mengaku melihat sosok perempuan berdiri di pinggir jembatan lalu menghilang begitu saja. Ada juga cerita tentang suara tangisan misterius yang terdengar dari bawah jembatan saat suasana sepi. Karena sering dikaitkan dengan kecelakaan dan kejadian mistis, tempat ini membuat banyak orang memilih menghindar lewat tengah malam.",
   gambar:"https://drive.google.com/thumbnail?id=1IQ7cMP6ZkfiVrItoYqb8cz36dfctIoEl&sz=w700",
   video:"https://www.youtube.com/embed/5mUjwKME00g",videoNote:"Sumber liputan: Jembatan Gondolayu",kronologi:[
    {waktu:"Sering lewat Gondolayu",nama:"ekakurnial2253",teks:"Menurutku gak usah takut lewat Jembatan Gondolayu karena sebenarnya gak ada serem-seremnya dan jalannya juga ramai. Bahkan masih ada penjual koling di sekitar lokasi. Meski begitu, urban legend tentang tempat ini cukup banyak dan banyak orang yang mengaku cerita-cerita mistisnya memang benar adanya. Oh ya, nama sungainya Sungai Code, ditulis pakai huruf C."},
    {waktu:"Tinggal di Jogja 47 tahun",nama:"cah_ndeso",teks:"Aku sudah tinggal di Jogja sekitar 47 tahun. Selama ini memang pernah mendengar cerita tentang Jembatan Gondolayu, tetapi hanya sebatas kabar kalau tempat itu memiliki kisah mistis. Detail kejadian atau ceritanya sendiri aku tidak begitu tahu."}
   ]},
  {id:2,nama:"Rumah Kanthil",lat:-7.8258117923782,lon:110.39784707584876,
   link_gmaps:"https://maps.app.goo.gl/zfG1MqGwFt3KotxE8",link_sumber:"https://youtu.be/rdXLa_-xPK8?si=krJKF0j0PhJj_3Qy",
   kategori:"penampakan",level:"sangat-tinggi",persen:93,
   deskripsi:"Rumah Kanthil adalah rumah tua yang terkenal karena kisah-kisah menyeramkan di dalamnya. Konon rumah ini pernah menjadi lokasi berbagai kejadian tragis sehingga meninggalkan aura yang sangat mencekam. Warga sekitar sering mendengar suara langkah kaki, pintu terbuka sendiri, hingga penampakan sosok perempuan berbaju putih di area rumah. Meski terlihat kosong dan tak terurus, banyak orang percaya rumah itu tidak benar-benar kosong.",
   gambar:"https://drive.google.com/thumbnail?id=16SaK79TkplkpfumrmGx-InrkLRW9iQV9&sz=w700",
   video:"https://www.youtube.com/embed/rdXLa_-xPK8",videoNote:"Sumber liputan: Rumah Kanthil",kronologi:[]},
  {id:3,nama:"Gunung Merapi",lat:-7.541904827150952,lon:110.44607080160512,
   link_gmaps:"https://maps.app.goo.gl/GL7u9NzXdgq6V4AV7",link_sumber:"https://youtu.be/8Kf32u_SPCE?si=gphBhiHUvgA3pvy-",
   kategori:"urban-legend",level:"sangat-tinggi",persen:96,
   deskripsi:"Selain terkenal karena letusannya, Gunung Merapi juga dipenuhi cerita mistis yang dipercaya masyarakat sekitar. Banyak pendaki mengaku mendengar suara gamelan, melihat pasar gaib, atau bertemu sosok misterius di jalur pendakian. Masyarakat Jawa percaya Merapi memiliki kerajaan gaib yang hidup berdampingan dengan dunia manusia. Aura sunyi dan kabut tebal di malam hari membuat gunung ini terasa semakin menyeramkan sekaligus penuh misteri.",
   gambar:"https://drive.google.com/thumbnail?id=1iiNZlzTweaJcEbzqC3osExSqu8A9Mgnx&sz=w700",
   video:"https://www.youtube.com/embed/8Kf32u_SPCE",videoNote:"Sumber liputan: Gunung Merapi",kronologi:[
  {waktu:"Cerita para sesepuh",nama:"Mujiono (Mantan Kepala Dusun Samiran)",teks:"Menurut cerita para sesepuh, saat warga mengadakan sedekah gunung dan mendaki tengah malam hingga pagi, mereka sering mendengar suara ramai seperti suasana pasar dari arah Pasar Bubar. Namun ketika sampai di lokasi, tempat tersebut justru sepi tanpa seorang pun. Yang terlihat hanya bekas-bekas aktivitas seperti pincuk dan sisa-sisa jajanan. Karena itulah lokasi tersebut kemudian dikenal dengan nama Pasar Bubar dan kisahnya masih diceritakan hingga sekarang."},
  {waktu:"Tanggapan penonton",nama:"Hudzaifah Rahman",teks:"Cerita tentang Gunung Merapi memang terasa sangat kuat dan sudah lama dikenal. Meski begitu, menurutku hampir setiap tempat juga memiliki cerita atau mitosnya masing-masing."},
  {waktu:"Tanggapan masyarakat",nama:"Safirah Ishami",teks:"Banyak yang menganggap kisah-kisah tersebut hanya mitos. Namun di sisi lain, tidak sedikit masyarakat yang percaya bahkan mengaku pernah mengalami kejadian-kejadian yang sulit dijelaskan saat berada di Gunung Merapi."}
   ]},
  {id:4,nama:"Bunderan UGM",lat:-7.775988156292675,lon:110.37605679810899,
   link_gmaps:"https://maps.app.goo.gl/YwiFEqmZ3nwvXMMNA",link_sumber:"https://youtu.be/LOxfrZYwaRo?si=vyom9-zagiWAxLlB",
   kategori:"suara",level:"sedang",persen:54,
   deskripsi:"Bundaran UGM sudah lama menjadi urban legend di kalangan mahasiswa Yogyakarta. Tempat ini terkenal dengan mitos larangan menyanyikan lagu tertentu pada malam hari karena dipercaya dapat mengundang sosok gaib. Beberapa mahasiswa juga mengaku melihat bayangan hitam melintas atau mendengar suara aneh saat melewati area tersebut sendirian. Suasana kampus yang sepi di malam hari membuat cerita-cerita horor di Bundaran UGM terasa semakin nyata.",
   gambar:"https://drive.google.com/thumbnail?id=1ZBWyIhGGinWwWfGW_sgWLUHpptginSGw&sz=w700",
   video:"https://www.youtube.com/embed/LOxfrZYwaRo",videoNote:"Sumber liputan: Bunderan UGM",kronologi:[
  {waktu:"Kelas malam UGM",nama:"senja",teks:"Selain kisah Mbak Yayuk, cerita yang paling sering terdengar justru berasal dari Bundaran Fakultas Teknik UGM. Konon jika seseorang menyanyikan lagu Gugur Bunga saat tengah malam melintas di sana, akan terdengar suara lain yang ikut bernyanyi. Banyak yang mengaitkannya dengan arwah atau qorin para pejuang yang dipercaya masih berada di sekitar lokasi."},
  {waktu:"Tengah malam di Bundaran Teknik",nama:"Sothil_khamaya",teks:"Pernah iseng bersama teman-teman menyanyikan lagu di Bundaran Teknik UGM saat tengah malam. Untungnya waktu itu kondisi masih cukup ramai. Setelahnya motor kami mendadak mogok secara bersamaan hingga harus ditolong orang lain. Sesampainya di rumah, kucing-kucingku justru bersikap seperti melihat orang asing, bahkan salah satu temanku mengaku sempat kesurupan."},
  {waktu:"Sering lewat malam hari",nama:"retianaashop",teks:"Di sekitar Bundaran Teknik dan pertigaan menuju SD Percobaan sering tercium bau aneh pada malam hari. Kadang baunya seperti singkong bakar atau kentang, meskipun tidak terlihat ada orang yang sedang memasak di sekitar lokasi."},
  {waktu:"Lewat Bundaran Teknik",nama:"Naynaa",teks:"Setiap lewat Bundaran Teknik pada malam hari sering mencium bau yang berubah-ubah, kadang harum bunga, kadang seperti singkong bakar. Karena sudah sering mendengar cerita mistis di sana, setiap melintas aku selalu mengucapkan permisi dalam hati."},
  {waktu:"Rutin melintas",nama:"orangejuice🍹",teks:"Aku hampir setiap hari melewati jalur dari Bundaran UGM sampai Fakultas Teknik, baik pagi, siang, sore maupun tengah malam. Sampai sekarang belum pernah mengalami kejadian aneh ataupun melihat penampakan apa pun."},
  {waktu:"Cerita warga",nama:"IRASI⚙️NAL tv",teks:"Kalau menurutku, justru Bundaran Fakultas Teknik UGM yang lebih terkenal menyeramkan dibanding lokasi lain di sekitar kampus."},
  {waktu:"Urban legend",nama:"peyyyy",teks:"Salah satu cerita yang paling sering terdengar di Bundaran Fakultas Teknik adalah larangan menyanyikan lagu Gugur Bunga ketika melintas tengah malam karena dipercaya dapat mengundang hal-hal gaib."},
  {waktu:"Mahasiswa Pascasarjana UGM",nama:"Shalihah",teks:"Aku kuliah di Sekolah Pascasarjana UGM dan cukup sering melewati Bundaran Teknik, bahkan hingga tengah malam. Selama ini tidak pernah mengalami kejadian aneh dan semuanya terasa aman saja."},
  {waktu:"Pengalaman pribadi",nama:"tukirman",teks:"Yang dimaksud memang Bundaran Teknik dekat Magister UGM. Cerita tentang lagu Gugur Bunga di lokasi itu menurutku memang benar adanya karena aku pernah mengalami sendiri, bukan hanya mendengar dari cerita orang lain."}
   ]},
  {id:5,nama:"Panggung Krapyak/Kandang Menjangan",lat:-7.826870096455625,lon:110.36056412188236,
   link_gmaps:"https://maps.app.goo.gl/jmMcXSXx8tNsRsTb8",link_sumber:"https://youtu.be/LOxfrZYwaRo?si=vyom9-zagiWAxLlB",
   kategori:"penampakan",level:"tinggi",persen:71,
   deskripsi:"Bangunan tua peninggalan Keraton ini dikenal memiliki suasana yang sunyi dan menyeramkan. Konon dahulu tempat ini digunakan sebagai lokasi berburu keluarga kerajaan, namun kini sering dikaitkan dengan penampakan makhluk halus. Banyak orang mengaku melihat sosok perempuan misterius hingga mendengar suara langkah kaki tanpa wujud. Karena dipenuhi nuansa kuno dan minim penerangan, Kandang Menjangan menjadi salah satu tempat yang paling membuat bulu kuduk merinding di Jogja.",
   gambar:"https://drive.google.com/thumbnail?id=1N5aZgjczhho87yPXU8JZOa-VvvIbqpyW&sz=w700",
   video:"https://www.youtube.com/embed/LOxfrZYwaRo",videoNote:"Sumber liputan: Panggung Krapyak",kronologi:[
  {waktu:"Melewati lokasi",nama:"jalikarta",teks:"Tempatnya sebenarnya ramai karena banyak orang lalu lalang. Namun suasananya terasa sangat sakral, terutama saat melihat lorong yang terdapat deretan kursi. Kesan tersebut membuatku merinding meski berada di lokasi yang tidak sepi."},
  {waktu:"Waktu subuh",nama:"pretty.ca",teks:"Saat berada di lokasi menjelang subuh, aku mendengar suara aneh yang terdengar seperti suara perempuan. Anehnya, ketika suara itu direkam lalu diputar kembali, suara tersebut tidak terekam sama sekali. Kejadian itu berlangsung cukup lama, hampir setengah jam, membuatku merinding meski berusaha tetap tenang."},
  {waktu:"Pengalaman pribadi",nama:"elbe94",teks:"Aku sendiri pernah mengalami kejadian aneh di Kandang Menjangan. Sejak itu aku percaya bahwa lokasi tersebut memang memiliki suasana yang berbeda dibanding tempat lain di sekitarnya."}
   ]},
  {id:6,nama:"Benteng Vredeburg",lat:-7.800256217117466,lon:110.36616105591246,
   link_gmaps:"https://maps.app.goo.gl/PFEGi8u2kF86RMdN7",link_sumber:"https://youtu.be/_9Jm9EtPoT0?si=PZg_zf0FYTZ-IyGL",
   kategori:"penampakan",level:"tinggi",persen:74,
   deskripsi:"Benteng peninggalan Belanda ini tampak megah di siang hari, namun berubah mencekam ketika malam mulai turun. Dalam cerita yang beredar, lorong-lorong tua di dalam benteng sering memunculkan suara langkah kaki tanpa wujud dan bayangan serdadu Belanda yang berjalan sendirian. Ada juga kisah tentang sosok noni Belanda yang muncul tiba-tiba lalu menghilang di dekat ruang tahanan. Sejarah kelam masa penjajahan membuat tempat ini terasa seolah masih menyimpan penghuni dari masa lalu.",
   gambar:"https://drive.google.com/thumbnail?id=1ZehSIMv5beK3nGYRwxtpuUFK6A2_1Ge8&sz=w700",
   video:"https://www.youtube.com/embed/_9Jm9EtPoT0",videoNote:"Sumber liputan: Benteng Vredeburg",kronologi:[
  {waktu:"Kesaksian warga",nama:"Warga sekitar",teks:"Suara gamelan terdengar sangat jelas dari dalam Benteng Vredeburg, seolah sedang ada pertunjukan. Namun ketika dicek langsung ke dalam benteng, tidak ditemukan siapa pun maupun aktivitas yang dapat menjelaskan asal suara tersebut."},
  {waktu:"Sering berkunjung",nama:"Izzzyu",teks:"Aku pernah mengalami kejadian aneh saat berada di Benteng Vredeburg. Tiba-tiba kepalaku terasa sangat sakit, padahal sebelumnya kondisiku baik-baik saja. Meskipun begitu, aku masih cukup sering datang ke benteng saat sedang gabut."},
  {waktu:"Study tour SMP",nama:"isengaja78",teks:"Saat study tour waktu SMP, aku dan teman-teman nekat masuk ke sebuah ruangan yang sebenarnya dilarang untuk dimasuki. Tidak lama setelah berada di dalam, pintunya tiba-tiba tertutup sendiri padahal saat itu tidak ada angin sama sekali."},
  {waktu:"Mengunjungi museum",nama:"JOKIKUK",teks:"Sekitar dua tahun lalu saat berkunjung ke Benteng Vredeburg, aku melihat sebuah lukisan yang matanya seperti bergerak mengikuti arah pandang. Sampai sekarang aku tidak tahu apakah itu memang efek khusus dari museum atau ada hal lain yang menyebabkannya."},
  {waktu:"Study tour",nama:"ice🅰️mericanonosugar",teks:"Saat study tour di Benteng Vredeburg, aku dan teman-teman sedang berjalan di bagian atas benteng. Kami melihat salah satu patung yang berada di atas gedung seperti bergerak sendiri hingga posisinya berpindah dari tempat sebelumnya. Kejadian itu membuat kami semua terkejut."}
  ]},
  {id:7,nama:"Kraton Yogyakarta",lat:-7.8053470681553,lon:110.36434896969448,
   link_gmaps:"https://maps.app.goo.gl/k1EdqmQ5hWCGbhdg9",link_sumber:"https://youtu.be/qKYft_NgU2A?si=xmuCrpI7KLGNSweO",
   kategori:"urban-legend",level:"sangat-tinggi",persen:91,
   deskripsi:"Kraton Yogyakarta bukan hanya pusat budaya Jawa, tetapi juga dipercaya memiliki hubungan kuat dengan dunia spiritual. Konon beberapa area di dalam keraton dijaga oleh makhluk tak kasat mata yang setia melindungi tempat tersebut. Banyak orang mengaku mendengar suara gamelan misterius dan mencium aroma dupa padahal tidak ada aktivitas apa pun. Aura sakral yang menyelimuti keraton membuat suasananya terasa berbeda dibanding tempat lain di Jogja.",
   gambar:"https://drive.google.com/thumbnail?id=18Ltuv76esN5mHxAMtDt0YFEnJTdJ3ZJE&sz=w700",
   video:"https://www.youtube.com/embed/qKYft_NgU2A",videoNote:"Sumber liputan: Kraton Yogyakarta",kronologi:[
  {waktu:"Wisata ke Keraton",nama:"aldipungki",teks:"Dua kali berwisata ke Taman Sari dan Keraton Yogyakarta, awalnya suasananya terasa berbeda dan cukup kuat. Namun setelah membaca doa serta mengucapkan dalam hati 'kulo putune eyang', perasaanku justru berubah menjadi tenang dan nyaman, seperti sedang pulang ke rumah."},
  {waktu:"Masa kecil",nama:"Purapuspa Rosa",teks:"Aku percaya setiap tempat yang berhubungan dengan Keraton memiliki penunggunya. Meski begitu, waktu kecil aku sering memungut bunga di halaman Keraton saat pagi masih gelap dan tidak pernah melihat ataupun mengalami kejadian aneh."},
  {waktu:"Pendapat pribadi",nama:"Nanang S",teks:"Kalau masih berada di lingkungan Keraton Yogyakarta, aku percaya memang ada hal-hal gaib yang menyertai tempat tersebut."},
  {waktu:"Warga asli Jogja",nama:"Bobby Demey",teks:"Sebagai orang asli Jogja, aku sangat percaya dengan cerita-cerita gaib yang berkaitan dengan Keraton Yogyakarta."},
  {waktu:"Berwisata ke Keraton",nama:"KHOLIK NARENDRA",teks:"Saat berkunjung ke Keraton Yogyakarta, aku pernah melihat sesosok bayangan yang diyakini sebagai Sri Sultan Hamengkubuwono I di depan salah satu bangunan keraton."},
  {waktu:"Cerita Kyai Jegot",nama:"sall_handsome",teks:"Menurut cerita yang pernah kudengar, Kyai Jegot bukan berwujud kakek-kakek melainkan seekor ular raksasa. Hingga sekarang dipercaya masih diberikan sesaji khusus berupa minuman jenewer."},
  {waktu:"Warga asli Jogja",nama:"Purno Kastopo",teks:"Aku percaya Keraton Yogyakarta dijaga oleh makhluk tak kasat mata. Karena itu, ada sejumlah aturan dan larangan yang sebaiknya dipatuhi ketika berada di lingkungan keraton."},
  {waktu:"Gedhong Prabayeksa",nama:"𝐗 𝘍𝘳𝘪𝘦𝘯𝘥'𝘴 🔥",teks:"Menurutku, Gedhong Prabayeksa merupakan tempat paling angker di Keraton Yogyakarta karena digunakan untuk menyimpan berbagai pusaka keraton."},
  {waktu:"Kepercayaan pribadi",nama:"party Sarju",teks:"Aku sangat percaya bahwa di lingkungan Keraton Yogyakarta memang terdapat makhluk gaib yang hidup berdampingan dengan aktivitas manusia."},
  {waktu:"Pendapat pribadi",nama:"Soeryo Habsoro",teks:"Aku sangat percaya dengan keberadaan hal-hal gaib yang berkaitan dengan Keraton Yogyakarta."}
   ]},
  {id:8,nama:"Taman Sari",lat:-7.810007962651476,lon:110.35920230473066,
   link_gmaps:"https://maps.app.goo.gl/wJZPQQYVqBVpm2Py6",link_sumber:"https://youtu.be/1ssJLxxK_34?si=D1b5lbxmORpVVy8a",
   kategori:"suara",level:"tinggi",persen:79,
   deskripsi:"Lorong bawah tanah Taman Sari menyimpan banyak misteri yang masih dipercaya hingga sekarang. Menurut cerita, tempat ini dahulu menjadi jalur rahasia sekaligus lokasi meditasi Sultan dengan kekuatan gaib Laut Selatan. Pengunjung sering mengaku mendengar suara langkah kaki dan gamelan samar ketika berada di lorong Sumur Gumuling. Suasana gelap dan lembap di bawah tanah membuat tempat ini terasa seperti membawa pengunjung masuk ke masa lalu yang penuh misteri.",
   gambar:"https://drive.google.com/thumbnail?id=1706C19s6WrowGC5xMVNMA4-aekRbMncP&sz=w700",
   video:"https://www.youtube.com/embed/1ssJLxxK_34",videoNote:"Sumber liputan: Taman Sari",kronologi:[
  {waktu:"Cerita sejarah Tamansari",nama:"ekakurnial2253",teks:"Menurut cerita yang pernah kudengar, kolam pemandian Tamansari dahulu digunakan oleh para putri dan selir keraton. Sultan dipercaya melihat mereka dari bangunan di bagian atas, lalu memilih siapa yang akan dipanggil. Untuk Sumur Gumuling, banyak orang mengaitkannya dengan keberadaan lorong gaib, bukan sekadar lorong fisik. Aku tahu cerita ini karena dulu sering bermain ke Tamansari sepulang sekolah, kebetulan SMP-ku berada tepat di dekat kompleks tersebut sehingga hampir setiap hari masuk ke sana."},
  {waktu:"Pengalaman pribadi",nama:"noviesariopick",teks:"Aku pernah mengalami kejadian mistis saat berkunjung ke Tamansari. Setelah pulang hingga kembali ke Sidoarjo, aku merasa ada sesuatu yang mengikutiku. Namun menurut orang yang mengerti hal-hal gaib, sosok tersebut tidak berniat mengganggu, melainkan hanya ingin menjaga diriku."}
   ]},
  {id:9,nama:"Rumah Kentang Yogyakarta",lat:-7.757834978694853,lon:110.38021896380722,
   link_gmaps:"https://maps.app.goo.gl/6dv9eBHjSsjL1APw6",link_sumber:"https://youtu.be/irnBc3MuTko?si=q-xauhv93_EtjQfv",
   kategori:"bau",level:"sangat-tinggi",persen:88,
   deskripsi:"Rumah tua di kawasan Kotabaru ini terkenal karena aroma kentang yang muncul tiba-tiba pada malam hari. Konon bau tersebut menjadi tanda kemunculan makhluk gaib yang menghuni rumah kosong itu. Banyak warga sekitar mengaku mendengar lonceng berbunyi sendiri dan melihat sosok bayangan di balik jendela. Semakin malam suasana rumah ini terasa semakin sunyi dan menyeramkan.",
   gambar:"https://drive.google.com/thumbnail?id=1ZKDKwkXFXunAMhZ6mOTXNBKOxMKk9COh&sz=w700",
   video:"https://www.youtube.com/embed/irnBc3MuTko",videoNote:"Sumber liputan: Rumah Kentang Yogyakarta",kronologi:[
  {waktu:"Kepercayaan warga",nama:"Penduduk setempat",teks:"Menurut kepercayaan sebagian penduduk setempat, kemunculan aroma kentang yang tiba-tiba tercium di sekitar rumah tersebut dipercaya sebagai pertanda kehadiran genderuwo."},
  {waktu:"Cerita masyarakat",nama:"tenny amelia putri",teks:"Rumah Kentang dikenal sebagai salah satu rumah paling menyeramkan di kawasan Kotabaru. Julukan tersebut muncul karena banyak orang mengaku sering mencium aroma kentang rebus yang berasal dari dalam rumah, meskipun tidak terlihat ada aktivitas di dalamnya."},
  {waktu:"Pengalaman melintas",nama:"PenginapanJogja",teks:"Dulu rumah ini berada di kawasan Kotabaru, tepat di seberang Raminten. Setiap kali melewati lokasi, aku sering mencium aroma kentang goreng. Bangunannya merupakan rumah peninggalan Belanda dengan sumur tua di bagian depan dan dulu terdapat patung burung Garuda. Kini bangunannya sudah direnovasi menjadi perkantoran, tetapi bentuk aslinya masih dipertahankan karena termasuk bangunan cagar budaya."}
   ]},
  {id:10,nama:"Gereja Gotik Sayidan",lat:-7.80354068015279,lon:110.36984055037837,
   link_gmaps:"https://maps.app.goo.gl/C2rCmzmyr37fTJDo7",link_sumber:"https://youtu.be/64dDQ_qYn3A?si=35APTzMoxWKKv3wk",
   kategori:"penampakan",level:"tinggi",persen:76,
   deskripsi:"Bangunan tua bergaya gotik ini terlihat menyeramkan bahkan dari kejauhan. Tempatnya yang kosong dan gelap membuat banyak cerita mistis berkembang di masyarakat. Konon, suara tangisan dan sosok perempuan berbaju putih sering muncul di area dalam gereja, terutama di bagian basement. Banyak orang yang datang untuk uji nyali mengaku merasakan hawa dingin yang tidak biasa begitu memasuki bangunan.",
   gambar:"https://drive.google.com/thumbnail?id=1lrcoZtE7tfc3tFJRLkKv13M8IP6xSOuZ&sz=w700",
   video:"https://www.youtube.com/embed/64dDQ_qYn3A",videoNote:"Sumber liputan: Gereja Gotik Sayidan",kronologi:[
  {waktu:"Cerita masyarakat",nama:"felic",teks:"Menurut cerita yang beredar, saat sore atau malam hari terkadang terlihat sosok yang melambaikan tangan dari teras lantai atas rumah. Meski begitu, kisah tersebut hanya berdasarkan penuturan masyarakat dan belum dapat dipastikan kebenarannya."}
   ]},
  {id:11,nama:"Bioskop Regent / Eks Empire XXI",lat:-7.783491288328871,lon:110.38672859855538,
   link_gmaps:"https://maps.app.goo.gl/v6ctw8syvgG8RMZNA",link_sumber:"https://youtu.be/ANGy2lctXNI?si=wFQUrUz2pyXWC9An",
   kategori:"kejadian",level:"sangat-tinggi",persen:90,
   deskripsi:"Bioskop ini pernah mengalami kebakaran besar yang menewaskan sejumlah orang di dalamnya. Setelah lama terbengkalai, muncul berbagai cerita tentang jeritan misterius dan penampakan sosok penonton di malam hari. Beberapa orang mengaku mendengar suara kursi bioskop bergerak sendiri padahal gedung dalam keadaan kosong. Kisah kelam itu membuat lokasi ini dikenal sebagai salah satu tempat paling angker di Jogja.",
   gambar:"https://drive.google.com/thumbnail?id=1kMhgoJcT0EYfptXy8-aC8tPoKJQbFeFL&sz=w700",
   video:"https://www.youtube.com/embed/ANGy2lctXNI",videoNote:"Sumber liputan: Bioskop Regent",kronologi:[
     {waktu:"Malam, setelah nonton Eva",nama:"Kesaksian 1",teks:"Usai menonton Eva minta izin ke kamar mandi sementara kawan-kawannya menunggu di luar. Saat di bilik toilet, ia mendengar suara orang-orang yang sebelumnya ada menjauh. Lalu tiba-tiba terdengar suara langkah kaki masuk dan pintu bilik di sebelah kanan dibanting. Namun saat hendak keluar kamar mandi, ia merasa suasana terlalu hening. Bahkan suara gesekan resleting atau orang menarik tisu toilet pun tak terdengar. Eva yang penasaran menghampiri bilik tersebut — ternyata kosong, padahal tanda lock-nya berwarna hijau. Bulu kuduknya langsung berdiri."},
     {waktu:"Nonton film midnight",nama:"Novi",teks:"Jasad orang-orang yang terbakar masih bergentayangan di bioskop, terutama yang menonton film midnight. Mereka yang menonton film midnight, apalagi kalau berempat, sering mengeluh kursi bioskop penuh terisi dan tercium bau daging terbakar."},
     {waktu:"Midnight — berempat",nama:"ssunnyverse",teks:"Keknya ini udah jadi rahasia umum di Jogja. Bioskop ini memang banyak cerita horornya apalagi pas midnight dan berhubungan sama angka 4 — jumlah penonton, ruang theater, dll — karena waktu kebakar jumlah korban yang nggak ditemuin 4 orang. Bisa jadi itu alasan kenapa ada yang diganggu. Al Fatihah buat arwah-arwah korban jiwa di sana."},
     {waktu:"Jaman kuliah di Jogja — Scream 4",nama:"ungeblomst",teks:"Pernah dapet pengalaman mistis di bioskop itu, baru nyadar setelah kelar nonton dan ninggalin gedung. Serba 4 semua — kami berempat, nonton Scream 4, dapet jam 4 sore, di Studio 4. Teman yang punya sixth sense duduk di kursi paling pojok — setelah nonton dia cerita ngeliat orang gila kulitnya kek ngelupas kena api di kursi paling pojok. Setelah Googling emang gedung bioskop itu ada sejarah kurang mengenakkan. Al-Fatihah untuk para korban."},
     {waktu:"Nonton The Raid — ultah",nama:"chympui",teks:"Kami telat masuk, bioskop udah gelap. Milih seats di deretan tengah — saat lewat ada yang nempatin, kami permisi dan sempat kesandung kaki penonton. Di tengah film aku dan Mawar kebelet pipis, permisi-permisi lagi pas lewat. Pas balik, tiba-tiba kursi di deretan depan udah keiisi penuh. Setelah film selesai dan lampu nyala, kursi depan dan dekat tangga ternyata kosong — padahal tidak ada satu pun penonton yang keluar sebelumnya. Si Mawar yang akamsi langsung ngajakin pindah tempat, baru cerita kalau dulu bioskop itu pernah ada kebakaran. RIP buat para korban."},
     {waktu:"Nonton Sinister 2 — berdua",nama:"carrameysproject",teks:"Lagi nonton berdua tiba-tiba ada yang nepuk bahu sebelah kanan kenceng banget sampe kaget. Pas nengok ga ada siapa-siapa. Di bioskop cuma ada 6 orang termasuk aku dan temenku, dan 4 orang lain duduknya berjauhan di pojokan. Temenku di sebelah kiri duduknya, bukan kanan — dia juga nggak nepuk. Langsung merinding dan ngajakin pulang."},
     {waktu:"Rutin nonton, akamsi Jogja",nama:"diahsulistianingrum",teks:"Aku yang orang Jogja aja males nonton di situ kalau jam midnight, entah hawane kepiye ngono. Meskipun rame dan murah kalau hari biasa, aku tetep milih tempat lain."},
     {waktu:"Masa kecil — tinggal di kompleks belakang",nama:"multifandom8274",teks:"Dulu tinggal di kompleks belakang bioskop. Anak-anak di daerahku beberapa kali sering secara misterius bangun tidur di kompleks reruntuhan bekas bioskop tersebut — padahal siang-siang kita jalan pulang sekolah. Kata pedagang sekitar, kami jalan sendiri ke situ. Setelah kuliah dan pulang ke Jogja, bangunan itu jadi bioskop lagi. Aku diajakin nonton Twilight New Moon — anehnya aku tidur lagi dan tiba-tiba bangun di tempat yang sama yang saat ini jadi kamar mandi perempuan. Gak lagi-lagi aku ke situ."},
     {waktu:"Sebelum kejadian kebakaran",nama:"agnesprimadhani5018",teks:"Sumber kebakaran bukan di bioskop ini tapi gedung bioskop sebelahnya yang habis dilalap api lalu menjalar. Dulu ada 2 bioskop bersebelahan. Aku bersyukur masih dilindungi Tuhan karena beberapa bulan sebelum kejadian kebakaran, saya sekeluarga 2x nonton di sana — filmnya Lion King dan Aladdin. Beberapa tahun setelah kejadian, tempat itu ditutup dan terbengkalai. Pedagang di depannya sering didatengin orang-orang gosong yang pada beli."},
     {waktu:"Midnight — toilet horror",nama:"cherisholethea",teks:"Rumahku dan SDku deket banget sama bioskop ini. Paska kejadian kebakaran hampir tiap malam kedengeran suara orang nangis minta tolong di lokasi. Teman kakakku yang peka nonton midnight — antrean yang beli tiket mengular, padahal sepi aslinya. Jangan coba-coba nonton midnight lalu ke toilet. Sensasinya mantap — padahal sepi, toilet ada 5 bilik tapi rasanya sesak penuh orang dan pengap. Seangker itu, gedung sebelahnya pun jadi angker padahal dipakai perkantoran BUMN."}
   ]},
  {id:12,nama:"Ambarukmo Plaza (Amplaz)",lat:-7.781739594240378,lon:110.4011606985982,
   link_gmaps:"https://maps.app.goo.gl/kKNka1AFxHEyd86W6",link_sumber:"https://youtu.be/I5Q0LRtKxE0?si=IOvLJTcSF2CdebUl",
   kategori:"kejadian",level:"sedang",persen:58,
   deskripsi:"Di balik megahnya pusat perbelanjaan ini, tersimpan cerita mistis sejak awal pembangunannya. Konon banyak pekerja mengalami kesurupan dan gangguan aneh saat proyek berlangsung. Pengunjung juga sering membicarakan sosok perempuan misterius yang muncul di lift dan toilet mall ketika suasana mulai sepi. Karena berdiri di bekas area kerajaan lama, banyak orang percaya tempat ini memiliki aura gaib yang kuat.",
   gambar:"https://drive.google.com/thumbnail?id=1NMGimCWbjnhvnAiw6W6p2Qomi10HenuH&sz=w700",
   video:"https://www.youtube.com/embed/I5Q0LRtKxE0",videoNote:"Sumber liputan: Ambarukmo Plaza",kronologi:[
    {waktu:"Lembur di basement",nama:"SandiSandi-ku1sd",teks:"Saat masih bekerja lembur di basement Ambarukmo Plaza, aku pernah mengalami kejadian yang menurutku sulit dijelaskan. Di area tersebut aku sempat melihat penampakan sosok misterius yang membuat suasana kerja malam terasa sangat mencekam."}
   ]},
  {id:13,nama:"Goa Jepang Kaliurang",lat:-7.587184827237461,lon:110.43040339115763,
   link_gmaps:"https://maps.app.goo.gl/y7fvgNrSZnzrKrGTA",link_sumber:"https://youtu.be/yOKCDwvzv6M?si=ES5sfPvwgb1xhKre",
   kategori:"suara",level:"tinggi",persen:82,
   deskripsi:"Goa peninggalan masa penjajahan Jepang ini memiliki lorong gelap yang terasa sangat mencekam. Dibangun dengan kerja paksa romusha, tempat ini dipercaya menyimpan banyak energi negatif dari masa lalu. Banyak pengunjung mengaku mendengar suara rintihan, langkah kaki, hingga bisikan misterius dari dalam goa. Semakin masuk ke lorong terdalam, suasananya terasa semakin dingin dan menyesakkan.",
   gambar:"https://drive.google.com/thumbnail?id=13e1tKpI-oK1R3eP-2FJ1GcJZo_YEwhBL&sz=w700",
   video:"https://www.youtube.com/embed/yOKCDwvzv6M",videoNote:"Sumber liputan: Goa Jepang Kaliurang",kronologi:[
  {waktu:"Jurit malam SMA",nama:"Cynnamonnroll🐣",teks:"Saat mengikuti jurit malam ketika kemah SMA, aku dan beberapa regu sempat tersesat saat mencari petunjuk jalan. Ketika berada di sebuah perempatan dekat Goa Jepang, tiba-tiba terdengar suara tepuk tangan dari arah goa, padahal tidak terlihat ada orang di sekitar lokasi."},
  {waktu:"Pendakian ke Goa Jepang",nama:"D jack",teks:"Saat berjalan naik menuju Goa Jepang, awalnya terdengar suara ramai seperti banyak pengunjung. Namun semakin ke atas suasana justru semakin sepi. Tiba-tiba terdengar suara ranting patah, dan ketika menoleh aku melihat sosok besar menyerupai gorila sedang memperhatikanku. Aku langsung berlari turun tanpa menoleh lagi."},
  {waktu:"Pengalaman pribadi",nama:"Petrus Baik",teks:"Aku juga pernah melihat sosok yang sangat besar dengan tubuh dipenuhi bulu lebat saat berada di sekitar Goa Jepang."},
  {waktu:"Menuju gerbang",nama:"drh. ardhi ( ﾉ^ω^)ﾉ",teks:"Pengalaman nyata yang pernah kualami, sesampainya di gerbang Goa Jepang motor yang kukendarai tiba-tiba mati dan tidak bisa distarter maupun disela. Karena merasa ada yang tidak beres, aku mengurungkan niat untuk naik dan memilih turun dengan kondisi mesin tetap mati hingga sampai di bawah."},
  {waktu:"Berkunjung siang hari",nama:"akun terblokir 🙄",teks:"Sepulang dari Goa Jepang aku sempat mampir ke Rumah Putih. Meski masih siang, tiba-tiba terdengar sesuatu terbang menyenggol pohon hingga berbunyi keras. Awalnya kukira monyet, tetapi setelah dicari tidak ada apa pun di sekitar lokasi."},
  {waktu:"Gabut semasa kuliah",nama:"SUDIBYO P. WIYONO",teks:"Saat masih kuliah aku pernah naik motor ke gardu pandang lalu masuk sendirian ke Goa Jepang. Suasananya sepi dan tenang. Ketika hendak keluar, tiba-tiba terdengar suara seseorang memanggil dari dalam goa. Aku berusaha tetap tenang karena di samping jalan terdapat jurang dan takut terpeleset jika panik."},
  {waktu:"Cerita warga Kaliurang",nama:"★나이라★",teks:"Sebagai orang Kaliurang, aku sering mendengar cerita bahwa Goa Jepang memiliki banyak penunggu. Salah satu kisah yang beredar menceritakan seorang bapak yang masuk menjelang sore, menemukan kemenyan, lalu mengalami berbagai gangguan hingga keluar dalam kondisi lemas dan terus beristighfar."},
  {waktu:"Cerita masyarakat",nama:"rinawati26570",teks:"Menurut cerita yang beredar, di jalur menuju Goa Jepang terdapat sosok nenek yang sering terlihat duduk di kursi goyang dan dipercaya menjadi salah satu penunggu kawasan tersebut."}
   ]},
  {id:14,nama:"Hutan Pinus Mangunan",lat:-7.925714491445177,lon:110.4303292668632,
   link_gmaps:"https://maps.app.goo.gl/pwyXH5sSQzicgMzAA",link_sumber:"https://www.youtube.com/live/3-g2zjYA1As?si=BdyDNGfnreKQCZj1",
   kategori:"suara",level:"sedang",persen:62,
   deskripsi:"Di balik tenangnya Hutan Pinus Mangunan, tersimpan kisah-kisah misterius yang membuat siapa pun merinding saat malam tiba. Kabut tipis yang turun perlahan di antara deretan pinus seolah membawa bisikan tak terlihat dari dalam hutan. Banyak pengunjung mengaku mendengar suara langkah tanpa wujud dan merasakan suasana yang tiba-tiba berubah sunyi mencekam.",
   gambar:"https://drive.google.com/thumbnail?id=1PFNwR46Xu6TbShgmtblU5Dnb9b0BysXB&sz=w700",
   video:"https://www.youtube.com/embed/3-g2zjYA1As",videoNote:"Sumber liputan: Hutan Pinus Mangunan",kronologi:[
  {waktu:"Lereng bawah Hutan Pinus",nama:"Febri Gunawijaya",teks:"Saat berada di lereng bawah Hutan Pinus bersama tiga temanku, kami melihat semak-semak tinggi tiba-tiba tersibak dari bawah lereng menuju ke arah kami. Tidak terlihat sosok apa pun, tetapi dari lebar semak yang terbuka dan arah pergerakannya, kami merasa ada sesuatu berukuran besar sedang berjalan. Keempatnya melihat kejadian yang sama dan akhirnya memilih berjalan pelan menuju parkiran lalu segera meninggalkan lokasi."},
  {waktu:"Sebelum ramai wisatawan",nama:"Arry Manggala",teks:"Dulu, sebelum Hutan Pinus ramai dikunjungi wisatawan, aku beberapa kali melihat penampakan yang muncul tiba-tiba pada siang hari. Kadang terlihat satu sosok, kadang dua, bahkan pernah muncul di beberapa titik berbeda. Pengalaman itu membuatku enggan kembali ke sana hingga sekarang."},
  {waktu:"Sebelum Hutan Pinus terkenal",nama:"Albertus Albertus",teks:"Sebelum Hutan Pinus menjadi tempat wisata yang ramai, seorang temanku pernah mengalami kejadian aneh saat buang air kecil. Ia merasa didorong dengan sangat keras dari belakang hingga hampir terjatuh, padahal secara kasat mata tidak ada siapa pun di dekatnya."}
  ]},
  {id:15,nama:"Bunker Kaliadem",lat:-7.582798348510889,lon:110.44768280517276,
   link_gmaps:"https://maps.app.goo.gl/yKPKXgVDSNp5PSLe8",link_sumber:"https://youtu.be/e-QtZk2digM?si=slRws_JY86azIezh",
   kategori:"kejadian",level:"sangat-tinggi",persen:94,
   deskripsi:"Tempat ini menjadi saksi tragedi erupsi Merapi yang menewaskan dua relawan di dalam bunker. Sejak saat itu, banyak cerita tentang suara tangisan dan sosok misterius muncul di sekitar lokasi. Saat malam tiba, suasana bunker terasa sunyi dan berat seolah menyimpan kesedihan yang belum hilang. Kabut dingin yang turun dari Merapi membuat tempat ini semakin menyeramkan dan penuh misteri.",
   gambar:"https://drive.google.com/thumbnail?id=1Xfos4jTWUgkHiJw1EgkWKKkmiS11eO2J&sz=w700",
   video:"https://www.youtube.com/embed/e-QtZk2digM",videoNote:"Sumber liputan: Bunker Kaliadem",kronologi:[
  {waktu:"Memasuki lokasi",nama:"ardanaaa",teks:"Aku pernah masuk ke lokasi tersebut. Tidak lama setelah berada di dalam, aku melihat sosok yang sedang duduk bersila di atas sebuah batu seolah menyambut kedatanganku. Pengalaman itu membuatku memilih segera meninggalkan tempat tersebut."},
  {waktu:"Pengalaman tahun 2025",nama:"Moon's🌜🌹",teks:"Aku juga mengalami kejadian yang hampir sama pada tahun 2025. Baru sampai di pintu masuk saja suasananya sudah terasa sangat tidak nyaman, sehingga aku memutuskan untuk langsung keluar dan tidak melanjutkan masuk ke dalam."}
   ]},
  {id:16,nama:"Simpang Tiga Janti",lat:-7.783344622259968,lon:110.41046831755632,
   link_gmaps:"https://maps.app.goo.gl/9yutATGEkBnBkaC28",link_sumber:"https://vt.tiktok.com/ZSxN2fjHs/",
   kategori:"suara",level:"sedang",persen:55,
   deskripsi:"Flyover Janti dikenal sebagai salah satu titik jalan yang menyimpan cerita mistis di Jogja. Banyak cerita beredar tentang pengendara yang tiba-tiba kehilangan fokus saat melintas malam hari. Sosok misterius yang sering dikaitkan dengan tempat ini disebut Setan Budeg, karena dipercaya membuat orang tidak mendengar suara kereta atau kendaraan di sekitarnya.",
   gambar:"https://drive.google.com/thumbnail?id=1cIqm1v2c5fkO-QCL6Rw03OD-d8eyj3uy&sz=w700",
   video:"https://vt.tiktok.com/ZSxN2fjHs/",videoNote:"Sumber liputan: Simpang Tiga Janti (TikTok)",kronologi:[
  {waktu:"Pulang kuliah — sekitar 2005",nama:"Janu_albirru",teks:"Sekitar tahun 2005 saat masih kuliah, aku pernah melintas di flyover sekitar pukul 02.00 dini hari sepulang dari rumah teman. Di tikungan atas flyover aku melihat sosok berpakaian putih sedang duduk. Sampai sekarang aku tidak tahu apakah itu orang yang sedang iseng atau memang penampakan."},
  {waktu:"Sepulang mengajar",nama:"Bu Guru Anjel😍",teks:"Saat pulang mengajar pada malam hari dan berhenti di lampu merah dekat flyover, aku melihat beberapa sosok sedang berbaris di bagian atas. Pemandangan itu membuatku sangat terkejut."},
  {waktu:"Cerita masyarakat",nama:"user01012010",teks:"Menurut pengalamanku, di lokasi tersebut terkadang terdengar suara tangisan anak kecil meskipun tidak terlihat siapa pun. Suara itu saja sudah cukup membuat bulu kuduk merinding."}
   ]},
  {id:17,nama:"Sanatorium Pakem",lat:-7.630606682027485,lon:110.42551708017356,
   link_gmaps:"https://maps.app.goo.gl/qfpSm9F6F3xVQQw16",link_sumber:"https://mojok.co/kilas/memori/sejarah-sanatorium-pakem-di-yogyakarta/",
   kategori:"penampakan",level:"tinggi",persen:77,
   deskripsi:"Sanatorium Pakem dikenal sebagai bangunan tua yang menyimpan suasana kelam di kawasan Pakem, Sleman. Banyak cerita beredar tentang suara langkah kaki di lorong kosong, pintu yang seperti terbuka sendiri, hingga hawa dingin yang tiba-tiba terasa meski siang hari. Beberapa orang juga mengaitkan tempat ini dengan bayangan sosok perawat yang muncul sebentar lalu menghilang di sekitar bangsal lama.",
   gambar:"https://drive.google.com/thumbnail?id=1dSMVtgcVeG11wUFk1yonZ0SJYg5uQ8y7&sz=w700",
   video:"",videoNote:"Sumber: mojok.co — Sejarah Sanatorium Pakem",kronologi:[
{waktu:"Melintas di depan bangunan",nama:"Pemula",teks:"Menurut pengalamanku, jalan di depan bangunan tersebut terasa sangat angker. Seorang temanku pernah menabrak pohon saat melintas dengan sepeda motor. Warga sekitar juga sering mengaitkan kejadian itu dengan adanya makhluk yang dipercaya suka mengganggu pengendara."}
   ]},
  {id:18,nama:"Villa Putih Kaliurang",lat:-7.5947195856634275,lon:110.42671099904409,
   link_gmaps:"https://maps.app.goo.gl/N9L8snf7oyjdRVXg8",link_sumber:"https://www.detik.com/",
   kategori:"penampakan",level:"tinggi",persen:73,
   deskripsi:"Villa Putih Kaliurang dikenal sebagai bangunan tua peninggalan Belanda yang berada di kawasan Hargobinangun, Pakem, Sleman. Tempat ini sering disebut angker karena bangunannya lama tidak terawat setelah terdampak erupsi Merapi. Banyak cerita beredar tentang suara langkah kaki, tangisan, hingga penampakan sosok noni Belanda di sekitar bangunan.",
   gambar:"https://drive.google.com/thumbnail?id=1QfM4dVi_xKfOkDGiUzarmMzVSpZSyTR7&sz=w700",
   video:"",videoNote:"Sumber: Detik.com",kronologi:[
  {waktu:"Tahun 2003",nama:"Aina Soeminto",teks:"Pada tahun 2003 bangunan itu masih sering kami gunakan. Aku pernah menginap semalam di dalamnya dan membuat api unggun di halaman belakang. Selama berada di sana beberapa kali terdengar suara langkah kaki meskipun tidak terlihat ada orang di sekitar."},
  {waktu:"Siang hari — sekitar 2006",nama:"saryanto099",teks:"Sekitar tahun 2006 aku pernah berada di bangunan tersebut pada siang hari. Tiba-tiba melihat penampakan seorang noni Belanda disertai suara orang menangis, padahal saat itu kondisi lokasi sedang sepi."},
  {waktu:"Malam Minggu",nama:"jefri",teks:"Seorang temanku bercerita bahwa saat berkunjung ke lokasi pada malam Minggu, ia melihat sosok pocong. Cerita itu baru disampaikan setelah kami sampai di rumah."},
  {waktu:"Menjelang magrib",nama:"story76",teks:"Saat iseng masuk ke bangunan menjelang magrib, suasananya sudah terasa sangat menyeramkan. Di salah satu ruangan aku melihat sebuah benda bergerak sendiri tanpa ada yang menyentuhnya. Pengalaman itu membuatku percaya bahwa tempat tersebut memang memiliki suasana yang berbeda."}
   ]},
  {id:19,nama:"Pantai Parangkusumo",lat:-8.022766143102741,lon:110.32498304259579,
   link_gmaps:"https://maps.app.goo.gl/ihhriNo9PkzeHJEm8",link_sumber:"https://www.detik.com/jogja/budaya/d-7077133/cepuri-parangkusumo-lokasi-pertemuan-panembahan-senopati-dan-nyi-roro-kidul",
   kategori:"urban-legend",level:"sangat-tinggi",persen:97,
   deskripsi:"Pantai Parangkusumo dikenal sebagai salah satu tempat paling sakral dan mistis di Yogyakarta. Tempat ini sering dikaitkan dengan legenda pertemuan Panembahan Senopati dan Nyi Roro Kidul. Banyak orang percaya kawasan ini menjadi gerbang menuju Kerajaan Gaib Laut Selatan. Saat malam tiba, suara ombak besar, angin pantai, dan aroma sesajen membuat suasananya terasa semakin magis.",
   gambar:"https://drive.google.com/thumbnail?id=1JVUshD88TfjK6gSH51_lflTMnFDeU4mK&sz=w700",
   video:"",videoNote:"Sumber: Detik.com Jogja",kronologi:[
  {waktu:"Pengalaman berkunjung",nama:"R Aryo",teks:"Aku punya banyak cerita tentang Pantai Parangkusumo. Hampir setiap pulang dari sana selalu tanpa sengaja membawa batu-batu kecil. Menurut kepercayaan yang pernah kudengar, batu-batu tersebut dipercaya menjadi tempat bersemayamnya banyak khodam atau makhluk gaib."},
  {waktu:"Cerita keluarga",nama:"Diyah KR",teks:"Aku teringat cerita almarhum nenekku. Dulu ayahku pernah bermain layang-layang pada malam hari dan mengaku melihat iring-iringan kereta kuda melintas di langit. Di dalamnya terlihat sosok seorang ratu yang menjadi bagian dari kisah mistis Parangkusumo."},
  {waktu:"Malam Jumat Kliwon",nama:"hiu darat",teks:"Menurut cerita yang sering beredar, sebaiknya tidak berkunjung ke Pantai Parangkusumo pada malam Jumat Kliwon karena dipercaya banyak penampakan sosok perempuan di kawasan tersebut."}
   ]},
  {id:20,nama:"Plengkung Gading",lat:-7.813714695946789,lon:110.3629048708474,
   link_gmaps:"https://maps.app.goo.gl/CrU3CoJWmPW1s6ur6",link_sumber:"https://www.liputan6.com/regional/read/4912229/mitos-ilmu-hitam-luntur-saat-melintasi-plengkung-gading-yogyakarta",
   kategori:"urban-legend",level:"sedang",persen:65,
   deskripsi:"Plengkung Gading dikenal sebagai gerbang tua di sisi selatan Keraton Yogyakarta yang menyimpan banyak mitos. Tempat ini dipercaya sebagai jalur keluarnya jenazah Sultan menuju Imogiri, sehingga Sultan yang masih bertahta tidak diperbolehkan melewatinya. Masyarakat juga mengenal mitos bahwa ilmu hitam bisa luntur saat melewati gerbang ini.",
   gambar:"https://drive.google.com/thumbnail?id=1CkwwXcfwmh9-w7YbetMy5ouHe9yKT0bY&sz=w700",
   video:"",videoNote:"Sumber: Liputan6.com",kronologi:[
  {waktu:"Cerita masyarakat",nama:"Tedi",teks:"Menurut Tedi, pernah terjadi sebuah kejadian yang dianggap nyata ketika seseorang yang memiliki ilmu hitam melewati Plengkung Gading tanpa mengetahui adanya pantangan tersebut. Setelah melintas, ilmu yang dimilikinya dipercaya hilang atau tidak lagi berfungsi."}
   ]},
  {id:21,nama:"Pantai Parangtritis",lat:-8.02518127913735,lon:110.32938926668406,
   link_gmaps:"https://maps.app.goo.gl/ZbnbE2RBtviZgirC7",link_sumber:"https://www.bola.com/ragam/read/5634587/8-mitos-pantai-parangtritis-yang-dipercaya-orang-banyak",
   kategori:"urban-legend",level:"sangat-tinggi",persen:95,
   deskripsi:"Pantai Parangtritis dikenal sebagai salah satu pantai paling mistis di Yogyakarta. Tempat ini sering dikaitkan dengan legenda Nyi Roro Kidul, penguasa Laut Selatan. Cerita yang paling terkenal adalah larangan memakai pakaian hijau karena dipercaya dapat menarik perhatian makhluk gaib laut selatan. Ombak besar, angin kencang, dan suasana pantai yang gelap saat malam membuat Parangtritis terasa semakin menyeramkan.",
   gambar:"https://drive.google.com/thumbnail?id=1cP3J9clK_573eDxCLdSW1k0uc24ifVyP&sz=w700",
   video:"",videoNote:"Sumber: Bola.com",kronologi:[
  {waktu:"Mudik ke Jogja",nama:"₊˚⊹l0vi3e_ddaww ⋆˚𖦹˚｡⋆",teks:"Aku pernah berkunjung ke lokasi ini saat mudik karena kampung nenekku hanya berjarak sekitar dua jam dari sana. Saat itu aku sempat berfoto di lokasi dan mengalami kejadian yang membuatku percaya bahwa cerita mistis tentang tempat tersebut memang ada."}
   ]},
  {id:22,nama:"Situs Gua Seluman",lat:-7.8027972320522405,lon:110.4139002152744,
   link_gmaps:"https://maps.app.goo.gl/3ECyqZ7PxczFpXe78",link_sumber:"https://www.youtube.com/watch?v=62uII-mU0xs",
   kategori:"penampakan",level:"tinggi",persen:80,
   deskripsi:"Gua Siluman dikenal sebagai situs tua di kawasan Wonocatur, Banguntapan, Bantul. Tempat ini dulunya merupakan pesanggrahan peninggalan Keraton Yogyakarta. Lorong dan bangunan tua di sekitarnya sering terasa lembap, gelap, dan sepi, sehingga menimbulkan kesan menyeramkan bagi pengunjung.",
   gambar:"https://drive.google.com/thumbnail?id=148HVnKtsZIAX6yU2ILH-6UaVF-DpA43y&sz=w700",
   video:"https://www.youtube.com/embed/62uII-mU0xs",videoNote:"Sumber liputan: Situs Gua Seluman",kronologi:[
  {waktu:"Kesan saat berkunjung",nama:"siauwthiantjwan",teks:"Menurutku tempat ini terasa cukup menyeramkan karena kondisinya lembap dan kurang terawat. Suasananya yang gelap dan kotor membuat banyak orang mengaitkannya dengan keberadaan makhluk halus."}
   ]},
  {id:23,nama:"Situs Warungboto",lat:-7.810272970158874,lon:110.39321495945566,
   link_gmaps:"https://maps.app.goo.gl/v6C5uDk85SjgheYb6",link_sumber:"https://www.youtube.com/watch?v=9BF23SCxBHA",
   kategori:"suara",level:"sedang",persen:60,
   deskripsi:"Pesanggrahan Rejawinangun atau Situs Warungboto dikenal sebagai bangunan tua peninggalan Keraton Yogyakarta. Cerita yang beredar menyebut beberapa pengunjung merasa seperti diawasi saat berada di bagian dalam bangunan. Saat sore menjelang malam, bayangan dari dinding tua dan lorong kosong membuat tempat ini terasa semakin angker.",
   gambar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3P1c2EKCqAcq0BqXwRtZEj7o6wSJxrIn7AA&s",
   video:"https://www.youtube.com/embed/9BF23SCxBHA",videoNote:"Sumber liputan: Situs Warungboto",kronologi:[
  {waktu:"Berkunjung pada hari kerja",nama:"Aulia rahma",teks:"Aku pernah berkunjung ke lokasi ini pada hari kerja sehingga suasananya sangat sepi, hanya ada aku dan seorang temanku. Di dekat lokasi juga terdapat area pemakaman. Setelah pulang, pada malam harinya aku merasa tidak bisa tidur. Rasanya seperti masih berada di tempat itu karena setiap sudut lokasi terus terbayang dengan sangat jelas. Ketika kutanya temanku, ternyata ia juga merasakan hal yang sama dan tubuhnya terasa sangat berat."}
   ]},
  {id:24,nama:"Grand Inna Malioboro",lat:-7.790454997974716,lon:110.36686496580049,
   link_gmaps:"https://maps.app.goo.gl/BTJFKwCPWpWNjtFx9",link_sumber:"https://www.youtube.com/watch?v=0XJRWbAWw-s",
   kategori:"penampakan",level:"tinggi",persen:83,
   deskripsi:"Hotel Grand Inna Malioboro atau yang dulu dikenal sebagai Hotel Garuda sering dikaitkan dengan cerita mistis karena usianya yang sudah lebih dari satu abad. Beberapa tamu mengaku mengalami kejadian aneh di kamar hotel, seperti suara langkah kaki, ketukan pintu, hingga suasana kamar yang tiba-tiba terasa berat.",
   gambar:"https://eventguide.id/wp-content/uploads/2023/01/GI-Malioboro.png",
   video:"https://www.youtube.com/embed/0XJRWbAWw-s",videoNote:"Sumber liputan: Grand Inna Malioboro",kronologi:[
    {waktu:"Menginap di hotel",nama:"RBJE shop",teks:"Secara keseluruhan hotel ini memiliki fasilitas dan makanan yang baik. Namun saat berenang di kolam, aku hampir tenggelam. Ketika berada di bagian tengah kolam, aku merasa seperti ada sesuatu yang menarikku ke bawah. Berkat usaha keras untuk mencapai permukaan, akhirnya aku berhasil menyelamatkan diri."}
   ]},
  {id:25,nama:"Roemah Indisch Kotagede",lat:-7.827598125753703,lon:110.4005071597122,
   link_gmaps:"https://maps.app.goo.gl/xnYZ8aUykHdGUSx77",link_sumber:"https://www.youtube.com/watch?v=X0JYbiCmpXw",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Rumah Pocong Sumi dikenal sebagai salah satu rumah tua paling terkenal di Kotagede, Yogyakarta. Rumah bergaya kolonial ini sering dikaitkan dengan sosok Mbah Sumi, makhluk astral yang disebut muncul saat kru acara mistis datang ke lokasi. Cerita lain juga menyebut adanya penampakan noni Belanda dan suasana rumah yang berubah menyeramkan saat malam hari.",
   gambar:"https://assets.pikiran-rakyat.com/crop/0x0:0x0/1200x675/webp/photo/2023/11/22/207715987.jpg",
   video:"https://www.youtube.com/embed/X0JYbiCmpXw",videoNote:"Sumber liputan: Roemah Indisch Kotagede",kronologi:[
    {waktu:"Berkunjung pada malam hari",nama:"akuvirgo",teks:"Aku datang ke lokasi bersama suamiku pada malam hari. Penjaga tempat mengatakan bahwa sosok yang dikenal sebagai 'Mbak Ayu' ingin menyampaikan sesuatu kepadaku sehingga aku diminta masuk seorang diri. Menurut pengalamanku, setelah itu aku merasa seperti dirasuki sosok tersebut yang terus menangis sambil mengucapkan, 'Salahku ki opo?'. Penjaga tampak terkejut dan segera menyuruh kami pulang karena hari sudah larut. Setelah kembali ke rumah, aku masih merasa ada kehadiran lain yang mengikutiku. Pengalaman itu membuatku berharap suatu saat dapat kembali untuk mengetahui kisah yang belum sempat selesai kuceritakan."}
   ]},
  {id:26,nama:"Gua Langse",lat:-8.040223134930121,lon:110.34862270998003,
   link_gmaps:"https://maps.app.goo.gl/Za43Ch3jD4yhnsoe8",link_sumber:"https://www.youtube.com/watch?v=2tyjT9guwbM",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Goa Langse dikenal sebagai goa pertapaan yang berada di kawasan tebing dekat Pantai Parangtritis. Tempat ini sering dikaitkan dengan laku spiritual, semedi, dan cerita mistis masyarakat pesisir selatan. Banyak cerita beredar tentang suara bisikan, hawa berat, hingga sosok tak kasat mata yang dipercaya menjaga area goa.",
   gambar:"https://img.okezone.com/content/2023/06/21/408/2834526/gua-langse-tempat-mistis-saksi-pertemuan-panembahan-senopati-dan-nyi-roro-kidul-cUlCxCUOVF.JPG",
   video:"https://www.youtube.com/embed/2tyjT9guwbM",videoNote:"Sumber liputan: Gua Langse",kronologi:[
    {waktu:"Menaiki tangga lokasi",nama:"Dewisri",teks:"Aku pernah berkunjung ke lokasi ini. Baru sampai sekitar anak tangga kelima, aku merasa seperti ada yang menyuruhku untuk kembali meskipun tidak terlihat siapa pun. Karena merasa tidak nyaman, aku memutuskan untuk langsung pulang."}
   ]},
  {id:27,nama:"Stasiun Tugu Yogyakarta",lat:-7.789248610922994,lon:110.36346797851452,
   link_gmaps:"https://maps.app.goo.gl/H467Ad1PdqaPMj187",link_sumber:"https://www.youtube.com/watch?v=kadNKwZxGXk",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Stasiun Tugu Yogyakarta dikenal sebagai stasiun tua yang menyimpan banyak cerita mistis di tengah ramainya kawasan Malioboro. Cerita yang beredar menyebut adanya sosok penumpang misterius yang muncul di area peron lalu menghilang begitu saja. Ada juga kisah tentang suara langkah kaki dan bayangan yang terlihat saat suasana stasiun mulai sepi pada malam hari.",
   gambar:"https://asset.kompas.com/crops/IC-IfATri08CArqGLt9Rx3Y7830=/156x0:3428x2181/750x500/data/photo/2021/08/05/610b8a82d5255.jpg",
   video:"https://www.youtube.com/embed/kadNKwZxGXk",videoNote:"Sumber liputan: Stasiun Tugu Yogyakarta",kronologi:[
    {waktu:"Sekitar pukul 23.00",nama:"Arfan",teks:"Saat sedang beristirahat sekitar pukul 23.00, aku terbangun karena mendengar seseorang memanggil, 'Mas, mas, keretanya sudah akan tiba, bangun.' Aku kemudian berjalan menuju tempat wudu. Anehnya, suara keran terdengar menyala, tetapi selama beberapa menit tidak ada air yang keluar. Saat itu dadaku langsung berdebar karena merasa ada sesuatu yang tidak biasa."}
   ]},
  {id:28,nama:"RSUP Dr. Sardjito Yogyakarta",lat:-7.768371793765737,lon:110.37345273881209,
   link_gmaps:"https://maps.app.goo.gl/rWZmANrU4GJ4Wj718",link_sumber:"https://www.hipwee.com/travel/kisah-kisah-misteri-di-rumah-sakit-dr-sardjito-jogja-mulai-dari-hantu-estella-sampai-si-muka-rata/",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"RSUP Dr. Sardjito dikenal memiliki beberapa cerita mistis yang cukup terkenal di Jogja. Salah satunya adalah kisah hantu gadis kecil bernama Estella yang konon sering terlihat di area rumah sakit. Ada juga cerita tentang sosok ibu-ibu misterius yang masuk ke gudang, lalu saat dipanggil wajahnya terlihat rata tanpa ekspresi.",
   gambar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmLGeBfTae27ZZ4VpzgKW3H3hoLLTnfuKeTw&s",
   video:"",videoNote:"Sumber: Hipwee.com",kronologi:[
    {waktu:"Menunggu keluarga di rumah sakit",nama:"𝐴𝑅𝐼𝑀𝐵𝐼'𝑝𝑙𝑎𝑡 𝐴𝐵",teks:"Menurut pengalamanku, suasana di lokasi ini terasa cukup menyeramkan. Saat menunggu almarhum ayah yang sedang dirawat, aku tidak pernah berani melewati lorong bagian utara di belakang gedung sepulang dari kantin karena suasananya terasa sangat mencekam."}
   ]},
  {id:29,nama:"Stasiun Rewulu",lat:-7.795989102884853,lon:110.28418524728905,
   link_gmaps:"https://maps.app.goo.gl/LEexthDKHaMyarhY9",link_sumber:"https://mojok.co/terminal/5-terowongan-di-jogja-yang-menyimpan-kisah-unik-hingga-mistis/",
   kategori:"suara",level:"tinggi",persen:75,
   deskripsi:"Stasiun Rewulu dan kawasan terowongan di sekitarnya dikenal dengan cerita mistis tentang suara pengumuman kereta yang terdengar pada malam hari menggunakan bahasa Belanda. Suara tersebut sering dikaitkan dengan bekas Stasiun Sedayu yang berada di sekitar jalur lama kereta.",
   gambar:"https://assets.kompasiana.com/items/album/2024/06/01/download-6-665b2899c925c45ca0541c22.jpg?t=o&v=300",
   video:"",videoNote:"Sumber: Mojok.co",kronologi:[

   ]},
  {id:30,nama:"Terminal Giwangan",lat:-7.834537779182118,lon:110.3922851673949,
   link_gmaps:"https://maps.app.goo.gl/8j9BgEkpHDKuKaZJ7",link_sumber:"https://www.liputan6.com/regional/read/4889957/penampakan-sosok-perempuan-di-terminal-yogyakarta-bikin-sopir-hitung-kaki-penumpang",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Terminal Giwangan dikenal memiliki cerita mistis tentang sosok perempuan tinggi berambut panjang yang sering muncul di area terminal. Cerita yang beredar menyebut sosok itu biasanya muncul setelah tercium bau wangi melati. Para sopir dan kernet bus malam konon sering menghitung kaki penumpang untuk memastikan tidak ada penumpang lain yang ikut naik.",
   gambar:"https://joss.co.id/data/uploads/2021/04/terminal-giwangan-larangan-mudik-678x381.jpg",
   video:"",videoNote:"Sumber: Liputan6.com",kronologi:[
    {waktu:"Cerita warga sekitar",nama:"Astroaja",teks:"Menurutku, kejadian-kejadian aneh di lokasi tersebut sudah menjadi hal yang biasa diceritakan dan diketahui oleh warga sekitar."}
   ]},
  {id:31,nama:"Balai Yasa Yogyakarta",lat:-7.787227848067427,lon:110.38405431216262,
   link_gmaps:"https://maps.app.goo.gl/GcGp59Ph3KUfAU8s9",link_sumber:"https://youtu.be/FSp5J0OPajs?si=3CF_2sRrBbH4XbUs",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Balai Yasa menyimpan peninggalan bekas kecelakaan kereta, salah satunya kecelakaan kereta Bintaro. Selain itu bangunannya merupakan bangunan kuno peninggalan zaman penjajahan Belanda. Cukup banyak orang yang menceritakan pengalaman mistis horornya seperti penampakan wajah hancur dan penampakan tubuh besar dan gondrong.",
   gambar:"https://imgcdn.harianjogja.com/images/posts/2024/09/22/1188945/balai_yasa.jpg",
   video:"https://www.youtube.com/embed/FSp5J0OPajs",videoNote:"Sumber liputan: Balai Yasa Yogyakarta",kronologi:[
    {waktu:"Siang hari saat bulan puasa",nama:"BOTAK•KULL",teks:"Saat bekerja di bagian mesin pada bulan puasa, aku sempat tertidur di bawah tangga hingga sekitar pukul 15.00. Ketika terbangun, tiba-tiba terdengar suara tong berisi bahan bakar seperti ada yang menggesernya. Padahal saat itu ruangan sudah kosong karena pegawai lain telah pulang sejak pukul 12.00, sehingga hanya aku seorang yang berada di lokasi."}
   ]},
  {id:32,nama:"Jembatan Gajahwong II",lat:-7.791819599522881,lon:110.39624091669587,
   link_gmaps:"https://maps.app.goo.gl/YaRgNcZg5Nvv2EGe7",link_sumber:"https://jogjapolitan.harianjogja.com/r-1096080/cerita-warga-di-balik-terowongan-telu-yang-terlarang-untuk-anak-kecil",
   kategori:"penampakan",level:"tinggi",persen:75,
   deskripsi:"Jembatan Gajahwong II dikenal berada di kawasan Sungai Gajah Wong dan sering dikaitkan dengan Terowongan Telu. Warga sekitar juga mengenal tempat ini sebagai lokasi yang menyimpan cerita mistis. Beberapa cerita menyebut kawasan ini pernah dikaitkan dengan kejadian bunuh diri dan larangan anak-anak bermain di sekitar terowongan.",
   gambar:"https://assets.kompasiana.com/items/album/2024/06/01/download-6-665b2899c925c45ca0541c22.jpg?t=o&v=300",
   video:"",videoNote:"Sumber: Harian Jogja",kronologi:[
    {waktu:"Tanggapan pengunjung",nama:"wongsokemies6770",teks:"Menurutku, suasana di lokasi tersebut terasa sangat menyeramkan."}
   ]},
];


// ── STATE ─────────────────────────────────────────────
let map, markers=[], allLocations=[...LOCATIONS];
let selectedLocId=null, userLat=null, userLon=null;
let isAudioPlaying=false, audioStarted=false;
let bgMusic=null, audioCtx=null, gainNode=null, oscNodes=[], usingFile=false;

// Network Analysis state
let routeMode='driving';
let originLat=null, originLon=null, destLat=null, destLon=null;
let routeLayer=null, originMarkerL=null, destMarkerL=null;

// ══════════════════════════════════════════════════════
//  HORROR LEVEL CALCULATION (BERDASARKAN KESAKSIAN)
// ══════════════════════════════════════════════════════

/**
 * Hitung tingkat horor berdasarkan jumlah kesaksian/cerita
 * 0 kesaksian       → 📜 Mitos / Legenda Lokal
 * 1–3 kesaksian     → 🟢 Rendah
 * 4–6 kesaksian     → 🟡 Sedang
 * 7–10 kesaksian    → 🔴 Tinggi
 * >10 kesaksian     → ☠️ Sangat Tinggi
 */
function calculateHorrorLevel(kesaksianCount) {
  if (kesaksianCount === 0) return { level: 'mitos', label: '📜 Mitos / Legenda Lokal', persen: 0 };
  if (kesaksianCount <= 3) return { level: 'rendah', label: '🟢 Rendah', persen: Math.min(kesaksianCount * 20, 35) };
  if (kesaksianCount <= 6) return { level: 'sedang', label: '🟡 Sedang', persen: 40 + (kesaksianCount - 4) * 10 };
  if (kesaksianCount <= 10) return { level: 'tinggi', label: '🔴 Tinggi', persen: 60 + (kesaksianCount - 7) * 8 };
  return { level: 'sangat-tinggi', label: '☠️ Sangat Tinggi', persen: 90 + Math.min((kesaksianCount - 10) * 0.5, 10) };
}

/**
 * Hitung total kesaksian untuk lokasi (base + user-submitted)
 */
function getTotalKesaksian(locId) {
  const loc = allLocations.find(l => l.id === locId);
  if (!loc) return 0;
  
  const baseCount = (loc.kronologi || []).length;
  let userCount = 0;
  try {
    const userKrono = JSON.parse(localStorage.getItem('kisah_' + locId) || '[]');
    userCount = userKrono.length;
  } catch (e) {
    userCount = 0;
  }
  
  return baseCount + userCount;
}

/**
 * Update level & persen untuk lokasi berdasarkan kesaksian terbaru
 */
function updateLocationLevel(locId) {
  const loc = allLocations.find(l => l.id === locId);
  if (!loc) return;
  
  const totalKesaksian = getTotalKesaksian(locId);
  const horrorData = calculateHorrorLevel(totalKesaksian);
  
  loc.level = horrorData.level;
  loc.persen = horrorData.persen;
}

// ══════════════════════════════════════════════════════
//  LANDING — ANIMASI
// ══════════════════════════════════════════════════════

(function makeDrips(){
  const c = document.getElementById('drips');
  if(!c) return;
  const n = Math.max(12, Math.floor(window.innerWidth/45));
  for(let i=0;i<n;i++){
    const d = document.createElement('div');
    d.className = 'drip';
    const h   = 60 + Math.random()*160;
    const dur = 2.5 + Math.random()*6;
    const del = Math.random()*12;
    d.style.cssText = `--dh:${h}px;--dur:${dur}s;--del:${del}s;left:${Math.random()*100}%;opacity:${0.5+Math.random()*0.5}`;
    c.appendChild(d);
  }
})();

// Crawling text at bottom
(function makeCrawlText(){
  const c = document.getElementById('crawlText');
  if(!c) return;
  const texts = [
    '⚠ TIDAK DISARANKAN MENGUNJUNGI SITUS SENDIRIAN ⚠',
    'SETIAP TEMPAT MENYIMPAN CERITA YANG TAK TERUCAP',
    'ADA YANG SELALU MEMPERHATIKAN DARI KEGELAPAN 👁👁',
    'BEBERAPA YANG DATANG... TIDAK PERNAH KEMBALI',
    'TIDAK SEMUA YANG TERLIHAT DI PETA INI BENAR-BENAR KOSONG ☠',
    'BEBERAPA JEJAK TIDAK PERNAH BENAR-BENAR MENGHILANG',
  ];

  c.textContent = (texts.join('   ✦   ')+ '   ✦   ').repeat(5);
  c.style.animationDuration = '300s';
})();

// ══════════════════════════════════════════════════════
//  AUDIO SYSTEM
// ══════════════════════════════════════════════════════

function initAudio(){
  if(audioStarted) return;
  audioStarted = true;

  bgMusic         = new Audio('horror-ambient.mp3');
  bgMusic.loop    = true;
  bgMusic.volume  = 0.38;
  bgMusic.preload = 'auto';

  bgMusic.addEventListener('canplaythrough', ()=>{
    usingFile = true;
    bgMusic.play().catch(()=>{});
    isAudioPlaying = true;
    setAudioUI(true);
  }, {once:true});

  bgMusic.addEventListener('error', ()=>{
    usingFile = false;
    startWebAudio();
  }, {once:true});

  bgMusic.load();
}

function toggleAudio(){
  if(!audioStarted){ initAudio(); return; }
  if(usingFile && bgMusic){
    if(bgMusic.paused){
      bgMusic.play().catch(()=>{});
      isAudioPlaying=true; setAudioUI(true);
    } else {
      bgMusic.pause();
      isAudioPlaying=false; setAudioUI(false);
    }
  } else {
    isAudioPlaying ? stopWebAudio() : startWebAudio();
  }
}

function setAudioUI(on){
  const btn = document.getElementById('audioBtn');
  if(btn) btn.textContent = on ? '🔊' : '🔇';
  const ind = document.getElementById('audioIndicator');
  const lbl = document.getElementById('audioLabel');
  if(ind && lbl){
    ind.classList.toggle('muted', !on);
    lbl.textContent = on ? 'AUDIO AKTIF' : 'AUDIO MATI';
  }
}

function startWebAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(audioCtx.destination);
  gainNode.gain.linearRampToValueAtTime(0.09, audioCtx.currentTime+2);

  [55,58.27,82.41,110].forEach((freq,i)=>{
    const osc=audioCtx.createOscillator(), g=audioCtx.createGain();
    const lfo=audioCtx.createOscillator(), lg=audioCtx.createGain();
    osc.type = i%2===0 ? 'sawtooth':'triangle';
    osc.frequency.value=freq;
    lfo.frequency.value=0.12+i*0.07; lg.gain.value=freq*0.004;
    g.gain.value=0.16;
    lfo.connect(lg); lg.connect(osc.frequency);
    osc.connect(g); g.connect(gainNode);
    osc.start(); lfo.start(); oscNodes.push(osc,lfo);
  });

  const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*3,audioCtx.sampleRate);
  const data=buf.getChannelData(0);
  for(let i=0;i<buf.length;i++) data[i]=Math.random()*2-1;
  const noise=audioCtx.createBufferSource();
  noise.buffer=buf; noise.loop=true;
  const lpf=audioCtx.createBiquadFilter();
  lpf.type='lowpass'; lpf.frequency.value=160;
  const ng=audioCtx.createGain(); ng.gain.value=0.035;
  noise.connect(lpf); lpf.connect(ng); ng.connect(gainNode);
  noise.start(); oscNodes.push(noise);

  isAudioPlaying=true; setAudioUI(true);
}

function stopWebAudio(){
  if(!audioCtx) return;
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime+1);
  setTimeout(()=>{
    oscNodes.forEach(o=>{ try{o.stop()}catch(e){} });
    oscNodes=[]; audioCtx.close(); audioCtx=null; gainNode=null;
  },1100);
  isAudioPlaying=false; setAudioUI(false);
}

function playScream(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const dur=1.0;
    const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){
      const t=i/ctx.sampleRate;
      const env=Math.exp(-t*2.5)*Math.sin(Math.PI*t/dur);
      d[i]=(
        Math.sin(2*Math.PI*880*t)*0.4 +
        Math.sin(2*Math.PI*1320*t*(1+t*0.5))*0.3 +
        (Math.random()*2-1)*0.3
      )*env;
    }
    const src=ctx.createBufferSource();
    src.buffer=buf;
    const g=ctx.createGain(); g.gain.value=0.6;
    src.connect(g); g.connect(ctx.destination);
    src.start();
    setTimeout(()=>ctx.close(), 1400);
  } catch(e){}
}

document.addEventListener('click', ()=>{ if(!audioStarted) initAudio(); },{once:true});

window.addEventListener('DOMContentLoaded', ()=>{
  // Set tanggal publikasi di metadata
  const el = document.getElementById('metaTanggalPub');
  if(el) el.textContent = new Date().toLocaleDateString('id-ID', {year:'numeric',month:'long',day:'numeric'});

  setTimeout(()=>{
    if(!audioStarted) initAudio();
    const lbl=document.getElementById('audioLabel');
    if(lbl) lbl.textContent='KLIK UNTUK AKTIFKAN AUDIO';
  }, 800);
});

// ══════════════════════════════════════════════════════
//  ENTER MAP
// ══════════════════════════════════════════════════════
let mapInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('warningPopup');

    if (popup) {
        popup.style.display = 'flex';
    }
});

function closeWarningPopup(){
    const popup = document.getElementById('warningPopup');

    if (popup) {
        popup.style.display = 'none';
    }
}

function enterMap(){

  // Sembunyikan landing
  document.getElementById("landing").style.display = "none";

  // Tampilkan appScreen dengan semua property yang diperlukan
  const app = document.getElementById("appScreen");
  app.style.cssText = "display:block !important; visibility:visible !important; opacity:1 !important; position:fixed !important; inset:0 !important; z-index:99999 !important; width:100vw !important; height:100vh !important;";

  // Paksa #map mengisi seluruh sisa ruang
  const mapEl = document.getElementById("map");
  if(mapEl){
    mapEl.style.position = "absolute";
    mapEl.style.top = "56px";
    mapEl.style.right = "0";
    mapEl.style.bottom = "0";
    mapEl.style.width = "auto";
    mapEl.style.height = "auto";
  }

  const overlay = document.getElementById("transOverlay");
  if(overlay){ overlay.style.display = "none"; }

  const flash = document.getElementById("scareFlash");
  if(flash){ flash.classList.remove("active"); flash.style.display = "none"; }

  if(!mapInitialized){
    // Tunggu 2 frame agar browser render dulu sebelum Leaflet init
    requestAnimationFrame(() => requestAnimationFrame(() => {
      initMap();
      mapInitialized = true;
      // Paksa Leaflet recalculate ukuran berkali-kali
      [100, 300, 600, 1200].forEach(t => setTimeout(() => {
        if(map) map.invalidateSize(true);
      }, t));
    }));
  } else {
    [100, 500].forEach(t => setTimeout(() => { if(map) map.invalidateSize(true); }, t));
  }
}

// ══════════════════════════════════════════════════════
//  MAP INIT
// ══════════════════════════════════════════════════════
function initMap(){
  map = L.map('map',{
    center:[-7.8013, 110.3647],
    zoom:13,
    zoomControl:false,
    preferCanvas:false
  });

  // ── Base layers ────────────────────────────────────
  const layerDark = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    { attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>', tileSize:512, zoomOffset:-1, maxZoom:20, minZoom:2, crossOrigin:true }
  );

  const layerSatellite = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    { attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>', tileSize:512, zoomOffset:-1, maxZoom:20, minZoom:2, crossOrigin:true }
  );

  const layerStreet = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    { attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>', tileSize:512, zoomOffset:-1, maxZoom:20, minZoom:2, crossOrigin:true }
  );

  // Default: dark
  layerDark.addTo(map);

  // ── Load GeoJSON dari file GeoJSON.geojson ─────────
  // Simpan ke window._layerGeoJSON supaya bisa di-toggle dari checkbox
  fetch('GeoJSON.geojson')
    .then(r => { if(!r.ok) throw new Error('GeoJSON not found'); return r.json(); })
    .then(data => {
      window._layerGeoJSON = L.geoJSON(data, {
        // Style untuk POLYGON
        style: {
          color: '#ff2222',
          weight: 2,
          opacity: 0.85,
          fillColor: '#cc0000',
          fillOpacity: 0.14,
          dashArray: '4,3'
        },
        // Style untuk POINT di dalam GeoJSON
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 7,
            fillColor: '#ff2222',
            color: '#fff',
            weight: 1.5,
            fillOpacity: 0.85
          });
        },
        // Popup dari properties GeoJSON
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const nama = p.name || p.nama || p.NAME || 'Tidak ada nama';
          const desc = p.deskripsi || p.description || p.keterangan || '';
          const tipe = p.tipe || p.type || p.kategori || '';
          layer.bindPopup(`
            <div class="popup-inner">
              <div class="popup-title" style="font-size:0.95rem">🗺 ${nama}</div>
              ${desc ? `<p style="font-family:var(--f-body);font-size:0.8rem;color:var(--white);margin-top:0.3rem;line-height:1.6">${desc}</p>` : ''}
              ${tipe ? `<div class="popup-row">Tipe: <strong>${tipe}</strong></div>` : ''}
              <div class="popup-row" style="margin-top:0.3rem;font-size:0.65rem;color:rgba(255,100,100,0.7)">
                📌 Layer Digitasi GeoJSON
              </div>
            </div>`, {maxWidth:280});
          // Hover effect
          layer.on('mouseover', function(){ this.setStyle({fillOpacity:0.3,weight:3}); });
          layer.on('mouseout',  function(){ window._layerGeoJSON?.resetStyle(this); });
        }
      }).addTo(map);

      // Update jumlah fitur di metadata
      const fc = data.features ? data.features.length : 0;
      const metaFitur = document.getElementById('metaJumlahFitur');
      if(metaFitur) metaFitur.textContent = `6 titik + ${fc} fitur GeoJSON`;

      // Pastikan checkbox sync
      const chk = document.getElementById('chkGeoJSON');
      if(chk) chk.checked = true;

      console.log(`✅ GeoJSON loaded: ${fc} fitur`);
    })
    .catch(err => {
      console.warn('GeoJSON tidak ditemukan atau gagal dimuat:', err.message);
      // Uncheck checkbox supaya user tahu layer tidak ada
      const chk = document.getElementById('chkGeoJSON');
      if(chk){ chk.checked = false; chk.disabled = true; }
    });

  // ── Custom Layer Switcher ──────────────────────────
  // Layer switcher ada di floatingFilter HTML — simpan ref global
  window._mapLayers = { dark: layerDark, satellite: layerSatellite, street: layerStreet };
  window._activeLayer = 'dark';

  L.control.zoom({position:'bottomright'}).addTo(map);

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      userLat=pos.coords.latitude; userLon=pos.coords.longitude;
      document.getElementById('locationStatus').textContent=
        `📍 Lokasi kamu: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;
      L.circleMarker([userLat,userLon],{
        radius:8,fillColor:'#00aaff',color:'#fff',weight:2,fillOpacity:0.9
      }).addTo(map).bindPopup('<b style="color:#00aaff">📍 Lokasi Kamu</b>');
      // auto-set origin
      setRouteOrigin(userLat, userLon, 'Lokasi Saya');
    },()=>{
      document.getElementById('locationStatus').textContent='⚠ Izin lokasi ditolak';
    });
  }

  // Right-click to set route origin
  map.on('contextmenu', e => setRouteOrigin(e.latlng.lat, e.latlng.lng, 'Titik di peta'));

  // Populate route destination select
  const sel = document.getElementById('destSelect');
  allLocations.forEach(l => {
    const o = document.createElement('option'); o.value = l.id; o.textContent = l.nama; sel.appendChild(o);
  });

  // 🔴 BARU: Update tingkat horor untuk semua lokasi berdasarkan kesaksian
  allLocations.forEach(loc => updateLocationLevel(loc.id));

  renderMarkers(allLocations);
  renderLocationList();
  setTimeout(()=>map.invalidateSize(), 300);
  setTimeout(()=>map.invalidateSize(), 800);

  // ── Skala bar dinamis (update tiap zoom/move) ──────
  L.control.scale({
    imperial: false,
    metric: true,
    position: 'bottomleft',
    maxWidth: 150
  }).addTo(map);

  // ── Info skala + sistem koordinat dinamis ──────────
  const scaleInfo = L.control({position:'bottomleft'});
  scaleInfo.onAdd = function(){
    const div = L.DomUtil.create('div','scale-info-box');
    div.innerHTML = getScaleInfoHTML(map);
    return div;
  };
  scaleInfo.addTo(map);

  // Update saat zoom berubah
  map.on('zoomend moveend', function(){
    const el = document.querySelector('.scale-info-box');
    if(el) el.innerHTML = getScaleInfoHTML(map);
  });
}

function niceNumber(n){
  const magnitude = Math.pow(10, Math.floor(Math.log10(n)));
  const norm = n / magnitude;
  let nice;
  if(norm < 1.5) nice = 1;
  else if(norm < 3.5) nice = 2;
  else if(norm < 7.5) nice = 5;
  else nice = 10;
  return nice * magnitude;
}

// ── MARKER CONFIG ─────────────────────────────────────
const COLORS={
  'mitos':'#8b6f47',
  'rendah':'#2dcc2d','sedang':'#ffd700',
  'tinggi':'#ff3333','sangat-tinggi':'#cc44ff'
};
const BADGES={
  'penampakan':'👻 PENAMPAKAN','suara':'🔊 SUARA MISTERIUS',
  'bau':'💨 BAU ANEH','kejadian':'⚡ KEJADIAN ANEH','urban-legend':'📖 URBAN LEGEND'
};

function markerIcon(loc){
  const color=COLORS[loc.level]||'#ff3333';
  const big=loc.level==='sangat-tinggi';
  // ukuran berdasar level
  const sz = big?22 : loc.level==='tinggi'?17 : loc.level==='sedang'?14 : 11;
  const wrap = sz+18;
  // pulse untuk semua level, makin tinggi makin kencang
  const dur = big?'1.2s' : loc.level==='tinggi'?'1.6s' : loc.level==='sedang'?'2s' : '2.6s';
  const pulse = `
    <div style="position:absolute;inset:-6px;border-radius:50%;border:1.5px solid ${color};opacity:0.55;animation:mpulse ${dur} ease-out infinite;"></div>
    <div style="position:absolute;inset:-13px;border-radius:50%;border:1px solid ${color};opacity:0.2;animation:mpulse ${dur} ease-out infinite 0.5s;"></div>
  `;
  const skull = big ? `<div style="position:absolute;top:-6px;left:-5px;font-size:15px;filter:drop-shadow(0 0 4px red);">💀</div>` : '';
  return L.divIcon({
    className:'',
    iconSize:[wrap,wrap], iconAnchor:[wrap/2,wrap/2],
    html:`<style>@keyframes mpulse{0%{transform:scale(1);opacity:0.55}100%{transform:scale(2.6);opacity:0}}</style>
    <div style="position:relative;width:${sz}px;height:${sz}px;background:radial-gradient(circle at 35% 35%,${color}dd,${color}88);border-radius:50%;border:2px solid rgba(255,255,255,0.55);box-shadow:0 0 10px ${color},0 0 22px ${color}88,0 0 40px ${color}33;cursor:pointer;">
      ${pulse}${skull}
    </div>`
  });
}

// ── RENDER MARKERS ────────────────────────────────────
function renderMarkers(locs){
  markers.forEach(m=>map.removeLayer(m));
  markers=[];

  locs.forEach(loc=>{
    const m=L.marker([loc.lat,loc.lon],{icon:markerIcon(loc)}).addTo(map);

    markers.push(m);

    m.on('click', function(){
      const dist=(userLat&&userLon)
        ? calcDist(userLat,userLon,loc.lat,loc.lon)
        : 'Izin lokasi belum diberikan';

      m.bindPopup(`
        <div class="popup-inner">
          <div class="popup-title">${loc.nama}</div>
          <div class="popup-row">Kepercayaan: <strong style="color:${COLORS[loc.level]}">${loc.persen}% (${loc.level})</strong></div>
          <div class="popup-coords">🧭 ${loc.lat.toFixed(6)}, ${loc.lon.toFixed(6)}</div>
          <div class="popup-dist">📍 Jarak dari kamu: ${dist}</div>
          <div class="popup-actions">
            <button class="popup-btn" onclick="openDetail(${loc.id})">👁 Detail</button>
            <button class="popup-btn" onclick="routeToLoc(${loc.id})">🧭 Rute</button>
            <a class="popup-btn popup-maps" href="${loc.link_gmaps}" target="_blank">🗺 Maps</a>
          </div>
        </div>`,{maxWidth:290}).openPopup();
    });


  });
}

// ── HELPERS ───────────────────────────────────────────
function calcDist(la1,lo1,la2,lo2){
  const R=6371e3,f1=la1*Math.PI/180,f2=la2*Math.PI/180;
  const df=(la2-la1)*Math.PI/180,dl=(lo2-lo1)*Math.PI/180;
  const a=Math.sin(df/2)**2+Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)**2;
  const d=2*R*Math.asin(Math.sqrt(a));
  return d<1000?`${Math.round(d)} m`:`${(d/1000).toFixed(1)} km`;
}

// ── FILTER ────────────────────────────────────────────
function applyFilters(){
  // Baca checkbox tingkat kepercayaan dari floating panel
  const lvls = [...document.querySelectorAll('#floatingFilter .ff-checks input[type="checkbox"]')]
    .filter(i => ['mitos','rendah','sedang','tinggi','sangat-tinggi'].includes(i.value) && i.checked)
    .map(i => i.value);

  renderMarkers(
    allLocations.filter(l => lvls.length===0 || lvls.includes(l.level))
  );
}

function searchLocations(){
  const q=document.getElementById('searchInput').value.trim().toLowerCase();
  const box=document.getElementById('searchResults');
  box.innerHTML='';
  if(!q){box.classList.remove('show');return;}
  const m=allLocations.filter(l=>l.nama.toLowerCase().includes(q)).slice(0,6);
  m.forEach(l=>{
    const d=document.createElement('div');
    d.className='search-item';
    d.innerHTML=`${l.nama}<small>${BADGES[l.kategori]||l.kategori} · ${l.level}</small>`;
    d.onclick=()=>{
      map.flyTo([l.lat,l.lon],17); openDetail(l.id);
      box.classList.remove('show'); document.getElementById('searchInput').value='';
    };
    box.appendChild(d);
  });
  if(!m.length) box.innerHTML='<div class="search-item" style="color:#6a4a4a;pointer-events:none">Tidak ditemukan</div>';
  box.classList.add('show');
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.search-wrap')) document.getElementById('searchResults').classList.remove('show');
});

// ── DETAIL MODAL ──────────────────────────────────────
function openDetail(id){
  const loc=allLocations.find(l=>l.id===id);
  if(!loc) return;
  selectedLocId=id;
  
  // 🔴 BARU: Recalculate level berdasarkan kesaksian terbaru
  updateLocationLevel(id);
  
  document.getElementById('detailImg').src         =loc.gambar;
  document.getElementById('detailDesc').textContent =loc.deskripsi;
  document.getElementById('detailMapsLink').href    =loc.link_gmaps;
  document.getElementById('detailVideo').src        =loc.video;
  document.getElementById('videoNote').textContent  =loc.videoNote;

  // Render kronologi (data bawaan + kisah dari user)
  renderKronologi(id);

  const ratings=(() => { try { return JSON.parse(localStorage.getItem(`rating_${id}`)||'[]'); } catch(e){ return []; } })();
  const avg=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1):'—';
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach((t,i)=>t.classList.toggle('active',i===0));
  document.querySelectorAll('.mtab-content').forEach((c,i)=>c.classList.toggle('active',i===0));
  loadKomentar(id);
  document.getElementById('detailModal').classList.add('active');
  document.getElementById('sidebar').style.visibility      = 'hidden';
  document.getElementById('floatingFilter').style.visibility = 'hidden';
  const tb = document.querySelector('.sidebar-toggle');
  if(tb) tb.style.display = 'none';
}

function closeDetailModal(e){if(e.target===document.getElementById('detailModal'))closeDetailModalBtn();}
function closeDetailModalBtn(){
  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('detailVideo').src='';
  document.getElementById('sidebar').style.visibility      = '';
  document.getElementById('floatingFilter').style.visibility = '';
  const tb = document.querySelector('.sidebar-toggle');
  if(tb) tb.style.display = '';
}
function switchModalTab(tab,btn){
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.mtab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab'+tab.charAt(0).toUpperCase()+tab.slice(1)).classList.add('active');
}

// ── RATING ────────────────────────────────────────────
function setRating(val){
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('active',i<val));
  const key=`rating_${selectedLocId}`;
  const ratings=(() => { try { return JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ return []; } })();
  ratings.push(val);
  try { localStorage.setItem(key,JSON.stringify(ratings)); } catch(e){}
  const avg=(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1);
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  // Load komentar pakai selectedLocId (bukan 'id' yang undefined)
  if(selectedLocId) loadKomentar(selectedLocId);
}

// ── ADD LOCATION ──────────────────────────────────────
function openAddModal(){ document.getElementById('addModal').classList.add('active'); }
function closeAddModal(e){ if(e.target===document.getElementById('addModal'))document.getElementById('addModal').classList.remove('active'); }
function submitNewLocation(e){
  e.preventDefault();
  const newLoc={
    id:Date.now(),
    nama:document.getElementById('addName').value,
    lat:parseFloat(document.getElementById('addLat').value),
    lon:parseFloat(document.getElementById('addLon').value),
    link_gmaps:`https://www.google.com/maps?q=${document.getElementById('addLat').value},${document.getElementById('addLon').value}`,
    kategori:document.getElementById('addKategori').value,
    level:document.getElementById('addLevel').value,
    persen:{rendah:25,sedang:50,tinggi:75,'sangat-tinggi':92}[document.getElementById('addLevel').value],
    deskripsi:document.getElementById('addDesc').value||'Laporan dari komunitas.',
    kronologi:[{waktu:'Dilaporkan',nama:'Pelapor Anonim',teks:'Lokasi baru dilaporkan oleh anggota komunitas. Detail masih dalam investigasi.'}],
    gambar:document.getElementById('addImg').value||'https://via.placeholder.com/700x200/0a0005/cc0000?text=HAUNTED',
    video:'',videoNote:'Podcast/Liputan belum tersedia untuk lokasi ini.'
  };
  allLocations.push(newLoc);
  applyFilters();
  document.getElementById('addModal').classList.remove('active');
  map.flyTo([newLoc.lat,newLoc.lon],16);
  e.target.reset();
}

// ── SIDEBAR ───────────────────────────────────────────
function toggleSidebar(){
    const sb = document.getElementById("sidebar");
    const mapEl = document.getElementById("map");
    const toggleBtn = document.querySelector(".sidebar-toggle");

    sb.classList.toggle("collapsed");

    if(sb.classList.contains("collapsed")){
        mapEl.style.left = "0px";
        toggleBtn.style.left = "0px";
        document.getElementById("sidebarToggleIcon").innerHTML = "▶";
    }else{
        mapEl.style.left = "320px";
        toggleBtn.style.left = "320px";
        document.getElementById("sidebarToggleIcon").innerHTML = "◀";
    }

    setTimeout(()=>{
        map.invalidateSize();
    },300);
}

// ── SIDEBAR TABS ──────────────────────────────────────
function switchSbTab(id, btn){
  document.querySelectorAll('.sb-tab').forEach(t=>t.classList.remove('active'));
  // ══ TAMBAHAN: handle panel data & 3d juga ══
  ['search','route','profile','data','3d'].forEach(p=>{
    const el=document.getElementById('sbp-'+p);
    if(el){ el.classList.remove('active'); el.style.display='none'; }
  });
  // ══ END TAMBAHAN ══
  btn.classList.add('active');
  const panel=document.getElementById('sbp-'+id);
  if(panel){ panel.classList.add('active'); panel.style.display='block'; }
  const sb=document.getElementById('sidebar');
  if(sb.classList.contains('collapsed')){
    sb.classList.remove('collapsed');
    document.getElementById('sidebarToggleIcon').textContent='◀';
    setTimeout(()=>map&&map.invalidateSize(),320);
  }
}

// ── SIDEBAR SEARCH ────────────────────────────────────
function doSbSearch(){
  const q=document.getElementById('sbSearchInput').value.trim().toLowerCase();
  const box=document.getElementById('sbSearchResults');
  box.innerHTML='';
  if(!q) return;
  const res=allLocations.filter(l=>l.nama.toLowerCase().includes(q)||l.deskripsi.toLowerCase().includes(q));
  if(!res.length){
    box.innerHTML='<div class="sb-search-item" style="pointer-events:none;color:var(--dim)">Tidak ditemukan</div>';
    return;
  }
  res.slice(0,8).forEach(loc=>{
    const d=document.createElement('div'); d.className='sb-search-item';
    d.innerHTML=`${loc.nama}<small>${BADGES[loc.kategori]||loc.kategori} · ${loc.level}</small>`;
    d.onclick=()=>{
      map.flyTo([loc.lat,loc.lon],16);
      const idx=allLocations.indexOf(loc);
      if(markers[idx]) markers[idx].openPopup();
      document.getElementById('sbSearchInput').value='';
      box.innerHTML='';
    };
    box.appendChild(d);
  });
}

// ══════════════════════════════════════════════════════
//  NETWORK ANALYSIS / ROUTING
// ══════════════════════════════════════════════════════
function setRouteMode(mode, btn){
  routeMode=mode;
  document.querySelectorAll('.route-mode-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function setRouteOrigin(lat, lon, label){
  originLat=lat; originLon=lon;
  const el=document.getElementById('originVal');
  el.textContent=`${label}\n${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  el.classList.add('filled');
  if(originMarkerL) map.removeLayer(originMarkerL);
  originMarkerL=L.circleMarker([lat,lon],{radius:10,fillColor:'#00aaff',color:'#fff',weight:2.5,fillOpacity:0.9})
    .addTo(map).bindPopup('<b style="color:#00aaff">📍 Titik Asal</b>');
  checkRouteReady();
}

function setRouteDest(lat, lon, label){
  destLat=lat; destLon=lon;
  const el=document.getElementById('destVal');
  el.textContent=`${label}\n${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  el.classList.add('filled');
  if(destMarkerL) map.removeLayer(destMarkerL);
  destMarkerL=L.circleMarker([lat,lon],{radius:10,fillColor:'#cc0000',color:'#fff',weight:2.5,fillOpacity:0.9})
    .addTo(map).bindPopup(`<b style="color:#cc0000">🏚 ${label}</b>`);
  checkRouteReady();
}

function checkRouteReady(){
  const btn=document.getElementById('routeGoBtn');
  if(btn) btn.disabled=!(originLat&&originLon&&destLat&&destLon);
}

function useMyLoc(){
  if(userLat&&userLon){ setRouteOrigin(userLat,userLon,'Lokasi Saya'); return; }
  const v=document.getElementById('originVal');
  v.textContent='Mendeteksi lokasi...';
  navigator.geolocation?.getCurrentPosition(p=>{
    userLat=p.coords.latitude; userLon=p.coords.longitude;
    setRouteOrigin(userLat,userLon,'Lokasi Saya');
    document.getElementById('locationStatus').textContent=`📍 Lokasi kamu: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;
  },()=>{ v.textContent='Gagal — izin lokasi ditolak'; v.classList.remove('filled'); });
}

function setDestFromSelect(val){
  if(!val) return;
  const loc=allLocations.find(l=>l.id==val);
  if(loc) setRouteDest(loc.lat, loc.lon, loc.nama);
}

function routeToLoc(id){
  const loc=allLocations.find(l=>l.id===id); if(!loc) return;
  setRouteDest(loc.lat, loc.lon, loc.nama);
  document.getElementById('destSelect').value=id;
  switchSbTab('route', document.getElementById('stb-route'));
  if(!originLat && userLat) setRouteOrigin(userLat, userLon, 'Lokasi Saya');
  if(originLat && originLon && destLat && destLon) calcRoute();
}

async function calcRoute(){
  if(!originLat||!destLat) return;
  const btn=document.getElementById('routeGoBtn');
  btn.textContent='⏳ Menghitung...'; btn.disabled=true; btn.classList.add('loading');
  document.getElementById('routeError').classList.remove('show');
  document.getElementById('routeResult').classList.remove('show');

  const profileMap={'driving':'driving','foot':'foot','bike':'bike'};
  const profile=profileMap[routeMode]||'driving';
  const url=`${OSRM}/${profile}/${originLon},${originLat};${destLon},${destLat}?overview=full&geometries=geojson&steps=true`;

  try{
    const res=await fetch(url);
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    if(data.code!=='Ok'||!data.routes?.length) throw new Error('Rute tidak ditemukan');
    renderRoute(data.routes[0]);
  } catch(e){
    const err=document.getElementById('routeError');
    err.textContent=`Gagal: ${e.message}`;
    err.classList.add('show');
  } finally{
    btn.textContent='☠ HITUNG RUTE'; btn.disabled=false; btn.classList.remove('loading');
    checkRouteReady();
  }
}

function renderRoute(route){
  if(routeLayer){ map.removeLayer(routeLayer); routeLayer=null; }
  const coords=route.geometry.coordinates.map(c=>[c[1],c[0]]);
  routeLayer=L.polyline(coords,{color:'#ff2222',weight:5,opacity:0.88,dashArray:'10,5'}).addTo(map);
  map.fitBounds(routeLayer.getBounds(),{padding:[50,50]});

  const km=route.distance, sec=route.duration;
  document.getElementById('rDist').textContent=km<1000?`${Math.round(km)} m`:`${(km/1000).toFixed(2)} km`;
  const h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60);
  document.getElementById('rTime').textContent=h>0?`${h}j ${m}m`:m>0?`${m} mnt ${s} dtk`:`${s} dtk`;

  const stepsDiv=document.getElementById('routeSteps'); stepsDiv.innerHTML='';
  const steps=route.legs?.[0]?.steps||[];
  steps.forEach((st,i)=>{
    const icon=getStepIcon(st.maneuver?.type, st.maneuver?.modifier);
    const dist=st.distance<1000?`${Math.round(st.distance)} m`:`${(st.distance/1000).toFixed(1)} km`;
    const name=st.name||st.maneuver?.type||'';
    if(!name && i>0 && i<steps.length-1) return;
    const el=document.createElement('div'); el.className='route-step';
    el.innerHTML=`<span class="route-step-icon">${icon}</span><span>${name||'Lanjutkan'} <span style="color:var(--dim);font-size:0.7rem">(${dist})</span></span>`;
    stepsDiv.appendChild(el);
  });

  document.getElementById('routeResult').classList.add('show');
}

function getStepIcon(type, mod){
  if(!type) return '→';
  const t=type.toLowerCase(), m=(mod||'').toLowerCase();
  if(t==='depart') return '🔵';
  if(t==='arrive') return '🔴';
  if(t==='turn'||t==='new name'){ if(m.includes('left')) return '↰'; if(m.includes('right')) return '↱'; return '↑'; }
  if(t==='roundabout'||t==='rotary') return '🔄';
  if(t==='fork'){ if(m.includes('left')) return '↖'; return '↗'; }
  if(t==='merge') return '⇒';
  return '↑';
}

function clearRoute(){
  if(routeLayer){ map.removeLayer(routeLayer); routeLayer=null; }
  if(originMarkerL){ map.removeLayer(originMarkerL); originMarkerL=null; }
  if(destMarkerL){ map.removeLayer(destMarkerL); destMarkerL=null; }
  originLat=originLon=destLat=destLon=null;
  const ov=document.getElementById('originVal');
  ov.textContent='Belum ditentukan'; ov.classList.remove('filled');
  const dv=document.getElementById('destVal');
  dv.textContent='Belum dipilih'; dv.classList.remove('filled');
  document.getElementById('destSelect').value='';
  document.getElementById('routeResult').classList.remove('show');
  document.getElementById('routeError').classList.remove('show');
  checkRouteReady();
}

// ── KOMUNITAS TOGGLE ──────────────────────────────────
function toggleKom(id, btn){
  const list = document.getElementById(id);
  const isOpen = list.classList.contains('open');
  // Tutup semua dulu
  document.querySelectorAll('.kom-links-list').forEach(l=>l.classList.remove('open'));
  document.querySelectorAll('.kom-platform-btn').forEach(b=>b.classList.remove('open'));
  // Buka yang diklik (kalau belum open)
  if(!isOpen){
    list.classList.add('open');
    btn.classList.add('open');
  }
}

// ── SHARE ─────────────────────────────────────────────
function shareWA(){
  const text = encodeURIComponent(
    '👻 Cek peta lokasi angker Yogyakarta ini!\n' +
    '🗺 WebGIS Haunted Map — Pemetaan Mistis Masyarakat Yogyakarta\n\n' +
    window.location.href
  );
  window.open('https://wa.me/?text=' + text, '_blank');
}

function shareIG(){
  navigator.clipboard.writeText(
    '👻 Cek peta lokasi angker Yogyakarta! ' + window.location.href
  ).then(()=>{
    alert('Link sudah disalin! Paste di caption Instagram kamu 📸');
    window.open('https://www.instagram.com/', '_blank');
  }).catch(()=> copyLink());
}

function copyLink(){
  navigator.clipboard.writeText(window.location.href)
    .then(()=>{
      const msg = document.getElementById('shareMsg');
      msg.style.display = 'block';
      setTimeout(()=> msg.style.display = 'none', 2500);
    })
    .catch(()=>{
      prompt('Salin link ini:', window.location.href);
    });
}

// ── TOGGLE LAYER ADMIN BIG ────────────────────────────
let activeAdminLayers = {};

function loadAdminSubLayer(fileName, checkbox) {
  // Tentukan nama folder tempat kamu menyimpan file GeoJSON
  const folderPath = "GeoJSON/"; 

  if (checkbox.checked) {
    if (activeAdminLayers[fileName]) {
      activeAdminLayers[fileName].addTo(map);
    } else {
      // Perhatikan di sini: kita gabungkan folderPath + fileName
      fetch(folderPath + fileName)
        .then(r => { 
          if(!r.ok) throw new Error("File tidak ditemukan di: " + folderPath + fileName); 
          return r.json(); 
        })
        .then(data => {
          activeAdminLayers[fileName] = L.geoJSON(data, {
            style: {
              color: "#ff4444",
              weight: 1.2,
              opacity: 0.6,
              fillOpacity: 0.05,
              fillColor: "#330000",
              dashArray: "4, 4"
            },
            onEachFeature: (f, l) => {
              // NAMOBJ adalah standar nama wilayah dari BIG/Inageoportal
              let name = f.properties.NAMOBJ || f.properties.name || "Wilayah DIY";
              l.bindPopup("<div style='font-family:var(--f-mono); color:var(--red);'>📍 " + name + "</div>");
            }
          }).addTo(map);
          console.log("✅ Berhasil memuat: " + folderPath + fileName);
        })
        .catch((err) => {
          console.error(err);
          checkbox.checked = false;
          alert("Gagal memuat file! Pastikan file '" + fileName + "' ada di dalam folder 'GeoJSON'");
        });
    }
  } else {
    if (activeAdminLayers[fileName]) map.removeLayer(activeAdminLayers[fileName]);
  }
}

// ── TOGGLE GEOJSON LAYER ──────────────────────────────
// Fungsi ini sebelumnya HILANG — menyebabkan checkbox tidak berfungsi
function toggleGeoJSONLayer(checkbox){
  if(!window._layerGeoJSON){
    if(checkbox.checked){
      checkbox.checked = false;
      alert('⚠ Layer GeoJSON belum berhasil dimuat.\n\nPastikan file GeoJSON.geojson ada di folder yang sama dengan index.html.');
    }
    return;
  }
  if(checkbox.checked){
    window._layerGeoJSON.addTo(map);
  } else {
    if(map.hasLayer(window._layerGeoJSON)) map.removeLayer(window._layerGeoJSON);
  }
}

// ── KOMENTAR ──────────────────────────────────────────
function loadKomentar(id){
  const list = document.getElementById('komentarList');
  if(!list) return;
  list.innerHTML = '';
  let data = [];
  try { data = JSON.parse(localStorage.getItem('kom_'+id)||'[]'); } catch(e){ data=[]; }
  if(!data.length){
    list.innerHTML = '<div class="kom-empty">Belum ada komentar. Jadilah yang pertama!</div>';
    return;
  }
  data.forEach(k=>{
    const el = document.createElement('div');
    el.className = 'kom-item-display';
    el.innerHTML = `<div class="kom-item-time">${k.waktu}</div><div class="kom-item-text">${k.teks}</div>`;
    list.appendChild(el);
  });
  // Auto scroll ke bawah
  list.scrollTop = list.scrollHeight;
}

function submitKomentar(){
  const input = document.getElementById('komentarInput');
  if(!input) return;
  const teks = input.value.trim();
  if(!teks || !selectedLocId) return;
  const key = 'kom_'+selectedLocId;
  let data = [];
  try { data = JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ data=[]; }
  const now = new Date();
  data.push({
    teks,
    waktu: now.toLocaleDateString('id-ID')+' '+now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})
  });
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e){}
  input.value = '';
  loadKomentar(selectedLocId);
}

// ── TAMBAH KISAH (di tab Kesaksian) ──────────────────
function submitKisah(){
  const waktu = document.getElementById('kisahWaktu')?.value.trim();
  const nama  = document.getElementById('kisahNama')?.value.trim();
  const teks  = document.getElementById('kisahTeks')?.value.trim();
  if(!teks || !selectedLocId){ alert('Isi cerita dulu ya!'); return; }
  const key = 'kisah_'+selectedLocId;
  let data = [];
  try { data = JSON.parse(localStorage.getItem(key)||'[]'); } catch(e){ data=[]; }
  data.push({
    waktu: waktu || 'Tidak diketahui',
    nama:  nama  || 'Anonim',
    teks
  });
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e){}
  
  // 🔴 BARU: Update tingkat horor berdasarkan jumlah kesaksian
  updateLocationLevel(selectedLocId);
  
  // Reset form
  if(document.getElementById('kisahWaktu')) document.getElementById('kisahWaktu').value='';
  if(document.getElementById('kisahNama'))  document.getElementById('kisahNama').value='';
  if(document.getElementById('kisahTeks'))  document.getElementById('kisahTeks').value='';
  
  // Reload kronologi & update display
  renderKronologi(selectedLocId);
  
  alert('Kisahmu sudah ditambahkan! Terima kasih 🕯');
}

function renderKronologi(id){
  const loc = allLocations.find(l=>l.id===id);
  if(!loc) return;
  // Ambil kisah bawaan dari data
  const baseKrono = loc.kronologi || [];
  // Ambil kisah tambahan dari localStorage
  let userKrono = [];
  try { userKrono = JSON.parse(localStorage.getItem('kisah_'+id)||'[]'); } catch(e){ userKrono=[]; }
  const allKrono = [...baseKrono, ...userKrono];
  const container = document.getElementById('detailKronologi');
  if(!container) return;
  
  // 🔴 BARU: Tampilkan info kesaksian & tingkat horor terbaru
  const totalKesaksian = allKrono.length;
  const horrorInfo = calculateHorrorLevel(totalKesaksian);
  
  let kesaksianInfo = `<div style="margin-bottom:1rem;padding:0.8rem;background:rgba(0,0,0,0.3);border-left:3px solid ${COLORS[horrorInfo.level]||'#cc0000'};font-family:var(--f-mono);font-size:0.7rem;text-align:center;color:var(--gold)">
    <strong>📊 ${horrorInfo.label}</strong> · Kesaksian: <strong style="color:${COLORS[horrorInfo.level]||'#cc0000'}">${totalKesaksian}</strong>
  </div>`;
  
  if(!allKrono.length){
    container.innerHTML = kesaksianInfo + '<p style="font-family:var(--f-mono);font-size:0.65rem;color:var(--dim);text-align:center;padding:1rem 0">Belum ada kesaksian untuk lokasi ini.</p>';
    return;
  }
  
  const kronoHTML = allKrono.map((k,i)=>`
    <div class="krono-item">
      <div class="krono-dot"><span class="krono-num">${i+1}</span></div>
      <div class="krono-content">
        <div class="krono-time">${k.waktu}</div>
        <div class="krono-name">— ${k.nama}</div>
        <div class="krono-desc">${k.teks}</div>
      </div>
    </div>`).join('');
  
  container.innerHTML = kesaksianInfo + kronoHTML;
}
// ── EXPORT METADATA JSON (SDI) ────────────────────────
function exportMetadataJSON(){
  const geojsonCount = window._layerGeoJSON
    ? (window._layerGeoJSON.getLayers().length)
    : 0;

  const metadata = {
    metadata: {
      judul: "Pemetaan Lokasi Angker & Cerita Mitos Lokal DIY",
      abstrak: "WebGIS interaktif yang memetakan lokasi-lokasi yang dipercaya angker oleh masyarakat di Daerah Istimewa Yogyakarta berdasarkan hasil survei lapangan dan wawancara langsung.",
      wilayah: "Daerah Istimewa Yogyakarta, Indonesia",
      batas_koordinat: {
        utara: -7.53, selatan: -8.05,
        barat: 110.27, timur: 110.55
      }
    },
    referensi_spasial: {
      sistem_koordinat: "WGS84",
      epsg: "EPSG:4326",
      proyeksi: "Geographic (Lat/Lon)",
      satuan: "Decimal Degrees"
    },
    kualitas_data: {
      skala_referensi: "1:25.000",
      tipe_geometri: "Point",
      akurasi_posisi: "± 10 meter (GPS smartphone)",
      metode_pengumpulan: "Survei lapangan & wawancara masyarakat",
      kelengkapan: "6 titik lokasi terverifikasi dari survei"
    },
    dataset: {
      jumlah_titik: 6,
      jumlah_fitur_geojson: geojsonCount,
      format: "GeoJSON (RFC 7946)",
      encoding: "UTF-8",
      tanggal_pengumpulan: "Maret – Mei 2025",
      tanggal_publikasi: new Date().toISOString().split('T')[0]
    },
    teknologi: {
      webgis_platform: "Leaflet.js v1.9.4",
      basemap: "Mapbox Dark v11 (tiles)",
      routing: "OSRM (Open Source Routing Machine)",
      data_administrasi: "GeoJSON Batas DIY (Geoportal BIG)",
      audio: "Web Audio API",
      hosting: "GitHub Pages"
    },
    pembuat: {
      tim: ["Ilma", "Erfina", "Dirra", "Imel", "Tota", "Delima", "Octo"],
      institusi: "Teknik Geomatika, UPN Veteran Yogyakarta",
      tahun: 2025
    },
    lisensi: {
      nama: "Creative Commons Attribution-ShareAlike 4.0",
      kode: "CC BY-SA 4.0",
      url: "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    standar_sdi: {
      format_data: "OGC GeoJSON Standard",
      koordinat_standard: "ISO 6709",
      metadata_standard: "ISO 19115 (sebagian)",
      interoperabilitas: ["QGIS", "ArcGIS", "Google Earth", "GDAL", "Geoportal BIG"]
    },
    catatan: "Data bersifat persepsi masyarakat berdasarkan hasil wawancara. Tidak merupakan klaim kebenaran mutlak atau data resmi pemerintah."
  };

  const blob = new Blob([JSON.stringify(metadata, null, 2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'metadata_haunted_map_sdi.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════
//  ══ TAMBAHAN: DOWNLOAD DATA FUNCTIONS ══
// ══════════════════════════════════════════════════════

function downloadGeoJSON(){
  fetch('GeoJSON.geojson')
    .then(r=>r.blob())
    .then(blob=>{
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url; a.download='haunted_map_yogyakarta.geojson'; a.click();
      URL.revokeObjectURL(url);
    }).catch(()=>alert('File GeoJSON tidak ditemukan di server.'));
}

function downloadPointsGeoJSON(){
  const features = allLocations.map(loc=>({
    type:'Feature',
    geometry:{type:'Point',coordinates:[loc.lon,loc.lat]},
    properties:{
      id:loc.id, nama:loc.nama, kategori:loc.kategori,
      level:loc.level, persen:loc.persen,
      deskripsi:loc.deskripsi, link_gmaps:loc.link_gmaps
    }
  }));
  const geojson={type:'FeatureCollection',features};
  const blob=new Blob([JSON.stringify(geojson,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='titik_lokasi_angker_yogyakarta.geojson'; a.click();
  URL.revokeObjectURL(url);
}

function downloadAsSHP(){
  const features = allLocations.map(loc=>({
    type:'Feature',
    geometry:{type:'Point',coordinates:[loc.lon,loc.lat]},
    properties:{id:loc.id,nama:loc.nama,kategori:loc.kategori,level:loc.level,persen:loc.persen}
  }));
  const geojson={type:'FeatureCollection',features};
  const content = [
    '=== HAUNTED MAP YOGYAKARTA — DATA EXPORT ===',
    '',
    'Untuk membuat SHP dari file GeoJSON ini:',
    '1. Buka QGIS > Layer > Add Layer > Add Vector Layer',
    '2. Pilih file .geojson yang sudah didownload',
    '3. Klik kanan layer > Export > Save Features As',
    '4. Pilih format ESRI Shapefile',
    '5. Set CRS: EPSG:4326 (WGS84)',
    '',
    '--- DATA GeoJSON ---',
    JSON.stringify(geojson, null, 2)
  ].join('\n');
  const blob=new Blob([content],{type:'text/plain'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download='haunted_map_to_shp_guide.txt'; a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════
//  CSV EXPORT — COMPREHENSIVE DATA + ANALYSIS
// ══════════════════════════════════════════════════════

/**
 * Escape CSV field (handle quotes, commas, newlines)
 */
function escapeCSVField(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Hitung area perkiraan dari batas administrative (simplified)
 */
function estimateAreaKm2(lat, lon) {
  // Perkiraan kasar area di sekitar 1km dari point
  // Untuk akurasi, gunakan GeoJSON yang sudah ada
  const R = 6371; // radius bumi km
  const perimeter = 2 * Math.PI * R;
  // Simplified: asumsi area 0.5km radius
  return Math.PI * (0.5 ** 2);
}

/**
 * Format tanggal ke DD/MM/YYYY
 */
function formatDate(date) {
  if (!date) return new Date().toLocaleDateString('id-ID');
  const d = new Date(date);
  return d.toLocaleDateString('id-ID');
}

/**
 * EXPORT 1: WIDE FORMAT (1 row per lokasi, kesaksian dalam 1 kolom)
 * Cocok untuk: summary report, dashboarding
 */
function exportCSVWideFormat() {
  const headers = [
    'No', 'ID Lokasi', 'Nama Lokasi', 'Kategori', 'Latitude', 'Longitude',
    'Tingkat Horor', 'Persen Kepercayaan', 'Jumlah Kesaksian',
    'Deskripsi Singkat', 'Kesaksian (Waktu | Nama | Cerita)',
    'Tanggal Export'
  ];

  const rows = [];
  let no = 1;

  allLocations.forEach(loc => {
    // Ambil semua kesaksian
    const baseKrono = loc.kronologi || [];
    let userKrono = [];
    try {
      userKrono = JSON.parse(localStorage.getItem('kisah_' + loc.id) || '[]');
    } catch (e) {
      userKrono = [];
    }
    const allKrono = [...baseKrono, ...userKrono];

    // Format kesaksian sebagai string
    const kesaksianText = allKrono
      .map(k => `${k.waktu} | ${k.nama} | ${k.teks.substring(0, 50)}...`)
      .join(' | ');

    const row = [
      no++,
      loc.id,
      loc.nama,
      loc.kategori,
      loc.lat.toFixed(8),
      loc.lon.toFixed(8),
      loc.level,
      loc.persen + '%',
      allKrono.length,
      loc.deskripsi.substring(0, 100),
      kesaksianText || '(belum ada kesaksian)',
      formatDate()
    ];

    rows.push(row.map(escapeCSVField));
  });

  // Gabung headers + rows
  const csv = [headers.map(escapeCSVField), ...rows].map(r => r.join(',')).join('\n');

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `haunted_map_export_wide_${formatDate().replace(/\//g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  alert(`✅ CSV (Wide Format) sudah didownload!\n${allLocations.length} lokasi, ${rows.reduce((s,r) => s + (parseInt(r[8])||0), 0)} total kesaksian`);
}

/**
 * EXPORT 2: LONG FORMAT (1 row per kesaksian)
 * Cocok untuk: analisis detail, statistik, database import
 */
function exportCSVLongFormat() {
  const headers = [
    'No', 'ID Lokasi', 'Nama Lokasi', 'Kategori', 'Latitude', 'Longitude',
    'Tingkat Horor', 'Persen Kepercayaan', 'Kesaksian Ke', 'Waktu Kejadian',
    'Nama Saksi', 'Cerita/Kesaksian', 'Tanggal Lapor'
  ];

  const rows = [];
  let no = 1;
  let kesaksianTotal = 0;

  allLocations.forEach(loc => {
    // Ambil semua kesaksian
    const baseKrono = loc.kronologi || [];
    let userKrono = [];
    try {
      userKrono = JSON.parse(localStorage.getItem('kisah_' + loc.id) || '[]');
    } catch (e) {
      userKrono = [];
    }
    const allKrono = [...baseKrono, ...userKrono];

    if (allKrono.length === 0) {
      // Lokasi tanpa kesaksian
      const row = [
        no++, loc.id, loc.nama, loc.kategori, loc.lat.toFixed(8), loc.lon.toFixed(8),
        loc.level, loc.persen + '%', 0, '-', '-', '(Belum ada kesaksian)', formatDate()
      ];
      rows.push(row.map(escapeCSVField));
    } else {
      // Lokasi dengan kesaksian
      allKrono.forEach((krono, idx) => {
        kesaksianTotal++;
        const row = [
          no++, loc.id, loc.nama, loc.kategori, loc.lat.toFixed(8), loc.lon.toFixed(8),
          loc.level, loc.persen + '%', idx + 1, krono.waktu, krono.nama, krono.teks, formatDate()
        ];
        rows.push(row.map(escapeCSVField));
      });
    }
  });

  // Gabung headers + rows
  const csv = [headers.map(escapeCSVField), ...rows].map(r => r.join(',')).join('\n');

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `haunted_map_export_long_${formatDate().replace(/\//g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  alert(`✅ CSV (Long Format) sudah didownload!\n${allLocations.length} lokasi, ${kesaksianTotal} total kesaksian`);
}

/**
 * EXPORT 3: STATISTIK + SUMMARY REPORT
 * Cocok untuk: SDI report, dokumentasi
 */
function exportCSVStatistics() {
  const now = new Date();
  const dateStr = formatDate();

  // Hitung statistik
  const totalLokasi = allLocations.length;
  const levelCounts = {
    'mitos': 0, 'rendah': 0, 'sedang': 0, 'tinggi': 0, 'sangat-tinggi': 0
  };
  const kategoriCounts = {};
  let totalKesaksian = 0;
  let totalPersenAvg = 0;

  allLocations.forEach(loc => {
    levelCounts[loc.level]++;
    kategoriCounts[loc.kategori] = (kategoriCounts[loc.kategori] || 0) + 1;

    const baseKrono = loc.kronologi || [];
    let userKrono = [];
    try {
      userKrono = JSON.parse(localStorage.getItem('kisah_' + loc.id) || '[]');
    } catch (e) {
      userKrono = [];
    }
    totalKesaksian += baseKrono.length + userKrono.length;
    totalPersenAvg += loc.persen || 0;
  });

  const avgPersen = (totalPersenAvg / totalLokasi).toFixed(2);

  // Buat CSV statistik
  const sections = [];

  // Section 1: Summary
  sections.push('HAUNTED MAP YOGYAKARTA — STATISTIK & LAPORAN SDI');
  sections.push('='.repeat(60));
  sections.push('');
  sections.push(`Tanggal Export,${dateStr}`);
  sections.push(`Waktu,${now.toLocaleTimeString('id-ID')}`);
  sections.push('');

  // Section 2: Key Metrics
  sections.push('RINGKASAN DATA');
  sections.push('-'.repeat(40));
  sections.push(`Total Lokasi,${totalLokasi}`);
  sections.push(`Total Kesaksian,${totalKesaksian}`);
  sections.push(`Rata-rata Kesaksian/Lokasi,${(totalKesaksian / totalLokasi).toFixed(2)}`);
  sections.push(`Rata-rata Persen Kepercayaan,${avgPersen}%`);
  sections.push('');

  // Section 3: Level Distribution
  sections.push('DISTRIBUSI TINGKAT HOROR');
  sections.push('-'.repeat(40));
  sections.push('Level,Jumlah Lokasi,Persentase');
  Object.entries(levelCounts).forEach(([level, count]) => {
    const pct = ((count / totalLokasi) * 100).toFixed(1);
    sections.push(`${level},${count},${pct}%`);
  });
  sections.push('');

  // Section 4: Category Distribution
  sections.push('DISTRIBUSI KATEGORI');
  sections.push('-'.repeat(40));
  sections.push('Kategori,Jumlah Lokasi');
  Object.entries(kategoriCounts).forEach(([kategori, count]) => {
    sections.push(`${kategori},${count}`);
  });
  sections.push('');

  // Section 5: Top Horror Spots
  const topLocations = [...allLocations]
    .sort((a, b) => (b.persen || 0) - (a.persen || 0))
    .slice(0, 10);

  sections.push('TOP 10 LOKASI DENGAN TINGKAT HOROR TERTINGGI');
  sections.push('-'.repeat(60));
  sections.push('Rank,Nama Lokasi,Level,Persen,Kesaksian');
  topLocations.forEach((loc, idx) => {
    const baseKrono = loc.kronologi || [];
    let userKrono = [];
    try {
      userKrono = JSON.parse(localStorage.getItem('kisah_' + loc.id) || '[]');
    } catch (e) {
      userKrono = [];
    }
    sections.push(`${idx + 1},${loc.nama},${loc.level},${loc.persen}%,${baseKrono.length + userKrono.length}`);
  });
  sections.push('');

  sections.push('CATATAN METODOLOGI');
  sections.push('-'.repeat(60));
  sections.push('- Tingkat Horor dihitung otomatis berdasarkan jumlah kesaksian');
  sections.push('- Kesaksian terdiri dari data dasar + laporan user di aplikasi');
  sections.push('- Data disimpan di browser localStorage (non-persistent)');
  sections.push('- Format koordinat: WGS84 (EPSG:4326)');
  sections.push('');
  sections.push('© Teknik Geomatika UPN Veteran Yogyakarta 2025');

  const csv = sections.join('\n');

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `haunted_map_statistics_${formatDate().replace(/\//g, '-')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  alert(`✅ CSV Statistik sudah didownload!\n${totalLokasi} lokasi, ${totalKesaksian} total kesaksian`);
}

// ══════════════════════════════════════════════════════
//  ══ TAMBAHAN: 3D VIEW — Mapbox GL JS ══
// ══════════════════════════════════════════════════════
let map3d = null;
let is3DMode = false;
let autoRotateInterval = null;

const THEMES_3D = {
  'mist': {
    bg:'#0a0a0a', fog:'rgba(20,5,5,0.9)', buildingColor:'#1a0505',
    buildingTop:'#2d0808', roofColor:'#cc000033',
    atmosphereColor:'#200000', label:'🌫 Mist Mode'
  },
  'midnight': {
    bg:'#000000', fog:'rgba(0,0,0,0.95)', buildingColor:'#050005',
    buildingTop:'#120012', roofColor:'#33000066',
    atmosphereColor:'#100010', label:'🌑 Midnight Mode'
  },
  'paranormal': {
    bg:'#020008', fog:'rgba(5,0,20,0.9)', buildingColor:'#0a0015',
    buildingTop:'#1a0030', roofColor:'#6600cc44',
    atmosphereColor:'#050015', label:'👁 Paranormal Mode'
  }
};

let current3DTheme = 'midnight';
let current3DBuilding = 40;
let current3DOpacity = 0.9;
let current3DLocation = null;

function init3DView(){
  if(is3DMode) return;
  is3DMode = true;

  document.getElementById('map').style.display = 'none';

  let container = document.getElementById('map3d-container');
  if(!container){
    container = document.createElement('div');
    container.id = 'map3d-container';
    container.style.cssText = `position:absolute;top:56px;left:280px;right:0;bottom:0;z-index:10;`;
    document.getElementById('appScreen').appendChild(container);
  }
  container.style.display = 'block';

  if(typeof mapboxgl === 'undefined'){
    container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#040000;font-family:'Share Tech Mono',monospace;color:#cc0000;flex-direction:column;gap:1rem;font-size:0.9rem;text-align:center;padding:2rem">
      <div style="font-size:3rem">☠</div>
      <div>Mapbox GL JS tidak tersedia</div>
      <div style="font-size:0.7rem;color:#6a4a4a">Pastikan koneksi internet aktif & reload halaman</div>
      <button onclick="close3DView()" style="padding:0.5rem 1.5rem;background:#5a0000;border:1px solid #cc0000;color:#fff;font-family:inherit;cursor:pointer;border-radius:3px;margin-top:1rem">Kembali ke 2D</button>
    </div>`;
    return;
  }

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const center = current3DLocation
    ? [current3DLocation.lon, current3DLocation.lat]
    : [110.3647, -7.8013];

  map3d = new mapboxgl.Map({
    container: 'map3d-container',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: center,
    zoom: current3DLocation ? 17 : 14,
    pitch: 60,
    bearing: -17.6,
    antialias: true
  });

  map3d.on('load', ()=>{
    add3DBuildings();
    addGeoJSON3D();
    addHauntedMarkers3D();
    apply3DTheme(current3DTheme);
    if(current3DLocation) focusOn3DLocation(current3DLocation);
  });

  map3d.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
}

function add3DBuildings(){
  if(!map3d) return;
  const layers = map3d.getStyle().layers;
  let labelLayerId;
  for(const layer of layers){
    if(layer.type === 'symbol' && layer.layout['text-field']){
      labelLayerId = layer.id; break;
    }
  }
  if(map3d.getLayer('3d-buildings')) map3d.removeLayer('3d-buildings');
  map3d.addLayer({
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 14,
    paint: {
      'fill-extrusion-color': [
        'interpolate', ['linear'], ['get', 'height'],
        0, '#0d0005', 10, '#1a0008', 30, '#2a000d', 80, '#3d0015'
      ],
      'fill-extrusion-height': ['*', ['get', 'height'], current3DBuilding / 40],
      'fill-extrusion-base': ['get', 'min_height'],
      'fill-extrusion-opacity': current3DOpacity
    }
  }, labelLayerId);
}

function addGeoJSON3D(){
  if(!map3d) return;
  fetch('GeoJSON.geojson')
    .then(r=>r.json())
    .then(data=>{
      if(map3d.getSource('geojson-haunted')) return;
      map3d.addSource('geojson-haunted', {type:'geojson', data});
      map3d.addLayer({
        id: 'geojson-3d-extrusion',
        type: 'fill-extrusion',
        source: 'geojson-haunted',
        paint: {
          'fill-extrusion-color': '#cc0000',
          'fill-extrusion-height': current3DBuilding * 2.5,
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.72
        }
      });
      map3d.addLayer({
        id: 'geojson-3d-outline',
        type: 'line',
        source: 'geojson-haunted',
        paint: {
          'line-color': '#ff2222',
          'line-width': 2,
          'line-opacity': 0.9
        }
      });
    }).catch(()=>{});
}

function addHauntedMarkers3D(){
  if(!map3d) return;
  allLocations.forEach(loc=>{
    const el = document.createElement('div');
    el.style.cssText = `
      width:24px;height:24px;background:radial-gradient(circle,${
        loc.level==='sangat-tinggi'?'#cc00cc':'#cc0000'
      },#330000);
      border-radius:50%;border:2px solid rgba(255,255,255,0.5);
      box-shadow:0 0 16px ${loc.level==='sangat-tinggi'?'#cc00cc':'#cc0000'},0 0 32px rgba(180,0,0,0.5);
      cursor:pointer;`;
    el.title = loc.nama;
    el.addEventListener('click', ()=>{
      map3d.flyTo({center:[loc.lon,loc.lat],zoom:17,pitch:65,bearing:Math.random()*360,speed:1.2});
      openDetail(loc.id);
    });
    new mapboxgl.Marker({element:el}).setLngLat([loc.lon,loc.lat]).addTo(map3d);
  });
}

function apply3DTheme(theme){
  current3DTheme = theme;
  const t = THEMES_3D[theme];
  if(!map3d || !map3d.isStyleLoaded()) return;
  if(map3d.getLayer('3d-buildings')){
    map3d.setPaintProperty('3d-buildings','fill-extrusion-color',
      theme==='paranormal'
        ?['interpolate',['linear'],['get','height'],0,'#0a0015',30,'#1a0030',80,'#330060']
        :theme==='mist'
        ?['interpolate',['linear'],['get','height'],0,'#0d0005',30,'#1a000a',80,'#2d0015']
        :['interpolate',['linear'],['get','height'],0,'#050005',30,'#100010',80,'#1a001a']
    );
  }
  try{
    map3d.setFog({
      color: t.atmosphereColor,
      'high-color': theme==='paranormal'?'#1a0040':theme==='mist'?'#1a0008':'#050005',
      'horizon-blend': theme==='mist'?0.05:0.02,
      'space-color': '#000000',
      'star-intensity': 0.6
    });
  }catch(e){}
  if(map3d.getLayer('geojson-3d-extrusion')){
    const colors = {mist:'#cc0000',midnight:'#aa0000',paranormal:'#6600cc'};
    map3d.setPaintProperty('geojson-3d-extrusion','fill-extrusion-color',colors[theme]);
  }
  document.querySelectorAll('.theme-3d-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.theme===theme);
  });
}

function update3DHeight(val){
  current3DBuilding = parseFloat(val);
  document.getElementById('heightVal').textContent = val + 'x';
  if(!map3d||!map3d.isStyleLoaded()) return;
  if(map3d.getLayer('3d-buildings')){
    map3d.setPaintProperty('3d-buildings','fill-extrusion-height',
      ['*',['get','height'],current3DBuilding/40]);
  }
  if(map3d.getLayer('geojson-3d-extrusion')){
    map3d.setPaintProperty('geojson-3d-extrusion','fill-extrusion-height',current3DBuilding*2.5);
  }
}

function update3DOpacity(val){
  current3DOpacity = parseFloat(val);
  document.getElementById('opacityVal').textContent = Math.round(val*100)+'%';
  if(!map3d||!map3d.isStyleLoaded()) return;
  if(map3d.getLayer('3d-buildings')){
    map3d.setPaintProperty('3d-buildings','fill-extrusion-opacity',current3DOpacity);
  }
}

function toggle3DRotation(checkbox){
  if(checkbox.checked){
    let bearing = map3d ? map3d.getBearing() : 0;
    autoRotateInterval = setInterval(()=>{
      bearing += 0.3;
      if(map3d) map3d.setBearing(bearing);
    }, 50);
  } else {
    if(autoRotateInterval){ clearInterval(autoRotateInterval); autoRotateInterval=null; }
  }
}

function reset3DView(){
  if(!map3d) return;
  const center = current3DLocation
    ? [current3DLocation.lon, current3DLocation.lat]
    : [110.3647, -7.8013];
  map3d.flyTo({center, zoom:current3DLocation?17:14, pitch:60, bearing:-17.6, speed:1.5});
  document.getElementById('rotateToggle').checked = false;
  toggle3DRotation({checked:false});
}

function focusOn3DLocation(loc){
  if(!map3d) return;
  setTimeout(()=>{
    map3d.flyTo({
      center:[loc.lon, loc.lat],
      zoom:17, pitch:65, bearing:Math.random()*360-180,
      speed:1.2, curve:1.4
    });
  }, 800);
}

function close3DView(){
  is3DMode = false;
  if(autoRotateInterval){ clearInterval(autoRotateInterval); autoRotateInterval=null; }
  const container = document.getElementById('map3d-container');
  if(container) container.style.display = 'none';
  document.getElementById('map').style.display = 'block';
  if(map) setTimeout(()=>map.invalidateSize(), 100);
  switchSbTab('search', document.getElementById('stb-search'));
}

function open3DView(locId){
  if(locId){
    const loc = allLocations.find(l=>l.id===locId);
    if(loc) current3DLocation = {lat:loc.lat, lon:loc.lon};
  } else {
    current3DLocation = null;
  }
  switchSbTab('3d', document.getElementById('stb-3d'));
  init3DView();
}
// ══ END TAMBAHAN 3D & DATA ══

// ── SIDEBAR LOCATION LIST ─────────────────────────────
const LEVEL_ORDER = { 'sangat-tinggi': 4, 'tinggi': 3, 'sedang': 2, 'rendah': 1, 'mitos': 0 };

function renderLocationList(filter=''){
  const box = document.getElementById('sbLocationList');
  if(!box) return;
  const q = filter.trim().toLowerCase();
  const sorted = [...allLocations]
    .filter(l => !q || l.nama.toLowerCase().includes(q))
    .sort((a,b)=>{
      const ld = (LEVEL_ORDER[b.level]||0) - (LEVEL_ORDER[a.level]||0);
      if(ld!==0) return ld;
      return (b.persen||0)-(a.persen||0);
    });

  box.innerHTML='';
  sorted.forEach((loc, i)=>{
    const item = document.createElement('div');
    item.className='loclist-item';
    item.innerHTML=`
      <span class="loclist-rank">${String(i+1).padStart(2,'0')}</span>
      <span class="loclist-dot ${loc.level}"></span>
      <span class="loclist-name" title="${loc.nama}">${loc.nama}</span>
      <span class="loclist-pct">${loc.persen||'?'}%</span>
    `;
    item.onclick=()=>{
      map.flyTo([loc.lat,loc.lon],17);
      const idx=allLocations.indexOf(loc);
      if(markers[idx]) markers[idx].openPopup();
      openDetail(loc.id);
    };
    box.appendChild(item);
  });
}

function filterLocationList(q){
  renderLocationList(q);
}

// ── LAYER SWITCHER (floatingFilter) ──────────────────
function switchLayer(id, btn){
  const layers = window._mapLayers;
  if(!layers || !map) return;
  if(window._activeLayer === id) return;
  Object.values(layers).forEach(l=>{ if(map.hasLayer(l)) map.removeLayer(l); });
  layers[id].addTo(map);
  window._activeLayer = id;
  document.querySelectorAll('#floatingFilter .layer-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
