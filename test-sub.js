const email = "amitnaik0023@gmail.com";
fetch('https://www.gamesdealshub.me/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
