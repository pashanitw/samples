/**
 * Created by shaikp on 25/10/14.
 */
   //var nums=process.argv[2].split(',');
var buf=new Buffer(process.argv.slice(2));
console.log(buf.toString('hex'));