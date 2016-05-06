///<reference path="base.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tables;
(function (tables) {
    var AgentModel = table.AgentModel;
    var RowView = tables.RowViewNested;
    var AgentsCollection = (function (_super) {
        __extends(AgentsCollection, _super);
        function AgentsCollection(options) {
            var _this = this;
            _super.call(this, options);
            this.model = AgentModel;
            this.url = options.url;
            this.params = options.params;
            this.fetch({ data: this.params });
            console.log(this.params);
            setInterval(function () {
                _this.fetch({ data: _this.params });
            }, 5000);
        }
        AgentsCollection.prototype.getOldest = function (isMount) {
            var oldest = this.models[0];
            this.each(function (model) {
                if (model.mounted == isMount && model.timestamp < oldest.timestamp)
                    oldest = model;
            });
            return oldest;
        };
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
    tables.AgentsCollection = AgentsCollection;
    var TableView = (function (_super) {
        __extends(TableView, _super);
        function TableView(options) {
            var _this = this;
            _super.call(this, options);
            this.delay = 0;
            this.scroll_window = $(options.scroll_window);
            this.setHeight();
            console.log(this.scroll_height);
            this.container = $(options.container);
            this.setElement(this.container.find('tbody').first(), true);
            RowView.template = _.template($(options.rowTempalete).html());
            // collection.bind('reset', this.render);
            this.collection = options.collection;
            this.collection.bind('remove', function (evt) {
                console.log('remove', evt);
            }, this);
            this.collection.once("add", function (model) {
                _this.populateList();
                console.log('add');
            }, this);
            this.render = function () {
                console.log(this);
                return this;
            };
        }
        TableView.prototype.populateList = function () {
            var _this = this;
            var model = this.collection.getOldest(false);
            if (!model)
                return;
            setTimeout(function () {
                _this.addRow(model);
                if (_this.$el.height() < _this.scroll_height)
                    _this.populateList();
                else
                    console.log('list full');
            }, 100);
        };
        TableView.prototype.addRow = function (model) {
            var d = $.Deferred();
            var row = new RowView({ model: model, tagName: 'tr' });
            row.appendTo(this.$el);
        };
        TableView.prototype.setHeight = function () {
            this.scroll_height = this.scroll_window.height();
        };
        TableView.prototype.render = function () {
            console.log('render');
            return this;
        };
        return TableView;
    }(Backbone.View));
    tables.TableView = TableView;
})(tables || (tables = {}));
//# sourceMappingURL=BackboneTable.js.map