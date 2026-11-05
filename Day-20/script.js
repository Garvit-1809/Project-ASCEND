
const reportForm = document.getElementById("reportForm");
const reportInput = document.getElementById("reportInput");
const reportList = document.getElementById("reportList");

const totalCount = document.getElementById("totalCount");
const riskyCount = document.getElementById("riskyCount");
const routineCount = document.getElementById("routineCount");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const message = document.getElementById("message");

const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");

let reports = JSON.parse(localStorage.getItem("day20Reports")) || [];
let editingId = null;

function classifyReport(text) {
    const keywords = [
        "accident",
        "fire",
        "chemical",
        "failure",
        "dangerous",
        "injury",
        "fall"
    ];

    return keywords.some(keyword =>
        text.toLowerCase().includes(keyword)
    ) ? "RISKY" : "ROUTINE";
}

function saveReports() {
    localStorage.setItem("day20Reports", JSON.stringify(reports));
}

function updateStats() {
    totalCount.textContent = reports.length;

    riskyCount.textContent = reports.filter(
        report => report.status === "RISKY"
    ).length;

    routineCount.textContent = reports.filter(
        report => report.status === "ROUTINE"
    ).length;
}

function displayReports() {
    reportList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const selectedFilter = filterSelect.value;

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.text.toLowerCase()
            .includes(searchText);

        const matchesFilter = selectedFilter === "ALL" ||
            report.status === selectedFilter;

        return matchesSearch && matchesFilter;
    });

    filteredReports.forEach(report => {
        const li = document.createElement("li");

        li.className = report.status.toLowerCase();
        li.dataset.id = report.id;

        const info = document.createElement("div");
        info.className = "report-info";

        const reportText = document.createElement("span");
        reportText.textContent = report.text;

        const status = document.createElement("span");
        status.className = "status";
        status.textContent = report.status;

        info.appendChild(reportText);
        info.appendChild(status);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        li.appendChild(info);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        reportList.appendChild(li);
    });

    if (filteredReports.length === 0) {
        reportList.textContent = "No reports found.";
    }

    updateStats();
}

reportForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = reportInput.value.trim();

    try {
        if (text.length < 10) {
            throw new Error("Report must contain at least 10 characters!");
        }

        if (editingId !== null) {
            const report = reports.find(item => item.id === editingId);

            if (report) {
                report.text = text;
                report.status = classifyReport(text);
            }

            editingId = null;
            formTitle.textContent = "Add New Report";
            submitButton.textContent = "Add Report";

            message.textContent = "Report updated successfully!";

        } else {
            reports.push({
                id: Date.now(),
                text: text,
                status: classifyReport(text)
            });

            message.textContent = "Report added successfully!";
        }

        saveReports();
        reportForm.reset();
        displayReports();

        message.style.color = "green";

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";
    }
});

reportList.addEventListener("click", function(event) {
    const li = event.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        reports = reports.filter(report => report.id !== id);

        if (editingId === id) {
            editingId = null;
            formTitle.textContent = "Add New Report";
            submitButton.textContent = "Add Report";
            reportForm.reset();
        }

        saveReports();
        displayReports();

        message.textContent = "Report deleted!";
        message.style.color = "green";
    }

    if (event.target.classList.contains("edit-btn")) {
        const report = reports.find(item => item.id === id);

        if (report) {
            reportInput.value = report.text;
            editingId = id;

            formTitle.textContent = "Edit Report";
            submitButton.textContent = "Update Report";

            reportInput.focus();
        }
    }
});

searchInput.addEventListener("input", displayReports);
filterSelect.addEventListener("change", displayReports);

const loadApiButton = document.getElementById("loadApiButton");

async function loadAPIReports() {
    loadApiButton.disabled = true;
    message.textContent = "Loading API reports...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch API reports!");
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

        message.textContent = "5 API reports loaded successfully!";
        message.style.color = "green";

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";

    } finally {
        loadApiButton.disabled = false;
    }
}

loadApiButton.addEventListener("click", loadAPIReports);

displayReports();
