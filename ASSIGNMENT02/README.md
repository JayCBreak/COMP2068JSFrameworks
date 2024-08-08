# COMP2068-Assignment2
This is the repository of information regarding Jacob's Assignment 2 for COMP2068 at Georgian College

## Live Site
You can find a link to the live site [here](https://comp2068jsframeworks-aq5c.onrender.com)

## Functionality
1. A full website using Express with HBS using CSS and bootstrap for styling
2. A Homepage
3. A shared header and footer
4. A readonly database when not logged in
5. User registration with login both locally and with github
6. Full CRUD operations when user is logged in
7. Additional features of using offsite links for images and copying summon commands to the clipboard using clipboardy
8. Comments in the files
9. Version control
10. Cloud Hosting Deployment

## Additional Feature
The additional feature of the Minecraft Hostile Mob Database (this app) was having remote hosting of the images for all the mobs so that there is minimal footprint when hosted and having a button that adds the command to summon the mob in game. The first was planned with using fancy NPM packages; however, it was much easier and safer to use a link to other websites. This is much easier for the end user to add and change the image without incurring high hosting costs or dealing with converting user input to safe API calls. The second feature was slightly more difficult to implement requiring the [clipboardy](https://www.npmjs.com/package/clipboardy) NPM package and a handlebars function in app.js called getSummonCommand which I created to handle the technical aspects of getting the right mod name (minecraft, aether, etc) and mob name (zombie, skeleton, etc). 


## Details
NAME: Jacob Chotenovsky
ID: 200545482


