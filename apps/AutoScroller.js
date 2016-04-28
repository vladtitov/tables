/**
 * Created by MERDOCK on 27.04.2016.
 */
var AutoScroller = (function () {
    function AutoScroller(Selector, Interval, Step) {
        var _this = this;
        this.Element = $(Selector)[0];
        this.Interval = Interval;
        this.Step = Step;
        this.Element.onmouseenter = function () { _this.Stop(); };
        this.Element.onmouseleave = function () { _this.Start(); };
    }
    AutoScroller.prototype.Start = function () {
        var _this = this;
        clearInterval(this.TimerId);
        this.TimerId = setInterval(function () {
            var Top = _this.Element.scrollTop;
            _this.IsRun = true;
            _this.Element.scrollTop += _this.Step;
            if (Top + _this.Step != _this.Element.scrollTop) {
                _this.Step *= -1;
            }
        }, this.Interval);
    };
    AutoScroller.prototype.Stop = function () {
        clearInterval(this.TimerId);
        this.IsRun = false;
        this.Step = Math.abs(this.Step);
    };
    return AutoScroller;
}());
//# sourceMappingURL=AutoScroller.js.map