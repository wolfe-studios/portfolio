Portfolio Site of Alexander Wolfe
=========
I've create the project as a public repo so that you can view the code easily to learn how this project was created.

## Tech Stack
- Gulp - The stream build process http://gulpjs.com/
- Bower - A package manager for the web http://bower.io/
- Harp - Static site framework http://harpjs.com/
- Sass - CSS preprocessor http://sass-lang.com/

## Run Project Locally
- `$ bower install` Downloads all the bower dependancies
- `$ brew install imagemagick` Required for image resizing
- `$ brew install graphicsmagick` Required for image resizing
- `$ npm install` install node modules
- `$ gulp` Run gulp to build the site
- Open the browser at http://localhost:8000

## Build for Production
- `$ gulp production` Creates a production build
- `$ firebase deploy` Deploys website to Firebase Hosting
- Open the browser at [airwolfe.com](https://airwolfe.com)