/* Drawing日誌
D1-增加了畫筆，選擇和文本功能；
D2-增加了圓形/矩形工具，畫布放大/縮小/重置功能；
D3-增加了刪除，編組和解組功能；
D4-增加了圖片上傳功能，以及可配置的提示toast；
D5-增加了複製/粘貼，畫布導出，redo/undo功能，繪製基礎網格，但是不知道怎麼刪除or隱藏；現在的想法是，單獨在一個新的canvas獨立一個網格層，然後通過show/hide控制;畫布導出不能引用本地資源，得upload；
剩餘功能：
D6-應該是放假或者開始做final；
目標增加元素屬性設置，tooltips,智能對齊，圖層列表，
自定義默認選擇樣式，數值顯示，畫筆設置/引入節點；
alignment:
https://codepen.io/pi/pen/WrXbYP
layerlist:
http://jsfiddle.net/rodrigopandini/BGgDg/5/
objects list:
https://www.coder.work/article/4248645
guideline:
https://my.oschina.net/xmqywx/blog/1941539
layer:
https://codepen.io/s0nnyv123/pen/eravaN
fill:
https://codepen.io/Elite4Web/pen/xQJQKg
https://jsfiddle.net/av01d/dfvp9j2u/
https://codepen.io/eroj333/pen/XzwwqG
tips:
https://alimozdemir.medium.com/fabric-js-history-operations-undo-redo-and-useful-tips-edeab8d4f48d
Fabric examples:
https://codesandbox.io/examples/package/fabric
Standalone Controls
http://fabricjs.com/controls
stroke-uniform:
http://fabricjs.com/controls
imgFilter:
http://www.matrixhandles.net/FilterDemo/

pannel data：
https://jsfiddle.net/c3p0n1h9/2/


創建鏡像
https://www.coder.work/article/2654122


上下圖層：
http://jsfiddle.net/dinesh_singh0607/suk6nfhh/

freedraw:
http://fabricjs.com/freedrawing

canvas.sendBackwards(myObject)
canvas.sendToBack(myObject)
canvas.bringForward(myObject)
canvas.bringToFront(myObject)

Fabric.js：筆畫顏色和寬度svg文件在畫布上的問題
http://hk.uwenku.com/question/p-hecofmpo-vq.html


直線虛線：
https://blog.csdn.net/weixin_34037515/article/details/85980649?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&dist_request_id=1328769.9538.16173221403595581&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control

awesome work:
https://github.com/AmrEsyd/annotate

添加tips：
https://atomiks.github.io/tippyjs/

Custom controls api
http://fabricjs.com/controls-api


完整度很高的教程
https://github.com/exceptionnotfound/FabricJSDrawingWalkthrough
*/

// import hotkeys from 'hotkeys-js';


var copiedObject;
var copiedObjects = new Array();
var canvasScale = 1;
var SCALE_FACTOR = 1.2;
var src = window.location.href.replace('index.html', '') + '/scene.png';



var canvas = new fabric.Canvas('canvas', {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#f7f7f7',
    isDrawingMode: false
});

var canvas2 = new fabric.Canvas('canvas', {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#f7f7f7',
    isDrawingMode: false
});


// 創建成功toast
function successToast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }



// 載入默認圖片
var onload = function() {
    fabric.Image.fromURL(src, function(oImg) {
        canvas.add(oImg);
    });
};

// 創建⭕️功能
var onSolidCircle = function() {
    canvas.add(new fabric.Circle({
        radius: 30,
        fill: '#333333',
        top: 150,
        left: 150
    }));
}

// 創建🟦功能
var onSolidRect = function() {
    var rect = new fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 60,
        fill: '',
        selection: false,
        fill: '#007aff'
    });

    canvas.add(rect);
}

// 創建🖌️畫筆功能
var onStartDrawing = function() {
    canvas.isDrawingMode = true;
}

// 創建🖱cursor功能
var onCursor = function() {
    canvas.isDrawingMode = false;
}

// 創建🔍放大功能
var onZoomIn = function() {

    canvasScale = canvasScale * SCALE_FACTOR;

    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.renderAll();
}

// 創建🔍縮小功能
var onZoomOut = function() {
    canvasScale = canvasScale / SCALE_FACTOR;

    canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
    canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * (1 / SCALE_FACTOR);
        var tempScaleY = scaleY * (1 / SCALE_FACTOR);
        var tempLeft = left * (1 / SCALE_FACTOR);
        var tempTop = top * (1 / SCALE_FACTOR);

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.renderAll();

}

// 創建reset功能
var onResetZoom = function() {

    canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
    canvas.setWidth(canvas.getWidth() * (1 / canvasScale));

    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        var tempScaleX = scaleX * (1 / canvasScale);
        var tempScaleY = scaleY * (1 / canvasScale);
        var tempLeft = left * (1 / canvasScale);
        var tempTop = top * (1 / canvasScale);

        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;

        objects[i].setCoords();
    }

    canvas.renderAll();
    canvasScale = 1;
}


// 創建❌刪除功能
var deleteObj = function() {
    var selected = canvas.getActiveObjects();
    var selGroup = new fabric.ActiveSelection(selected, {
        canvas: canvas
      });
    if (selGroup) {

        selGroup.forEachObject(function(obj) {
          canvas.remove(obj);
        });

    } else {
      return false;
    }
    canvas.discardActiveObject().renderAll();
    successToast();

  };


// 創建文本功能
var onText = function() {
    var textbox = new fabric.Textbox('Text', {
        left: 50,
        top: 50,
        width: 100,
        fontSize: 14,
        fill: '#333',
        lockUniScaling: true
    });

    canvas.add(textbox);

    // 初始文字設定在屏幕中心
    // canvas.centerObject(textbox);

}


// 編組與解組功能
var onGroup = function() {
    canvas.getActiveObject().toGroup();
}
var unGroup = function() {
    canvas.getActiveObject().toActiveSelection();
}



/* 
    上傳圖片功能，好像不用事件監聽就不能檢測到onchange，用button onclick會無法啟用= =也無報錯;
    所以，我們還要單獨調整input的樣式與其他功能匹配！
*/
document.getElementById('uploadImg').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) { console.log('upload successfully!');
        var imgObj = new Image();
        imgObj.src = event.target.result;
        // useless imgObj.setAttribute("crossOrigin",'Anonymous');
        imgObj.onload = function () {
            // start fabricJS stuff
            
            var image = new fabric.Image(imgObj);
            image.set({
                left: 0,
                top: 0,
                angle: 0,
                padding: 0,
                cornersize: 10
            });
            //image.scale(getRandomNum(0.1, 0.25)).setCoords();
            canvas.add(image);
            
            // end fabricJS stuff
        }
        
    }
    reader.readAsDataURL(e.target.files[0]);
    successToast();
}


// 創建copy/paste功能
var copy = function() {

	canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}
var paste = function() {

    _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 0,   // 這裏我們創建一個粘貼對象的偏移
            top: clonedObj.top + 0,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        _clipboard.left += 10;
        _clipboard.top += 10;
        canvas.setActiveObject(clonedObj);
        canvas.renderAll();
    });
}

// 創建redo/undo功能
var state = [];
var mods = 0;
canvas.on(
    'object:modified', function() {
        updateModifications(true);
    },
    'object:added', function() {
        updateModifications(true);
    });

function updateModifications(savehistory) { // 這裏必須是函數聲明，如果是表達式就失效了= =
    if (savehistory === true) {
        myjson = JSON.stringify(canvas);
        state.push(myjson);
    }
}

var undo = function() {
    if (mods < state.length) {
        canvas.clear().renderAll();
        canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
        canvas.renderAll();
        // console.log("geladen " + (state.length-1-mods-1));
        // consoloe.log("state" + state.length);
        mods += 1;
    }
}

var redo = function() {
    if (mods > 0) {
        canvas.clear().renderAll();
        canvas.loadFromJSON(state[state.length - 1 - mods + 1]);
        canvas.renderAll();
        // console.log("geladen " + (state,length -1-mods+1));
        mods -= 1;
        // console.log("state " + state.length);
    }
}


// 繪製網格
// var drawGrid = function() {
//       var checkBox = document.getElementById("drawGrid");

//       if (checkBox.checked == true) {
//         const longer = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
//         let vLine
//         let hLine
//         // get input value || default 10 設置網格間距
//         distance = +distanceInput.value || 10
//         for (let i = 1; i * distance < longer; i++) {
//           const lineDef = {
//             fill: 'black',
//             stroke: 'rgba(0, 0, 0, 0.1)',
//             strokeWidth: 1,
//             selectable: false
//           }
//           // draw vLine
//           vLine = new fabric.Line([i * distance, 0, i * distance, canvas.height], lineDef)
//           // draw hLine
//           hLine = new fabric.Line([0, i * distance, canvas.width, i * distance], lineDef)
      
//           if (i % 5 === 0) {
//             vLine.stroke = 'rgba(0, 0, 0, 0.5)'
//             hLine.stroke = 'rgba(0, 0, 0, 0.5)'
//             vLine.strokeWidth = 1
//             hLine.strokeWidth = 1
//           }
//           canvas.add(vLine, hLine)
//         }
//       } else {
//         // 對不起我還不知道怎麼反選把grid給取消了= =, 加一个if判断的switch变量可以吧应该
//         canvas.remove(vLine, hLine);
//         console.log('remove');
//       }
//   }

var drawGrid = function() {
    var checkBox = document.getElementById("drawGrid");
    const longer = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
    let vLine
    let hLine
    // get input value || default 10 設置網格間距
    distance = +distanceInput.value || 10
    for (let i = 1; i * distance < longer; i++) {
    const lineDef = {
        fill: 'black',
        stroke: 'rgba(0, 0, 0, 0.1)',
        strokeWidth: 1,
        selectable: false
    }
    // draw vLine
    vLine = new fabric.Line([i * distance, 0, i * distance, canvas.height], lineDef)
    // draw hLine
    hLine = new fabric.Line([0, i * distance, canvas.width, i * distance], lineDef)

    if (i % 5 === 0) {
        vLine.stroke = 'rgba(0, 0, 0, 0.4)'
        hLine.stroke = 'rgba(0, 0, 0, 0.4)'
        vLine.strokeWidth = 1
        hLine.strokeWidth = 1
    }
    canvas.add(vLine, hLine)
    }
}

// 創建導出功能

var exportCanvas = function() {
    const dataURL = this.canvas.toDataURL({
        width: this.canvas.width,
        height: this.canvas.height,
        left: 0,
        top: 0,
        format: 'png',
    });

    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    successToast();
};

