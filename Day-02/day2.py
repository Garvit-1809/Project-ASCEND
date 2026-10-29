import csv
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


def classify_report(report_text):
    text = report_text.lower()

    risky_keywords = [
        "fire",
        "injury",
        "unsafe",
        "leak",
        "accident",
        "fall",
        "fell",
        "hazard",
        "smoke",
        "electric shock",
        "failure",
        "restricted area",
        "dangerous chemical",
        "chemical exposure",
        "exposure"
    ]

    for keyword in risky_keywords:
        if keyword in text:
            return "RISKY"

    return "ROUTINE"


def read_reports(file_path):
    reports = []

    try:
        with open(file_path, "r", newline="", encoding="utf-8-sig") as file:
            reader = csv.DictReader(file)

            if not reader.fieldnames or "report_text" not in reader.fieldnames:
                print("Error: CSV must contain a report_text column.")
                return []

            for row in reader:
                report = (row.get("report_text") or "").strip()

                if report:
                    reports.append(report)

    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return []

    except (OSError, csv.Error) as error:
        print(f"Error reading CSV: {error}")
        return []

    return reports


def analyze_reports(reports):
    results = []

    for report in reports:
        classification = classify_report(report)

        results.append({
            "report_text": report,
            "classification": classification
        })

    return results


def save_results(results, output_path):
    try:
        with open(output_path, "w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(
                file,
                fieldnames=["report_text", "classification"]
            )

            writer.writeheader()
            writer.writerows(results)

        return True

    except OSError as error:
        print(f"Error saving results: {error}")
        return False


def print_summary(results):
    total = len(results)

    risky = sum(
        1 for result in results
        if result["classification"] == "RISKY"
    )

    routine = total - risky

    print("\n===== SAFETY REPORT SUMMARY =====")
    print(f"Total reports  : {total}")
    print(f"Risky reports  : {risky}")
    print(f"Routine reports: {routine}")
    print("=================================")


def main():
    input_path = BASE_DIR / "input_reports.csv"
    output_path = BASE_DIR / "analyzed_reports.csv"

    reports = read_reports(input_path)

    if not reports:
        print("No reports available for analysis.")
        return

    results = analyze_reports(reports)

    print("\n===== INDIVIDUAL REPORT RESULTS =====")

    for index, result in enumerate(results, start=1):
        print(f"{index}. {result['report_text']}")
        print(f"   Classification: {result['classification']}")

    if save_results(results, output_path):
        print_summary(results)
        print(f"\nResults saved to: {output_path}")


if __name__ == "__main__":
    main()