function getCurrentUser() {
    return localStorage.getItem("currentUser") || "didi";
}

function setCurrentUser(user) {
    localStorage.setItem("currentUser", user);
}

function getHistory(machineId) {
    const key = getCurrentUser() + "_machine_" + machineId;
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function getMachineHistory(machineId) {
    return getHistory(machineId);
}

function saveWorkout(machineId, workout) {
    const key = getCurrentUser() + "_machine_" + machineId;
    const history = getHistory(machineId);
    history.push(workout);
    localStorage.setItem(key, JSON.stringify(history));
}