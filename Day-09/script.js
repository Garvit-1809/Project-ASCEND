// 1. GET HTML ELEMENTS

const reportInput = document.getElementById("reportInput");

const addButton = document.getElementById("addButton");

const reportList = document.getElementById("reportList");

const totalCount = document.getElementById("totalCount");

const clearButton = document.getElementById("clearButton");


// 2. CREATE AN ARRAY

const reports = [];


// 3. ADD EVENT LISTENER

addButton.addEventListener("click", function () {

    const reportText = reportInput.value.trim();

    // Check empty input

    if (reportText === "") {

        alert("Please enter a report!");

        return;

    }


    // 4. CREATE NEW HTML ELEMENT

    const li = document.createElement("li");

    li.textContent = reportText;


    // 5. ADD ELEMENT TO HTML

    reportList.appendChild(li);


    // 6. STORE REPORT IN ARRAY

    reports.push(reportText);


    // 7. UPDATE TOTAL COUNT

    totalCount.textContent = "Total Reports: " + reports.length;


    // 8. CLEAR INPUT

    reportInput.value = "";

    // CLEAR ALL REPORTS

clearButton.addEventListener("click", function () {

    reports.length = 0;

    reportList.innerHTML = "";

    totalCount.textContent = "Total Reports: 0";

});

});