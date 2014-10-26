var stream=require('stream');
var readable=stream.Readable;

var rs=new readable;

rs.push("hello\n");
rs.push("hello ammi");
rs.push(null);
rs.pipe(process.stdout);
//rs.push("testing");