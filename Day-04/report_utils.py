import csv


def classify_report(text):
    risky_keywords = [
        "fall", "fell", "failure", "restricted area",
        "chemical exposure", "dangerous chemical", "exposure"
    ]

    text = text.lower()

    for keyword in risky_keywords:
        if keyword in text:
            return "RISKY"

    return "ROUTINE"


def read_reports(file_path):
    reports = []

    with open(file_path, "r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            text = row.get("report_text", "").strip()

            if text:
                reports.append(text)

    return reports


def analyze_reports(reports):
    return [
        {
            "report_text": report,
            "risk": classify_report(report)
        }
        for report in reports
    ]


def save_results(results, file_path):
    with open(file_path, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["report_text", "risk"]
        )
        writer.writeheader()
        writer.writerows(results)


def print_summary(results):
    total = len(results)
    risky = sum(item["risk"] == "RISKY" for item in results)

    print("\n===== SAFETY REPORT SUMMARY =====")
    print(f"Total reports  : {total}")
    print(f"Risky reports  : {risky}")
    print(f"Routine reports: {total - risky}")

    for index, item in enumerate(results, start=1):
        print(f"{index}. {item['report_text']} — {item['risk']}")