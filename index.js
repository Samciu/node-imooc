/**
 * Created by samciu on 16/6/9.
 */
var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filter(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');

    console.log(html);

    var courseData = [];

    //for(var i = 0; i < chapters.length; i++ ){
    chapters.each(function(){
        var item = $(this);
        var chapterTitle = item.find('strong').text();
        var videos = item.find('.studyvideo');
        var chapterData = {
            chapterTitle : chapterTitle,
            videos: []
        };

        //for(var j = 0; j < videos.length; j++ ){
        videos.each(function(){
            var item = $(this);
            var videoTitle = item.text().trim();
            var id = item.attr('href').split('/')[1];

            //chapterData.videos.push({
            //    title: videoTitle,
            //    id: id
            //});

            chapterData.videos.push(videoTitle);
        });

        courseData.push(chapterData);
    });

    return courseData;
}

http.get(url,function(res){
    var html = '';

    res.on('data', function(data){
        html += data;
    });

    res.on('end', function(){
        var courseData = filter(html);
        console.log(courseData);
    })
}).on('error', function() {
    console.log('出错');
});

