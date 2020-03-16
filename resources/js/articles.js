const form = document.querySelector('.form')

function fetchData() {
  const wrapper = document.querySelector('.wrapper')
  fetch('/api/articles')
    .then(res => {
      return res.json()
    })
    .then(data => {
      wrapper.innerHTML = ''
      const articles = data
      articles.forEach(item => {
        const html = `
          <div class="uk-margin-bottom">
            <div class="uk-card uk-card-default uk-card-body card">
              <h3 class="uk-card-title">
                <a data-id="${item.id}" href="/articles/${item.id}?id=${item.id}">${item.title}</a>
              </h3>
              <p>${item.text.slice(0,100)}...</p>
            </div>
          </div>
        `
        wrapper.innerHTML += html
      })
    })
    .catch(err => {
      console.log(err)
    })
};

fetchData()

form.addEventListener('submit', evt => {
  evt.preventDefault()
  form.title.value === '' ? form.title.classList.add('uk-form-danger') : form.title.classList.remove('uk-form-danger')
  form.text.value === '' ? form.text.classList.add('uk-form-danger') : form.text.classList.remove('uk-form-danger')
  if (form.title.value && form.text.value) {
    fetch('/api/articles/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          title: form.title.value.trim(),
          text: form.text.value.trim()
        }
      )
    })
      .then(() => {
        fetchData()
        form.reset()
      })
      .catch(err => {
        console.log(err)
      })
  }
})