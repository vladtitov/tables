var MTROptions = {
    selector: "",
    url: "",
    interval: 30,
};
//var a =new MovingTextRow({selector:"dssd",})
var MovingText1;
(function (MovingText1) {
    var MovingTextRow = (function () {
        function MovingTextRow(options) {
            this.Interval = 30;
            for (var str in options)
                this[str] = options[str];
        }
        MovingTextRow.prototype.Start = function () {
            var _this = this;
            this.TimerId = setInterval(function () {
                $.get(_this.Url);
            });
        };
        MovingTextRow.prototype.CreateId = function () {
            var i = 0;
            var Id = "MovingTextRow";
            for (var i = 1;; i++) {
                if ($("#" + Id).length == 0) {
                    return Id;
                }
                Id = "MovingTextRow" + i;
            }
        };
        MovingTextRow.prototype.UpdateMessages = function () {
        };
        MovingTextRow.prototype.UpdateText = function () {
        };
        return MovingTextRow;
    }());
    MovingText1.MovingTextRow = MovingTextRow;
})(MovingText1 || (MovingText1 = {}));
//# sourceMappingURL=MovingTextRow.js.map