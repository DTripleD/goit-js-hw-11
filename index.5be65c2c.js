fetch("https://pixabay.com/api/?key=".concat("34891295-3c871ab0268d353f15c88782f","&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true")).then((function(n){return n.json()})).then((function(n){return n})).then((function(n){return n.map((function(n){var t=n.likes;return console.log(t)}))}));
//# sourceMappingURL=index.5be65c2c.js.map
