///<reference path="base.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var table1;
(function (table1) {
    var AgentModel = table.AgentModel;
    var RowView = v2.RowView;
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
            this.container = $(options.container);
            this.setElement(this.container.find('tbody').first(), true);
            RowView.template = _.template($(options.rowTempalete).html());
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