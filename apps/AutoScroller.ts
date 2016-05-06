 ///<reference path="base.ts"/>
 
 
module utils{
   export class AutoScroller{
       private isRunning:boolean;
       
       scrollWindow:string;
       scrollContent:string;
       list:string;
       
       $scrollWindow:JQuery;      
       $scrollContent:JQuery;       
       $list:JQuery;
       windowHeight:number;
       scrollHeight:number=0;
       timerId:number;
       step:number=0;
       delay:number=1;
       private currentScroll:number=0;
       private actualScroll:number;

        constructor(options:any){
            for(var str in options)this[str] = options[str];
            this.$scrollWindow = $(this.scrollWindow).first();
            this.$scrollContent = $(this.scrollContent).first();
            this.$list = $(this.list).first();
            this.init();
            setTimeout(()=>this.start(null),2000);
        }

       private onScrollEnd():void{
           console.log('scrollend');
           this.stop(null)
       }
       /*private rearange():void{
           this.step =0;
           this.currentScroll=0;
           this.$scrollWindow.scrollTop(0);
       }*/
       private getScrollHeight():number{
           switch(this.step){
               case 1:
                   return this.$list.children(0).height();
               case 2:
                   return this.$list.children(1).height();
               default:
                   this.step =0;
                   this.currentScroll=0;
                   this.$scrollWindow.scrollTop(0);
                   this.$list.append(this.$list.children().first());
                   this.$list.append(this.$list.children().first());
                   return this.$list.children(0).height();
           }
       }
       private nextStep():void{
           this.step++;
            var h:number = this.getScrollHeight();
           console.log(h);
            this.currentScroll+=h;
           this.$scrollWindow.animate({
               scrollTop:this.currentScroll
           },()=>{
              var scroll:number =  this.$scrollWindow.scrollTop();
               if(scroll == this.actualScroll)this.onScrollEnd();
               this.actualScroll = scroll;
               console.log();
           })
       }
       setHeight():void{
           this.windowHeight = this.$scrollWindow.height();
       }

       init():void{
           this.delay = this.delay*1000;
           this.$scrollWindow.on('onmouseenter',(evt)=>this.stop(evt));
           this.$scrollWindow.on('onmouseleave',(evt)=>this.start(evt));
       }
        start(evt:JQueryEventObject):void{
           // console.log('starting',this);
            if(this.isRunning) return
            this.timerId = setInterval(()=>{this.nextStep()},this.delay);        }
        stop(evt:JQueryEventObject):void{
            //console.log('stopping',this);
            clearInterval(this.timerId);

            this.isRunning=false;
        }
    }
}

