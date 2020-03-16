const id = new URLSearchParams(window.location.search).get('id')

function fetchData() {
  fetch(`/api/articles/${id}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      const wrapper = document.querySelector('.wrapper-single')
      const html = `
        <div class="article">
          <div data-id="${data.id}" class="uk-card uk-card-default uk-card-body card uk-position-relative">
            <h3 class="uk-card-title">
              ${data.title}
            </h3>
            <p class="article-text">${data.text}</p>
            <textarea name="text" class="uk-textarea article-text-change hide" rows="5">${data.text}</textarea>
            <i class="material-icons uk-position-absolute edit-icon">edit</i>
            <i class="material-icons uk-position-absolute remove-icon">clear</i>
          </div>
        </div>
      `
      wrapper.innerHTML = html
    })
    .then(() => {
      removeArticle()
      editArticle()
    })
    .catch(err => {
      console.log(err)
    })
};

fetchData()

function removeArticle () {

  const removeArticleBtn = document.querySelector('.remove-icon')

  removeArticleBtn.addEventListener('click', () => {
    
    fetch('/api/articles/delete', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          id: removeArticleBtn.closest('div').dataset.id
        }
      )
    })
      .then(() => {
        window.location.href = '/'
      })
      .catch(err => {
        console.log(err)
      })

  })

}

function editArticle () {

  const editArticleBtn = document.querySelector('.edit-icon')

  const articleText = document.querySelector('.article-text')

  const articleTextChange = document.querySelector('.article-text-change')

  editArticleBtn.addEventListener('click', () => {

    if (articleTextChange.classList.contains('hide')) {
      articleTextChange.classList.remove('hide')
      articleText.classList.add('hide')
    } else {
      articleTextChange.classList.add('hide')
      articleText.classList.remove('hide')

      fetch('/api/articles/edit', {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(
          {
            id: editArticleBtn.closest('div').dataset.id,
            text: articleTextChange.value.trim()
          }
        )
      })
        .then(() => {
          fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    }
  })
}