#!/usr/bin/env bash

cd author-book-ui
docker build -f Dockerfile -t ivanfranchin/author-book-ui:1.0.0 .

cd ../book-review-ui
docker build -f Dockerfile -t ivanfranchin/book-review-ui:1.0.0 .

cd ..
