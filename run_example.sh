#!/bin/bash

# Ensure we're in the project root
cd "$(dirname "$0")"

# Run HTML example
echo "Generating HTML resume..."
cargo run -- --input ./src/test_data/test_input.json --output john_doe_resume.html --format html

# Run Markdown example
echo "Generating Markdown resume..."
cargo run -- --input ./src/test_data/test_input.json --output john_doe_resume.md --format markdown

echo "Done! Check john_doe_resume.html and john_doe_resume.md in the current directory."