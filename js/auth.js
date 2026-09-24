const USERS = {
    didi: "54321",
    jari: "12345"
};

function login() {

    const user =
        document.getElementById("user").value;

    const password =
        document.getElementById("password").value;

    if (USERS[user] !== password) {

        document.getElementById("error").innerText =
            "Contraseña incorrecta";

        return;
    }

    localStorage.setItem(
        "currentUser",
        user
    );

    window.location.href =
        "plano.html";
}