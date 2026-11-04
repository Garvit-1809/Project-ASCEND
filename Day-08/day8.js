// DAY 8 - JavaScript Fundamentals

// 1. ARRAY

const reports = [
    "Worker fell from height",
    "Safety training completed",
    "Machine failure detected",
    "Equipment inspection completed",
    "Chemical exposure reported"
];

console.log("ALL REPORTS:");
console.log(reports);

console.log("Total Reports:", reports.length);

console.log("First Report:", reports[0]);

console.log("Second Report:", reports[1]);

// 2. FOR LOOP

console.log("\nPRINTING REPORTS:");

for (let i = 0; i < reports.length; i++) {

    console.log("Report", i + 1, ":", reports[i]);

}

// 3. OBJECT

const report = {

    id: 101,
    description: "Worker fell from height",
    risk: "RISKY",
    category: "Fall"

};

console.log("\nSINGLE REPORT DETAILS:");

console.log("ID:", report.id);
console.log("Description:", report.description);
console.log("Risk:", report.risk);
console.log("Category:", report.category);

// 4. ARRAY OF OBJECTS

const safetyReports = [

    {
        id: 1,
        description: "Worker fell from height",
        risk: "RISKY"
    },

    {
        id: 2,
        description: "Safety training completed",
        risk: "ROUTINE"
    },

    {
        id: 3,
        description: "Machine failure detected",
        risk: "RISKY"
    },

    {
        id: 4,
        description: "Equipment inspection completed",
        risk: "ROUTINE"
    },
    
    {
        id: 5,
        description: "Dangerous chemical exposure",
        risk: "RISKY"
    },

    {
        id: 6,
        description: "Fire safety training completed",
        risk: "ROUTINE"
    }   

];

console.log("\nSAFETY REPORT DATABASE:");

for (const item of safetyReports) {

    console.log(
        item.id,
        item.description,
        item.risk
    );

}

// 5. FUNCTION - COUNT RISKY REPORTS

function countRiskyReports(data) {

    let count = 0;

    for (const item of data) {

        if (item.risk === "RISKY") {

            count++;

        }

    }

    return count;

}

const riskyCount = countRiskyReports(safetyReports);

console.log("\nTOTAL RISKY REPORTS:", riskyCount);

// 6. COUNT ROUTINE REPORTS

function countRoutineReports(data) {

    let count = 0;

    for (const item of data) {

        if (item.risk === "ROUTINE") {

            count++;

        }

    }

    return count;

}


// 7. COUNT TOTAL REPORTS

function countTotalReports(data) {

    return data.length;

}


console.log("TOTAL REPORTS:", countTotalReports(safetyReports));

console.log("RISKY REPORTS:", countRiskyReports(safetyReports));

console.log("ROUTINE REPORTS:", countRoutineReports(safetyReports));