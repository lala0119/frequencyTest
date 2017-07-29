
// ref - https://stackoverflow.com/questions/6831918/node-js-read-a-text-file-into-an-array-each-line-an-item-in-the-array
var fs = require('fs');
var dic = require('./dictionary/dictionary.json');

fs.readFile('update/text.txt', 'utf8', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    array.sort();
    var newText = "",
        next,
        freq = 0,
        i, len;
    for(i = 0, len=array.length; i < len; i++){
        if(array[i] == ""){
            continue;
        }
        // check for one word per line.
        arr_words = array[i].split(/\s+/);
        if( array[i].split(/\s+/).length > 1){
            console.error("Error: please one word per line.");
            // return console.error("at " + ++i + " line");
            newTextFile(array);
            return false;
        }
        /*  check for dictionary.
         *   this code is work,
         *  but I don't get the Oxford dictionary, so comment out now.
         */
        // if(dic[array[i].toUpperCase()] == undefined){
        //     console.error("Error: can not find the word- " + array[i] + " at dictionary");
        //     // console.error("at " + i + " line");
        //     return false
        // }
        // newText += freq+"\n";
        next = array[i*1+1];
        ++freq;
        if ( array[i] !== next ) {

            newText += freq + " - " + array[i] + "\n";
            freq = 0;
        }


        // console.log(i + "-"+array[i]);
    }
    console.log("size: " + newText.length + " characters, " +
        Buffer.byteLength(newText, 'utf8') + " bytes");
    writeTextFile(newText, "finText");

});

function newTextFile(array){
    var newText = "",
        arr_words = 0,
        i,j;
    for(i in array) {
        arr_words = array[i].split(" ");
        if( arr_words.length > 1){
            for( j in arr_words){
                newText += arr_words[j] + "\n";
            }
        } else {
            newText += array[i] + "\n";
        }
    }
    writeTextFile( newText, "newText");

}
function writeTextFile(text, name){
    fs.writeFile("update/" + name + ".txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("create a new file at update/"+ name + ".txt");
    });
}
