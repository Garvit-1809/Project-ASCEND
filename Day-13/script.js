
import {
    classifyReport,
    countRiskyReports,
    countRoutineReports
} from "./reportUtils.js";

const reports = [
    "Worker fell from height",
    "Safety training completed",
    "Machine failure detected",
    "Equipment inspection completed",
    "Dangerous chemical exposure"
];

const analyzedReports = reports.map(report => {
    return {
        description: report,
        status: classifyReport(report)
    };
});

console.log("===== SAFETY REPORT ANALYSIS =====");

analyzedReports.forEach(report => {
    console.log(report.description + " - " + report.status);
});

console.log("------------------------------");
console.log("Total Reports:", analyzedReports.length);
console.log("Risky Reports:", countRiskyReports(analyzedReports));
console.log("Routine Reports:", countRoutineReports(analyzedReports));
