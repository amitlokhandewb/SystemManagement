#!/bin/bash

# Save this script in the parent folder and make it executable using `chmod +x start_all.sh`

# Check if the webshell directory name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 webshell"
  exit 1
fi

webshell_directory=$1

# Define the parent directory
parent_dir=$(pwd)

# Function to start an MFE
start_mfe() {
  local mfe_dir=$1
  echo "Starting $mfe_dir"
  cd "$mfe_dir" || exit
  npm run start:standalone &
  cd "$parent_dir"
}

# Function to start the webshell
start_webshell() {
  local webshell_dir=$1
  echo "Starting webshell in $webshell_dir"
  cd "$webshell_dir" || exit
  npm start &
  cd "$parent_dir"
}

# Iterate through directories in the parent folder
for dir in "$parent_dir"/*/; do
  # Remove the trailing slash from directory name
  dir=${dir%*/}
  # Get the base name of the directory
  dir_name=$(basename "$dir")
  
  # Check if the directory name starts with 'mfe'
  if [[ $dir_name == mfe* ]]; then
    start_mfe "$dir"
  elif [[ $dir_name == $webshell_directory ]]; then
    start_webshell "$dir"
  fi
done

# Wait for all background processes to finish
wait

echo "All processes started."
