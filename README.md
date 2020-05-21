#Extra implementation
I've implemented this option:
```
Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities). 
```
If the picture doesn't exist for the destination you can see at the top this message:
"Picture not available for this destination :("

#Installation
```
npm run build-prod
```
This will make your .dist folder where everything is packed!
Once you have this folder you can start your server:
```
npm start
```
This will start the server at localhost:8000
Go to that direction and you should have everything working
If not check for the API keys that are commented @ app.js

#About
This is the last project for FEND Udacity, called Capstone-Travel App. 

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.