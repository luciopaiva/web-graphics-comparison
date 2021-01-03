
# Web graphics comparison

This is a very crude performance test to compare different approaches to visualizing 10k graphic elements on the screen. 

Tests made:

- React to render an SVG image
- vanilla JS to render a 2D canvas
- pixi.js to render a WebGL canvas

I started this as an experiment to see if I could rely on React to load thousands of elements on the screen. If you google it, you'll find several articles on how you should not render thousands of elements but virtualize them in windows and etc. This is not the case with complex graphics scenarios, though, so I wanted to try and see how bad it was... and it was bad.

I also took the chance to see if I could get away with using pixi.js to leverage WebGL instead of having to write a solution from scratch and I was surprise to see that it worked well - so well that I decided to expand on the idea and created a [separate project](https://github.com/luciopaiva/pixi-live-map) for exploring more complex scenarios.

## Installing and running

    nvm install
    npm install
    npm start

This last command will start a server on port 3000 and open a browser window right away. This will run the React test (and also listen for file edits to reload the browser in case you decide to try changing something, by the way). Once the test starts running, check the console window for rendering times.

Then head to http://localhost:3000/index-canvas.html for the 2D canvas test. Again, check the console window.

Finally, check out http://localhost:3000/index-pixi.html for the WebGL canvas test.

For future reference, the following command was used to create this project - you **don't** need to run these commands now!

    npx create-react-app web-graphics-comparison --template typescript

## Results

### React

Using React+TS to keep track of player changes, updating the DOM elements accordingly.

For 10k players, took 240 to 270ms for each frame, some rare times taking up to 360ms. It could possibly be improved by someone who knows React better than me (I just learned React a day ago), but seems like the wrong approach.

### Vanilla

Using pure JavaScript to update the elements in an HTML canvas running in 2d context.

For 10k players, took 25 to 30ms each frame, so an order of magnitude better than React.

### Pixi

Using Pixi to leverage WebGL.

For 10k players, 15 to 17ms each frame - roughly half the time of the 2d canvas.

Although Chrome was reporting lost frames (dev tools) in the animation loop, I measured 60ms to render a frame with 100k players.
