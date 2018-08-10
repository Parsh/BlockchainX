# BlockchainX

BlockchainX is a full fledged blockchain application. More specifically it's a peer-to-peer electronic cash system, with cryptocurrency: CoinX. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

BlockchainX is built upon the Node.js which is a Javascript Runtime. Therefore, you'll need [Node](https://nodejs.org/en/) with version 8 or above in order successfully construct the project.  


### Installing

A step by step series of examples that tell you how to get a development env running

Start by cloning the repository to your machine.

```
$ git clone https://github.com/Parsh24/BlockchainX.git
```

Move into the cloned directory and perform npm install in order to install the dependencies (which will appear in the node_modules folder).

```
$ cd BlockchainX
$ npm install
```

Once the dependency installation completes, type in `npm start` and if you see the following output that implies that BlockchainX is successfully built.

```
$ npm start
$ > blockchainx@1.0.0 start /home/../BlockchainX
$ > node ./app

$ Listening for peer-to-peer connections on: 5000
$ Server up and listening at 3000

```

## Running the tests

Let's have a look at how to run the automated tests for this system in order to ensure that the BlockchainX system is properly integrated and nothing is broken.

### Prerequisites

The tests for BlockchainX are written using Jest, therefore, you have to install [jest](https://www.npmjs.com/package/jest) using the following command: 

```
$ npm install jest --save-dev
```

### Tests in action

There are 31 unit tests packed into 5 test suites that helps in ensuring that every dynamic component of the project is working as intended. Run the following command to execute the tests:

```
$ npm test
```

If you see the following output after the tests complete, it implies that no component of BlockchainX is broken.

```
Test Suites: 5 passed, 5 total
Tests:       31 passed, 31 total
Snapshots:   0 total
Time:        7.412s, estimated 10s
Ran all test suites.
```
