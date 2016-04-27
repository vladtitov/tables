///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var table1;
(function (table1) {
    var VOAgent = (function () {
        function VOAgent() {
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
                id: 3,
                fa: '',
                name: '',
                time: 0,
                aux: ''
            };
        };
        return AgentM;
    }(Backbone.Model));
    var RowView = (function (_super) {
        __extends(RowView, _super);
        function RowView(options) {
            var _this = this;
            _super.call(this, options);
            this.model.bind('change', function () { return _this.render(); });
            this.model.bind('destroy', function () { return _this.destroy(); });
            this.model.bind('remove', function () { return _this.remove(); });
            //  this.model.bind('add',()=>this.add());
        }
        RowView.prototype.render = function () {
            // console.log(this.model);
            this.$el.html(RowView.template(this.model.toJSON()));
            return this;
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
    var AppModel = (function (_super) {
        __extends(AppModel, _super);
        function AppModel() {
            _super.apply(this, arguments);
        }
        return AppModel;
    }(Backbone.Model));
    var AgentsCollection = (function (_super) {
        __extends(AgentsCollection, _super);
        function AgentsCollection(options) {
            var _this = this;
            _super.call(this, options);
            this.model = AgentM;
            this.url = options.url;
            this.params = options.params;
            this.fetch({ data: this.params });
            console.log(this.params);
            setInterval(function () {
                _this.fetch({ data: _this.params });
            }, 5000);
        }
        AgentsCollection.prototype.parse = function (res) {
            var d = res.stamp;
            this.params.date = d.replace(' ', 'T');
            var stamp = Date.now();
            _.map(res.result.list, function (item) {
                item.stamp = stamp;
                item.icon = 'fa fa-' + item.fa;
            });
            // console.log(res.result.list.length);
            //  console.log(res);
            return res.result.list;
        };
        return AgentsCollection;
    }(Backbone.Collection));
    table1.AgentsCollection = AgentsCollection;
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(options) {
            var _this = this;
            _super.call(this, options);
            this.setElement($("#TableList"), true);
            RowView.template = _.template($('#row-template').html());
            // collection.bind('reset', this.render);
            this.collection = options.collection;
            this.collection.bind('remove', function (evt) {
                console.log('remove', evt);
            }, this);
            this.collection.bind("add", function (evt) {
                //  console.log('add',evt);
                var row = new RowView({ model: evt, tagName: 'tr' });
                _this.$el.append(row.render().el);
            }, this);
            this.render = function () {
                console.log(this);
                return this;
            };
        }
        TableView.prototype.render = function () {
            console.log('render');
            return this;
        };
        return TableView;
    }(Backbone.View));
    table1.TableView = TableView;
})(table1 || (table1 = {}));
//# sourceMappingURL=BackboneTable.js.map