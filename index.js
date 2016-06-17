/**
 * Created by samciu on 16/6/9.
 */
var http = require('http');
var cheerio = require('cheerio');
var bsedUrl = 'http://www.imooc.com/learn/';
var url = 'http://www.imooc.com/learn/348';
var videoIds = [348, 259, 197, 134, 75];

function filter(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.hd .l').text();
    var number = parseInt($($('.meta-value')[2]).text().trim(),10);

    //console.log(html);

    var courseData = {
        title: title,
        number: number,
        courseContent: []
    };

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
            var id = item.attr('href').split('/')[2];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            });

            //chapterData.videos.push(videoTitle);
        });

        courseData.courseContent.push(chapterData);
    });

    return courseData;
}

function printCourseInfo(coursesData){
    coursesData.forEach(function(courseData) {
        console.log(courseData.number + '人学过' + courseData.title + "\n");
    });

    coursesData.forEach(function(courseData) {
        console.log('####################################' + '\n');
        console.log('####' + courseData.title + '\n');
        console.log('####################################' + '\n');
        courseData.courseContent.forEach(function(item){
            var chapterTitle = item.chapterTitle;

            console.log(chapterTitle + '\n');

            item.videos.forEach(function(video) {
                console.log( ' [ ' + video.id + ' ] ' + video.title + '\n');
            })
        })
    });
}

function getPageAsync(url){
    return new Promise(function(resolve,reject){
        http.get(url,function(res){
            var html = '';

            res.on('data', function(data){
                html += data;
            });

            res.on('end', function(){
                resolve(html);
            })
        }).on('error', function(e) {
            reject(e);
            console.log(e);
        });
    })
}

var fetchCourseArray = [];

videoIds.forEach(function(id) {
    fetchCourseArray.push(getPageAsync(bsedUrl + id));
});

Promise
    .all(fetchCourseArray)
    .then(function(pages) {
        var coursesData = [];

        pages.forEach(function(html){
            var courses = filter(html);

            coursesData.push(courses);
        });

        coursesData.sort(function(a,b){
            return a.number < b.number;
        });

        printCourseInfo(coursesData);
    });