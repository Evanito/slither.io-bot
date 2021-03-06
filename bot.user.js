// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.1.4
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Set fake mouse coordinates
window.setMouseCoordinates = function (x, y) {
    window.xm = x;
    window.ym = y;
};
// Return the coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function (x, y) {
    mapX = x - getHeight() / 2;
    mapY = y - getWidth() / 2;
    return [mapX, mapY];
};
// Map to mouse coordinates
window.mapToMouse = function (x, y) {
    mouseX = (x - getX()) * gsc;
    mouseY = (y - getY()) * gsc;
    return [mouseX, mouseY];
};
// Canvas width
window.getWidth = function () {
    return window.ww;
};
// Canvas height
window.getHeight = function () {
    return window.hh;
};
// X coordinates on the screen
window.getX = function () {
    return window.px;
};
// Y coordinates on the screen
window.getY = function () {
    return window.py;
};
// Get scaling ratio
window.getScale = function () {
        return window.gsc;
    }
    // Sets the interval for the bot loop
window.launchBot = function (d) {
    window.mousemovelistener = window.onmousemove;
    window.onmousemove = undefined;
    return window.botInterval = setInterval(window.loop, d);
};

window.stopBot = function () {
    window.onmousemove = window.mousemovelistener;
    return clearInterval(window.botInterval);
};

window.isBotRunning = function () {
    return !(window.botInterval === -1);
};

document.oldKeyDown = document.onkeydown;
document.onkeydown = function (e) {
    document.oldKeyDown(e);
    if(e.keyCode === 84) window.isBotRunning() ? window.stopBot() : window.launchBot();
};

// Sorting function, from property 'distance'
window.sortFood = function (a, b) {
    return a.distance - b.distance;
};

// Given an object (of which properties xx and yy are not null), return the object with an additional property 'distance'
window.getDistanceFromMe = function (point) {
    if (point == null) return null;
    point.distance = getDistance(px, py, point.xx, point.yy);
    return point;
};

// Get a distance from point (x1; y1) to point (x2; y2).
window.getDistance = function (x1, y1, x2, y2) {
    // Calculate the vector coordinates.
    var xDistance = (x1 - x2);
    var yDistance = (y1 - y2);
    // Get the absolute value of each coordinate
    xDistance = xDistance < 0 ? xDistance * -1 : xDistance;
    yDistance = yDistance < 0 ? yDistance * -1 : yDistance;
    //Add the coordinates of the vector to get a distance. Not the real distance, but reliable for distance comparison.
    var distance = xDistance + yDistance;
    return distance;
};
// Sort food based on distance
window.getSortedFood = function () {
    return window.foods.filter(function (val) {
        return val !== null;
    }).map(getDistanceFromMe).sort(sortFood);
};

/*
window.isInFoods = function (foodObject) {
    return (foodObject === null) ? false : (window.foods.indexOf(foodObject) >= 0);
};

window.currentFood = null;
window.sortedFood = getSortedFood();
window.loop = function () {
    if (!isInFoods(currentFood)) {
        window.sortedFood = getSortedFood();
        window.currentFood = sortedFood[0];
        var coordinatesOfClosestFood = window.mapToMouse(window.sortedFood[0].xx, window.sortedFood[0].yy);
        window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);
    }
};
*/
// Removed the onemousemove listener so we can move the snake manually by setting coordinates
window.onmousemove = function (e) {
    /*if (e = e || window.event) {
      if ("undefined" != typeof e.clientX) {
        xm = e.clientX - ww / 2;
        ym = e.clientY - hh / 2;
      }
    }*/
};
// Actual bot code

// Loop for running the bot
window.loop = function () {
        // If the game is running
        if (playing) {
            // Sort the food based on distance
            var sortedFood = getSortedFood();
            // Convert coordinates of the closest food using mapToMouse
            var coordinatesOfClosestFood = window.mapToMouse(sortedFood[0].xx, sortedFood[0].yy);
            // Set the mouse coordinates to the coordinates of the closest food
            window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);

        }
    }
    // Start the bot
window.launchBot(5);
