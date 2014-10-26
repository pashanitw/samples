process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if(chunk){
        var buf=new Buffer(chunk,"ascii");
        for(var i=0;i<chunk.length;i++){
            if(buf[i]==46){
                buf.write('!',i);
            }
        }
        console.log(buf);
        //process.stdout.write(buf);
    }
});
