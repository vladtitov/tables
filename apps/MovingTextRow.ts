    /**
     * Created by MERDOCK on 27.04.2016.
     */
    /*url="http://callcenter.front-desk.ca/service/crawl?a=get"*/

var MTROptions={
        selector:"",
        url:{},
        interval:30,
}
    var a =new MovingTextRow({selector:"dssd",GetParams:{a:"get"}})

class MovingTextRow{
        private TimerId:number;
        private Interval:number=30;
        Element:HTMLMarqueeElement;
        Url:string;
        GetParams:any={a:"get"};
        MyMessages:Array<string>;
    
        constructor(options){
            for(var str in options)this[str]=options[str];
        }
    
        Start():void{
            this.TimerId=setInterval(()=>{
                
                $.get(this.Url,this.GetParams);
            });
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
    
        private UpdateMessages():void{
    
        }
    
        private UpdateText():void{
            
        }
}
