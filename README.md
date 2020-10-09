# react-graphql-databases

The goal of this project is to implement two **frontend** [`ReactJS`](https://reactjs.org/) applications, `author-book-ui` and `book-review-ui`. They will consume the [`GraphQL`](https://graphql.org/) endpoints of the two **backend** applications present in the project [`springboot-graphql-databases`](https://github.com/ivangfr/springboot-graphql-databases), `author-book-api` and `book-review-api`.

## Project Diagram

![project-diagram](images/project-diagram-FE.png)

## Applications

- ### author-book-ui

  `ReactJS` UI application where **staff members** can manage authors and books and **customers** can see the books and read/add book reviews and their rating. Its main backend application is `author-book-api` but all the reviews information are obtained from `book-review-api`. It uses [`Semantic UI React`](https://react.semantic-ui.com/) as CSS-styled framework.

- ### book-review-ui

  `ReactJS` UI application where **staff members** can manage books and **customers** can see the books and read/add book reviews and their rating. Its backend application is `book-review-api`. It uses [`Material UI`](https://material-ui.com/) as CSS-styled framework. 

## Prerequisites

- [`npm`](https://www.npmjs.com/get-npm)
- [`springboot-graphql-databases`](https://github.com/ivangfr/springboot-graphql-databases)

  - In a terminal, run the command below to clone `springboot-graphql-databases` project
    ```
    git clone https://github.com/ivangfr/springboot-graphql-databases.git
    ```

  - Build `author-book-api` and `book-review-api` docker images as described at https://github.com/ivangfr/springboot-graphql-databases#build-docker-images

## Running ReactJS apps with Npm

- First, you need to start the environment and backend applications. For it, follow the instructions at [Start Environment](https://github.com/ivangfr/springboot-graphql-databases#start-environment) and [Running applications with Maven](https://github.com/ivangfr/springboot-graphql-databases#running-applications-with-maven)

- Run the frontend applications with [`Npm`](https://www.npmjs.com/).

  - **author-book-ui**

    - Open a new terminal and go to `react-graphql-databases/author-book-ui`

    - Execute the command below if you are running `author-book-ui` for the first time
      ```
      npm install
      ```

    - To start `author-book-ui` run
      ```
      npm start
      ```

  - **book-review-ui**

    - Open a new terminal and go to `react-graphql-databases/book-review-ui`

    - Execute the command below if you are running `book-review-ui` for the first time
      ```
      npm install
      ```

    - To start `book-review-ui` run
      ```
      npm start
      ```

## Running ReactJS apps as Docker Containers

### Build Docker Images

- **author-book-ui**

  In a terminal and inside `react-graphql-databases/author-book-ui`, run the following command
  ```
  docker build -f Dockerfile -t docker.mycompany.com/author-book-ui:1.0.0 .
  ```

  | Environment Variable   | Description                                                         |
  | ---------------------- | ------------------------------------------------------------------- |
  | `AUTHOR_BOOK_API_HOST` | Specify host of the `author-book-api` service (default `localhost`) |
  | `AUTHOR_BOOK_API_PORT` | Specify port of the `author-book-api` service (default `8080`)      |
  | `BOOK_REVIEW_API_HOST` | Specify host of the `book-review-api` service (default `localhost`) |
  | `BOOK_REVIEW_API_PORT` | Specify port of the `book-review-api` service (default `9080`)      |

- **book-review-ui**

  In a terminal and inside `react-graphql-databases/book-review-ui`, run the following command
  ```
  docker build -f Dockerfile -t docker.mycompany.com/book-review-ui:1.0.0 .
  ```

  | Environment Variable   | Description                                                         |
  | ---------------------- | ------------------------------------------------------------------- |
  | `BOOK_REVIEW_API_HOST` | Specify host of the `book-review-api` service (default `localhost`) |
  | `BOOK_REVIEW_API_PORT` | Specify port of the `book-review-api` service (default `9080`)      |

### Configure /etc/hosts

Add the line below to `/etc/hosts`
```
127.0.0.1 author-book-api book-review-api
```

### Start environment

- First, you need to start the environment and backend applications. For it, follow the instructions at [Start Environment](https://github.com/ivangfr/springboot-graphql-databases#start-environment) and [Running Applications as Docker containers](https://github.com/ivangfr/springboot-graphql-databases#running-appplications-as-docker-containers)

- In a terminal, make sure you are inside `react-graphql-databases` root folder. Then, run following script
  ```
  ./start-apps.sh
  ```

## Applications URLs

| Application    | URL                   |
| -------------- | --------------------- |
| author-book-ui | http://localhost:3000 |
| book-review-ui | http://localhost:3001 |

## Demo

- This gif shows a staff member adding a book using the wizard option. First, he looks for the author `josh long`. The search is looking for data at [**openlibrary.org**](https://openlibrary.org/). Then, he picks the book `Getting Started With Roo`. As the author `Josh Long` is new to the application, he is created. The information of the book is already fulfilled based on the response from **openlibrary.org**. Finally, the application shows the preview of the book card, as the customer will see it. The checkbox is enabled in order to create the book also in `book-review-ui`.

  ![add-book-wizard](images/add-book-wizard.gif)

- This another gif shows a customer adding a review about the book `Getting Started With Roo`. Once the review is submitted, it is already available for customer checking books in `author-book-ui` application.

  ![add-book-review](images/add-book-review.gif)

## Shutdown

- Stop applications

  - If they were started with `Npm`, go to the terminals where they are running and press `Ctrl+C`
  
  - If they were started as a Docker container, inside `react-graphql-databases` root folder, run the script below
    ```
    ./stop-apps.sh
    ```

- Finally, follow the shutdown steps for backend applications as described at [Shutdown](https://github.com/ivangfr/springboot-graphql-databases#shutdown)

## How to upgrade application's dependencies to latest version

- In a terminal, make sure you are inside `react-graphql-databases/author-book-ui` or `springboot-react-keycloak/book-review-ui` folder

- Run the following commands
  ```
  npm i -g npm-check-updates
  ncu -u
  npm install
  ```

## TODO

- Add confirmation dialog before deleting a book or a author

## References

- https://mherman.org/blog/dockerizing-a-react-app/
- https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/