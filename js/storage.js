function getCurrentUser() {

    return localStorage.getItem(
        "currentUser"
    ) || "didi";

}

function setCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        user
    );

}

function getMachineHistory(machineId) {

    const key =
        getCurrentUser() +
        "_machine_" +
        machineId;

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}

function saveWorkout(machineId, workout) {

    const key =
        getCurrentUser() +
        "_machine_" +
        machineId;

    const history =
        getMachineHistory(machineId);

    history.push(workout);

    localStorage.setItem(
        key,
        JSON.stringify(history)
    );

}

function getLastWorkout(machineId) {

    const history =
        getMachineHistory(machineId);

    if (history.length === 0) {
        return null;
    }

    return history[
        history.length - 1
    ];

}
function getWeights(machineId) {

    const stored =
        localStorage.getItem(
            "weights_" + machineId
        );

    if (stored) {

        return JSON.parse(stored);

    }

    return MACHINE_WEIGHTS[machineId] || {
        didi: "",
        jari: ""
    };

}

function saveWeights(
    machineId,
    didi,
    jari
) {

    localStorage.setItem(
        "weights_" + machineId,
        JSON.stringify({
            didi,
            jari
        })
    );

}