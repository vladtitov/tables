/**
 * Created by Vlad on 4/27/2016.
 */
///<reference path="base.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var v2;
(function (v2) {
    var RowView = (function (_super) {
        __extends(RowView, _super);
        function RowView(options) {
            var _this = this;
            _super.call(this, options);
            this.model.bind('change:icon', function () { return _this.changeIcon1(); });
            this.model.bind('change:aux', function () { return _this.changeAux(); });
            this.model.bind('change:time', function () { return _this.onTimeChange(); });
            this.model.bind('change:time_color', function () { return _this.onTimeColorChange(); });
            this.model.bind('destroy', function () { return _this.destroy(); });
            this.model.bind('remove', function () { return _this.remove(); });
            //  this.model.bind('add',()=>this.add());
        }
        RowView.prototype.onTimeChange = function () {
            var TimeSpan = this.$time;
            this.time = this.model.get("time");
        };
        RowView.prototype.onTimeColorChange = function () {
            var TimeSpan = this.$time;
            TimeSpan.removeClass().addClass(this.model.get("time_color"));
        };
        RowView.prototype.changeAux = function () {
            var old = this.$aux_child.addClass('out');
            var n = $('<div>').addClass('trans in').html(this.model.get('aux')).appendTo(this.$aux);
            setTimeout(function () { n.removeClass('in'); }, 10);
            setTimeout(function () { old.remove(); }, 2000);
            this.$aux_child = n;
        };
        RowView.prototype.changeIcon1 = function () {
            var $icon = this.$icon;
            var old = this.$icon_child.addClass('out');
            setTimeout(function () {
                old.remove();
            }, 2000);
            var newdiv = $('<div>').addClass('in fa fa-' + this.model.get('fa')).appendTo($icon);
            setTimeout(function () {
                newdiv.removeClass('in');
            }, 10);
            this.$icon_child = newdiv;
        };
        RowView.prototype.initialize = function () {
            var _this = this;
            this.$el.html(RowView.template(this.model.toJSON()));
            this.$icon = this.$el.find('.icon').first();
            this.$icon_child = this.$icon.children();
            this.$aux = this.$el.find('.aux').first();
            this.$aux_child = this.$aux.children();
            this.$time = this.$el.find('.td2>span').first();
            //d.setUTCSeconds(this.model.get("time"));
            setInterval(function () {
                var dt = new Date();
                dt.setSeconds(-(_this.model.get("time")));
                dt = new Date(Date.now() - dt.getTime());
                _this.$time.text(("0" + dt.getUTCHours()).substr(-2) + ":" + ("0" + dt.getUTCMinutes()).substr(-2) + ":" + ("0" + dt.getUTCSeconds()).substr(-2));
            }, 1000);
        };
        RowView.prototype.initMe = function () {
            this.Icon = this.$el.find('.icon:first').get();
        };
        RowView.prototype.render = function () {
            //if(!this.isInit)this.initMe();
            //this.$icon.attr('class',this.model.get('icon'));
            // console.log(this.model);
            // if (this.isFilling){return}
            // this.changeIcon1();
            // this.$el.html(Row.template(this.model.toJSON()));
            return this;
        };
        RowView.prototype.changeIcon2 = function () {
        };
        RowView.prototype.changeIcon3 = function () {
        };
        RowView.prototype.remove = function () {
            var _this = this;
            this.$el.fadeOut(function () {
                _super.prototype.remove.call(_this);
            });
            return this;
        };
        RowView.prototype.add = function () {
            console.log('add');
        };
        RowView.prototype.destroy = function () {
            console.log('destroy');
        };
        return RowView;
    }(Backbone.View));
    v2.RowView = RowView;
})(v2 || (v2 = {}));
//# sourceMappingURL=RowView2.js.map