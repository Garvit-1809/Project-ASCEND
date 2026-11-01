import json
import requests
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


def fetch_posts():
    url = "https://jsonplaceholder.typicode.com/posts"

    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()

        posts = response.json()

        if not isinstance(posts, list):
            print("Invalid API response.")
            return None

        print(f"Successfully fetched {len(posts)} posts.")
        return posts

    except requests.RequestException as error:
        print(f"API request failed: {error}")
        return None


def analyze_posts(posts):
    analyzed_posts = []

    for post in posts:
        analyzed_posts.append({
            "post_id": post.get("id"),
            "user_id": post.get("userId"),
            "title": post.get("title"),
            "body": post.get("body")
        })

    return analyzed_posts


def save_posts(posts):
    output_file = BASE_DIR / "posts_data.json"

    with open(output_file, "w", encoding="utf-8") as file:
        json.dump(posts, file, indent=4, ensure_ascii=False)

    print(f"Data saved to: {output_file}")


def main():
    posts = fetch_posts()

    if posts is None:
        return

    analyzed_posts = analyze_posts(posts)
    save_posts(analyzed_posts)

    print("\n===== DATA SUMMARY =====")
    print(f"Total posts: {len(analyzed_posts)}")
    print(f"Unique post IDs: {len(set(post['post_id'] for post in analyzed_posts))}")

    print("\nFirst 3 posts:")

    for post in analyzed_posts[:3]:
        print(f"\nID: {post['post_id']}")
        print(f"Title: {post['title']}")


if __name__ == "__main__":
    main()
