const newFormHandler = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post_title"]').value;
    const body = document.querySelector('textarea[name="post_body"]').value;

    await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
        title,
        body,
    }),
    headers: { 'Content-Type': 'application/json' },
    });
    console.log("Title", {title});
    console.log('body', {body});

    document.location.replace('/dashboard');
};

document
    .querySelector('#newPost')
    .addEventListener('submit', newFormHandler);