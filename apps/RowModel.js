/**
 * Created by Vlad on 4/27/2016.
 */
///<reference path="base.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var table;
(function (table) {
    var VOAgent = (function () {
        function VOAgent() {
        }
        return VOAgent;
    }());
    table.VOAgent = VOAgent;
    var AgentModel = (function (_super) {
        __extends(AgentModel, _super);
        function AgentModel() {
            _super.apply(this, arguments);
        }
        AgentModel.prototype.defaults = function () {
            return {
                stamp: 0,
                id: 3,
                fa: '',
                name: '',
                time: 0,
                aux: ''
            };
        };
        return AgentModel;
    }(Backbone.Model));
    table.AgentModel = AgentModel;
})(table || (table = {}));
//# sourceMappingURL=RowModel.js.map