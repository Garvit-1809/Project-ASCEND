import json
from pathlib import Path

report = {
    "report_text": "Dangerous chemical exposure reported",
    "risk": "RISKY",
    "category": "Chemical"
}

# Python dictionary ko JSON string mein convert karo
json_data = json.dumps(report, indent=4)

print("JSON DATA:")
print(json_data)

# JSON string ko Python dictionary mein convert karo
python_data = json.loads(json_data)

print("\nREPORT DETAILS:")
print("Text:", python_data["report_text"])
print("Risk:", python_data["risk"])
print("Category:", python_data["category"])

# JSON ko file mein save karo
output_file = Path(__file__).resolve().parent / "report.json"

with open(output_file, "w", encoding="utf-8") as file:
    json.dump(report, file, indent=4)

print(f"\nJSON saved to: {output_file}")
