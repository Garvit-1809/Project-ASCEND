import csv
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


def classify_report(text):
    text = text.lower()

    risky_keywords = [
        "fell",
        "fire",
        "injury",
        "leak",
        "accident",
        "failure",
        "restricted area",
        "dangerous chemical",
        "exposure",
        "unsafe",
        "hazard",
        "smoke",
    ]

    for keyword in risky_keywords:
        if keyword in text:
            return "RISKY"

    return "ROUTINE"


def categorize_report(text):
    text = text.lower()

    categories = {
        "Fall": ["fell", "fall", "height"],
        "Equipment": ["machine", "equipment", "failure"],
        "Chemical": ["chemical", "exposure", "leak"],
        "Safety Violation": ["restricted area", "unsafe", "hazard"],
        "Fire": ["fire", "smoke"],
        "General": [],
    }

    for category, keywords in categories.items():
        if any(keyword in text for keyword in keywords):
            return category

    return "General"


def read_reports(file_path):
    reports = []

    try:
        with open(file_path, "r", newline="", encoding="utf-8-sig") as file:
            reader = csv.DictReader(file)

            if not reader.fieldnames or "report_text" not in reader.fieldnames:
                print("Error: CSV must contain a report_text column.")
                return None

            for row in reader:
                text = (row.get("report_text") or "").strip()

                if text:
                    reports.append(text)
                else:
                    print("Warning: Empty report skipped.")

    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None
    except (OSError, csv.Error) as error:
        print(f"Error reading CSV: {error}")
        return None

    return reports


def analyze_reports(reports):
    results = []

    for text in reports:
        results.append({
            "report_text": text,
            "risk": classify_report(text),
            "category": categorize_report(text),
        })

    return results


def save_results(results, file_path):
    fieldnames = ["report_text", "risk", "category"]

    try:
        with open(file_path, "w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(results)

        return True

    except OSError as error:
        print(f"Error saving results: {error}")
        return False


def print_summary(results):
    total = len(results)
    risky = sum(1 for item in results if item["risk"] == "RISKY")
    routine = total - risky

    print("\n===== SAFETY REPORT ANALYTICS =====")
    print(f"Total reports  : {total}")
    print(f"Risky reports  : {risky}")
    print(f"Routine reports: {routine}")

    print("\n===== CATEGORY-WISE SUMMARY =====")

    category_counts = {}

    for item in results:
        category = item["category"]
        category_counts[category] = category_counts.get(category, 0) + 1

    for category, count in category_counts.items():
        print(f"{category}: {count}")

    print("==================================")


def main():
    input_path = BASE_DIR / "input_reports.csv"
    output_path = BASE_DIR / "analyzed_reports.csv"

    reports = read_reports(input_path)

    if reports is None:
        return

    if not reports:
        print("No valid reports available for analysis.")
        return

    results = analyze_reports(reports)

    print("\n===== INDIVIDUAL REPORT RESULTS =====")

    for index, item in enumerate(results, start=1):
        print(f"{index}. {item['report_text']}")
        print(f"   Risk: {item['risk']} | Category: {item['category']}")

    if save_results(results, output_path):
        print_summary(results)
        print(f"\nResults saved to: {output_path}")


if __name__ == "__main__":
    main()