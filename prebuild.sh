#!/bin/bash
for f in ./html/*.html; do
    filename="$(basename $f)"
    html2jade "./html/$filename"
done
for f in ./html/*.jade; do
    filename="$(basename $f)"
    mv "./html/$filename" "./templates/$filename"
done
npm build
npm start
