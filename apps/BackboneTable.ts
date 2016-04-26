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
    stamp:number;
    id:number;
    fa:string;
    icon:string;
    iconold:string;
    name:string;
    time:number;
    aux:string;

    defaults():any{
        return {
            stamp:0,
            id:0,
            fa:'',
            icon:'',
            iconold:'',
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
   /* $icon:JQuery;
    $name:JQuery;*/
    isInit:boolean;
    Icon:HTMLDivElement;
    
    constructor(options:any){
        super(options);

        this.model.bind('change', ()=>this.render());
        this.model.bind('destroy',()=>this.destroy());
       this.model.bind('remove',()=>this.remove());
      //  this.model.bind('add',()=>this.add());
    }

    private initMe():void{
        this.Icon= this.$el.find('.icon:first').get();
        
    }
    render() {
        //if(!this.isInit)this.initMe();
        //this.$icon.attr('class',this.model.get('icon'));
       // console.log(this.model);


        this.changeIcon1();
        this.$el.html(Row.template(this.model.toJSON()));
        

        return this;
    }

    private icon1:string='';
    private changeIcon1(){
      // console.log(this.model.get('fa'))


        this.model.set('iconold','out '+this.icon1);
        this.icon1 = 'fa fa-'+ this.model.get('fa');
        this.model.set('icon','in '+this.icon1);
    }
    private changeIcon2(){


    }
    private changeIcon3(){


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
        /*setInterval(()=> {
            this.fetch({data:this.params});
        }, 5000);*/
    }
    parse(res:any){
        console.log(res);

        var d:string = res.stamp;
        this.params.date=d.replace(' ','T');
      //  var stamp:number = Date.now();
      //  var ar:any[]= res.result.list;
       // var out:VOAgent[]

 /*  out =  _.map(res.result.list,function(item:any){
                 //item.stamp = stamp;

                 item.icon = 'fa fa-'+ item.fa;
       return new VOAgent(item);
     });*/



    // console.log(res.result.list.length);
    // console.log(out);
    return res.result.list;
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


