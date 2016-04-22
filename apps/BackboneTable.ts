///<reference path="../typings/jquery.d.ts"/>
///<reference path="../typings/underscore.d.ts"/>
///<reference path="../typings/backbone-global.d.ts"/>


class VOAgent{
    stamp:number;
    id:number;
    fa:string;
    name:string;
    time:number;
    aux:string;
    constructor(obj:any){
        for (var s in obj)this[s]=obj[s];
    }
    
}

class AgentM extends Backbone.Model{

    defaults():VOAgent{
        return {
            stamp:0,
            id:3,
            fa:'',
            name:'',
            time:0,
            aux:''
        }
    }
}



class Row extends Backbone.View<AgentM>{
    template:(data:any)=>string;
    model:AgentM;
    static template:any
    $icon:JQuery
    $name:JQuery;
    isInit:boolean
    
    constructor(options:any){
        super(options);

        this.model.bind('change', ()=>this.render());
        this.model.bind('destroy',()=>this.destroy());
       this.model.bind('remove',()=>this.remove());
      //  this.model.bind('add',()=>this.add());
    }

    private initMe():void{
        this.$el.html(Row.template(this.model.toJSON()));
        this.$icon= this.$el.find('.icon');
        
    }
    render() {
        if(!this.isInit)this.initMe();
        this.$icon.attr('class',this.model.get('icon'));
       // console.log(this.model);
        

        return this;
    }

    remove():Row{
        this.$el.fadeOut(()=>{
            super.remove();
        })
        return this;

    }
    add():void{
console.log('add');
    }
    destroy():void{
        console.log('destroy');
    }




}

class AppModel extends Backbone.Model{

    
}


class AgentsC extends Backbone.Collection<AgentM>{
    model = AgentM;
    data:any;
    params:any;
    constructor(options:any){
        super(options)
        this.url = options.url;
        this.params = options.params;
        this.fetch({data:this.params});
        console.log(this.params);
        setInterval(()=> {
            this.fetch({data:this.params});
        }, 5000);
    }
    parse(res:any){
       /// console.log(res);

        var d:string = res.stamp;
        this.params.date=d.replace(' ','T');
        var stamp:number = Date.now();
        var ar:any[]= res.result.list;
        var out:VOAgent[]

   out =  _.map(res.result.list,function(item:any){
                 //item.stamp = stamp;
                 item.icon = 'fa fa-'+ item.fa;
       return new VOAgent(item);
     });



    // console.log(res.result.list.length);
    // console.log(out);
    return out;
}
    //parse:(data)=>{ }
}


class TableView extends Backbone.View<AppModel>{
    collectionAgentsC;
    constructor(options){
        super(options);
       this.setElement($("#TableList"), true);
        Row.template =  _.template($('#row-template').html());
     
       // collection.bind('reset', this.render);
      this.collection = options.collection;
        this.collection.bind('remove',(evt)=>{
            console.log('remove',evt);
        },this);

        this.collection.bind("add",(evt)=>{
         //  console.log('add',evt);
         var row = new Row({model:evt,tagName:'tr'});
           this.$el.append(row.render().el);
      },this);
        this.render = function(){
            console.log(this);
            return this;
        }
    }

    render():TableView{

        console.log('render');

        return this;
    }


}


