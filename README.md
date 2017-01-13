## Dependencies

* [node.js](https://nodejs.org/en/). You can download it from nodejs.com, or install it through your favorite package manager (i.e. `apt-get install node`).
* Once node.js is installed, navigate to the root of this repository and run `npm install` to install remaining dependencies.

    cd /my/repos/cardinal
    npm install

## Running in development mode

Once you've completed the steps in the dependencies section:

    cd /my/repos/cardinal
    npm start

Then navigate to `http://localhost:8080` in your browser.

## Building for production

    cd /my/repos/cardinal
    npm run production

## Deploying

All of Cardinal's logic is in the client, so all you need is a static web server. Just upload the contents of `/my/repos/cardinal/production` to your favorite static web server.