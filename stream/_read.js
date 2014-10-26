/**
 * Created by shaikp on 25/10/14.
 */
var stream=require('stream');
var Readable=stream.Readable;
var c=97-1;
var rs=new Readable;
rs._read=function(){
    if(c>='z'.charCodeAt(0)) rs.push(null);
    setTimeout(function(){
        rs.push(String.fromCharCode(++c));
    });

};
rs.pipe(process.stdout);

process.on('exit', function () {
    console.error('\n_read() called ' + (c - 97) + ' times');
});
process.stdout.on('error', process.exit);
