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

    location.reload();

}
);

let selectedMachine = null;

renderMachines();

function renderMachines(){

    gym.innerHTML = "";

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

        const currentUser =
        getCurrentUser();

        const currentWeight =
        MACHINE_WEIGHTS[machine.id]?.[
            currentUser
        ];

        div.innerHTML = `
            <b>${machineNumber}</b>
            <br>
            ${machine.nombre}
            <br>
            <b>${currentWeight ?? "-" } kg</b>
        `;

        div.onclick =
        () => openMachine(machine);

        gym.appendChild(div);

    });

}

function openMachine(machine){

    selectedMachine =
    machine;

    document.getElementById(
        "machineTitle"
    ).innerText =
    machine.nombre;

    const currentUser =
        getCurrentUser();

    const defaultWeight =
        MACHINE_WEIGHTS[machine.id]?.[
            currentUser
        ];

    const last =
        getLastWorkout(
            machine.id
        );

    if(last){

        document.getElementById(
            "peso"
        ).value =
        last.peso;

        document.getElementById(
            "notas"
        ).value =
        last.notas || "";

    }
    else{

        document.getElementById(
            "peso"
        ).value =
        defaultWeight || "";

        document.getElementById(
            "notas"
        ).value =
        "";

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

    "<h3>Histórico</h3>" +

    history
    .slice()
    .reverse()
    .map(h => `
        <p>
            ${h.fecha}
            <br>
            ${h.peso} kg
        </p>
    `)
    .join("");

}

document
.getElementById("saveBtn")
.