const reports = [
    {
        id: 1,
        description: "Worker fell from height",
        status: "RISKY"
    },
    {
        id: 2,
        description: "Safety training completed",
        status: "ROUTINE"
    },
    {
        id: 3,
        description: "Machine failure detected",
        status: "RISKY"
    },
    {
        id: 4,
        description: "Equipment inspection completed",
        status: "ROUTINE"
    },
    {
        id: 5,
        description: "Chemical exposure reported",
        status: "RISKY"
    },
    {
    id: 6,
    description: "Fire accident reported",
    status: "RISKY"
    }
];

// MAP METHOD
const reportDescriptions = reports.map(report => {
    return report.description;
});

console.log("ALL REPORT DESCRIPTIONS:");
console.log(reportDescriptions);

// FILTER METHOD
const riskyReports = reports.filter(report => {
    return report.status === "RISKY";
});

console.log("RISKY REPORTS:");
console.log(riskyReports);

// FIND METHOD
const selectedReport = reports.find(report => {
    return report.id === 3;
});

console.log("SEARCHED REPORT:");
console.log(selectedReport);

// SUMMARY
console.log("TOTAL REPORTS:", reports.length);
console.log("RISKY REPORTS:", riskyReports.length);
console.log("ROUTINE REPORTS:", reports.filter(report => report.status === "ROUTINE").length);