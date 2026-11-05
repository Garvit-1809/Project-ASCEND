import {
    classifyReport,
    getRiskyReports,
    getRoutineReports,
    getReportById
} from "./reportUtils.js";

const reportForm = document.getElementById("reportForm");
const reportInput = document.getElementById("reportInput");
const reportList = document.getElementById("reportList");

const totalCount = document.getElementById("totalCount");
const riskyCount = document.getElementById("riskyCount");
const routineCount = document.getElementById("routineCount");

const message = document.getElementById("message");
const clearButton = document.getElementById("clearButton");
const loadButton = document.getElementById("loadButton");

let reports = JSON.parse(localStorage.getItem("day19Reports")) || [];

function saveReports() {
    localStorage.setItem("day19Reports", JSON.stringify(reports));
}

function updateDashboard() {
    const riskyReports = getRiskyReports(reports);
    const routineReports = getRoutineReports(reports);

    totalCount.textContent = reports.length;
    riskyCount.textContent = riskyReports.length;
    routineCount.textContent = routineReports.length;
}

function displayReports() {
    reportList.innerHTML = "";

    reports.forEach(report => {
        const li = document.createElement("li");

        li.dataset.id = report.id;
        li.className = report.status.toLowerCase();

        const reportText = document.createElement("span");
        reportText.textContent = `${report.text} — ${report.status}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        li.appendChild(reportText);
        li.appendChild(deleteButton);

        reportList.appendChild(li);
    });

    updateDashboard();
}

reportForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = reportInput.value.trim();

    try {
        if (text.length < 10) {
            throw new Error("Report must contain at least 10 characters!");
        }

        const report = {
            id: Date.now(),
            text: text,
            status: classifyReport(text)
        };

        reports.push(report);

        saveReports();
        displayReports();

        reportInput.value = "";
        message.textContent = "Report added successfully!";
        message.style.color = "green";

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";
    }
});

reportList.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const id = Number(event.target.parentElement.dataset.id);

        reports = reports.filter(report => report.id !== id);

        saveReports();
        displayReports();

        message.textContent = "Report deleted successfully!";
        message.style.color = "green";
    }
});

clearButton.addEventListener("click", function() {
    reports = [];

    saveReports();
    displayReports();

    message.textContent = "All reports cleared!";
});

async function loadAPIReports() {
    loadButton.disabled = true;
    message.textContent = "Loading reports...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch reports!");
        }

        const data = await response.json();

        const apiReports = data.slice(0, 5).map(post => ({
            id: Date.now() + post.id,
            text: post.title,
            status: classifyReport(post.title)
        }));

        reports.push(...apiReports);

        saveReports();
        displayReports();

        message.textContent = "API reports loaded successfully!";
        message.style.color = "green";

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";

    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener("click", loadAPIReports);

displayReports();

console.log("Report with ID 1:", getReportById(reports, 1));