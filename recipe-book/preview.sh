#!/bin/bash

clear

echo 'build toc'
npm run generate-toc

echo 'preview start'
npm run preview
