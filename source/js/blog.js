const SERVER_URL = 'https://academy.directlinedev.com';
const mainLoader = document.querySelector('.main-loader_js') //потом поставить свой класс
const showLoader = () => {
  loaderCount++;
  mainLoader.classList.remove('hidden')
}
const hideLoader = () => {
  loaderCount--;
  if(loaderCount <=0) {
    mainLoader.classList.add('hidden');
    loaderCount = 0;
  }
}
let LIMIT = 5;
let loaderCount = 0;

(function() {
  const form = document.forms.filter;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = {
      page: 0,
    };
    data.name = form.elements.name.value;
    data.tags = [...form.elements.tags]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value)
    data.sortBy = ([...form.elements.sortBy]
    .find(radio => radio.checked) || {value: null}).value;
    getData(data);
    setSearchParams(data);
  })

  function setSearchParams(data) {
    let searchParams = new URLSearchParams();
    searchParams.set('name', data.name);
    data.tags.forEach(tag => {
      searchParams.append('tags', tag);
    })
    if(data.page) {
      searchParams.set('page', data.page);
    } else {
      searchParams.set('page', 0);
    }
    if(data.sortBy) {
      searchParams.set('sortBy', data.sortBy);
    }
    history.replaceState(null, document.title, '?' + searchParams.toString());
  }

  let xhr = new XMLHttpRequest();
  xhr.open('GET', SERVER_URL + '/api/tags');
  xhr.send();
  showLoader();
  xhr.onload = () => {
    const tags = JSON.parse(xhr.response).data;
    const tagsBox = document.querySelector('.select-of-box_js'); //поменять класс на свой
    tags.forEach(tag => {
      const tagHTML = createTag(tag);
      tagsBox.insertAdjacentHTML('beforeend', tagHTML)
    })
    const params = getParamsFromLocation();
    setDataToFilter(params);
    getData(params);
    hideLoader();
  }
  const resetButton = form.querySelector('.blog__form-btn');

  resetButton.addEventListener('click', function() {
    form.reset();
  });
})();

function getParamsFromLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    name: searchParams.get('name') || '',
    tags: searchParams.getAll('tags'),
    sortBy: searchParams.get('sortBy'),
    page: +searchParams.get('page') || 0,
  };
}

function getData(params, limit) {
  const result = document.querySelector('.result_js');
  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set('v', '1.0.0');
  searchParams.set('limit', limit);

  if(params.tags && Array.isArray(params.tags) && params.tags.length) {
    searchParams.set('tags', JSON.stringify(params.tags));
  }

  let filter = {};

  if(params.name) {
    filter.title = params.name;
  }

  searchParams.set('filter', JSON.stringify(filter));

  searchParams.set('limit', LIMIT);

  if(+params.page) {
    searchParams.set('offset', (+params.page) * LIMIT);
  }

  if(params.sortBy) {
    searchParams.set('sort', JSON.stringify([params.sortBy, 'DESC']));
  }

  xhr.open('GET', SERVER_URL + '/api/posts?' + searchParams.toString());
  xhr.send();
  showLoader();
  result.innerHTML = '';
  const links = document.querySelector('.pagination_js');
  links.innerHTML = '';
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    let dataPosts = '';
    response.data.forEach(post => {
      dataPosts += cardCreate({
        title: post.title,
        text: post.text,
        src: post.photo.desktopPhotoUrl,
        tags: post.tags,
        commentsCount: post.commentsCount,
        date: formatDate(post.date),
        views: post.views,
      })
    })
    result.innerHTML = dataPosts;

    function updatePagination(response, limit) {
      const pageCount = Math.ceil(response.count / limit);
      const links = document.querySelector('.pagination_js');

      links.innerHTML = '';

      for (let i = 0; i < pageCount; i++) {
        const link = linkElementCreate(i);
        links.insertAdjacentElement('beforeend', link);
        links.insertAdjacentHTML('beforeend', '<br>')
      }
    }

    updatePagination(response, limit);

    const pageCount = Math.ceil(response.count / LIMIT);
    for(let i = 0; i < pageCount; i++) {
      const link = linkElementCreate(i);
      links.insertAdjacentElement('beforeend', link);
      links.insertAdjacentHTML('beforeend', '<br>')
    }
    hideLoader();
  }
}

// pages filter

document.getElementById('filter').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  LIMIT = formData.get('limit');

  getData({
    name: formData.get('name'),
    tags: formData.get('tags'),
    sortBy: formData.get('sortBy'),
    page: 0,
  });
});


document.getElementById('filter').addEventListener('reset', function() {
  this.querySelector('input[type="radio"][value="5"]').checked = true;
  LIMIT = 5;
  getData({
    name: '',
    tags: '',
    sortBy: '',
    page: 0,
    limit: LIMIT,
  });
});

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);
  const [month, day, year] = formattedDate.split('/');
  return `${day}.${month}.${year}`;
}

function linkElementCreate(page) {
  const link = document.createElement('a');
  link.href = '?page' + page;
  link.innerText = 'Страница №' + (page + 1);
  link.classList.add('link_js');

  let params = getParamsFromLocation();
  if ( page === +params.page ) {
    link.classList.add('active');
  }

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const links = document.querySelectorAll('.link_js');
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFromLocation();
    links[params.page].classList.remove('active');
    searchParams.set('page', page);
    links[page].classList.add('active');
    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFromLocation());
  })
  return link;
}

function cardCreate({title, text, src, tags, commentsCount, date, views}) {
  return `
  <div class="col-4 mb-3 blog__content-article">
    <div class="blog__content-wrapper">
      <img src="${SERVER_URL}${src}" class="card-img-top blog__content-img" alt="${title}">
      <div class="card-body blog__content-card-body">
        <div class="blog__content-card-tags_wrapper">
          ${tags.map(tag => `<span class="blog__content-card-tags_appearance" style="background-color: ${tag.color}"></span>`).join('<br>')}
        </div>
        <div class="blog__content-card-info">
          <p class="card-text blog__content-card-info_text">${date}</p>
          <p class="card-text blog__content-card-info_text">${views} views</p>
          <p class="card-text blog__content-card-info_text">Comments: ${commentsCount}</p>
        </div>
        <h5 class="card-title blog__content-card-title">${title}</h5>
        <p class="card-text blog__content-card-text">${text}</p>
        <a class="blog__content-card-link" href="#">Go to this post</a>

      </div>
    </div>
  </div>
  `
}

function setDataToFilter(data) {
  const form = document.forms.filter;
  form.elements.name.value = data.name;
  form.elements.tags.forEach(checkbox => {
      checkbox.checked = data.tags.includes(checkbox.value);
  });
  form.elements.sortBy.forEach(radio => {
      radio.checked = data.sortBy === radio.value;
  });
}

function createTag({id, color}) {
  return `
  <div class="form-group form-check checkbox">
    <input name="tags" type="checkbox" class="form-check-input checkbox__input" id="tags-${id}" value="${id}">
    <label style="color: ${color}" style="border-color: ${color}" class="checkbox__mark checkbox__mark${id}" for="tags-${id}"></label>
  </div>`
}

