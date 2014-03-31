function UI(config) {
    var FRAMEHEIGHT = config.frameHeight;
    var FRAMEWIDTH  = config.frameWidth;
    var level       = 0;
    var score       = 0;
    var bombs       = 0;

    this.addLevel   = addLevel;
    this.addPoints  = addPoints;
    this.setBombs   = setBombs;
    this.draw       = draw;
    this.level      = getLevel;
    this.score      = getScore;
    this.reset      = reset;

    function addLevel()        { level++; }
    function addPoints(points) { score += Number(points); }
    function setBombs(amount)  { bombs = amount; }
    function getLevel()        { return level; }
    function getScore()        { return score; }
    function getBombCount()    { return bombs; }

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

    function reset() {
        level = 0;
        score = 0;
    }
}

module.exports = UI;
