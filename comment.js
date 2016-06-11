/**
 * Created by samciu on 16/6/10.
 */
var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content': '测试时测试试,封号就封号吧',
    'cid': 348
});

var headers = {
    'Accept':'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Cache-Control':'no-cache',
    'Connection':'keep-alive',
    'Content-Length':postData.length,
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie':'imooc_uuid=4b2b7a0b-4986-488b-a476-bc3e2ca35a7f; imooc_isnew_ct=1462000766; PHPSESSID=khmtal9eib2j18efgnj6140kr5; loginstate=1; apsid=g4NjQ0ZTgxODM4NDg3NDhlYzBjNGEwZTUyYmZhYWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjExNzQ5NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzYW1jaXVAMTYzLmNvbQAAAAAAAAAAAAAAAAAAAAAAADI5YmNlM2Y0NWJmNmQ1ZTM3NmU3NzkxZWJlMTFjMzA4WHdVV1h3VVc%3DZT; last_login_username=samciu%40163.com; jwplayer.volume=80; imooc_isnew=2; cvde=5741e08fba42b-147; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1463899541,1464007137,1465218862,1465482864; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1465569616',
    'Host':'www.imooc.com',
    'Origin':'http://www.imooc.com',
    'Pragma':'no-cache',
    'Referer':'http://www.imooc.com/comment/348',
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
    'X-Requested-With':'XMLHttpRequest'
};

var options = {
    hostname: 'www.imooc.com',
    port: 80,
    path: '/course/docomment',
    method: 'post',
    headers: headers
};

var req = http.request(options,function(res){
    console.log('status: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(chunk){
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof  chunk);
    });

    res.on('end', function(data){
        console.log('评论完毕');
    })

});

req.on('error',function(e){
   console.log('出错了！！！！！' + e.message);
});

req.write(postData);
req.end();

