var MTROptions = {
    Selector: "marquee",
    Url: "http://callcenter.front-desk.ca/service/crawl",
    RequestParams: { a: "get" },
    Interval: 5000
};
var MovingTextRow = (function () {
    function MovingTextRow(options) {
        var _this = this;
        this.Interval = 20;
        this.isFirstTime = true;
        this.Separator = "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
        for (var str in options)
            this[str] = options[str];
        this.$Element = $(options.Selector);
        if (this.$Element === undefined || this.$Element.get(0).tagName != 'MARQUEE') {
            console.error("MovingTextRow: Тэг '<marquee>' по указанному селектору не найден!");
            return;
        }
        this.RequestParams = options.RequestParams;
        this.$Element.on("scroll", function () { _this.TextUpdater(); });
        this.Start();
    }
    MovingTextRow.prototype.Start = function () {
        var _this = this;
        if (this.$Element === undefined) {
            console.error("MovingTextRow: Запуск невозможен из-за отсутствия ссылки на тэг '<marquee>'");
            return;
        }
        $.get(this.Url, this.RequestParams, function (result) { _this.UpdateMessages(result); });
        this.TimerId = setInterval(function () {
            $.get(_this.Url, _this.RequestParams, function (result) { _this.UpdateMessages(result); });
        }, this.Interval);
    };
    MovingTextRow.prototype.Stop = function () {
        clearInterval(this.TimerId);
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
    MovingTextRow.prototype.UpdateMessages = function (result) {
        this.Messages = result.list;
        if (this.isFirstTime) {
            this.Render();
            this.isFirstTime = false;
        }
    };
    MovingTextRow.prototype.Render = function () {
        var _this = this;
        this.$Element.get(0).innerHTML = this.Messages.join(this.Separator);
        setTimeout(function () { _this.LastScrollWidth = _this.$Element.get(0).scrollWidth - _this.$Element.get(0).offsetWidth; }, 10);
    };
    MovingTextRow.prototype.TextUpdater = function () {
        if (this.$Element.scrollLeft >= this.LastScrollWidth) {
            this.Render();
        }
    };
    return MovingTextRow;
}());
var movingTextRow = new MovingTextRow(MTROptions);
//# sourceMappingURL=MovingTextRow.js.map