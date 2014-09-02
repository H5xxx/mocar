#! /bin/sh

BRANCH="gh-pages"
PAGE="html/index.html"
TARGET="./index.html"
DATE=`date`

# checkout to gh-pages
git checkout -B $BRANCH

if [ $? -eq 0 ]; then
    echo "[DONE] CHECKOUT TO '$BRANCH'"
else
    echo "[FAIL] CHECKOUT TO '$BRANCH'"
    exit 0
fi


# adjust page resource path & output to ./index.html
sed "s/\.\.\//\.\//g" $PAGE > $TARGET

if [ $? -eq 0 ]; then
    echo "[DONE] PROCESS PAGE $PAGE"
else
    echo "[FAIL] PROCESS PAGE $PAGE"
    exit 0
fi

# add & commit change
git add $TARGET
git commit -m "AUTO PUBLISH @ $DATE"

if [ $? -eq 0 ]; then
    echo "[DONE] COMMIT CHANGE"
else
    echo "[FAIL] COMMIT CHANGE"
    exit 0
fi

# push
git push origin $BRANCH

if [ $? -eq 0 ]; then
    echo "[DONE] PUSH"
else
    echo "[FAIL] PUSH"
    exit 0
fi

# checkout back to master
git checkout master
rm index.html

if [ $? -eq 0 ]; then
    echo "[DONE] CHECKOUT BACK TO 'master'"
else
    echo "[FAIL] CHECKOUT BACK TO 'master'"
    exit 0
fi

echo "PUBLISH DONE."