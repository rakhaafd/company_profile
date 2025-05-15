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

        // Cache for fetched articles
        let cachedArticles = [];

        // Helper function to extract the first paragraph
        function getFirstParagraph(content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const firstP = doc.querySelector('p');
            return firstP ? firstP.textContent : '';
        }

        // Dynamically render Lookbook cards
        function renderLookbookCards(articles) {
            const container = document.getElementById('lookbook-cards');
            container.innerHTML = ''; // Clear existing cards
            articles.forEach((article, index) => {
                const card = document.createElement('div');
                card.className = 'bg-gray-50 rounded-lg shadow-md overflow-hidden';
                card.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-5">${article.title}</h3>
                        <div class="flex justify-end flex-wrap mb-5">
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

        // Close modal when clicking outside the modal content
        document.getElementById('lookbook-modal').addEventListener('click', (event) => {
            if (event.target === document.getElementById('lookbook-modal')) {
                closeModal();
            }
        });

        // Fetch and render articles on page load
        document.addEventListener('DOMContentLoaded', () => {
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
                    renderLookbookCards([]); // Render no cards if fetch fails
                });
        });