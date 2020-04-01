/**
 * Sounds Like Algorithm in JS
 */
export class SoundsLike {
  constructor(){
    this.soundsLikeIndex = [
      ["A","E","H","I","O","U","W","Y"],
      ["B", "F", "P", "V"],
      ["C", "G", "J", "K", "Q", "S", "X", "Z"],
      ["D", "T"],
      ["L"],
      ["M", "N"],
      ["R"]
    ];
  }
  
  /**
   * Sounds Like Check
   * @param mainString The Original String
   * @param searchString The Searched String
   * @param startWithMatch To Check The Start, Default false
   */
  soundsLikeCheck(mainString, searchString, startWithMatch = false) {
    var filteredMainString = mainString.trim().toUpperCase();
    var filteredSearchString = searchString.trim().toUpperCase();
    var mainStringCode = this.soundsLikeAlgo(filteredMainString);
    var searchStringCode = this.soundsLikeAlgo(filteredSearchString);
    if(startWithMatch){
      if(mainStringCode.startsWith(searchStringCode)){
        return true;
      } else {
        return false;
      }
    } else {
      if(mainStringCode === searchStringCode){
        return true;
      } else {
        return false;
      }
    }
    
  }

  /**
   * Finding The Code For a Word
   */
  soundsLikeAlgo(string){
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
          for(let j = 0; j < this.soundsLikeIndex.length; j++){
            if(j!= 0 && this.soundsLikeIndex[j].indexOf(string[i]) !== -1){
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
}