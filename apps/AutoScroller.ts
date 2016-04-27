/**
 * Created by MERDOCK on 27.04.2016.
 */

class AutoScroller{
    private IsRun:boolean;
    Element:HTMLElement;
    TimerId:number;
    Step:number;
    Interval:number;
    constructor(Selector, Interval, Step){
        this.Element=$(Selector)[0];
        this.Interval=Interval;
        this.Step=Step;
        this.Element.onmouseenter=()=>{this.Stop();};
        this.Element.onmouseleave=()=>{this.Start();};
    }
    Start():void{
        clearInterval(this.TimerId);
        this.TimerId=setInterval(()=>{
            var Top=this.Element.scrollTop;
            this.IsRun=true;
            this.Element.scrollTop+=this.Step;
            if(Top+this.Step!=this.Element.scrollTop){
                this.Step*=-1;
            }
        },this.Interval);
    }
    Stop():void{
        clearInterval(this.TimerId);
        this.IsRun=false;
        this.Step=Math.abs(this.Step);
    }
}
