#!/usr/bin/env bash

echo
echo "Starting author-book-ui ..."

docker run -d --rm --name author-book-ui -p 3000:80 \
  -e AUTHOR_BOOK_API_HOST=author-book-api -e BOOK_REVIEW_API_HOST=book-review-api \
  --network=springboot-graphql-databases_default \
  --health-cmd="curl -f http://localhost || exit 1" --health-start-period=20s \
  ivanfranchin/author-book-ui:1.0.0

echo
echo "Starting book-review-ui ..."

docker run -d --rm --name book-review-ui -p 3001:80 \
  -e BOOK_REVIEW_API_HOST=book-review-api \
  --network=springboot-graphql-databases_default \
  --health-cmd="curl -f http://localhost || exit 1" --health-start-period=20s \
  ivanfranchin/book-review-ui:1.0.0
