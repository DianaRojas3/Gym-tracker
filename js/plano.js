const currentUser =
    localStorage.getItem(
        "currentUser"
    );

document.getElementById(
    "welcome"
).innerText =
"Hola " + currentUser;

const gym =
document.getElementById(
    "gym"
);

MACHINES.forEach(machine => {

    const div =
    document.createElement(
        "div"
    );

    div.className =
        "machine";

    div.style.left =
        machine.x + "px";

    div.style.top =
        machine.y + "px";

    div.innerHTML =
    `
    <b>${machine.id}</b><br>
    ${machine.nombre}
    `;

    gym.appendChild(div);

});