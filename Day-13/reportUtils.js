
export function classifyReport(report) {
    const riskyKeywords = [
        "fell",
        "accident",
        "chemical",
        "fire",
        "failure",
        "dangerous"
    ];

    const text = report.toLowerCase();

    return riskyKeywords.some(keyword => text.includes(keyword))
        ? "RISKY"
        : "ROUTINE";
}

export function countRiskyReports(reports) {
    return reports.filter(report => report.status === "RISKY").length;
}

export function countRoutineReports(reports) {
    return reports.filter(report => report.status === "ROUTINE").length;
}
