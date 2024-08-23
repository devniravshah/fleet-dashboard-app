#!/bin/bash

# Function to list commits with their timestamps and prompts for user input
function list_commits_and_prompt {
  git log --format='%h %cd %s'
  read -p "Enter the commit hash to modify: " commit_hash
  read -p "Enter the new timestamp in YYYY-MM-DD HH:MM:SS format: " new_time
}

# Main script logic
list_commits_and_prompt

if [ -z "$commit_hash" ] || [ -z "$new_time" ]; then
  echo "Invalid input. Please provide a valid commit hash and timestamp."
  exit 1
fi

git rebase -i "$commit_hash^"

# Assuming the interactive rebase editor is open
# Replace 'pick' with 'edit' for the desired commit

git commit --amend --date="$new_time"
git rebase --continue