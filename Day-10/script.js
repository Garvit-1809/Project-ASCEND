// 1. SELECT HTML ELEMENTS

const reportInput = document.getElementById("reportInput");
const addButton = document.getElementById("addButton");
const reportList = document.getElementById("reportList");
const totalCount = document.getElementById("totalCount");


// 2. CREATE REPORT ARRAY

let reports = [];


// 3. CREATE AND READ REPORTS

function displayReports() {

    reportList.innerHTML = "";

    reports.forEach(function (report, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = report;
        span.className = "report-text";

        // EDIT BUTTON

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";

        editButton.addEventListener("click", function () {

            const updatedReport = prompt(
                "Edit your report:",
                reports[index]
            );

            if (updatedReport !== null && updatedReport.trim() !== "") {

                reports[index] = updatedReport.trim();

                displayReports();

            }

        });


        // DELETE BUTTON

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {

            reports.splice(index, 1);

            displayReports();

        });


        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        reportList.appendChild(li);

    });


    // UPDATE TOTAL COUNT

    totalCount.textContent = "Total Reports: " + reports.length;

}


// 4. ADD NEW REPORT

addButton.addEventListener("click", function () {

    const reportText = reportInput.value.trim();

    if (reportText === "") {

        alert("Please enter a report!");

        return;

    }

    reports.push(reportText);

    reportInput.value = "";

    displayReports();

});