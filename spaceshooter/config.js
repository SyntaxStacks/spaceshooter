var config = {
    id: 'frame',
    frameHeight: getHeight(),
    frameWidth: getWidth(),
    imgdir: './assets/img/sprites.png'
}

function getWidth () {
    return Math.max(document.documentElement["clientWidth"],
             document.body["scrollWidth"],
             document.documentElement["scrollWidth"],
             document.body["offsetWidth"],
             document.documentElement["offsetWidth"]);
}

function getHeight () {
    return Math.max(document.documentElement["clientHeight"],
             document.body["scrollHeight"],
             document.documentElement["scrollHeight"],
             document.body["offsetHeight"],
             document.documentElement["offsetHeight"]);

}
module.exports = config;
