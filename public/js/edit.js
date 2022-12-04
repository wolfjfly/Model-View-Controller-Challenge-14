const editPost = async (event) => {
    event.preventDefault()
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
    const id = document.querySelector('#post-id').innerHTML;
    if (title && body) {
        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                body
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(document.location.replace('/dashboard'))
        .catch(err => console.log(err))
    }
};

const deletePost = async (event) => {
    event.preventDefault()
    const id = document.querySelector('#post-id').innerHTML;
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(document.location.replace('/dashboard'))
        .catch(err => console.log(err))
    };

document
.querySelector('#create-post')
.addEventListener('click', editPost);

document
.querySelector('#delete-post')
.addEventListener('click', deletePost);