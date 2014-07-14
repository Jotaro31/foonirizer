function fooniModel(){
  self = this;
  
  //html elements
  this.htmlMinFoon = $('#minFoon');
  this.htmlMaxFoon = $('#maxFoon');
  this.htmlPreview = $('#preview');
  this.htmlColorFoon = $('#colorFoon');
  
  
  this.htmlFoonirize = $('#foonirize');
  this.htmlReFoonirize = $('#refoonirize');
  this.htmlUnFoonirize = $('#unfoonirize');
  
  this.htmlTa = $('#ta');
  
  //variables
  this.foons = ko.observableArray(["-", "Snow", "SeaShell", "LavenderBlush", "MistyRose", "Linen", "Pink", "LightPink", "Red", "Crimson", "HotPink", "Tomato", "OrangeRed", "DeepPink", "IndianRed", "RosyBrown", "MediumVioletRed", "FireBrick", "Brown", "Sienna", "SaddleBrown", "DarkRed", "Maroon", "-", "FloralWhite", "Cornsilk", "OldLace", "PapayaWhip", "BlanchedAlmond", "Bisque", "Moccasin", "NavajoWhite", "PeachPuff", "Wheat", "AntiqueWhite", "Gold", "Orange", "LightSalmon", "Darkorange", "Coral", "Salmon", "SandyBrown", "LightCoral", "DarkSalmon", "BurlyWood", "Tan", "Chocolate", "Peru", "-", "Ivory", "LightYellow", "LemonChiffon", "LightGoldenRodYellow", "Beige", "PaleGoldenRod", "Yellow", "Khaki", "GoldenRod", "DarkGoldenRod", "-", "MintCream", "Azure", "HoneyDew", "LightCyan", "PaleTurquoise", "GreenYellow", "LightGreen", "PaleGreen", "DarkSeaGreen", "DarkKhaki", "YellowGreen", "SpringGreen", "Lime", "Aquamarine", "MediumSpringGreen", "Turquoise", "MediumSeaGreen", "Chartreuse", "LawnGreen", "LimeGreen", "DarkSlateGrAy", "SeaGreen", "ForestGreen", "MediumAquaMarine", "CadetBlue", "DarkOliveGreen", "Olive", "OliveDrab", "LightSeaGreen", "DarkTurquoise", "DarkCyan", "Teal", "Green", "DarkGreen", "-", "AliceBlue", "PowderBlue", "LightBlue", "LightSteelBlue", "DeepSkyBlue", "DodgerBlue", "CornflowerBlue", "Aqua", "Cyan", "MediumTurquoise", "SteelBlue", "LightSkyBlue", "SkyBlue", "MediumSlateBlue", "SlateBlue", "RoyalBlue", "Blue", "MediumBlue", "DarkSlateBlue", "Indigo", "DarkBlue", "Navy", "MidnightBlue", "-", "GhostWhite", "Lavender", "Violet", "Plum", "Thistle", "Fuchsia", "Magenta", "Orchid", "PaleVioletRed", "DarkMagenta", "MediumOrchid", "DarkOrchid", "DarkViolet", "MediumPurple", "BlueViolet", "Purple", "-", "White", "WhiteSmoke", "Gainsboro", "LightGrey", "DarkGray", "Silver", "Gray", "LightSlateGray", "SlateGrey", "DimGray", "Black"]);
  this.selectedFoons = ko.observableArray([]);
  this.useFoon = ko.observableArray(["words", "characters"]);
  this.selectedUseFoon = ko.observable();
  this.minFoons = 1;
  this.maxFoons = 10;
  this.minFoon = ko.observable(1);
  this.maxFoon = ko.observable(10);
  this.allFoonsSelected = ko.observable(false);
  this.splitter = ko.computed(function(){
    switch(self.selectedUseFoon()){
      case "words" :
        return " ";
        break;
      case "characters":
        return "";
      default: 
        return " ";
    }
  });
  this.lastSplitter = ko.observable();
  this.foonirizable = ko.observable(true);
  
  this.textFoon = ko.observable("");
  
  //functions
  this.getFooni = function() {
    return Math.floor(Math.random() * (this.maxFoon() - this.minFoon()) + this.minFoon());
  };
  this.getFooniFooni = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  this.getFoonFoon = function() {
    var foooooni = self.getFooniFooni(0, self.selectedFoons().length);
    foooooni = Math.floor(foooooni);
    return "[color=" + self.selectedFoons()[foooooni] + "]";
  };
  
  this.setFoonClass = function(option, item) {
    ko.applyBindingsToNode(option, {
      css : "previewStyle",
      style : {
        color : item
      }
    }, item);
    if (item == "-") {
      $(option).attr("data-divider", true);
    }
  };
  
  this.setAllFoons = function(){
    self.allFoonsSelected(true);
    self.selectedFoons.removeAll();
    for (var i=0; i < self.foons().length; i++) {
      var foon = self.foons()[i]; 
      if(foon != "-"){
        self.selectedFoons.push(foon);
      }
    };
    self.htmlColorFoon.selectpicker('refresh');
  };
  
  this.setNoFoons = function(){
    self.allFoonsSelected(false);
    self.selectedFoons.removeAll();
    self.htmlColorFoon.selectpicker('refresh');
  };
  
  this.setRandomFoons = function(){
    self.setAllFoons();
    self.allFoonsSelected(false);
    var numFoons = self.getFooniFooni(1, self.selectedFoons().length+2);
    for (var i=0; i < numFoons; i++) {
      var remFoon = self.getFooniFooni(0, self.selectedFoons().length);
      self.selectedFoons.remove(self.selectedFoons()[remFoon]);
    };
    self.htmlColorFoon.selectpicker('refresh');
  };
  
  this.fooMinFoon = ko.computed(function(){

    var a = [];
    for(var i = self.minFoons; i <= self.maxFoon(); i++){
      a.push(i);
    }
    
    return ko.observableArray(a);
    
  });
  
  this.fooMaxFoon = ko.computed(function(){
    
    var a = [];
    for(var i = self.minFoon(); i <= self.maxFoons; i++){
      a.push(i);
    }
    return ko.observableArray(a);
  });
  
  this.minFoon.subscribe(function(newVal){
    self.htmlMaxFoon.selectpicker('refresh');
  });
  
  this.maxFoon.subscribe(function(newVal){
    self.htmlMinFoon.selectpicker('refresh');
  });
  
  this.textFoon.subscribe(function(newVal){
    
    var lengthFoon = newVal.trim().split(self.splitter()).length;
    
    lengthFoon = (lengthFoon == 0) ? 1 : lengthFoon;
    if(lengthFoon > 10){
        lengthFoon = 10;
    }
    
    self.maxFoons = lengthFoon;
    
    if(self.maxFoon() > lengthFoon){
      self.maxFoon(lengthFoon);
    }
    
    self.minFoon.valueHasMutated();
    self.maxFoon.valueHasMutated();
    
    var foofoo = /\[color=[\w]*\]/gi;
    var nini = /\[\/color\]/gi;
    
    if(newVal.match(foofoo) || newVal.match(nini)){
      self.foonirizable(false);
    }else{
      self.foonirizable(true);
    }
    
  });
  
  this.foonirize = function(raw) {
    
    self.lastSplitter(self.splitter());
    
    var rawr = raw.split(self.splitter());
    var foon = self.getFooni();
    
    foon = (foon > rawr.length) ? rawr.length : foon;
    
    var unfoon = 0;
    var string = self.getFoonFoon();
    
    var foonirized = [];

    for (var f = 0; f < rawr.length; f++) {

      if ((f - unfoon) >= foon) {

        unfoon = f;

        string += "[/color]";
        foonirized.push(string);

        string = self.getFoonFoon() + self.splitter() + rawr[f];

        foon = self.getFooni(minFoon, maxFoon);

      } else {

        var space = (f === 0) ? "" : self.splitter();
        string += space + rawr[f];

      }
    }
    
    string += "[/color]";
    foonirized.push(string);
    
    foonirized = foonirized.join("");

    self.foonirizable(false);
    return foonirized;
  };

  this.unfoonirize = function(foonirized) {

    var foofoo = /\[color=[\w]*\]/gi;
    var nini = /\[\/color\]/gi;
    var riri = /[ ]{2,}/gi;

    foonirized = foonirized.replace(foofoo, "");
    foonirized = foonirized.replace(nini, self.lastSplitter());
    foonirized = foonirized.replace(riri, self.lastSplitter());

    self.foonirizable(true);
    return foonirized;
  };

  this.refoonirize = function(foonirized) {
    return foonirize(unfoonirize(foonirized));
  };

  this.preFoon = function(foonirized) {
    //var tag = /\[color=([\w]*)\](.+?|[\r\n]*?)\[\/color\]/gmi;
    //string = string.replace(tag, '<span style="color=$1">$2</span>');

    var foofoo = /\[color=([\w]*)\]/gi;
    var nini = /\[\/color\]/gi;
    var riri = /[\r\n]/gi;

    foonirized = foonirized.replace(foofoo, "<span style=\"color:$1;\">");
    foonirized = foonirized.replace(nini, "</span>");
    foonirized = foonirized.replace(riri, "<br />");

    return foonirized;

  };
  
  this.clickFoonirize = function(data, event){
    
    self.textFoon(self.foonirize(self.textFoon()));
    
  };
  
  this.clickUnFoonirize = function(data, event){
    
    self.textFoon(self.unfoonirize(self.textFoon()));
    
  };
  
  this.clickReFoonirize = function(data, event){
    
    self.textFoon(self.foonirize(self.unfoonirize(self.textFoon())));
    
  };
  
  this.setPreFoon = function(){
    var string = "";
    
    if(self.foonirizable() == false){
      string = self.preFoon(self.textFoon());
    }
    
    return string;
    
  };
  
  this.setButtFoons = function(e) {

    if(self.textFoon().length === 0 || self.selectedFoons().length === 0){
      return false;
    }
    
    var buttFoon = $(e).attr('id');
    
    switch(buttFoon){
      case "foonirize":
        return self.foonirizable();
      case "refoonirize":
        return !self.foonirizable(); 
      case "unfoonirize":
        return !self.foonirizable();
      
      default:
        return false;
    }
  };
};
var superFooni = {fooni : new fooniModel()};
ko.applyBindings(superFooni.fooni);
superFooni.fooni.textFoon.valueHasMutated();


$('.selectpicker').selectpicker({
  count:4
});

