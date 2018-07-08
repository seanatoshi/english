var num = 0; // id
var delBox = {} // 取り消しボタン用にidと元の文字列を保存

// 保存という名の格納削除関数
function store(){
    delBox = [];
}

// 取り消しボタン
function back(selectID) {
    if (Object.keys(delBox).length) {
        var arr = []
        for (var id in delBox) {
            arr.push(id);
        }

        // 最後に追加したidを取得, もしくは選択したいid
        var deleteID = (selectID) ? selectID :arr[arr.length - 1];

        // 最後のidの要素(テキスト)
        var e = document.getElementById(deleteID);

        var newEle = document.createElement('span');
        newEle.textContent = delBox[deleteID];

        // 元の要素をDOMの最初に追加
        e.parentNode.insertBefore(newEle, e);

        //　自分自身の要素を丸ごと削除
        e.parentNode.removeChild(e);

        delete delBox[deleteID];
    }
}

// 選択範囲の親nodeを取得してidを割り出して狙って削除
function selectBack(){
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    if(!verifySel(sel, range)) return;

    var node = range.startContainer.parentNode.parentNode;

    // 削除したいidを選択
    back(node.id);
}

// id
function addNum(){
    num +=1;
}

// 追加するNodeの準備
function makeNode(v){
    var node = document.createElement('span');
    node.setAttribute('class', v);
    node.setAttribute('id', num);

    return node;
}

// 新要素の加工
function addStr(sel, start, end, v){
    var newSel = sel.toString()

    newSel = newSel.trim();
    newSel = newSel.replace(/^/, start);
    newSel = newSel.replace(/^/, "\<ruby\>");
    newSel = newSel.replace(/$/, end);

    var rt = "\<rt\>" + v + "\<\/rt\>"
    newSel = newSel.replace(/$/, rt);
    newSel = newSel.replace(/$/, "\</ruby\>");

    return newSel;
}

// 要素を置き換え
function replaceNode(range, node, sel, startBlank, endBlank){

    range.deleteContents();// 範囲選択箇所を一旦削除

    range.insertNode(node); // 範囲選択箇所の先頭から、修飾したspanを挿入

    insertBlank(node, startBlank, endBlank); //

    sel.removeAllRanges()　// 選択範囲を初期化
}

// 選択範囲の先頭、最後に空白があったとき、空白を追加する(classで囲むと色がついてしまうため)
function insertBlank(node, startBlank, endBlank){

    // 第二候補　var a = document.createTextNode(' ');
    var blank = document.createElement('span');
    blank.textContent = " ";

    if(startBlank){
        node.parentNode.insertBefore(blank, node);
    }

    if(endBlank){
        node.parentNode.insertBefore(blank, node.nextSibling);
    }
}

// 選択範囲があるかどうか、もしくは訳の中じゃないかをチェック
function verifySel(sel, range){
    if(!sel.rangeCount || range.startContainer.length == undefined){
      return false;
    }

    return true;
}

// 名詞 noun
function inputNoun(){
    addNum();

    var sel = window.getSelection();
    var range = sel.getRangeAt(0);

    if(!verifySel(sel, range)) return;
    delBox[num] = sel.toString();

    var startBlank = (sel.toString().match(/^\s/)) ? true : false ;
    var endBlank = (sel.toString().match(/\s$/)) ? true : false ;

    var newSel = addStr(sel, "[", "]", "S")
    var node = makeNode("noun");
    node.innerHTML = newSel;

    replaceNode(range, node, sel, startBlank, endBlank);
}

// 動詞 verb
function inputVerb(){
    addNum();

    var sel = window.getSelection();
    var range = sel.getRangeAt(0);

    if(!verifySel(sel, range)) return;
    delBox[num] = sel.toString();

    var startBlank = (sel.toString().match(/^\s/)) ? true : false ;
    var endBlank = (sel.toString().match(/\s$/)) ? true : false ;

    var newSel = addStr(sel, "", "", "V")
    var node = makeNode("verb");
    node.innerHTML = newSel;

    replaceNode(range, node, sel, startBlank, endBlank);
}

// 副詞 adverb
function inputAdverb(){
    addNum();

    var sel = window.getSelection();
    var range = sel.getRangeAt(0);

    if(!verifySel(sel, range)) return;
    delBox[num] = sel.toString();

    var startBlank = (sel.toString().match(/^\s/)) ? true : false ;
    var endBlank = (sel.toString().match(/\s$/)) ? true : false ;

    var newSel = addStr(sel, "(", ")", "M")
    var node = makeNode("adverb");
    node.innerHTML = newSel;

    replaceNode(range, node, sel, startBlank, endBlank);
}

// 形容詞 adjective <>
function inputAdjective(){
    addNum();

    var sel = window.getSelection();
    var range = sel.getRangeAt(0);

    if(!verifySel(sel, range)) return;
    delBox[num] = sel.toString();

    var startBlank = (sel.toString().match(/^\s/)) ? true : false ;
    var endBlank = (sel.toString().match(/\s$/)) ? true : false ;

    var newSel = addStr(sel, "&lt;", "&gt;", "C")
    var node = makeNode("adjective");
    node.innerHTML = newSel;

    replaceNode(range, node, sel, startBlank, endBlank);
}

// 目的語
function inputObject(){
    addNum();

    var sel = window.getSelection();
    var range = sel.getRangeAt(0);

    if(!verifySel(sel, range)) return;
    delBox[num] = sel.toString();

    // 選択範囲の前後に空白があるか確認
    var startBlank = (sel.toString().match(/^\s/)) ? true : false ;
    var endBlank = (sel.toString().match(/\s$/)) ? true : false ;

    var newSel = addStr(sel, "{", "}", "O")
    var node = makeNode("object");
    node.innerHTML = newSel;

    replaceNode(range, node, sel, startBlank, endBlank);
}
