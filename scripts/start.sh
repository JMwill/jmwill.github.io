BUNDLE_PATH=$(find ./dist -name bundle.js)
CSS_VERSION=$(md5sum assets/styles/index.css | head -c 8)
HTML_CONTENT=$(cat src/index.html)


echo $HTML_CONTENT | sed 's/{{BUNDLE_PATH}}/'"$(sed 's/[\/\.]/\\&/g' <<< "$BUNDLE_PATH")"'/g' | sed 's/{{CSS_VERSION}}/'"$CSS_VERSION"'/g' > index.html
