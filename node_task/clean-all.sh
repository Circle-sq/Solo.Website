#!/bin/bash

# Check if we are in a Unix-like environment
if [ "$(uname -s)" = "Windows_NT" ] && [ -z "$WSL_DISTRO_NAME" ]; then
    echo "Error: This script must be run in a Unix-like environment (Linux, macOS, or WSL)"
    exit 1
fi

# Check if we have the necessary permissions
if [ ! -w "." ]; then
    echo "Error: Current directory is not writable"
    exit 1
fi

echo "Starting deep clean..."

# Delete main build and cache directories
directories_to_remove=(
    "node_modules"
    "build"
    "dist"
    ".nx"
    ".cache"
    ".eslintcache"
    ".vite"
    "coverage"
    "storybook-static"
    "playwright-report"
    "test-results"
    ".swc"
)

# Use -f to avoid errors if the files do not exist
for dir in "${directories_to_remove[@]}"; do
    if [ -d "$dir" ]; then
        echo "Removing $dir..."
        rm -rf "$dir" || echo "Warning: Could not remove $dir"
    fi
done

# Delete all temporary Vite files from the project
echo "Removing Vite temporary files..."
find . -type f -name "*.timestamp-*.mjs" -delete 2>/dev/null || true
find . -type f -name "vite.config.mts.timestamp-*.mjs" -delete 2>/dev/null || true

# Clean in the libs directories
if [ -d "libs" ]; then
    echo "Cleaning libraries..."
    for d in libs/*/ ; do
        if [ -d "$d" ]; then
            echo "Cleaning $d..."
            rm -rf "${d}node_modules" 2>/dev/null || true
            rm -rf "${d}.swc" 2>/dev/null || true
            rm -rf "${d}dist" 2>/dev/null || true
            rm -rf "${d}.nx" 2>/dev/null || true
            rm -rf "${d}.vite" 2>/dev/null || true
            find "$d" -type f -name "*.timestamp-*.mjs" -delete 2>/dev/null || true
        fi
    done
fi

# Clean npm cache
echo "Cleaning npm cache..."
if command -v npm >/dev/null 2>&1; then
    npm cache clean --force
else
    echo "Warning: npm not found, skipping cache clean"
fi

echo "Deep clean completed!"