#!/usr/bin/env bash
set -e

# Подготовка ветки dev/auto: создаёт/пересоздаёт и пушит в origin
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Preparing dev/auto branch..."

git fetch origin
# Создаём или пересоздаём локальную ветку dev/auto
git checkout -B dev/auto
# Пушим и устанавливаем upstream
git push -u origin dev/auto

echo "Branch dev/auto is ready."
