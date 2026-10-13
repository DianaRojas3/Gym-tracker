const gym = document.getElementById("gym");

let selectedMachine = null;

renderMachines();

function renderMachines() {

    gym.innerHTML = "";

    MACHINES.forEach(machine => {

        const div = document.createElement("div");

        div.className = "machine";

        div.style.left = machine.x + "px";
        div.style.top = machine.y + "px";

        const weights = getWeights(machine.id);

        const machineNumber =
            machine.id === 81
            ? "8.1"
            : machine.id;

        div.innerHTML = `
            <b>${machineNumber}</b>
            <br>
            ${machine.nombre}
            <br>
            D: ${weights.didi || "-"}
            <br>
            J: ${weights.jari || "-"}
        `;

        div.onclick = () => openMachine(machine);

        gym.appendChild(div);

    });
}

function openMachine(machine) {

    selectedMachine = machine;

    document.getElementById("machineTitle").innerText =
        machine.nombre;

    const weights =
        getWeights(machine.id);

    document.getElementById("pesoDidi").value =
        weights.didi || "";

    document.getElementById("pesoJari").value =
        weights.jari || "";

    document.getElementById("modal").style.display =
        "block";
}

document.getElementById("saveBtn")
.addEventListener("click", () => {

    saveWeights(
        selectedMachine.id,
        document.getElementById("pesoDidi").value,
        document.getElementById("pesoJari").value
    );

    document.getElementById("modal").style.display =
        "none";

    renderMachines();

});

document.getElementById("closeBtn")
.addEventListener("click", () => {

    document.getElementById("modal").style.display =
        "none";

});