const gym =
document.getElementById("gym");

const selector =
document.getElementById(
    "userSelector"
);

selector.value =
getCurrentUser();

selector.addEventListener(
"change",
function(){

    setCurrentUser(
        this.value
    );

}
);

let selectedMachine = null;

MACHINES.forEach(machine => {

    const div =
    document.createElement("div");

    div.className =
    "machine";

    div.style.left =
    machine.x + "px";

    div.style.top =
    machine.y + "px";

    let machineNumber =
    machine.id === 81
    ? "8.1"
    : machine.id;

    div.innerHTML =
    `
    <b>${machineNumber}</b>
    <br>
    ${machine.nombre}
    `;

    div.onclick =
    () => openMachine(machine);

    gym.appendChild(div);

});

function openMachine(machine){

    selectedMachine =
    machine;

    document.getElementById(
        "machineTitle"
    ).innerText =
    machine.nombre;

    const last =
    getLastWorkout(
        machine.id
    );

    if(last){

        document.getElementById(
            "peso"
        ).value =
        last.peso || "";

        document.getElementById(
            "series"
        ).value =
        last.series || "";

        document.getElementById(
            "reps"
        ).value =
        last.reps || "";

        document.getElementById(
            "notas"
        ).value =
        last.notas || "";

    }

    renderHistory();

    document.getElementById(
        "modal"
    ).style.display =
    "block";
}

function renderHistory(){

    const history =
    getMachineHistory(
        selectedMachine.id
    );

    document.getElementById(
        "history"
    ).innerHTML =
    history
    .slice()
    .reverse()
    .map(h => `
        <p>
        ${h.fecha}<br>
        ${h.peso} kg |
        ${h.series} x ${h.reps}
        </p>
    `)
    .join("");
}

document
.getElementById("saveBtn")
.addEventListener(
"click",
function(){

    saveWorkout(
        selectedMachine.id,
        {
            fecha:
            new Date()
            .toLocaleDateString(),

            peso:
            document
            .getElementById("peso")
            .value,

            series:
            document
            .getElementById("series")
            .value,

            reps:
            document
            .getElementById("reps")
            .value,

            notas:
            document
            .getElementById("notas")
            .value
        }
    );

    renderHistory();

    alert(
        "Entrenamiento guardado"
    );

});

document
.getElementById("closeBtn")
.addEventListener(
"click",
function(){

    document
    .getElementById("modal")
    .style.display =
    "none";

});