const newPost = async (event) => {
    event.preventDefault()
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();

    if (title && body) {
        await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                body
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        document.location.reload();
    }
};

document
.querySelector('#create-post')
.addEventListener('click', newPost);