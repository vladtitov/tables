/**
 * Created by Vlad on 4/27/2016.
 */
    ///<reference path="base.ts"/>


module tables{

    import AgentModel = table.AgentModel;

    export class RowViewNested extends Backbone.View<AgentModel>{
        template:(data:any)=>string;
        model:AgentModel;
        static template:any
        /* $icon:JQuery;
         $name:JQuery;*/
        isInit:boolean;
        isFilling:boolean;
        Icon:HTMLDivElement;

        private $icon:JQuery;
        private $icon_child:JQuery;
        private $aux:JQuery;
        private $aux_child;
        private $time:JQuery;
        private time:number;

        constructor(options:any){
            super(options);
            this.listenTo(this.model,'change:icon', ()=>this.changeIcon1());
            this.listenTo( this.model,'change:aux', ()=>this.changeAux());
            this.listenTo(this.model,'change:time', ()=>this.onTimeChange());
            this.listenTo(this.model,'change:time_color', ()=>this.onTimeColorChange());
            this.listenTo(this.model,'destroy',()=>this.destroy());
            this.listenTo(this.model,'remove',()=>this.remove());


            //  this.model.bind('add',()=>this.add());

        }

        private onTimeChange():void{
          //  var TimeSpan:JQuery=this.$time;
          //  this.time = this.model.get("time");
            var dt:Date =new Date();
            dt.setSeconds(-(this.model.get("time")));
            dt=new Date(Date.now()-dt.getTime());

            this.$time.text(("0"+dt.getUTCHours()).substr(-2)+":"+("0"+dt.getUTCMinutes()).substr(-2)+":"+("0"+dt.getUTCSeconds()).substr(-2));
          //  console.log(this.time);
          //  this.$time.text(this.time);

        }
        private onTimeColorChange():void{
            var TimeSpan:JQuery=this.$time;
            TimeSpan.removeClass().addClass(this.model.get("time_color"));
        }

        private changeAux():void{
            var old:JQuery = this.$aux_child.addClass('out');
            var n:JQuery = $('<div>').addClass('trans in').html(this.model.get('aux')).appendTo(this.$aux);
            setTimeout(function(){ n.removeClass('in')},10);
            setTimeout(function(){old.remove()},2000);
            this.$aux_child=n;
        }

        changeIcon1():void{
            var $icon:JQuery = this.$icon;
            var old = this.$icon_child.addClass('out');
            setTimeout(function(){
                    old.remove();
                },2000);

            var newdiv= $('<div>').addClass('in fa fa-'+this.model.get('fa')).appendTo($icon);
            setTimeout(function (){
                newdiv.removeClass('in');
            },10);
            this.$icon_child = newdiv;
        }

        initialize(){
            this.$el.html(RowViewNested.template(this.model.toJSON()));
            this.$icon = this.$el.find('.icon').first();
            this.$icon_child = this.$icon.children();
            this.$aux = this.$el.find('.aux').first();
            this.$aux_child =  this.$aux.children();
            this.$time = this.$el.find('.col2>span').first();


            //d.setUTCSeconds(this.model.get("time"));
           /* setInterval(()=>{
                var dt:Date =new Date();
                dt.setSeconds(-(this.model.get("time")));
                dt=new Date(Date.now()-dt.getTime());

                this.$time.text(("0"+dt.getUTCHours()).substr(-2)+":"+("0"+dt.getUTCMinutes()).substr(-2)+":"+("0"+dt.getUTCSeconds()).substr(-2));},1000);*/
        }
        private initMe():void{
            this.Icon= this.$el.find('.icon:first').get();

        }

        appendTo(container:JQuery):any{
            container.append(this.$el);
            this.model.height = this.$el.height()
            this.model.mounted = true;
            this.model.timestamp = Date.now();
            return this;
        }

        render() {

            return this;
        }



        remove():RowViewNested {
            this.model.mounted = false;
            this.model.timestamp = Date.now();
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
}