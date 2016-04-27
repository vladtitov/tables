/**
 * Created by Vlad on 4/27/2016.
 */
    ///<reference path="base.ts"/>


module v2{

    import AgentModel = table.AgentModel;

    export class RowView extends Backbone.View<AgentModel>{
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
            this.$el.html(RowView.template(this.model.toJSON()));
            this.$icon = this.$el.find('.icon').first();
            this.$icon_child = this.$icon.children();
            this.$aux = this.$el.find('.aux').first();
            this.$aux_child =  this.$aux.children();
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

        remove():RowView{
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