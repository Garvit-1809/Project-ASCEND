import csv
from pathlib import Path


BASE_DIR = Path(__file__).parent

INPUT_FILE = BASE_DIR / "input_reports.csv"
OUTPUT_FILE = BASE_DIR / "analyzed_reports.csv"


RISKY_KEYWORDS = [
    "fell",
    "machine failure",
    "restricted area",
    "dangerous chemical",
    "exposure"
]


def analyze_report(report_text):
    text = report_text.lower()

    for keyword in RISKY_KEYWORDS:
        if keyword in text:
            return "RISKY"

    return "ROUTINE"


def process_reports():
    total_reports = 0
    risky_count = 0
    routine_count = 0

    with open(INPUT_FILE, "r", newline="", encoding="utf-8-sig") as file:
        reader = csv.DictReader(file)

        if not reader.fieldnames or "report_text" not in reader.fieldnames:
            raise ValueError(
                "CSV must contain a 'report_text' column."
            )

        with open(
            OUTPUT_FILE,
            "w",
            newline="",
            encoding="utf-8"
        ) as output_file:

            fieldnames = ["report_text", "classification"]

            writer = csv.DictWriter(
                output_file,
                fieldnames=fieldnames
            )

            writer.writeheader()

            for row in reader:
                report = (row.get("report_text") or "").strip()

                if not report:
                    continue

                result = analyze_report(report)

                writer.writerow({
                    "report_text": report,
                    "classification": result
                })

                total_reports += 1

                if result == "RISKY":
                    risky_count += 1
                else:
                    routine_count += 1

                print(f"Report: {report}")
                print(f"Classification: {result}")
                print("-" * 40)

    print("\n========== SUMMARY ==========")
    print(f"Total reports: {total_reports}")
    print(f"Risky reports: {risky_count}")
    print(f"Routine reports: {routine_count}")
    print(f"Results saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    process_reports()