const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');


update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith... disturbing.',
    }),
  })
    .then(res => {if (res.ok) return res.json()})
    .then(data => console.log(data));
});


deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      console.log(data);
      if (data.error === 'No Quote to delete') {
        messageDiv.textContent = 'No Darth Vader quote to delete'
      } else {
        window.location.reload(true)
      }
    })
});
