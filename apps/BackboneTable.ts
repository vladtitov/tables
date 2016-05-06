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
        
        getOldest(isMount:boolean):AgentModel{
            var oldest:AgentModel = this.models[0];
            this.each(function(model:AgentModel) {
                if (model.mounted == isMount && model.timestamp < oldest.timestamp) oldest = model;
            });
            return oldest;
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
        container:JQuery;
        scroll_height:number;
        scroll_window:JQuery;
        private delay:number =0;

        collection:AgentsCollection;
        firstTime:boolean = true;
        constructor(options) {
            super(options);
           this.scroll_window = $(options.scroll_window);
            this.setHeight();
            this.container = $(options.container);
            RowView.template = _.template($(options.rowTempalete).html());
            this.collection = options.collection;
            this.setElement(this.container.find('tbody').first(), true);
        }
        initialize():void{
            this.collection.bind('remove', (evt)=> {
                console.log('remove', evt);
            }, this);
            this.collection.on("add", (model:AgentModel)=> {
                if(this.firstTime)setTimeout(()=>this.addRow(model),this.delay+=50);
                else this.addRow(model);
            }, this);

            this.collection.once("add", (model:AgentModel)=> {
                setTimeout(()=>{this.firstTime = false},2000);
            }, this);
        }

        addRow(model:AgentModel):void{
            var row = new RowView({model: model, tagName: 'tr'});
            row.appendTo(this.$el);
        }

        setHeight():void{
            this.scroll_height = this.scroll_window.height();
        }

        render():TableView {
            console.log('render');

            return this;
        }


    }
}


