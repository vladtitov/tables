/**
 * Created by MERDOCK on 27.04.2016.
 */
/*url="http://callcenter.front-desk.ca/service/crawl?a=get"*/
var MTROptions = {
    selector: "",
    url: {},
    interval: 30,
};
var a = new MovingTextRow({ selector: "dssd", GetParams: { a: "get" } });
var MovingTextRow = (function () {
    function MovingTextRow(options) {
        this.Interval = 30;
        this.GetParams = { a: "get" };
        for (var str in options)
            this[str] = options[str];
    }
    MovingTextRow.prototype.Start = function () {
        var _this = this;
        this.TimerId = setInterval(function () {
            $.get(_this.Url, _this.GetParams);
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
//# sourceMappingURL=MovingTextRow.js.map