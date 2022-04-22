#!/bin/bash
wget https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/v20220405/closure-compiler-v20220405.jar -O ./compiler.jar
mkdir ./public
cp -r ./res ./public/res
for i in `ls *.js`
do
java -jar ./compiler.jar --js ./$i --js_output_file ./public/$i
done
rm ./public/generate-buildver.js
for i in `find ./js -type f`
do
java -jar ./compiler.jar --js $i --js_output_file ./public/$i
done
mkdir ./public/lib
for i in react.min.js jQuery.js dojo.xd.js lz-string.js system.js
do
cp ./lib/$i ./public/lib/
done
mkdir ./public/chs
cp ./chs/kf.css ./public/chs
java -jar ./compiler.jar --js ./chs/kf.js --js_output_file ./public/chs/kf.js
cp ./build.version.json ./public
cp ./changelog.html ./public
cp ./hyxLog.html ./public
cp ./server.json ./public
cp ./updateLog.html ./public
cp -r ./public ./public_Netlify
node generate-buildver.js
cat sw.js >> sw-GitHub.js
java -jar ./compiler.jar --js ./sw-GitHub.js --js_output_file ./public/sw.js
cat sw.js >> sw-Netlify.js
java -jar ./compiler.jar --js ./sw-Netlify.js --js_output_file ./public_Netlify/sw.js
cp ./index.html ./public
cp ./index_Netlify.html ./public_Netlify/index.html