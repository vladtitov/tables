/**
 * Created by Vlad on 4/27/2016.
 */
///<reference path="base.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tables;
(function (tables) {
    var RowViewNested = (function (_super) {
        __extends(RowViewNested, _super);
        function RowViewNested(options) {
            var _this = this;
            _super.call(this, options);
            this.listenTo(this.model, 'change:icon', function () { return _this.changeIcon1(); });
            this.listenTo(this.model, 'change:aux', function () { return _this.changeAux(); });
            this.listenTo(this.model, 'change:time', function () { return _this.onTimeChange(); });
            this.listenTo(this.model, 'change:time_color', function () { return _this.onTimeColorChange(); });
            this.listenTo(this.model, 'destroy', function () { return _this.destroy(); });
            this.listenTo(this.model, 'remove', function () { return _this.remove(); });
            //  this.model.bind('add',()=>this.add());
        }
        RowViewNested.prototype.onTimeChange = function () {
            //  var TimeSpan:JQuery=this.$time;
            //  this.time = this.model.get("time");
            var dt = new Date();
            dt.setSeconds(-(this.model.get("time")));
            dt = new Date(Date.now() - dt.getTime());
            this.$time.text(("0" + dt.getUTCHours()).substr(-2) + ":" + ("0" + dt.getUTCMinutes()).substr(-2) + ":" + ("0" + dt.getUTCSeconds()).substr(-2));
            //  console.log(this.time);
            //  this.$time.text(this.time);
        };
        RowViewNested.prototype.onTimeColorChange = function () {
            var TimeSpan = this.$time;
            TimeSpan.removeClass().addClass(this.model.get("time_color"));
        };
        RowViewNested.prototype.changeAux = function () {
            var old = this.$aux_child.addClass('out');
            var n = $('<div>').addClass('trans in').html(this.model.get('aux')).appendTo(this.$aux);
            setTimeout(function () { n.removeClass('in'); }, 10);
            setTimeout(function () { old.remove(); }, 2000);
            this.$aux_child = n;
        };
        RowViewNested.prototype.changeIcon1 = function () {
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
        RowViewNested.prototype.initialize = function () {
            this.$el.html(RowViewNested.template(this.model.toJSON()));
            this.$icon = this.$el.find('.icon').first();
            this.$icon_child = this.$icon.children();
            this.$aux = this.$el.find('.aux').first();
            this.$aux_child = this.$aux.children();
            this.$time = this.$el.find('.col2>span').first();
            //d.setUTCSeconds(this.model.get("time"));
            /* setInterval(()=>{
                 var dt:Date =new Date();
                 dt.setSeconds(-(this.model.get("time")));
                 dt=new Date(Date.now()-dt.getTime());
 
                 this.$time.text(("0"+dt.getUTCHours()).substr(-2)+":"+("0"+dt.getUTCMinutes()).substr(-2)+":"+("0"+dt.getUTCSeconds()).substr(-2));},1000);*/
        };
        RowViewNested.prototype.initMe = function () {
            this.Icon = this.$el.find('.icon:first').get();
        };
        RowViewNested.prototype.appendTo = function (container) {
            container.append(this.$el);
            this.model.height = this.$el.height();
            this.model.mounted = true;
            this.model.timestamp = Date.now();
            return this;
        };
        RowViewNested.prototype.render = function () {
            return this;
        };
        RowViewNested.prototype.remove = function () {
            var _this = this;
            this.model.mounted = false;
            this.model.timestamp = Date.now();
            this.$el.fadeOut(function () {
                _super.prototype.remove.call(_this);
            });
            return this;
        };
        RowViewNested.prototype.add = function () {
            console.log('add');
        };
        RowViewNested.prototype.destroy = function () {
            console.log('destroy');
        };
        return RowViewNested;
    }(Backbone.View));
    tables.RowViewNested = RowViewNested;
})(tables || (tables = {}));
//# sourceMappingURL=RowViewNested.js.map