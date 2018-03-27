# QR Code Progressive Web App

A template you can use to quickly build a progressive web app that works online, offline, in a browser and as a mobile app

## Create your app

Clone this repo (or just copy the bits you need)

The main files to edit are:  
- [public/index.html](public/index.html) The main page for your app
- [public/scripts/app.js](public/scripts/app.js) This contains the javascript to handle the logic in your app.
- [images/icons](images/icons) Create square icons of the number of pixels for each size and save them here.

## Using the app

- Open `index.html` within the public folder
- Install a service worker for your browser, if you haven't already (eg [Web Server for Chrome](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/#install_and_verify_web_server))
- Browsers may also ask if you want to include the app on your homescreen

## What's included

- For styling, this has materialize.js and css from [materializecss.com](http://materializecss.com/). Remove or replace it if you prefer something different.
- [public/service-worker.js](public/service-worker.js) Currently this will cache the app's files for quick local access. Read more about Service Workers [here](https://developers.google.com/web/fundamentals/primers/service-workers/).
- [public/manifest.json](public/manifest.json) A JSON file specifies how your app appears to the user in the areas that they would expect to see apps (for example the mobile home screen), direct what the user can launch and more importantly how they can launch it. Read more about this [here](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/#support_native_integration).

## Hosting

- Sign up to firebase  
- Download and install the firebase CLI tools  
- Within your project folder:
  - `firebase init`
  - `firebase deploy`

## Examples

Here is an example I have made, hosted on firebase:
- [ryandav/qr-code-pwa](https://github.com/ryandav/qr-code-pwa)
- [qr-code-pwa.firebaseapp.com/](https://qr-code-pwa.firebaseapp.com/)

## Resources

The resources used to create this app:

- https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/
