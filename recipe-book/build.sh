#!/bin/bash

clear

echo 'remove old html'
find docs/ -type f -name "*.html" -exec rm {} \;

npm run generate-toc

echo 'remove old pdf'
rm "CHIRIMEN 対応デバイスレシピ集.pdf"

echo 'build start'
npm run build

echo 'move book folder'
mv -f "CHIRIMEN 対応デバイスレシピ集.pdf" book/
