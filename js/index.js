
var sheeps = {
    sPars: {
        stage: document.getElementsByClassName('stage')[0],
        speed: 7,
        backNum: 0,
        frequency: 50,
        maxSheep: 10,
        creatSheepTime: 1000
    },
    init: function () {
        this.creatSheep()
    },
    creatSheep: function () {
        function SheepClass(data) {
            this.sheep = document.createElement('div');
            data.stage.appendChild(this.sheep);
            this.sheep.className = 'sheep';
            this.backNum = data.backNum;
            this.speed = data.speed;
            this.stage = data.stage;
            this.frequency = Math.floor(Math.random()*data.frequency) + 30;
            this.top = 0;
            this.curSpeed = data.speed;
        }
        var self = this;
        // 每隔1000ms创造出一只小羊
        var timer = setInterval(function () {
            // console.log(self.sPars.stage)
            var sheepNum = self.sPars.stage.children.length;
            if (sheepNum < self.sPars.maxSheep) {
                var sheepPlus = new SheepClass(self.sPars);
                self.sheepRun(sheepPlus);
            }
        },this.sPars.creatSheepTime);
    },
    sheepRun: function (sheepPlus) {
        sheepPlus.sheepAnimation = setInterval(function () {
            sheepPlus.backNum = sheepPlus.backNum + 163;
            if (sheepPlus.backNum == 1304) {
                sheepPlus.backNum = 0;
            }
            sheepPlus.sheep.style.backgroundPosition = -sheepPlus.backNum + 'px ' + sheepPlus.top +'px';
            var cot = sheepPlus.sheep.offsetLeft - sheepPlus.speed;
            if (cot <= -163) {
                clearInterval(sheepPlus.sheepAnimation);
                sheepPlus.stage.removeChild(sheepPlus.sheep);
            }
            sheepPlus.sheep.style.left = cot + 'px';
        },sheepPlus.frequency)

        // 拖拽
        sheepPlus.sheep.onmousedown = function (e) {
            sheepPlus.speed = 0;
            sheepPlus.top = -128;
            sheepPlus.x = e.pageX;
            sheepPlus.y = e.pageY;
            document.onmousemove = function (e) {
                var disX = e.pageX - sheepPlus.x;
                var disY = e.pageY - sheepPlus.y;
                sheepPlus.sheep.style.left = disX + sheepPlus.sheep.offsetLeft + 'px';
                sheepPlus.sheep.style.top = disY + sheepPlus.sheep.offsetTop + 'px';
                sheepPlus.x = e.pageX;
                sheepPlus.y = e.pageY;
            }
            document.onmouseup = function (e) {
                document.onmousemove = null;
                sheepPlus.speed = sheepPlus.curSpeed;
                sheepPlus.top = 0;
            }
        }
    }

}
sheeps.init();


// (function () {
//     var backNum = 0;
//     var sheep = document.getElementsByClassName('sheep')[0];
//     var stage = document.getElementsByClassName('stage')[0];
//     var sheepAnimation = setInterval(function () {
//         backNum = backNum + 163
//         if (backNum == 1304) {
//             backNum = 0;
//         }
//         sheep.style.backgroundPosition = -backNum + "px " + 0 + "px";
//         var cot = sheep.offsetLeft - 10;
//         if (cot <= -163) {
//             clearInterval(sheepAnimation);
//             stage.removeChild(sheep);
//         }
//         sheep.style.left = cot + 'px';
//     },50)
// }()) 