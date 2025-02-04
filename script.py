import os
import json

# 📂 Change this to your project directory
PROJECT_DIR = "."

def collect_files_and_structure(directory):
    files = {}
    structure = {}

    for root, dirs, filenames in os.walk(directory):
        rel_path = os.path.relpath(root, directory)
        structure[rel_path] = dirs  

        for filename in filenames:
            filepath = os.path.join(root, filename)
            rel_filepath = os.path.relpath(filepath, directory)

            if filename.endswith(('.html', '.css', '.js', '.json', '.md', '.py')):
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        files[rel_filepath] = f.read()
                except Exception as e:
                    print(f"❌ Error reading {filepath}: {e}")

    return files, structure

# Collect data
file_data, directory_structure = collect_files_and_structure(PROJECT_DIR)

# Save JSON to a file
output_file = "project_data.json"
with open(output_file, "w", encoding="utf-8") as json_file:
    json.dump({"files": file_data, "structure": directory_structure}, json_file, indent=4)

print(f"✅ Project data saved to {output_file}")
