const commentFormHandler = async (e) => {
  e.preventDefault();
  const postId = document.querySelector('#post-id').innerHTML;
  console.log(postId)
  const comment = document.querySelector('#comment-text').value;
  console.log(comment)
  
  if (comment) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.location.reload();
  }
};

document
  .querySelector('#comment-btn')
  .addEventListener('click', commentFormHandler);