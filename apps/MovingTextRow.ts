///<reference path="base.ts"/>

class MovingTextRow{
    private TimerId:number;
    private Interval:number=20;
    private LastScrollWidth
    private isFirstTime:boolean=true;
    Separator="\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"
    $Element:JQuery;
    Url:string;
    RequestParams:any;
    Messages:Array<string>;

    constructor(options:any){
        for(var str in options)this[str]=options[str];
        this.$Element=$(options.Selector);

        console.log('constr');
        if (this.$Element===undefined||this.$Element.get(0).tagName!='MARQUEE'){
            console.error("MovingTextRow: Тэг '<marquee>' по указанному селектору не найден!");
            return;
        }
        this.RequestParams=options.RequestParams;
        this.$Element.get(0).addEventListener("onstart",()=>{
            console.log('event');
        });
        this.Start()
    }
    
    Start():void{
        if (this.$Element===undefined){
            console.error("MovingTextRow: Запуск невозможен из-за отсутствия ссылки на тэг '<marquee>'");
            return;
        }
        $.get(this.Url,this.RequestParams,(result)=>{this.UpdateMessages(result);});
        this.TimerId=setInterval(()=>{
            $.get(this.Url,this.RequestParams,(result)=>{this.UpdateMessages(result);});
        },this.Interval);
    }
    Stop(){
        clearInterval(this.TimerId);
    }
    private CreateId():string{
        var i:number=0;
        var Id:string="MovingTextRow"
        for (var i=1;;i++) {
            if($("#"+Id).length==0){
                return Id;
            }
            Id="MovingTextRow"+i;
        }
    }
    
    private UpdateMessages(result):void{
        this.Messages=result.list;
        if (this.isFirstTime){this.Render();this.isFirstTime=false;}
    }

    private Render(){
        this.$Element.get(0).innerHTML=this.Messages.join(this.Separator);
        setTimeout(()=>{this.LastScrollWidth=this.$Element.get(0).scrollWidth-this.$Element.get(0).offsetWidth},10) ;
    }
    
    private TextUpdater():void{
        console.log('scroll');

      //  if (this.$Element.scrollLeft>=this.LastScrollWidth){
          //  this.Render();
       // }
    }
}
var MTROptions={
    Selector:"marquee",
    Url:"http://callcenter.front-desk.ca/service/crawl",
    RequestParams:{a:"get"},
    Interval:5000,
}


var movingTextRow =new MovingTextRow(MTROptions);