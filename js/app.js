let selectedMachine = null;

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

document.getElementById("welcome").textContent = "Hola " + currentUser;

const gym = document.getElementById("gym");

MACHINES.forEach((machine) => {
    const div = document.createElement("div");
    div.className = "machine";
    div.style.left = machine.x + "px";
    div.style.top = machine.y + "px";
    div.innerHTML = `
        <b>${machine.id}</b><br>
        ${machine.nombre}
    `;
    div.onclick = () => openMachine(machine);
    gym.appendChild(div);
});

function openMachine(machine) {
    selectedMachine = machine;
    document.getElementById("machineTitle").textContent = machine.nombre;
    loadMachineHistory();
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function saveCurrentWorkout() {
    if (!selectedMachine) return;

    saveWorkout(selectedMachine.id, {
        fecha: new Date().toLocaleDateString(),
        peso: document.getElementById("peso").value,
        series: document.getElementById("series").value,
        reps: document.getElementById("reps").value,
        notas: document.getElementById("notes").value
    });

    loadMachineHistory();
    alert("Entrenamiento guardado");
}

function loadMachineHistory() {
    if (!selectedMachine) return;

    const history = getHistory(selectedMachine.id);

    document.getElementById("history").innerHTML = history
        .slice()
        .reverse()
        .map((h) => `
            <hr>
            ${h.fecha}<br>
            ${h.peso}kg · ${h.series}x${h.reps}
        `)
        .join("");
}
