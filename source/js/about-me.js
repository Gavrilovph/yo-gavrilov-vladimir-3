// Получаем элементы контейнера и контента
let articlesContainer = document.querySelector('.about__articles-container_js');
let articlesContent = document.querySelector('.about__articles-content_js');

// Устанавливаем высоту фонового контейнера равной высоте контента
articlesContainer.style.height = articlesContent.clientHeight + 'px';
