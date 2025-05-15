// Mobile Menu Toggle
function toggleMenuIcon() {
    const icon = document.getElementById('menu-icon');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-inner img');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

// Swipe Support for Carousel
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        moveSlide(1); // Swipe left, next slide
    } else if (touchEndX - touchStartX > 50) {
        moveSlide(-1); // Swipe right, previous slide
    }
});

// Modal Functionality
const articles = [
    {
        image: 'assets/img/lookbook1.jpeg',
        title: '🎓Kelulusan Taruna STEMBA Tahun Ajaran 2024/2025',
        content: `
                    <p class="mb-4">Setelah menempuh perjalanan panjang selama tiga tahun, para taruna akhirnya sampai pada titik akhir dari fase pendidikan menengah kejuruan mereka di SMKN 7 Semarang. Penuh perjuangan, kerja keras, tawa, bahkan air mata, semua momen itu kini menjadi kenangan indah yang akan terus terpatri dalam hati setiap lulusan. 🙌</p>
<br>
<p class="mb-4">📘 Perjalanan di STEMBA bukan hanya soal pelajaran di dalam kelas, tapi juga tentang membentuk karakter, membangun semangat kebersamaan, dan menemukan jati diri. Dari proyek-proyek kreatif, praktik industri, hingga pengalaman organisasi dan lomba-lomba yang menantang, setiap taruna telah mengasah potensi terbaiknya. Dukungan dari para guru yang luar biasa, orang tua yang selalu mendoakan, serta teman seperjuangan yang senantiasa hadir, menjadi kekuatan utama di balik kelulusan ini. 🤝</p>
<br>
<p class="mb-4">🚀 Kini, langkah baru siap dimulai. Bagi yang melanjutkan pendidikan, semoga terus semangat belajar dan mengembangkan diri. Bagi yang langsung terjun ke dunia kerja, semoga ilmu yang dibawa dari STEMBA menjadi modal berharga untuk berkontribusi nyata. Dan bagi semua lulusan, jadilah pribadi yang rendah hati, tangguh, serta membawa nilai-nilai positif di mana pun berada. Dunia menanti karya kalian! 🌍✨</p>
<br>
<p class="mb-4">🎉 Selamat dan sukses untuk Taruna STEMBA Angkatan 2024/2025! Ini bukan akhir, melainkan awal dari petualangan yang lebih besar. Teruslah melangkah dengan keyakinan, dan jangan lupa bahwa kalian adalah bagian dari keluarga besar SMKN 7 Semarang yang selalu bangga akan pencapaian kalian. 💙🦅</p>

                `
    },
    {
        image: 'assets/img/lookbook2.jpeg',
        title: 'Science Fair 2024',
        content: `
                    <p class="mb-4">The Science Fair 2024 was a highlight of the academic year at SMKN 7 Semarang, where students showcased their innovative projects in technology and engineering. From robotics to renewable energy models, the fair demonstrated the technical prowess and creativity of our students.</p>
                    <p class="mb-4">Judges from local industries and universities evaluated the projects, providing valuable feedback and awarding top prizes in categories such as Best Innovation and Most Practical Application. The event also featured workshops led by industry professionals, offering insights into the latest technological advancements.</p>
                    <p>The Science Fair not only encouraged scientific exploration but also bridged the gap between classroom learning and real-world applications, preparing students for future careers in STEM fields.</p>
                `
    },
    {
        image: 'assets/img/lookbook3.jpg',
        title: 'Career Day 2024',
        content: `
                    <p class="mb-4">Career Day 2024 at SMKN 7 Semarang brought together students and industry professionals for a day of inspiration and guidance. Representatives from leading companies in IT, construction, automotive, and electronics shared their expertise through talks and interactive sessions.</p>
                    <p class="mb-4">Students had the opportunity to participate in mock interviews, career counseling, and networking sessions, gaining insights into the skills and qualifications needed for various professions. The event also included a job fair where local companies offered internships and apprenticeships to outstanding students.</p>
                    <p>Career Day underscored SMKN 7 Semarang's commitment to preparing students for the workforce, equipping them with the knowledge and connections to succeed in their chosen fields.</p>
                `
    }
];

function openModal(index) {
    const modal = document.getElementById('lookbook-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalImage.src = articles[index].image;
    modalTitle.textContent = articles[index].title;
    modalContent.innerHTML = articles[index].content;

    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('lookbook-modal');
    modal.classList.add('hidden');
}

// Close modal when clicking outside the modal content
document.getElementById('lookbook-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('lookbook-modal')) {
        closeModal();
    }
});