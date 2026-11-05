export function classifyReport(report) {
    const riskyKeywords = [
        "accident",
        "fire",
        "chemical",
        "failure",
        "dangerous",
        "injury",
        "fall"
    ];

    const text = report.toLowerCase();

    return riskyKeywords.some(keyword => text.includes(keyword))
        ? "RISKY"
        : "ROUTINE";
}

export function getRiskyReports(reports) {
    return reports.filter(report => report.status === "RISKY");
}

export function getRoutineReports(reports) {
    return reports.filter(report => report.status === "ROUTINE");
}

export function getReportById(reports, id) {
    return reports.find(report => report.id === id);
}