this.startLine = [];
this.endLine = [];
this.lines = [];

this.num = 0;

// 初期化
function initPosition(){
    this.startLine = [];
    this.endLine = [];
}

// 始点の位置情報を取得
function setStart(){
    this.startLine = setPosition();

    if(this.startLine) {
        var info = document.getElementById('start-line');
        info.textContent = this.startLine[2];
    }
}

// 終点の位置情報を取得
function setEnd(){
    if(!this.startLine[0]) return;

    this.endLine = setPosition();

    if(!checkSamePosition()){
        initPosition();
        delStartLine();
        return;
    }

    // 同じ列の時
    if(this.startLine[1] - this.endLine[1] < 5 && this.startLine[1] - this.endLine[1] > -5){
        this.endLine[1] = this.startLine[1];
    }

    // 違う列の時 startが上の行がじゃないとダメ
    if(this.endLine[1] - this.startLine[1] > 30){
        setDrawDiffLine();
        return;
    }

    setDrawLine();
    initPosition();

    delStartLine();
}

// startとendのポジションが同じかチェック
function checkSamePosition(){
    if(this.startLine[0] === this.endLine[0] && this.startLine[1] === this.endLine[1]){
        return false;
    }
    return true;
}

// 開始位置の表示を削除
function delStartLine(){
    var info = document.getElementById('start-line');
    info.textContent  = '　';
}

// 選択範囲の位置を返す
function setPosition(){
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    if(!verifySel(sel, range)) return;

    var node = range.startContainer.parentNode.parentNode;
    if(node.textContent.length > 100)return;

    var lines = [];

    lines[0] = node.offsetLeft + (node.offsetWidth / 2);
    lines[1] = node.offsetTop;
    lines[2] = node.textContent;

    return lines;
}

// DrawLineに引数を渡す
function setDrawLine() {
    var param = {
        x1: this.startLine[0], // left
        y1: this.startLine[1] +30, // top
        x2: this.endLine[0],
        y2: this.endLine[1] +30,
        parent: $("body"),
    };

    DrawLine(param);
    addArrow();
}

// 線を引く
function DrawLine(param) {
    if(param.x1 < param.x2){
        sx = param.x1;
        sy = param.y1;
        ex = param.x2;
        ey = param.y2;
    }  else {
        sx = param.x2;
        sy = param.y2;
        ex = param.x1;
        ey = param.y1;
    }

    // 線の長さを求める
    var w = Math.sqrt(Math.pow((sx - ex) ,2) + Math.pow((sy - ey) ,2));
    var base = Math.max(sx, ex) - Math.min(sx, ex);
    var tall = Math.max(sy, ey) - Math.min(sy, ey);
    var aTan = Math.atan(tall / base);
    var deg = aTan * 180 / Math.PI;
    deg = sy > ey ? 0 - deg: deg;

    // lineの<div>要素を作成し、<body>の一番後ろに追加する
    var line = $("<div id=" + "line" + this.num++ + "></div>")
        .addClass("line")
        .css({
            "left": sx, // 開始位置
            "top": sy, //　開始位置
            "width": w,
            "transform": "rotate(" + deg + "deg)",
            "-webkit-transform": "rotate(" + deg + "deg)",
        });
    this.lines.push(this.num);
    $(param.parent).append(line);
}

// 線の最初と最後に上方向の線を付け足す
function addArrow(){

    var param1 = {
        x1: this.startLine[0] + 2, // left
        y1: this.startLine[1] +30, // top
        x2: this.startLine[0] + 2,
        y2: this.startLine[1] +25,
        parent: $("body"),
    };

    var param2 = {
        x1: this.endLine[0], // left
        y1: this.endLine[1] +30, // top
        x2: this.endLine[0],
        y2: this.endLine[1] +25,
        parent: $("body"),
    };

    DrawLine(param1);
    DrawLine(param2);
}

// 線の削除
function deleteLines(){
    for(var i = 1; i <= 3; i++ ){
        var lineId = 'line' + (this.lines[this.lines.length - i] - 1);
        var line = document.getElementById(lineId);
        line.parentNode.removeChild(line);
    }
    for(var i = 1; i <= 3; i++ ){
        this.lines.pop();
    }
}

// 行が違う線を引く
function setDrawDiffLine(){
    var param1 = {
        x1: this.startLine[0], // left
        y1: this.startLine[1] +40, // top
        x2: this.endLine[0] -3,
        y2: this.startLine[1] +40,
        parent: $("body"),
    };

    var param2 = {
        x1: this.startLine[0] + 1, // left
        y1: this.startLine[1] +40, // top
        x2: this.startLine[0] + 1,
        y2: this.startLine[1] +30,
        parent: $("body"),
    };

    var param3 = {
        x1: this.endLine[0] -3, // left
        y1: this.startLine[1] +40, // top
        x2: this.endLine[0] -3,
        y2: this.startLine[1] +45,
        parent: $("body"),
    };

    DrawLine(param1);
    DrawLine(param2);
    DrawLine(param3);
}