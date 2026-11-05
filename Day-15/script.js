const reportForm = document.getElementById("reportForm");
const reportInput = document.getElementById("reportInput");
const reportList = document.getElementById("reportList");
const message = document.getElementById("message");
const clearButton = document.getElementById("clearButton");

let reports = [];

function displayReports() {
    reportList.innerHTML = "";

    reports.forEach(report => {
        const li = document.createElement("li");
        li.textContent = report;
        reportList.appendChild(li);
    });
}

// SUBMIT EVENT
reportForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const report = reportInput.value.trim();

    if (report === "") {
        message.textContent = "Please enter a report!";
        return;
    }

    reports.push(report);

    message.textContent = "";
    reportInput.value = "";

    displayReports();
});

// EVENT DELEGATION
reportList.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.style.backgroundColor = "#bfdbfe";
        console.log("Selected Report:", event.target.textContent);
    }
});

// CLEAR BUTTON EVENT
clearButton.addEventListener("click", function() {
    reports = [];
    displayReports();
    message.textContent = "All reports cleared!";
});