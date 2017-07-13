## Bachelor fridge

### What is this?

This is Web application prototype of  which will help you to sort out with meals in your fridge and to cook something tasty.

### Setup

Download and install Node.js v7.x.x (or higher) release version for your platform from https://nodejs.org
```
https://nodejs.org
```

### Install dependencies (global)
```
npm install yarn node-gyp webpack webpack-dev-server -g
```

Yarn can be downloaded from here [link](https://yarnpkg.com/en/docs/install).

### Install dependencies (local)
```
yarn install
```

### Requirements

Node.js v7.x.x (or higher), Webpack v3.2.x, webpack-dev-server v2.x.x

#### Run the demo
For normal working you should start both client and server version

Client:
```
npm run start
```

Server:
```
npm run server (start api server side)
```

Open in browser http://localhost:1815/


### Additional info
For getting data from server please use http://localhost:8181/

#### Updating npm and yarn
```
npm install npm@latest yarn@latest -g
npm install webpack@latest -g
npm install webpack-dev-server@latest -g
```

#### Update all dependencies
````
yarn upgrade --latest
````

#### Create build (production)
````
npm run build
````

NOTE: Client structure was taken from [link](https://github.com/tj/frontend-boilerplate/).
