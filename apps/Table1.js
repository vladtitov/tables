/**
 * Created by Vlad on 4/27/2016.
 */
///<reference path="base.ts"/>
$(document).ready(function () {
    var collection = new tables.AgentsCollection({
        url: 'http://callcenter.front-desk.ca/service/get-agents-all',
        params: {
            date: '2016-03-15T7:58:34'
        }
    });
    var t = new tables.TableView({
        container: '#Table1',
        rowTempalete: '#row-template',
        collection: collection,
        scroll_window: '#Table1 .scroll-window'
    });
    var scroller = new utils.AutoScroller({
        scrollWindow: '#Table1 .scroll-window',
        scrollContent: '#Table1 scroll-content',
        list: '#Table1 .scroll-window tbody'
    });
});
//# sourceMappingURL=Table1.js.map