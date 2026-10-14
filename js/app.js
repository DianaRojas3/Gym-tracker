const gym = document.getElementById("gym");

console.log(MACHINES);

let selectedMachine = null;

const selector =
    document.getElementById(
        "userSelector"
    );

selector.addEventListener(
    "change",
    () => {

        renderMachines();

    }
);

renderMachines();

function getWeights(machineId) {

    const data =
        MACHINE_WEIGHTS[machineId];

    if (data) {
        return data;
    }

    return {
        didi: "",
        jari: ""
    };

}

function renderMachines() {

    console.log("Renderizando");

    gym.innerHTML = "";

    const currentUser =
        selector.value;

    MACHINES.forEach(machine => {

        const div =
            document.createElement("div");

        div.className =
            "machine";

        div.style.left =
            machine.x + "px";

        div.style.top =
            (machine.y + 80) + "px";

        const weights =
            getWeights(machine.id);

        const currentWeight =
            weights[currentUser];

        const machineNumber =
            machine.id === 81
            ? "8.1"
            : machine.id;

        div.innerHTML =
            "<b>" +
            machineNumber +
            "</b><br>" +
            machine.nombre +
            "<br><b>" +
            (currentWeight || "-") +
            " kg</b>";

        div.onclick =
            () => openMachine(machine);

        gym.appendChild(div);

    });

}

function openMachine(machine) {

    selectedMachine = machine;

    document.getElementById(
        "machineTitle"
    ).innerText =
        machine.nombre;

    const weights =
        getWeights(machine.id);

    document.getElementById(
        "pesoDidi"
    ).value =
        weights.didi || "";

    document.getElementById(
        "pesoJari"
    ).value =
        weights.jari || "";

    document.getElementById(
        "modal"
    ).style.display =
        "block";

}

function saveWeights(
    machineId,
    didiWeight,
    jariWeight
) {

    MACHINE_WEIGHTS[machineId] = {

        didi:
            parseFloat(didiWeight),

        jari:
            parseFloat(jariWeight)

    };

    localStorage.setItem(
        "machineWeights",
        JSON.stringify(MACHINE_WEIGHTS)
    );

}

document
    .getElementById("saveBtn")
    .addEventListener(
        "click",
        () => {

            saveWeights(
                selectedMachine.id,
                document.getElementById(
                    "pesoDidi"
                ).value,
                document.getElementById(
                    "pesoJari"
                ).value
            );

            document.getElementById(
                "modal"
            ).style.display =
                "none";

            renderMachines();

        }
    );

document
    .getElementById("closeBtn")
    .addEventListener(
        "click",
        () => {

            document.getElementById(
                "modal"
            ).style.display =
                "none";

        }
    );

const savedWeights =
    localStorage.getItem(
        "machineWeights"
    );

if (savedWeights) {

    Object.assign(
        MACHINE_WEIGHTS,
        JSON.parse(savedWeights)
    );

    renderMachines();

}