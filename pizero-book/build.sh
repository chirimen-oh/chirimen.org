#!/bin/bash

clear

echo 'remove old html'
rm ../pizero/readme.html
rm ../chirimenGeneric/readme.html
rm ./pizero-book.pdf

echo 'build start'
npm run build
