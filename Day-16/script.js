
const fetchButton = document.getElementById("fetchButton");
const status = document.getElementById("status");
const reportContainer = document.getElementById("reportContainer");

// PROMISE EXAMPLE
function checkConnection() {
    return new Promise((resolve, reject) => {
        const connected = true;

        if (connected) {
            resolve("Connection successful!");
        } else {
            reject("Connection failed!");
        }
    });
}

// ASYNC FUNCTION
async function fetchReports() {
    status.textContent = "Loading reports...";
    reportContainer.innerHTML = "";
    fetchButton.disabled = true;

    try {
        const connectionMessage = await checkConnection();
        console.log(connectionMessage);

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const reports = await response.json();

        const selectedReports = reports.slice(0, 15);

        selectedReports.forEach(report => {
            const card = document.createElement("div");
            card.className = "report-card";

            card.innerHTML = `
                <h3>${report.title}</h3>
                <p>${report.body}</p>
                <small>Post ID: ${report.id}</small>
            `;

            reportContainer.appendChild(card);
        });

        status.textContent = "Successfully fetched 15 reports!";

    } catch (error) {
        status.textContent = "Unable to fetch reports. Please try again.";
        console.error("API Error:", error);

    } finally {
        fetchButton.disabled = false;
    }
}

fetchButton.addEventListener("click", fetchReports);
