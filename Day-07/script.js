const reportInput = document.getElementById("reportInput");
const checkButton = document.getElementById("checkButton");
const result = document.getElementById("result");

const totalReports = document.getElementById("totalReports");
const riskyReports = document.getElementById("riskyReports");
const routineReports = document.getElementById("routineReports");
const reportHistory = document.getElementById("reportHistory");

let total = 0;
let risky = 0;
let routine = 0;

function classifyReport(text) {
    const riskyKeywords = [
        "fall",
        "fell",
        "failure",
        "restricted area",
        "chemical exposure",
        "dangerous chemical",
        "exposure"
    ];

    const report = text.toLowerCase();

    for (const keyword of riskyKeywords) {
        if (report.includes(keyword)) {
            return "RISKY";
        }
    }

    return "ROUTINE";
}

function updateDashboard() {
    totalReports.textContent = total;
    riskyReports.textContent = risky;
    routineReports.textContent = routine;
}

function checkReport() {
    const report = reportInput.value.trim();

    if (report === "") {
        result.textContent = "Please enter a report first.";
        result.style.color = "#b45309";
        return;
    }

    const classification = classifyReport(report);

    total++;

    if (classification === "RISKY") {
        risky++;
        result.style.color = "#dc2626";
    } else {
        routine++;
        result.style.color = "#15803d";
    }

    result.textContent = "Classification: " + classification;

    const historyItem = document.createElement("li");
    historyItem.textContent = report + " — " + classification;

    reportHistory.prepend(historyItem);

    updateDashboard();

    reportInput.value = "";
}

checkButton.addEventListener("click", checkReport);

reportInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkReport();
    }
});