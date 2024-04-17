#!/bin/bash

for file in config.js core.js game.js i18n.js build.version.json; do
    curl -o  ./"$file" "https://kittensgame.com/web/$file"
done
while IFS= read -r -d '' file; do
    curl -o  ./"$file" "https://kittensgame.com/web/$file"
done < <(find ./js -type f -print0)

while IFS= read -r -d '' file; do
    curl -o  ./"$file" "https://kittensgame.com/web/$file"
done < <(find ./res/i18n/crowdin -type f -print0)
curl -o  ./res/i18n/en.json "https://kittensgame.com/web//res/i18n/en.json"
