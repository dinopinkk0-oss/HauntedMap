// ══════════════════════════════════════════════════════
//  WEBGIS HOROR — script.js  (UPGRADED)
//  Mapbox token: pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ
// ══════════════════════════════════════════════════════

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';
const OSRM = 'https://router.project-osrm.org/route/v1';

// ── DATA LOKASI (dari Excel Data_Haunted_Map) ─────────
const LOCATIONS = [
  {
    id:1,
    nama:'Jembatan Gondolayu',
    lat:-7.781892154578901,
    lon:110.37080479118661,
    link_gmaps:'https://maps.app.goo.gl/oVNLdkTeAEkdDUjf6',
    level:'tinggi',
    persen:78,
    deskripsi:'Jembatan Gondolayu dikenal sebagai salah satu lokasi paling angker di Jogja, terutama pada malam hari. Banyak pengendara mengaku melihat sosok perempuan berdiri di pinggir jembatan lalu menghilang begitu saja. Ada juga cerita tentang suara tangisan misterius yang terdengar dari bawah jembatan saat suasana sepi. Karena sering dikaitkan dengan kecelakaan dan kejadian mistis, tempat ini membuat banyak orang memilih menghindar lewat tengah malam.',
    kronologi:[
      {waktu:'21.00', nama:'Pak Hendra (Pengendara Motor)', teks:'Saat melewati jembatan sendirian, Pak Hendra melihat sosok perempuan berbaju putih berdiri di tepi jembatan. Ketika ia mendekati, sosok itu menghilang tanpa jejak. Ia segera memacu motornya dan tidak berani menoleh ke belakang.'},
      {waktu:'23.15', nama:'Bu Sari (Warga Sekitar)', teks:'Bu Sari yang tinggal dekat jembatan bercerita bahwa setiap malam tertentu, terutama malam Jumat, terdengar suara tangisan perempuan dari kolong jembatan. Ia sudah tinggal di sana 20 tahun dan sudah hafal dengan suara itu.'},
      {waktu:'01.30', nama:'Rombongan Mahasiswa', teks:'Sekelompok mahasiswa yang melewati jembatan dini hari mengaku motor mereka tiba-tiba mati tepat di tengah jembatan. Salah satu dari mereka merasakan bahu kanannya seperti diduduki sesuatu yang berat, namun tidak ada siapapun di sana.'},
      {waktu:'Subuh', nama:'Tukang Becak Langganan', teks:'Seorang tukang becak tua yang biasa mangkal di dekat jembatan menolak melintas setelah pukul 12 malam. Ia mengaku pernah melihat bayangan hitam berjalan di atas railing jembatan lalu melompat ke bawah, namun tidak ada suara air atau benturan sama sekali.'},
    ],
    gambar:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    video:'https://www.youtube.com/embed/5mUjwKME00g',
    videoNote:'🎙 Liputan: Kisah Mistis Jembatan Gondolayu Yogyakarta'
  },
  {
    id:2,
    nama:'Rumah Kanthil',
    lat:-7.8258117923782,
    lon:110.39784707584876,
    link_gmaps:'https://maps.app.goo.gl/zfG1MqGwFt3KotxE8',
    level:'sangat-tinggi',
    persen:93,
    deskripsi:'Rumah Kanthil adalah rumah tua yang terkenal karena kisah-kisah menyeramkan di dalamnya. Konon rumah ini pernah menjadi lokasi berbagai kejadian tragis sehingga meninggalkan aura yang sangat mencekam. Warga sekitar sering mendengar suara langkah kaki, pintu terbuka sendiri, hingga penampakan sosok perempuan berbaju putih di area rumah. Meski terlihat kosong dan tak terurus, banyak orang percaya rumah itu "tidak benar-benar kosong".',
    kronologi:[
      {waktu:'Siang Hari', nama:'Anak-anak Kampung', teks:'Beberapa anak yang iseng bermain di halaman Rumah Kanthil mengaku mendengar suara orang memanggil nama mereka dari dalam rumah. Padahal mereka tahu betul rumah itu kosong. Mereka lari terbirit-birit dan tidak ada yang berani kembali.'},
      {waktu:'20.00', nama:'Pak Joko (Tetangga Depan)', teks:'Pak Joko bercerita bahwa setiap malam ia sering melihat cahaya lilin bergerak di balik jendela rumah tersebut. Ia sudah melaporkan ke RT tapi tidak ada yang mau datang memeriksa setelah sore hari.'},
      {waktu:'23.00', nama:'Komunitas Ghost Hunter Jogja', teks:'Saat penelusuran malam, tim merekam suara langkah kaki di lantai atas yang konsisten terdengar selama 20 menit. EMF reader mereka melonjak drastis di satu sudut kamar, dan salah satu anggota tim mendadak pingsan tanpa sebab yang jelas.'},
      {waktu:'Dini Hari', nama:'Bu Maryati (Warga RT 03)', teks:'Bu Maryati yang rumahnya persis di samping mengaku tidak bisa tidur selama bertahun-tahun. Setiap dini hari antara jam 2-3, ia mendengar suara perempuan menangis dengan keras dari arah rumah itu, lalu berhenti tiba-tiba seolah dicekik.'},
    ],
    gambar:'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=700&q=80',
    video:'https://www.youtube.com/embed/rdXLa_-xPK8',
    videoNote:'🎙 Liputan: Teror di Rumah Kanthil — Yogyakarta'
  },
  {
    id:3,
    nama:'Gunung Merapi',
    lat:-7.536461039499859,
    lon:110.44572309158302,
    link_gmaps:'https://maps.app.goo.gl/GL7u9NzXdgq6V4AV7',
    level:'sangat-tinggi',
    persen:96,
    deskripsi:'Selain terkenal karena letusannya, Gunung Merapi juga dipenuhi cerita mistis yang dipercaya masyarakat sekitar. Banyak pendaki mengaku mendengar suara gamelan, melihat pasar gaib, atau bertemu sosok misterius di jalur pendakian. Masyarakat Jawa percaya Merapi memiliki kerajaan gaib yang hidup berdampingan dengan dunia manusia. Aura sunyi dan kabut tebal di malam hari membuat gunung ini terasa semakin menyeramkan sekaligus penuh misteri.',
    kronologi:[
      {waktu:'Sore Menjelang Malam', nama:'Rombongan Pendaki (2019)', teks:'Sebuah kelompok pendaki tiba-tiba mencium aroma dupa dan bunga melati yang sangat kuat di tengah jalur pendakian. Mereka kemudian melihat cahaya-cahaya kecil berkelip di antara pohon yang ternyata tidak bisa difoto — semua foto hasilnya kosong.'},
      {waktu:'Tengah Malam', nama:'Juru Kunci Mbah Ponimin', teks:'Juru kunci gunung Merapi bercerita bahwa di beberapa titik tertentu, pendaki dilarang keras berdiri atau kencing sembarangan. Mbah Ponimin sendiri mengaku sering mendapat "teguran" dari penghuni gaib gunung setiap kali ada pendaki yang berlaku tidak sopan.'},
      {waktu:'02.00 Dini Hari', nama:'Wahyu (Pendaki Solo)', teks:'Wahyu bercerita bahwa saat mendaki sendirian, ia mendengar suara gamelan Jawa yang sangat jelas dari arah puncak. Ketika ia mendekati sumbernya, suara itu berpindah arah. Ia juga melihat bayangan orang banyak di kabut yang seperti sedang berjalan dalam prosesi.'},
      {waktu:'Setelah Erupsi 2010', nama:'Korban Selamat dan Warga Desa', teks:'Banyak korban selamat erupsi 2010 mengaku melihat sosok kakek tua berpakaian putih yang memimpin mereka ke tempat aman sebelum lahar datang. Sosok itu menghilang begitu mereka selamat. Dipercaya sebagai penguasa gaib Merapi yang melindungi warganya.'},
    ],
    gambar:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80',
    video:'https://www.youtube.com/embed/8Kf32u_SPCE',
    videoNote:'🎙 Liputan: Misteri dan Legenda Gaib Gunung Merapi'
  },
  {
    id:4,
    nama:'Bunderan UGM',
    lat:-7.774933864668422,
    lon:110.37592296139586,
    link_gmaps:'https://maps.app.goo.gl/YwiFEqmZ3nwvXMMNA',
    level:'sedang',
    persen:54,
    deskripsi:'Bundaran UGM sudah lama menjadi urban legend di kalangan mahasiswa Yogyakarta. Tempat ini terkenal dengan mitos larangan menyanyikan lagu tertentu pada malam hari karena dipercaya dapat mengundang sosok gaib. Beberapa mahasiswa juga mengaku melihat bayangan hitam melintas atau mendengar suara aneh saat melewati area tersebut sendirian. Suasana kampus yang sepi di malam hari membuat cerita-cerita horor di Bundaran UGM terasa semakin nyata.',
    kronologi:[
      {waktu:'22.00', nama:'Mahasiswa Teknik UGM (Anonim)', teks:'Seorang mahasiswa yang pulang malam dari perpustakaan mengaku mendengar namanya dipanggil dari arah bundaran. Saat ia berbalik tidak ada siapapun. Kejadian itu berulang 3 kali, dan di panggilan ketiga suaranya terdengar seperti persis suara ibunya.'},
      {waktu:'23.30', nama:'Kelompok Mahasiswa Baru (Malam Ospek)', teks:'Saat malam ospek, sekelompok mahasiswa baru diminta seniornya untuk berdiri di tengah bundaran dan menyanyikan lagu daerah. Ketika lagu hampir selesai, semua lilin di sekitar mereka mati serentak meski tidak ada angin, dan mereka mendengar tawa perempuan tua dari segala penjuru.'},
      {waktu:'01.00', nama:'Satpam Kampus UGM', teks:'Pak Satpam bercerita bahwa ia sudah dipesan senior-seniornya untuk tidak pernah berjalan sendirian memutar bundaran lebih dari 3 kali di malam hari. Ia sendiri pernah memergoki rekan jaga yang berdiri terpaku menatap bundaran selama 30 menit dan tidak ingat apapun setelahnya.'},
    ],
    gambar:'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80',
    video:'https://www.youtube.com/embed/LOxfrZYwaRo',
    videoNote:'🎙 Liputan: Mitos dan Urban Legend Kampus UGM Malam Hari'
  },
  {
    id:5,
    nama:'Panggung Krapyak / Kandang Menjangan',
    lat:-7.826870096455625,
    lon:110.36056412188236,
    link_gmaps:'https://maps.app.goo.gl/jmMcXSXx8tNsRsTb8',
    level:'tinggi',
    persen:71,
    deskripsi:'Bangunan tua peninggalan Keraton ini dikenal memiliki suasana yang sunyi dan menyeramkan. Konon dahulu tempat ini digunakan sebagai lokasi berburu keluarga kerajaan, namun kini sering dikaitkan dengan penampakan makhluk halus. Banyak orang mengaku melihat sosok perempuan misterius hingga mendengar suara langkah kaki tanpa wujud. Karena dipenuhi nuansa kuno dan minim penerangan, Kandang Menjangan menjadi salah satu tempat yang paling membuat bulu kuduk merinding di Jogja.',
    kronologi:[
      {waktu:'Sore Hari', nama:'Penjaga Situs (Mas Agus)', teks:'Mas Agus yang menjaga situs Panggung Krapyak bercerita bahwa ia sering mendengar suara derap kaki kuda di malam hari meskipun tidak ada kuda di sana. Suara itu biasanya disertai dengan aroma rumput dan tanah basah yang tiba-tiba menyengat.'},
      {waktu:'21.00', nama:'Pasangan Muda yang Sedang Foto-foto', teks:'Sebuah pasangan yang iseng foto selfie di depan Panggung Krapyak terkejut ketika melihat di foto mereka ada sosok perempuan berdiri tepat di belakang mereka. Mereka sudah mengecek berkali-kali dan tidak ada orang lain di sana saat itu.'},
      {waktu:'Tengah Malam', nama:'Warga Pengajian (Bu Eni)', teks:'Bu Eni yang pulang pengajian sendirian melewati area Krapyak mengaku berjalan lebih cepat karena merasakan ada yang mengikutinya dari belakang. Sesampainya di rumah, ia mendapati bekas telapak tangan di bahunya yang membekas seperti memar, padahal tidak ada yang menyentuhnya.'},
    ],
    gambar:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&q=80',
    video:'https://www.youtube.com/embed/LOxfrZYwaRo',
    videoNote:'🎙 Liputan: Angkernya Panggung Krapyak Keraton Yogyakarta'
  },
  {
    id:6,
    nama:'Balai Yasa Yogyakarta',
    lat:-7.787115,
    lon:110.383996,
    link_gmaps:'https://maps.app.goo.gl/GcGp59Ph3KUfAU8s9',
    level:'tinggi',
    persen:82,
    deskripsi:'Balai Yasa menyimpan peninggalan bekas kecelakaan kereta, salah satunya kecelakaan kereta Bintaro. Selain itu bangunannya merupakan bangunan kuno peninggalan zaman penjajahan Belanda. Cukup banyak orang yang menceritakan pengalaman mistis horornya ketika berkunjung atau melewati tempat itu, seperti penampakan wajah hancur, penampakan tubuh besar dan gondrong, dan lain-lain.',
    kronologi:[
      {waktu:'Shift Malam (22.00)', nama:'Teknisi Kereta (Pak Bambang)', teks:'Pak Bambang yang bertugas shift malam mengaku sering melihat bayangan pria bertubuh besar dan berambut gondrong berdiri di pojok bengkel. Setiap ia mencoba mendekati, bayangan itu bergeser ke tempat lain. Rekan-rekan kerjanya juga pernah mengalami hal serupa.'},
      {waktu:'00.30', nama:'Petugas Keamanan (Pak Slamet)', teks:'Pak Slamet bercerita tentang malam ketika ia melakukan patrol rutin dan tiba-tiba mencium bau darah yang sangat menyengat di dekat area penyimpanan gerbong tua. Ia kemudian melihat bekas tangan berdarah di kaca gerbong yang menurutnya selalu muncul kembali meski sudah dibersihkan.'},
      {waktu:'Dini Hari', nama:'Mahasiswa Penelitian (Kelompok Perkeretaapian)', teks:'Sebuah kelompok mahasiswa yang meneliti sejarah kereta tua mengaku kamera mereka merekam gambar wajah di jendela gerbong yang sudah tidak digunakan 30 tahun. Wajah itu terlihat seperti dalam kondisi terluka parah. Rekaman itu viral di media sosial kampus mereka.'},
    ],
    gambar:'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&q=80',
    video:'https://www.youtube.com/embed/FSp5J0OPajs',
    videoNote:'🎙 Liputan: Misteri Balai Yasa dan Kereta-kereta Berhantu Yogyakarta'
  }
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

(function makeGhosts(){
  const c = document.getElementById('ghostContainer');
  if(!c) return;

  const ghosts = ['🕷','🦇','🦇','🕸','🦇','☠','🦇','👁'];

  const positions = [
    {x:10, y:20},
    {x:25, y:70},
    {x:40, y:15},
    {x:55, y:80},
    {x:70, y:25},
    {x:85, y:60},
    {x:15, y:50},
    {x:90, y:10},
  ];

  ghosts.forEach((g,i)=>{
    const el = document.createElement('div');
    el.className = 'ghost';

    const x = positions[i].x;
    const y = positions[i].y;

    const dur   = 4 + Math.random()*10;
    const delay = Math.random()*-10;
    const tx = (Math.random()-0.5)*80;
    const ty = -25 - Math.random()*50;

    el.style.cssText =
      `left:${x}%;
       top:${y}%;
       --gd:${dur}s;
       --gdelay:${delay}s;
       --gx:${tx}px;
       --gy:${ty}px;
       font-size:${1+Math.random()*3}rem`;

    el.textContent = g;
    c.appendChild(el);
  });
})();

(function makeSkulls(){
  const c = document.getElementById('skullContainer');
  if(!c) return;
  for(let i=0;i<18;i++){
    const el = document.createElement('div');
    el.className = 'skull-p';
    el.textContent = ['🩸','👁','🩸','☠'][Math.floor(Math.random()*6)];
    const dur   = 7 + Math.random()*14;
    const delay = Math.random()*18;
    el.style.cssText = `left:${Math.random()*100}%;bottom:${-10+Math.random()*10}%;--sd:${dur}s;--sdelay:${delay}s;font-size:${0.6+Math.random()*1.4}rem`;
    c.appendChild(el);
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

function enterMap(){
  const flash = document.getElementById('scareFlash');
  flash.classList.add('active');
  playScream();

  setTimeout(()=>{
    const overlay = document.getElementById('transOverlay');
    overlay.classList.add('fade-in');
  }, 300);

  setTimeout(()=>{
    document.getElementById('landing').style.display='none';
    document.getElementById('appScreen').style.display='block';

    if(!mapInitialized){
      initMap();
      mapInitialized=true;
    }

    // Fix map hitam — paksa Leaflet recalculate ukuran setelah elemen visible
    setTimeout(()=>{ if(map) map.invalidateSize(); }, 250);
    setTimeout(()=>{ if(map) map.invalidateSize(); }, 700);

    const overlay = document.getElementById('transOverlay');
    overlay.style.transition='opacity 0.8s ease';
    overlay.style.opacity='0';
    setTimeout(()=>{ overlay.classList.remove('fade-in'); overlay.style.opacity=''; }, 900);

    flash.classList.remove('active');
  }, 700);
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

  // ── Layer Batas Administrasi DIY (GeoJSON) ───
  fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/daerah-istimewa-yogyakarta.geojson')
    .then(r => r.json())
    .then(data => {
      window._layerAdmin = L.geoJSON(data, {
        style: {
          color: '#ff4444',
          weight: 1.5,
          opacity: 0.7,
          fillOpacity: 0.05,
          fillColor: '#ff0000'
        }
      });
    })
    .catch(()=> console.warn('Layer admin gagal dimuat'));

  // ── Custom Layer Switcher ──────────────────────────
  const LayerSwitcher = L.Control.extend({
    options:{ position:'topright' },
    onAdd: function(){
      const wrap = L.DomUtil.create('div','layer-switcher-wrap');
      L.DomEvent.disableClickPropagation(wrap);

      const layers = [
        { id:'dark',     label:'🌑 Horor',    layer: layerDark },
        { id:'satellite',label:'🛰 Satelit',  layer: layerSatellite },
        { id:'street',   label:'🗺 Jalan',    layer: layerStreet },
      ];

      let active = 'dark';

      layers.forEach(l=>{
        const btn = L.DomUtil.create('button','layer-btn', wrap);
        btn.id = 'lbtn-'+l.id;
        btn.textContent = l.label;
        if(l.id === active) btn.classList.add('active');

        L.DomEvent.on(btn,'click',()=>{
          if(active === l.id) return;
          // remove old
          layers.forEach(x=>{ if(map.hasLayer(x.layer)) map.removeLayer(x.layer); });
          l.layer.addTo(map);
          active = l.id;
          wrap.querySelectorAll('.layer-btn').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      return wrap;
    }
  });

  new LayerSwitcher().addTo(map);
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

  renderMarkers(allLocations);
  setTimeout(()=>map.invalidateSize(), 300);
  setTimeout(()=>map.invalidateSize(), 800);
}

// ── MARKER CONFIG ─────────────────────────────────────
const COLORS={
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
  const sz=big?22:15, wrap=big?sz+14:sz+10;
  const pulse=big?`<div style="position:absolute;inset:-7px;border-radius:50%;border:2px solid ${color};opacity:0.5;animation:mpulse 1.4s ease-out infinite;"></div><div style="position:absolute;inset:-14px;border-radius:50%;border:1px solid ${color};opacity:0.2;animation:mpulse 1.4s ease-out infinite 0.4s;"></div>`:'';
  return L.divIcon({
    className:'',
    iconSize:[wrap,wrap], iconAnchor:[wrap/2,wrap/2],
    html:`<style>@keyframes mpulse{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.8);opacity:0}}</style>
    <div style="position:relative;width:${sz}px;height:${sz}px;background:${color};border-radius:50%;border:2px solid rgba(255,255,255,0.6);box-shadow:0 0 14px ${color},0 0 28px ${color}55,0 0 42px ${color}22;cursor:pointer;">
      ${pulse}${big?'<div style="position:absolute;top:-5px;left:-4px;font-size:16px;filter:drop-shadow(0 0 4px red);">💀</div>':''}
    </div>`
  });
}

// ── RENDER MARKERS ────────────────────────────────────
function renderMarkers(locs){
  markers.forEach(m=>map.removeLayer(m));
  markers=[];

  locs.forEach(loc=>{
    const m=L.marker([loc.lat,loc.lon],{icon:markerIcon(loc)}).addTo(map);

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

    markers.push(m);
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
  const lvls=[...document.querySelectorAll('.filter-checks input')]
    .filter(i=>['rendah','sedang','tinggi','sangat-tinggi'].includes(i.value)&&i.checked).map(i=>i.value);
  const cats=[...document.querySelectorAll('.filter-checks input')]
    .filter(i=>['penampakan','suara','bau','kejadian','urban-legend'].includes(i.value)&&i.checked).map(i=>i.value);
  renderMarkers(allLocations.filter(l=>lvls.includes(l.level)&&cats.includes(l.kategori)));
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
  document.getElementById('detailImg').src         =loc.gambar;
  document.getElementById('detailDesc').textContent =loc.deskripsi;
  document.getElementById('detailMapsLink').href    =loc.link_gmaps;
  document.getElementById('detailVideo').src        =loc.video;
  document.getElementById('videoNote').textContent  =loc.videoNote;

  document.getElementById('detailKronologi').innerHTML=(loc.kronologi||[]).map((k,i)=>
    `<div class="krono-item">
      <div class="krono-dot"><span class="krono-num">${i+1}</span></div>
      <div class="krono-content">
        <div class="krono-time">${k.waktu}</div>
        <div class="krono-name">— ${k.nama}</div>
        <div class="krono-desc">${k.teks}</div>
      </div>
    </div>`
  ).join('');

  const ratings=(() => { try { return JSON.parse(localStorage.getItem(`rating_${id}`)||'[]'); } catch(e){ return []; } })();
  const avg=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1):'—';
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach((t,i)=>t.classList.toggle('active',i===0));
  document.querySelectorAll('.mtab-content').forEach((c,i)=>c.classList.toggle('active',i===0));
  document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal(e){if(e.target===document.getElementById('detailModal'))closeDetailModalBtn();}
function closeDetailModalBtn(){
  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('detailVideo').src='';
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
  // Load komentar
  loadKomentar(id);
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
  const sb=document.getElementById('sidebar');
  sb.classList.toggle('collapsed');
  document.getElementById('sidebarToggleIcon').textContent=sb.classList.contains('collapsed')?'▶':'◀';
  setTimeout(()=>map&&map.invalidateSize(),320);
}

// ── SIDEBAR TABS ──────────────────────────────────────
function switchSbTab(id, btn){
  document.querySelectorAll('.sb-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.sb-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('sbp-'+id).classList.add('active');
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
function toggleAdminLayer(checkbox){
  if(!window._layerAdmin) return;
  if(checkbox.checked){
    window._layerAdmin.addTo(map);
  } else {
    map.removeLayer(window._layerAdmin);
  }
}

// ── KOMENTAR ──────────────────────────────────────────
function loadKomentar(id){
  const list = document.getElementById('komentarList');
  list.innerHTML = '';
  const data = JSON.parse(localStorage.getItem('kom_'+id)||'[]');
  if(!data.length){
    list.innerHTML = '<p style="font-family:var(--f-mono);font-size:0.58rem;color:var(--dim);text-align:center">Belum ada komentar. Jadilah yang pertama!</p>';
    return;
  }
  data.forEach(k=>{
    const el = document.createElement('div');
    el.style.cssText = 'padding:0.35rem 0.5rem;background:rgba(255,255,255,0.03);border-left:2px solid rgba(180,0,0,0.4);border-radius:0 2px 2px 0;font-family:var(--f-body);font-size:0.78rem;color:var(--white)';
    el.innerHTML = `<span style="font-family:var(--f-mono);font-size:0.55rem;color:var(--dim)">${k.waktu}</span><br>${k.teks}`;
    list.appendChild(el);
  });
}

function submitKomentar(){
  const input = document.getElementById('komentarInput');
  const teks = input.value.trim();
  if(!teks || !selectedLocId) return;
  const key = 'kom_'+selectedLocId;
  const data = JSON.parse(localStorage.getItem(key)||'[]');
  const now = new Date();
  data.push({
    teks,
    waktu: now.toLocaleDateString('id-ID')+' '+now.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'})
  });
  localStorage.setItem(key, JSON.stringify(data));
  input.value = '';
  loadKomentar(selectedLocId);
}