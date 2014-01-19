(function (scope) {
  function AssetFactory() {
    this.initialize();
  }
  var p = AssetFactory.prototype;

  p.initialize = function() {
    this.assetsToLoad = 0;
    this.assetsLoaded = 0;
  }

  p.loadAssets = function(array) {
    for (var c = 0; c < array.length; c++) {
      this.loadAsset(array[c]);
    }
  }

  p.loadAsset = function(url) {
    var image = new Image();
    this[url] = image;
    this.assetsToLoad++;
    image.onload = this.onImageLoaded.bind(this);

    image.src = url;
  }

  p.onImageLoaded = function(e) { 
    this.assetsLoaded++;

    if ( this.assetsLoaded == this.assetsToLoad ) {
      if ( this.onComplete ) this.onComplete();
    }
  }

  scope.AssetFactory = AssetFactory; 
} (window));