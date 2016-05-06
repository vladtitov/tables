///<reference path="base.ts"/>


module tables {
    import AgentModel = table.AgentModel;
    import RowView = tables.RowViewNested;
    
    export class AgentsCollection extends Backbone.Collection<AgentModel> {
        model:any = AgentModel;
        data:any;
        params:any;         

        constructor(options:any) {
            super(options)
            this.url = options.url;
            this.params = options.params;
            this.fetch({data: this.params});
            console.log(this.params);
            setInterval(()=> {
                this.fetch({data: this.params});
            }, 5000);
        }

        parse(res) {
            var d:string = res.stamp;
            this.params.date = d.replace(' ', 'T');
            var stamp = Date.now();
            _.map(res.result.list, function (item:any) {
                item.stamp = stamp;
                item.icon = 'fa fa-' + item.fa;
            });

            // console.log(res.result.list.length);
            //  console.log(res);
            return res.result.list
        }

        //parse:(data)=>{ }
    }


    export class TableView extends Backbone.View<AgentModel> {
        collectionAgentsC;

        container:JQuery;

        constructor(options) {
            super(options);
            this.container = $(options.container);
            this.setElement(this.container.find('tbody').first(), true);
            RowView.template = _.template($(options.rowTempalete).html());
            // collection.bind('reset', this.render);
            this.collection = options.collection;
            this.collection.bind('remove', (evt)=> {
                console.log('remove', evt);
            }, this);

            this.collection.bind("add", (evt)=> {
                //  console.log('add',evt);
                var row = new RowView({model: evt, tagName: 'tr'});
                this.$el.append(row.render().el);
            }, this);
            this.render = function () {
                console.log(this);
                return this;
            }
        }

        render():TableView {

            console.log('render');

            return this;
        }


    }
}


