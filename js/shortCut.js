//// drawLine.js
Mousetrap.bind('ctrl+shift+a', function(){
    setStart();
});

Mousetrap.bind('ctrl+shift+s', function(){
    setEnd();
});

Mousetrap.bind('ctrl+shift+l', function(){
    deleteLines();
});

//// index.js
Mousetrap.bind('ctrl+shift+1', function(){
    inputNoun();
});

Mousetrap.bind('ctrl+shift+2', function(){
    inputVerb();
});

Mousetrap.bind('ctrl+shift+3', function(){
    inputAdverb();
});

Mousetrap.bind('ctrl+shift+4', function(){
    inputAdjective();
});

Mousetrap.bind('ctrl+shift+5', function(){
    inputObject();
});

Mousetrap.bind('ctrl+shift+6', function(){
    back(null);
});

Mousetrap.bind('ctrl+shift+7', function(){
    store();
});

Mousetrap.bind('ctrl+shift+z', function(){
    selectBack();
});