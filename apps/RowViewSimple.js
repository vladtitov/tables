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
    var RowViewSimple = (function (_super) {
        __extends(RowViewSimple, _super);
        function RowViewSimple(options) {
            var _this = this;
            _super.call(this, options);
            this.model.bind('change', function () { return _this.render(); });
            this.model.bind('destroy', function () { return _this.destroy(); });
            this.model.bind('remove', function () { return _this.remove(); });
            //  this.model.bind('add',()=>this.add());
        }
        RowViewSimple.prototype.render = function () {
            // console.log(this.model);
            this.$el.html(RowViewSimple.template(this.model.toJSON()));
            return this;
        };
        RowViewSimple.prototype.remove = function () {
            var _this = this;
            this.$el.fadeOut(function () {
                _super.prototype.remove.call(_this);
            });
            return this;
        };
        RowViewSimple.prototype.add = function () {
            console.log('add');
        };
        RowViewSimple.prototype.destroy = function () {
            console.log('destroy');
        };
        return RowViewSimple;
    }(Backbone.View));
    tables.RowViewSimple = RowViewSimple;
})(tables || (tables = {}));
//# sourceMappingURL=RowViewSimple.js.map