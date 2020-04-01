// Import stylesheets
import './style.css';
const string = "Virat Kohli is an Indian cricketer who currently captains the India national team. A right-handed top-order batsman, Kohli is regarded as one of the best batsmen in the world. He plays for Royal Challengers Bangalore in the Indian Premier League, and has been the team's captain since 2013";

const soundsLikeIndex = [
  ["A","E","H","I","O","U","W","Y"],
  ["B", "F", "P", "V"],
  ["C", "G", "J", "K", "Q", "S", "X", "Z"],
  ["D", "T"],
  ["L"],
  ["M", "N"],
  ["R"]
];

/**
 * Change filters here
 */
var original = "Ravi",
  search1 = "Rabi",
  search2 = "Robi";
const appDiv = document.getElementById('indexes');
soundsLikeCheck(original, search1);
appDiv.innerHTML = `<h1>`+string+`</h1>`;
appDiv.innerHTML = appDiv.innerHTML + `<hr>`;
var indexified = indexiFy(string);
indexified.forEach((value, index) => {
  appDiv.innerHTML = appDiv.innerHTML + `<h1>`+value+`</h1>`;
});
function indexiFy(string){
  var filteredString = string.replace(/[^\w\s]/gi, '');
  var words = filteredString.split(" ");
  var indexified = [];
  words.forEach((value, index) => {
    if(value.length >= 3){
      for(let i = 3; i <= value.length; i++){
        if(indexified.indexOf(value.substring(0,i)) == -1){
          indexified.push(value.substring(0,i));
        }
        if(indexified.indexOf(value.toLowerCase().substring(0,i)) == -1){
          indexified.push(value.toLowerCase().substring(0,i));
        }
        if(indexified.indexOf(value.toUpperCase().substring(0,i)) == -1){
          indexified.push(value.toUpperCase().substring(0,i));
        }
      }
      for(let i = value.length; i >= 2; i--){
        if(indexified.indexOf(value.substring(value.length,i-2)) == -1){
          indexified.push(value.substring(value.length,i-2));
        }
        if(indexified.indexOf(value.toLowerCase().substring(value.length,i-2)) == -1){
          indexified.push(value.toLowerCase().substring(value.length,i-2));
        }
        if(indexified.indexOf(value.toUpperCase().substring(value.length,i-2)) == -1){
          indexified.push(value.toUpperCase().substring(value.length,i-2));
        }
      }
    } else {
      if(indexified.indexOf(value) == -1){
        indexified.push(value);
      }
      if(indexified.indexOf(value.toLowerCase()) == -1){
        indexified.push(value.toLowerCase());
      }
      if(indexified.indexOf(value.toUpperCase()) == -1){
        indexified.push(value.toUpperCase());
      }
    }
  })
  return indexified;
}

function soundsLikeCheck(mainString, searchString) {
  var filteredMainString = mainString.trim().toUpperCase();
  var filteredSearchString = searchString.trim().toUpperCase();
  var mainStringCode = soundsLikeAlgo(filteredMainString);
  var searchStringCode = soundsLikeAlgo(filteredSearchString);
  if(mainStringCode.startsWith(searchStringCode)){
    const appDiv = document.getElementById('soundex');
    appDiv.innerHTML = mainString + " and " + searchString + " sounds like same";
  } else {
    const appDiv = document.getElementById('soundex');
    appDiv.innerHTML = mainString + " and " + searchString + " sounds different";
  }
}

function soundsLikeAlgo(string){
  var code = "";
  /**
   * ALGO
   * 1. Take the first letter of the word
   * 2. Check remaining letters with soundex array and take the index
   *    a. If index is 0, skip it
   *    b. If the letter is a space, skip it
   *    c. If two adjacent letters are same, skip it
   *    d. If indexes of two adjacent letters are same, skip it
   *    e. If indexes of two adjacent letters are same, but last letter was space, then do not skip it
   */
  for(let i = 0; i < string.length; i++){
    if(i == 0){
      code = string[i];
    } else {
      if(string[i] != " " && string[i] != string[i-1]){
        for(let j = 0; j < soundsLikeIndex.length; j++){
          if(j!= 0 && soundsLikeIndex[j].indexOf(string[i]) !== -1){
            if(string[i-1] == " " || code[code.length - 1] != j){
              code += j;
            }
          }
        }
      }
    }
  }
  return code;
}