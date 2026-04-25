#!/bin/sh
# Скрипт создает локальную ветку dev/auto и пушит её в origin
set -e

REMOTE="origin"
BRANCH="dev/auto"

echo "Fetching from $REMOTE..."
git fetch "$REMOTE"

# Если ветка уже существует локально — просто переключаемся на неё
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  echo "Local branch '$BRANCH' exists. Checking out..."
  git checkout "$BRANCH"
else
  # Попробуем создать ветку, если уже есть удалённая — отслеживать её
  if git ls-remote --exit-code --heads "$REMOTE" "$BRANCH" > /dev/null 2>&1; then
    echo "Remote branch '$BRANCH' exists. Creating local tracking branch..."
    git checkout -b "$BRANCH" --track "$REMOTE/$BRANCH"
  else
    echo "Creating new branch '$BRANCH'..."
    git checkout -b "$BRANCH"
  fi
fi

echo "Pushing '$BRANCH' to $REMOTE..."
git push -u "$REMOTE" "$BRANCH"

echo "Branch '$BRANCH' is ready and pushed to $REMOTE."
