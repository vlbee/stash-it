# react-boilerplate
A minimal React app boilerplate with Jest testing, PostCSS and Parcel bundler set up

This contains a collection of useful file setup I've been using so far to get started with a simple, client-side only React app, whilst also providing for testing and CSS processing.  


## Instructions

#### Install locally: 

```
git clone https://github.com/vlbee/react-boilerplate.git
npm i 
```

#### Available scripts: 
```
npm test
npm run test:watch
npm start 
npm run build
```

## Folder Structure

```
react-boilerplate
├── __mocks__
│   ├── fileMock.js
│   └── styleMock.js
├── package-lock.json
├── package.json
└── src
    ├── assets
    │   └── favicon.ico
    ├── components
    │   ├── app.js
    │   ├── button
    │   │   ├── button.css
    │   │   ├── button.js
    │   │   └── button.test.js
    │   └── errorBoundary.js
    ├── index.html
    ├── index.js
    ├── styles
    │   ├── _normalize.css
    │   └── styles.css
    └── utils
        └── fetch.js
```

### Notes

#### Bundling: 

Bundling is being handled by Parcel. Build files will be outputed into `.cache` and `dist` folders.
CSS and JS file will automatically be minified with the 'npm run build' script. 

Minifiers are not used with hot module replacement when running the `npm start` script.


#### Testing:

`__mocks__` - this folder contains mock files to be ignored when running Jest tests. 

Package.json config: 
```
 "jest": {
    "moduleNameMapper": {
      "\\.(css|less|styl|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
    }
 ```
    
 
#### CSS:
 
 Includes PostCSS set up with Autoprefixer and Normalize.css. 
 
 
