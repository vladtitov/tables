///<reference path="base.ts"/>
var utils;
(function (utils) {
    var AutoScroller = (function () {
        function AutoScroller(options) {
            var _this = this;
            this.scrollHeight = 0;
            this.step = 0;
            this.delay = 1;
            this.currentScroll = 0;
            for (var str in options)
                this[str] = options[str];
            this.$scrollWindow = $(this.scrollWindow).first();
            this.$scrollContent = $(this.scrollContent).first();
            this.$list = $(this.list).first();
            this.init();
            setTimeout(function () { return _this.start(null); }, 2000);
        }
        AutoScroller.prototype.onScrollEnd = function () {
            console.log('scrollend');
            this.stop(null);
        };
        /*private rearange():void{
            this.step =0;
            this.currentScroll=0;
            this.$scrollWindow.scrollTop(0);
        }*/
        AutoScroller.prototype.getScrollHeight = function () {
            switch (this.step) {
                case 1:
                    return this.$list.children(0).height();
                case 2:
                    return this.$list.children(1).height();
                default:
                    this.step = 0;
                    this.currentScroll = 0;
                    this.$scrollWindow.scrollTop(0);
                    this.$list.append(this.$list.children().first());
                    this.$list.append(this.$list.children().first());
                    return this.$list.children(0).height();
            }
        };
        AutoScroller.prototype.nextStep = function () {
            var _this = this;
            this.step++;
            var h = this.getScrollHeight();
            console.log(h);
            this.currentScroll += h;
            this.$scrollWindow.animate({
                scrollTop: this.currentScroll
            }, function () {
                var scroll = _this.$scrollWindow.scrollTop();
                if (scroll == _this.actualScroll)
                    _this.onScrollEnd();
                _this.actualScroll = scroll;
                console.log();
            });
        };
        AutoScroller.prototype.setHeight = function () {
            this.windowHeight = this.$scrollWindow.height();
        };
        AutoScroller.prototype.init = function () {
            var _this = this;
            this.delay = this.delay * 1000;
            this.$scrollWindow.on('onmouseenter', function (evt) { return _this.stop(evt); });
            this.$scrollWindow.on('onmouseleave', function (evt) { return _this.start(evt); });
        };
        AutoScroller.prototype.start = function (evt) {
            var _this = this;
            // console.log('starting',this);
            if (this.isRunning)
                return;
            this.timerId = setInterval(function () { _this.nextStep(); }, this.delay);
        };
        AutoScroller.prototype.stop = function (evt) {
            //console.log('stopping',this);
            clearInterval(this.timerId);
            this.isRunning = false;
        };
        return AutoScroller;
    }());
    utils.AutoScroller = AutoScroller;
})(utils || (utils = {}));
//# sourceMappingURL=AutoScroller.js.map