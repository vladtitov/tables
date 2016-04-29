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
    name:string;
    time:number;
    time_color:string;
    aux:string;

    defaults():any{
        return {
            stamp:0,
            id:0,
            fa:'',
            icon:'',
            name:'',
            time:0,
            time_color:'',
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
    isFilling:boolean;
    Icon:HTMLDivElement;

    private $icon:JQuery;
    private $aux:JQuery;
    private $time:JQuery;
    private time:number;
    constructor(options:any){
        super(options);

        this.model.bind('change:icon', ()=>this.changeIcon1());
        this.model.bind('change:aux', ()=>this.changeAux());
        this.model.bind('change:time', ()=>this.onTimeChange());
        this.model.bind('change:time_color', ()=>this.onTimeColorChange());
        this.model.bind('destroy',()=>this.destroy());
        this.model.bind('remove',()=>this.remove());


      //  this.model.bind('add',()=>this.add());

    }

    private onTimeChange():void{
        var TimeSpan:JQuery=this.$time;
        this.time = this.model.get("time");
    }
    private onTimeColorChange():void{
        var TimeSpan:JQuery=this.$time;
        TimeSpan.removeClass().addClass(this.model.get("time_color"));
       
    }

    private changeAux():void{
       // var newclass:string = this.model.get('')
       // this.$aux;
        var old:JQuery = this.$aux.children(0).addClass('out');
        var n:JQuery = $('<div>').addClass('trans in').html(this.model.get('aux')).appendTo(this.$aux);
        setTimeout(function(){ n.removeClass('in')},10);
        setTimeout(function(){old.remove()},2000);
    }

    changeIcon1():void{
       var $icon:JQuery = this.$icon;
        var old = $icon.children().addClass('out');
        setTimeout(function(){
            old.remove();
        },2000)
       var newdiv= $('<div>').addClass('in fa fa-'+this.model.get('fa')).appendTo($icon);
        setTimeout(function (){
            newdiv.removeClass('in');
        },10);

    }
    initialize(){
        this.$el.html(Row.template(this.model.toJSON()));
        this.$icon = this.$el.find('.icon').first();
        this.$aux = this.$el.find('.aux').first();
        this.$time = this.$el.find('.td2>span').first();


        //d.setUTCSeconds(this.model.get("time"));
        setInterval(()=>{
            var dt:Date =new Date();
            dt.setSeconds(-(this.model.get("time")));
            dt=new Date(Date.now()-dt.getTime());

            this.$time.text(("0"+dt.getUTCHours()).substr(-2)+":"+("0"+dt.getUTCMinutes()).substr(-2)+":"+("0"+dt.getUTCSeconds()).substr(-2));},1000);
    }
    private initMe():void{
        this.Icon= this.$el.find('.icon:first').get();
        
    }
    render() {

        //if(!this.isInit)this.initMe();
        //this.$icon.attr('class',this.model.get('icon'));
       // console.log(this.model);

       // if (this.isFilling){return}
       // this.changeIcon1();
       // this.$el.html(Row.template(this.model.toJSON()));
        

        return this;
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
        setInterval(()=> {
            this.fetch({data:this.params});
        }, 5000);
    }
    parse(res:any) {
        console.log(res);

        var d:string = res.stamp;
        this.params.date = d.replace(' ', 'T');
        //  var stamp:number = Date.now();
        //  var ar:any[]= res.result.list;
        // var out:VOAgent[]

        _.map(res.result.list,function(item:any){
                 //item.stamp = stamp;
                 item.icon = 'fa fa-'+ item.fa;
        /// return new VOAgent(item);
        });



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
