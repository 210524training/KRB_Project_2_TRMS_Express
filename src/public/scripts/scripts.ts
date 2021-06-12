// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendLogin() {
  const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;

  if(!usernameInput || !passwordInput) {
    console.log('Failed to send login request, due to missing inputs!');
    return;
  }

  const response = await fetch('http://localhost:3000/', {
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const data = await response.json();

  console.log(data);

  sessionStorage.setItem('user', JSON.stringify(data));
}