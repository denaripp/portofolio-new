import re
import json

with open("public/assets/obsidian_dump.html", "r", encoding="utf-8") as f:
    html = f.read()

# Extract title
m_title = re.search(r"<title>(.*?)</title>", html)
print("TITLE:", m_title.group(1) if m_title else "N/A")

# Extract meta description
m_desc = re.search(r'<meta name="description" content="(.*?)">', html)
print("DESC:", m_desc.group(1) if m_desc else "N/A")

# Extract colors / theme info from styles or classes
classes = set(re.findall(r'class="([^"]+)"', html))
colors = set()
for c in classes:
    for word in c.split():
        if any(k in word for k in ['bg-', 'text-', 'border-']):
            colors.add(word)

print("\nSAMPLE CLASSES (50):", list(colors)[:50])

# Find all heading tags
print("\n--- ALL HEADINGS ---")
for h in re.finditer(r'<(h[1-5])[^>]*>(.*?)</\1>', html, re.DOTALL):
    text = re.sub(r'<[^>]+>', '', h.group(2)).strip()
    text = re.sub(r'\s+', ' ', text)
    if text:
        print(f"[{h.group(1).upper()}] {text}")

# Find key paragraphs
print("\n--- KEY PARAGRAPHS ---")
for p in re.finditer(r'<p[^>]*>(.*?)</p>', html, re.DOTALL):
    text = re.sub(r'<[^>]+>', '', p.group(1)).strip()
    text = re.sub(r'\s+', ' ', text)
    if len(text) > 30 and len(text) < 250:
        print(f"[P] {text}")
