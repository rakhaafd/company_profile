function toggleMenu() {
    const menuContainer = document.getElementById('mobile-menu-container');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menuContainer.classList.toggle('hidden');
    menu.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// Close menu when clicking outside
document.getElementById('mobile-menu-container').addEventListener('click', (event) => {
    if (event.target === document.getElementById('mobile-menu-container')) {
        toggleMenu();
    }
});

// Prevent clicks inside menu from closing it
document.getElementById('mobile-menu').addEventListener('click', (event) => {
    event.stopPropagation();
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-inner img');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        moveSlide(1);
    } else if (touchEndX - touchStartX > 50) {
        moveSlide(-1);
    }
});

let cachedArticles = [];
let cachedTestimonials = [];
let cachedJurusan = [];

function getFirstParagraph(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const firstP = doc.querySelector('p');
    return firstP ? firstP.textContent : '';
}

function renderJurusanCards(jurusan) {
            const container = document.getElementById('jurusan-cards');
            container.innerHTML = ''; // Clear existing cards
            jurusan.forEach(item => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition';
                card.innerHTML = `
                    <i class="fas ${item.icon} text-4xl text-blue-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">${item.title}</h3>
                    <h5 class="text-md font-bold text-gray-500 mb-3">(${item.duration})</h5>
                    <p class="text-gray-600">${item.description}</p>
                `;
                container.appendChild(card);
            });
        }

function renderLookbookCards(articles) {
    const container = document.getElementById('lookbook-cards');
    container.innerHTML = ''; // Clear existing cards
    articles.forEach((article, index) => {
        const card = document.createElement('div');
        card.className = 'bg-gray-50 rounded-lg shadow-md overflow-hidden max-w-sm mx-auto';
        card.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
                    <div class="p-4 text-center">
                        <h3 class="text-lg font-semibold text-gray-800 mb-5">${article.title}</h3>
                        <div class="flex justify-center flex-wrap mb-5">
                            ${article.labels.map(label => `<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium mr-1 mb-1">${label}</span>`).join('')}
                        </div>
                        <p class="text-gray-600 mb-4 line-clamp-3">${getFirstParagraph(article.content)}</p>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition" onclick="openModal(${index})">Read More</button>
                    </div>
                `;
        container.appendChild(card);
    });
}

function openModal(index) {
    if (cachedArticles.length > 0) {
        const modal = document.getElementById('lookbook-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalLabels = document.getElementById('modal-labels');
        const modalContent = document.getElementById('modal-content');

        modalImage.src = cachedArticles[index].image;
        modalTitle.textContent = cachedArticles[index].title;
        modalLabels.innerHTML = '';
        cachedArticles[index].labels.forEach(label => {
            const labelSpan = document.createElement('span');
            labelSpan.className = 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium mr-2 mb-2';
            labelSpan.textContent = label;
            modalLabels.appendChild(labelSpan);
        });
        modalContent.innerHTML = cachedArticles[index].content;

        modal.classList.remove('hidden');
    } else {
        console.error('No articles available');
    }
}

function closeModal() {
    const modal = document.getElementById('lookbook-modal');
    modal.classList.add('hidden');
}

document.getElementById('lookbook-modal').addEventListener('click', (event) => {
    if (event.target === document.getElementById('lookbook-modal')) {
        closeModal();
    }
});

function renderTestimoniCards(testimonials) {
    const container = document.getElementById('testimoni-cards');
    container.innerHTML = '';

    [...testimonials, ...testimonials].forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';

        const originalIndex = index % testimonials.length;
        const bgColor = originalIndex % 3 === 0 ? 'bg-gray-50' : originalIndex % 3 === 1 ? 'bg-blue-50' : 'bg-yellow-50';
        const border = originalIndex % 3 === 0 ? 'border-gray-200' : originalIndex % 3 === 1 ? 'border-blue-200' : 'border-yellow-200';
        const shadow = originalIndex % 3 === 0 ? 'shadow-md' : originalIndex % 3 === 1 ? 'shadow-lg' : 'shadow';
        card.className = `testimonial-card p-6 rounded-lg ${bgColor} ${border} ${shadow} border`;
        card.innerHTML = `
                    <p class="text-gray-600 italic mb-4">"${testimonial.content}"</p>
                    <div class="flex justify-between items-center">
                        <div class="font-semibold text-gray-800">${testimonial.name}</div>
                        <div class="text-sm text-gray-500">${testimonial.date}</div>
                    </div>
                `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch jurusan
    fetch('public/data/jurusan.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch jurusan');
            return response.json();
        })
        .then(data => {
            cachedJurusan = data;
            renderJurusanCards(data);
        })
        .catch(error => {
            console.error('Error loading jurusan:', error);
            renderJurusanCards([]);
        });

    // Fetch articles
    fetch('public/data/articles.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch articles');
            return response.json();
        })
        .then(data => {
            cachedArticles = data;
            renderLookbookCards(data);
        })
        .catch(error => {
            console.error('Error loading articles:', error);
            renderLookbookCards([]);
        });

    // Fetch testimonials
    fetch('public/data/testimonials.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch testimonials');
            return response.json();
        })
        .then(data => {
            cachedTestimonials = data;
            renderTestimoniCards(data);
        })
        .catch(error => {
            console.error('Error loading testimonials:', error);
            renderTestimoniCards([]);
        });
});