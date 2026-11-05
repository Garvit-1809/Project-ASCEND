// 1. SELECT HTML ELEMENTS

const fetchButton = document.getElementById("fetchButton");

const statusMessage = document.getElementById("status");

const reportContainer = document.getElementById("reportContainer");


// 2. CREATE ASYNC FUNCTION

async function fetchReports() {

    try {

        // Show loading message

        statusMessage.textContent = "Loading reports...";

        fetchButton.disabled = true;

        reportContainer.innerHTML = "";


        // 3. FETCH DATA FROM API

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );


        // 4. CHECK RESPONSE

        if (!response.ok) {

            throw new Error("Failed to fetch reports");

        }


        // 5. CONVERT RESPONSE INTO JSON

        const reports = await response.json();


        // 6. DISPLAY FIRST 20 REPORTS

        const selectedReports = reports.slice(0, 20);

        selectedReports.forEach(function (report) {

            const card = document.createElement("div");

            card.className = "report-card";

            const title = document.createElement("h3");

            title.textContent = report.title;

            const description = document.createElement("p");

            description.textContent = report.body;

            const user = document.createElement("p");

            user.textContent = "User ID: " + report.userId;

            const postId = document.createElement("p");

            postId.textContent = "Post ID: " + report.id;

            card.appendChild(title);

            card.appendChild(description);

            card.appendChild(user);

            card.appendChild(postId);

            reportContainer.appendChild(card);

        });


        // 7. UPDATE STATUS

        statusMessage.textContent =
            "Successfully loaded " + selectedReports.length + " reports.";


    } catch (error) {

    statusMessage.textContent =
        "Error: Unable to fetch reports. Please try again.";

    console.error("API Error:", error);

    } finally {

        // 9. ENABLE BUTTON AGAIN

        fetchButton.disabled = false;

    }

}


// 10. ADD CLICK EVENT

fetchButton.addEventListener("click", fetchReports);