async function loginFormHandler(event) {
event.preventDefault();

const username = document.querySelector("#login-username").value.trim();
const password = document.querySelector("#login-password").value.trim();

console.log('here3')

if (username && password) {
    const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({username: username, password: password}),
    headers: {"Content-Type": "application/json",},
    });

    console.log('here2')

    if (response.ok) {
    document.location.replace("/dashboard");
    } else {
    alert('Failed to log in');
    }
}
}

document
.querySelector(".login-form")
.addEventListener("submit", loginFormHandler);
