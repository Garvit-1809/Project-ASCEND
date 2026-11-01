import json
import requests
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent


def fetch_post(post_id):
    url = f"https://jsonplaceholder.typicode.com/posts/{post_id}"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        data = response.json()

        print("\n===== API RESPONSE =====")
        print("Post ID:", data["id"])
        print("Title:", data["title"])
        print("Body:", data["body"])

        return data

    except requests.RequestException as error:
        print("API request failed:", error)
        return None


def save_to_json(data, file_path):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)

    print(f"\nData saved to: {file_path}")


def main():
    post_id = 10

    data = fetch_post(post_id)

    if data is not None:
        output_file = BASE_DIR / "api_response.json"
        save_to_json(data, output_file)


if __name__ == "__main__":
    main()