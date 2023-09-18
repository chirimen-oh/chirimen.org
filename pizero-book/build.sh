#!/bin/bash

echo 'remove old html'
rm ../pizero/readme.html
rm ./pizero-book.pdf

echo 'build start'
npm run build
