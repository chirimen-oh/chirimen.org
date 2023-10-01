#!/bin/bash

clear

echo 'remove old html'
find docs/ -type f -name "*.html" -exec rm {} \;

npm run generate-toc

echo 'remove old pdf'
rm "CHIRIMEN Raspberry Pi Zero W チュートリアル.pdf"

echo 'build start'
npm run build
