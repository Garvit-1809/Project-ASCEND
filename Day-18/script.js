
const reportForm = document.getElementById("reportForm");
const reportInput = document.getElementById("reportInput");
const reportList = document.getElementById("reportList");
const reportCount = document.getElementById("reportCount");
const clearButton = document.getElementById("clearButton");
const message = document.getElementById("message");

// LOAD DATA FROM LOCAL STORAGE
let reports = JSON.parse(localStorage.getItem("safetyReports")) || [];

// SAVE DATA
function saveReports() {
    localStorage.setItem("safetyReports", JSON.stringify(reports));
}

// DISPLAY REPORTS
function displayReports() {
    reportList.innerHTML = "";

    reports.forEach((report, index) => {
        const li = document.createElement("li");

        li.textContent = `${index + 1}. ${report}`;

        reportList.appendChild(li);
    });

    reportCount.textContent = "Total Reports: " + reports.length;
}

// ADD REPORT
reportForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const report = reportInput.value.trim();

    if (report === "") {
        message.textContent = "Please enter a report!";
        message.style.color = "red";
        return;
    }

    reports.push(report);

    saveReports();
    displayReports();

    reportInput.value = "";
    message.textContent = "Report saved successfully!";
    message.style.color = "green";
});

// CLEAR ALL REPORTS
clearButton.addEventListener("click", function() {
    reports = [];

    saveReports();
    displayReports();

    message.textContent = "All reports cleared!";
});

// INITIAL DISPLAY
displayReports();
