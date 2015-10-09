var Icon = function (window) {
  var self = this;

  // Set up the container for our canvas so we can draw the new icons as
  // needed.
  this.source = this.createSourceImage("https://abs.twimg.com/favicons/favicon.ico", function () {
    self.canvas = self.createCanvas(window.document.body, self.source);
    self.context = self.canvas.getContext("2d");
  });

  this.fontFamily = this.getSystemFontFamily(window);
};

Icon.prototype.createCanvas = function (container, source) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  canvas.setAttribute("width", source.width);
  canvas.setAttribute("height", source.height);
  container.appendChild(canvas);

  return canvas;
};

Icon.prototype.createSourceImage = function (src, onload) {
  var img = new Image();

  img.onload = onload;
  img.src = src;

  return img;
};

Icon.prototype.draw = function (num) {
  // Redraw the source image into the canvas.
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.context.drawImage(this.source, 0, 0);

  // Add text if necessary.
  if (num > 0) {
    this.context.font = (this.canvas.height * 0.6).toString() + "px " + this.fontFamily;
    this.context.textAlign = "right";
    this.context.textBaseline = "baseline";
    this.context.fillText(num.toString(), this.canvas.width, this.canvas.height, this.canvas.width);
  }

  return this.canvas.toDataURL();
}

Icon.prototype.getSystemFontFamily = function (window) {
  var button = window.document.createElement("button");

  window.document.body.appendChild(button);
  var font = window.getComputedStyle(button).fontFamily;

  return font;
};

chrome.runtime.getBackgroundPage(function (window) {
  var icon = new Icon(window);

  // request is the number of new tweets.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse(icon.draw(request));
  });
});