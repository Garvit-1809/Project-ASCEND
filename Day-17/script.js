
const reportForm = document.getElementById("reportForm");
const reportInput = document.getElementById("reportInput");
const message = document.getElementById("message");
const reportResult = document.getElementById("reportResult");

function validateReport(report) {
    if (report.trim() === "") {
        throw new Error("Report cannot be empty!");
    }

    if (report.length < 10) {
        throw new Error("Report must contain at least 10 characters!");
    }

    return "Report validated successfully!";
}

reportForm.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const report = reportInput.value;

        const result = validateReport(report);

        message.textContent = result;
        message.style.color = "green";

        reportResult.textContent = "Submitted Report: " + report;

    } catch (error) {
        message.textContent = error.message;
        message.style.color = "red";

        console.error("Validation Error:", error);

    } finally {
        console.log("Validation process completed.");
    }
});
