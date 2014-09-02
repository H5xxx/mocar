#! /bin/sh

BRANCH="gh-pages"
PAGE="html/index.html"
TARGET="./index.html"
DATE=`date`

# checkout to gh-pages
git checkout -B $BRANCH
git pull origin $BRANCH

if [ $? -eq 0 ]; then
    echo "[DONE] CHECKOUT TO '$BRANCH'"
else
    echo "[FAIL] CHECKOUT TO '$BRANCH'"
    exit 0
fi


# merge & adjust page resource path & output to ./index.html
git merge master
sed "s/\.\.\/css/\.\/css/g; s/\.\.\/js/\.\/js/g" $PAGE > $TARGET
echo '<!-- '$DATE' -->' >> $TARGET

if [ $? -eq 0 ]; then
    echo "[DONE] MERGE CHANGE & PROCESS PAGE $PAGE"
else
    echo "[FAIL] MERGE CHANGE & PROCESS PAGE $PAGE"
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

if [ $? -eq 0 ]; then
    echo "[DONE] CHECKOUT BACK TO 'master'"
else
    echo "[FAIL] CHECKOUT BACK TO 'master'"
    exit 0
fi

echo "PUBLISH DONE."