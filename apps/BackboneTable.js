///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VOAgent = (function () {
    function VOAgent(obj) {
        for (var s in obj)
            this[s] = obj[s];
    }
    return VOAgent;
}());
var AgentM = (function (_super) {
    __extends(AgentM, _super);
    function AgentM() {
        _super.apply(this, arguments);
    }
    AgentM.prototype.defaults = function () {
        return {
            stamp: 0,
            id: 0,
            fa: '',
            icon: '',
            name: '',
            time: 0,
            time_color: '',
            aux: ''
        };
    };
    return AgentM;
}(Backbone.Model));
var Row = (function (_super) {
    __extends(Row, _super);
    function Row(options) {
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
    Row.prototype.onTimeChange = function () {
        var TimeSpan = this.$time;
        this.time = this.model.get("time");
    };
    Row.prototype.onTimeColorChange = function () {
        var TimeSpan = this.$time;
        TimeSpan.removeClass().addClass(this.model.get("time_color"));
    };
    Row.prototype.changeAux = function () {
        // var newclass:string = this.model.get('')
        // this.$aux;
        var old = this.$aux.children(0).addClass('out');
        var n = $('<div>').addClass('trans in').html(this.model.get('aux')).appendTo(this.$aux);
        setTimeout(function () { n.removeClass('in'); }, 10);
        setTimeout(function () { old.remove(); }, 2000);
    };
    Row.prototype.changeIcon1 = function () {
        var $icon = this.$icon;
        var old = $icon.children().addClass('out');
        setTimeout(function () {
            old.remove();
        }, 2000);
        var newdiv = $('<div>').addClass('in fa fa-' + this.model.get('fa')).appendTo($icon);
        setTimeout(function () {
            newdiv.removeClass('in');
        }, 10);
    };
    Row.prototype.initialize = function () {
        var _this = this;
        this.$el.html(Row.template(this.model.toJSON()));
        this.$icon = this.$el.find('.icon').first();
        this.$aux = this.$el.find('.aux').first();
        this.$time = this.$el.find('.td2>span').first();
        //d.setUTCSeconds(this.model.get("time"));
        setInterval(function () {
            var dt = new Date();
            dt.setSeconds(-(_this.model.get("time")));
            dt = new Date(Date.now() - dt.getTime());
            _this.$time.text(("0" + dt.getUTCHours()).substr(-2) + ":" + ("0" + dt.getUTCMinutes()).substr(-2) + ":" + ("0" + dt.getUTCSeconds()).substr(-2));
        }, 1000);
    };
    Row.prototype.initMe = function () {
        this.Icon = this.$el.find('.icon:first').get();
    };
    Row.prototype.render = function () {
        //if(!this.isInit)this.initMe();
        //this.$icon.attr('class',this.model.get('icon'));
        // console.log(this.model);
        // if (this.isFilling){return}
        // this.changeIcon1();
        // this.$el.html(Row.template(this.model.toJSON()));
        return this;
    };
    Row.prototype.changeIcon2 = function () {
    };
    Row.prototype.changeIcon3 = function () {
    };
    Row.prototype.remove = function () {
        var _this = this;
        this.$el.fadeOut(function () {
            _super.prototype.remove.call(_this);
        });
        return this;
    };
    Row.prototype.add = function () {
        //console.log('add');
    };
    Row.prototype.destroy = function () {
        //console.log('destroy');
    };
    return Row;
}(Backbone.View));
var AppModel = (function (_super) {
    __extends(AppModel, _super);
    function AppModel() {
        _super.apply(this, arguments);
    }
    return AppModel;
}(Backbone.Model));
var AgentsC = (function (_super) {
    __extends(AgentsC, _super);
    function AgentsC(options) {
        var _this = this;
        _super.call(this, options);
        this.model = AgentM;
        this.url = options.url;
        this.params = options.params;
        this.fetch({ data: this.params });
        //console.log(this.params);
        setInterval(function () {
            _this.fetch({ data: _this.params });
        }, 5000);
    }
    AgentsC.prototype.parse = function (res) {
        //console.log(res);
        var d = res.stamp;
        this.params.date = d.replace(' ', 'T');
        //  var stamp:number = Date.now();
        //  var ar:any[]= res.result.list;
        // var out:VOAgent[]
        _.map(res.result.list, function (item) {
            //item.stamp = stamp;
            item.icon = 'fa fa-' + item.fa;
            /// return new VOAgent(item);
        });
        // console.log(res.result.list.length);
        // console.log(out);
        return res.result.list;
    };
    return AgentsC;
}(Backbone.Collection));
var TableView = (function (_super) {
    __extends(TableView, _super);
    function TableView(options) {
        var _this = this;
        _super.call(this, options);
        this.setElement($("#TableList"), true);
        Row.template = _.template($('#row-template').html());
        // collection.bind('reset', this.render);
        this.collection = options.collection;
        this.collection.bind('remove', function (evt) {
            //console.log('remove',evt);
        }, this);
        this.collection.bind("add", function (evt) {
            //  console.log('add',evt);
            var row = new Row({ model: evt, tagName: 'tr' });
            _this.$el.append(row.render().el);
        }, this);
        this.render = function () {
            //console.log(this);
            return this;
        };
    }
    TableView.prototype.render = function () {
        //console.log('render');
        return this;
    };
    return TableView;
}(Backbone.View));
//# sourceMappingURL=BackboneTable.js.map