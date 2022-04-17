# Range component test


### Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Quick start](#quick-start)
* [Check out](#check-out)
* [Docker](#docker)

### General info
 - It shows a range slider component working in two modes:
    * **Normal**: the user can select a range of values between a minimum and a maximum value.
    * **Fixed**: the user can select a fixed values between a minimum and a maximum value.

 - It is required to get installed:
    - git 
    - npm
  
### Technologies
  - React (Hooks)
  - Sass
  - React-testing-library


### Setup
To run this project, install it locally using npm:

```
 git clone git@github.com:DevlopFE/range-test.git 
 cd range-test
 npm install

```

### Quick start

#### To run in development:
```
npm start

```

#### To build:
```
npm run build

```

It is possible to check:
```
yarn global add serve
serve -s build
```

#### Running tests:
```
npm test

```

### Docker
Build the docker image:
```bash
docker build . -t range-test 
```

Run the docker image:
```bash
docker run --rm -p 5000:8080 range-test
```

Visit http://localhost:5000
