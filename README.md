## composed date
   2022 - 1- 23

## title
   -React-lottie-game Emotion (sb08)

## deploy in local 
  - npm install
  - npm start

## build project to server.
  - npm build

## build
  - npm run script build

## file structure
  1. public
   - fonts
   - images (includeing svgs)
   - sounds
   - index.html and ee01_0wth_pl1.html (server will call this file)
  2. src
     - components
     App.js      - controlling each scene
     BaseShot.js - responsive for all device and control background effect
     BaseProp.js - parent prop function component.
     BaaseImage.js - parent Image function component
   - Scenes
     contain from scene1 to scene22
   - stylesheets
     includes needed stylesheets for this project(styles.css).
   - utills
     loadAnimation.js - import animation data from public/lottieFiles
     loadSound.js     - import sound data from public/sounds
     loadSVG.js       - import svg from public/images

 ## node version
    node 14.xx.xx - 16.xx.xx (last version)