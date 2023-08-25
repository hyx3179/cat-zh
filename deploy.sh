#!/bin/bash
getCompiler() {
	if ! [ -f "./compiler.jar" ]; then
		wget -q https://repo1.maven.org/maven2/com/google/javascript/closure-compiler/v20220405/closure-compiler-v20220405.jar -O ./compiler.jar
	fi
}
build() {
	if [ -d "./public" ]; then
		echo "Need to run 'deploy.sh clear'"
		exit 1
	fi

	echo "Start building"
	mkdir ./public
	cp -r ./res ./public/res

	echo "Handling JavaScript"
	for file in KGP.js config.js core.js game.js i18n.js; do
		google-closure-compiler --js ./"$file" --js_output_file ./public/"$file"
		#java -jar ./compiler.jar --js ./"$file" --js_output_file ./public/"$file"
	done
	while IFS= read -r -d '' file; do
		google-closure-compiler --js "$file" --js_output_file ./public/"$file"
		#java -jar ./compiler.jar --js "$file" --js_output_file ./public/"$file"
	done < <(find ./js -type f -print0)
	mkdir ./public/lib
	for i in react.min.js jQuery.js dojo.xd.js lz-string.js system.js; do
		cp ./lib/$i ./public/lib/
	done

	echo "Handling other files"
	cp ./changelog.html ./public
	cp ./index.html ./public
	cp ./server.json ./public
	cp ./updateLog.html ./public

	echo "Generate build version"
	wget -q https://hyx3179.github.io/cat-zh/build.version.json -O ./public/build.version.json
	node generate-buildver.js
	csplit -q -f sw- ./sw.js /--------------------------/
	cat sw-01 >>sw-public.js
	google-closure-compiler --js ./sw-public.js --js_output_file ./public/sw.js
	#java -jar ./compiler.jar --js ./sw-public.js --js_output_file ./public/sw.js

	mkdir ./public_Netlify
	cp -r ./public ./public_Netlify/cat-zh
	echo -e '/*\n  Access-Control-Allow-Origin: *' >./public_Netlify/_headers
	echo -e '/  /cat-zh/\n/NummonCalc/*  https://nummoncalc-hyx3179.netlify.app/:splat  200\n/scientists/*  https://scientists-hyx3179.netlify.app/:splat  200' >./public_Netlify/_redirects
}

clear() {
	rm -rf ./public*
	rm -rf ./sw-*
}

case "$1" in
clear)
	clear
	;;
build)
	#getCompiler
	build
	;;
esac

exit 0
