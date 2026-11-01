from pathlib import Path

from report_utils import (
    read_reports,
    analyze_reports,
    save_results,
    print_summary
)


def main():
    base_dir = Path(__file__).resolve().parent

    input_file = base_dir / "input_reports.csv"
    output_file = base_dir / "analyzed_reports.csv"

    reports = read_reports(input_file)
    results = analyze_reports(reports)

    print_summary(results)
    save_results(results, output_file)

    print(f"\nResults saved to: {output_file}")


if __name__ == "__main__":
    main()