#!/bin/bash

# Create recipe-book directory if it doesn't exist
mkdir -p recipe-book

# Remove existing files
rm -f recipe-book/index.md
rm -rf recipe-book/*

# Create index.md with header
echo "# CHIRIMEN ESM Examples" > recipe-book/index.md
echo -e "\n## レシピ一覧\n" >> recipe-book/index.md

# Find all readme.md files and process them
find esm-examples -name "readme.md" -type f | sort | while read -r file; do
    # Extract directory name (example name)
    example_name=$(basename $(dirname "$file"))
    example_dir=$(dirname "$file")
    output_dir="recipe-book/${example_name}"

    # Create example directory
    mkdir -p "$output_dir"

    # Add to index.md
    echo "- [${example_name}](./${example_name}/index.md)" >> recipe-book/index.md

    # Create index.md for the example
    echo -e "# ${example_name}" > "${output_dir}/index.md"

    # Add content from readme.md, skipping first heading
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip the first heading as we already added it
        if [[ $line =~ ^#[^#] ]] && ! $read_first_heading; then
            read_first_heading=true
            continue
        fi

        # If the line contains an image reference, update the path
        if [[ $line =~ !\[.*\]\(\./(.*)\) ]]; then
            # Copy the image to the recipe-book directory
            image_path="${example_dir}/${BASH_REMATCH[1]}"
            if [ -f "$image_path" ]; then
                cp "$image_path" "${output_dir}/"
                # Update the image path in the markdown
                modified_line=${line/.\//}
                echo "$modified_line" >> "${output_dir}/index.md"
            else
                echo "$line" >> "${output_dir}/index.md"
            fi
        else
            echo "$line" >> "${output_dir}/index.md"
        fi
    done < "$file"

    # Add main.js source code if it exists
    main_js="${example_dir}/main.js"
    if [ -f "$main_js" ]; then
        echo -e "\n## サンプルコード (main.js)\n" >> "${output_dir}/index.md"
        echo -e '```javascript' >> "${output_dir}/index.md"
        cat "$main_js" >> "${output_dir}/index.md"
        echo -e '```\n' >> "${output_dir}/index.md"
    fi

    # Copy Schematic.png if it exists
    schematic="${example_dir}/Schematic.png"
    if [ -f "$schematic" ]; then
        cp "$schematic" "${output_dir}/"
    fi

    # Add back to index link
    echo -e "\n---\n[← 目次に戻る](../index.md)" >> "${output_dir}/index.md"
done

# Add footer to index.md
echo -e "\n---\n" >> recipe-book/index.md

# Make the script executable
chmod +x collect_docs.sh
