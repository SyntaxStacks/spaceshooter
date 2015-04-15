function draw(canvas) {
    canvas.save();
    canvas.fillStyle = "#ccc";
    canvas.fillRect(0,290,FRAMEWIDTH, 60);
    canvas.fillStyle = "#000";
    canvas.fillText("SCORE: " + score, 50, 300);
    canvas.fillText("LEVEL: " + level, FRAMEWIDTH-100, 300);
    canvas.fillText("BOMBS: " + bombs, FRAMEWIDTH-100, 320);
    canvas.restore();
}

var ui = { 
    get frameHeight () {
        return ui.data.frameHeight
    }, 
    get frameWidth() {
        return ui.data.frameWidth
    }, 
    addLevel: function () {
        ui.data.level++; 
    },
    addPoints: function (points) {
        ui.data.score += Number(points);
    },
    setBombs: function (amount) {
        ui.data.bombs = amount;
    },
    get level () {
        return ui.data.level;
    },
    get score () {
        return ui.data.score;
    },
    getBombCount: function () {
        return ui.data.bombs
    },
    reset: function () {
        ui.data.level = 0;
        ui.data.score = 0;
    }
};

module.exports = {
    initialize: function (config) {
        ui.data = {
            frameHeight: config.frameHeight,
            frameWidth: config.frameWidth,
            level: 0,
            score: 0,
            bombs: 0
        }

        return ui;
    }
};
