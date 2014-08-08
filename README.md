Portfolio Site of Alexander Wolfe
=========
I've create the project as a public repo so that you can view the code easily to learn how this project was created.

## Tech Stack
- Gulp - The stream build process http://gulpjs.com/
- Bower - A package manager for the web http://bower.io/
- Harp - Static site framework http://harpjs.com/
- Sass - CSS preprocessor http://sass-lang.com/

## Setup & Installation
- `$ bower install` Downloads all the bower dependancies
- `$ brew install imagemagick` Required for image resizing
- `$ brew install graphicsmagick` Required for image resizing
- `$ npm install` install node modules or `$ sudo npm install`
- `$ firebase init` Setup firebase hosting, follow command line instructions

## Build Locally
- `$ gulp` Run gulp to build the site
- `http://localhost:8000` Local site address

## Build for Production
- `$ firebase login` You may have to login or init.
- `$ gulp deploy` Creates a production build and deploys to firebase
