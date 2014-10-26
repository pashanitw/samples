/**
 * Created by shaikp on 19/10/14.
 */
var fs=require('fs');
var keyboard=require('./en_us.json'),
    row1=[

    ];
var buttonRegex=/(.+?)(REPLACE_CODE)(.+?)(REPLACE_DATANAME)(.+?)(REPLACE_DIGITGROUP)(.+?)(REPLACE_CLASS)(.+?[\n])(<!--REPLACE-SHIFT-DOM -->[\s\S]+?<!-- END-SHIFT-DOM -->[\n])?(.+?)(REPLACE_KEY_NAME)(.+?[\n])(.+?)(REPLACE_KEY_CODE)(.+?[\n])(.+?[\n])/
 var subStrRegex=/<!--REPLACE-SHIFT-DOM -->(.+?)(REPLACE_SHIFT_SYMBOL)(.+?[\n])(.+?)(REPLACE_MAIN_SYMBOL)(.+?[\n])<!-- END-SHIFT-DOM -->/
//var data=fs.readFileSync("./text","utf8");
var digitRegex=/DIGIT/,
    alphaRegex = /ALPHA/,
    rowTemplate = '<li class="row first">\n' +
        '    <ul class="keys clearfix">\n' +
        'REPLACE_WITH_BUTTON_MARKUP\n'+
'    </ul>\n' +
'</li>\n',
rowReplaceRegex=/([\s\S]+?)(REPLACE_WITH_BUTTON_MARKUP)([\s\S]+)/;

var buttonHtml = '<li data-keycode="REPLACE_CODE" data-name="REPLACE_DATANAME" data-group="REPLACE_DIGITGROUP" class="REPLACE_CLASS">\n' +
    '<!--REPLACE-SHIFT-DOM -->' +
    '            <span class="shift">REPLACE_SHIFT_SYMBOL</span>\n' +
    '            <span class="main">REPLACE_MAIN_SYMBOL</span>\n' +
    '<!-- END-SHIFT-DOM -->' +
    '\n' +
    '            <span class="keyname">REPLACE_KEY_NAME</span>\n' +
    '            <span class="keycode">REPLACE_KEY_CODE</span>\n' +
    '</li>\n';

var rows={
    row1:["ESC","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"],
    row2:["TILDE","DIGIT_1","DIGIT_2","DIGIT_3","DIGIT_4","DIGIT_5","DIGIT_6","DIGIT_7","DIGIT_8","DIGIT_9","DIGIT_0","MINUS","EQUALS","BACKSPACE"],
    row3:["TAB","ALPHA_Q","ALPHA_W","ALPHA_E","ALPHA_R","ALPHA_T","ALPHA_Y","ALPHA_U","ALPHA_I","ALPHA_O","ALPHA_P","LEFT_BRACKET","RIGHT_BRACKET","BACKSLASH"],
    row4:["CAPSLOCK","ALPHA_A","ALPHA_S","ALPHA_D","ALPHA_F","ALPHA_G","ALPHA_H","ALPHA_J","ALPHA_K","ALPHA_L","SEMICOLON","APOSTROPHE","ENTER"],
    row5:["SHIFT","ALPHA_Z","ALPHA_X","ALPHA_C","ALPHA_V","ALPHA_B","ALPHA_N","ALPHA_M","COMMA","PERIOD","SLASH","SHIFT","UP_ARROW"],
    row6:["CTRL","WIN","ALT","SPACE","ALT","CTRL","LEFT_ARROW","DOWN_ARROW","RIGHT_ARROW"]
}
var dataGroup={
    f:["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12"],
    spec:["MINUS","EQUALS","LEFT_BRACKET","RIGHT_BRACKET","BACKSLASH","SEMICOLON","APOSTROPHE","COMMA","PERIOD","TILDE","SLASH"],
    meta:["ESC","TAB","BACKSPACE","CAPSLOCK","CTRL","WIN","ALT","ENTER","SHIFT","SPACE"],
    arrows:["LEFT_ARROW","UP_ARROW","RIGHT_ARROW","DOWN_ARROW"]
}
var data = {
    "code": "59",
    "hasShift": true,
    "main_key": ";",
    "shift_key": ":"
};
var baseclass="key";
var k=

fs.open('./text','r',function(err,fd){
    if(err) throw err;
    var buf=new Buffer(5);
    fs.read(fd,buf,0,buf.length,null,function(err,bytesRead,buffer){
        if(err) throw err;
        console.log(err, bytesRead, buffer.toString("utf8", 0, buffer.length));
        fs.close(fd, function () {
            console.log('Done');
        });
    });
});
function createKeyboardMarkup(lang){
    var keyboardMarkup='';
for(var key in rows){
  // console.log(createRow(rows[key]));
    keyboardMarkup+=rowTemplate.replace(rowReplaceRegex,'$1'+createRow(rows[key])+'$3');
}
    console.log(keyboardMarkup);
}
function createRow(row){
    var rowMarkup='';
    row.forEach(function(element,index){
        rowMarkup+=replaceButtonMarkup(getObjectByKey(element));
    })
    return rowMarkup;
}
function getObjectByKey(key){
    var ob='',group;
    if(key.match(digitRegex)){
     ob=keyboard['NUM_KEYS'][key];
        group="digits";
    }else if(key.match(alphaRegex)){
        ob=keyboard["ALPHA_KEYS"][key];
        group="letters"
    }else if(dataGroup.f.indexOf(key)>-1){
        ob=keyboard["FUNCTION_KEYS"][key];
        group="f";
    }else if(dataGroup.spec.indexOf(key)>-1){
        ob=keyboard["SPEC"][key];
        group="spec";
    }else if(dataGroup.meta.indexOf(key)>-1){
        ob=keyboard["META"][key];
        group="meta";
    }else if(dataGroup.arrows.indexOf(key)>-1){
        ob=keyboard["ARROW_KEYS"][key];
        group="arrows";
    }
    if(ob){
        ob.group=group;
        ob.keyName=key;
    }else{
        console.log("---NO KEY FOUND FOR KEY",key);
    }
    return ob;
}
function replaceButtonMarkup(data){
    return buttonHtml.replace(buttonRegex,function(){
        var matches=arguments;
        var cls=baseclass;
        var subStr='';
        if(data.isNamed){
            cls+=" named";
        }
        if(data.hasShift){
            subStr=matches[10].replace(subStrRegex,function(){
                subStrMatches=arguments;
                return subStrMatches[1]+data.shift_key+subStrMatches[3]+subStrMatches[4]+data.main_key+subStrMatches[6];
            });
        }

        return matches[1]+
            data.code+
            matches[3]+
            data.main_key+
            matches[5]+
            data.group+
            matches[7]+
            cls+
            matches[9]+
            subStr+
            matches[11]+
            data.keyName+
            matches[13]+
            matches[14]+
            data.code+
            matches[16]+
            matches[17];
    });
}
createKeyboardMarkup();

