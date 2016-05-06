/**
 * Created by Vlad on 4/27/2016.
 */
    ///<reference path="base.ts"/>

module table{

    export  class VOAgent {
        stamp:number;
        id:number;
        fa:string;
        name:string;
        time:number;
        aux:string;
    }


    export class AgentModel extends Backbone.Model {
        mounted:boolean = false;
        timestamp:number=0;
        height:number;
        initialize(){
            console.log('init');
            setInterval(()=>{
              // console.log(this.get('time'));
                var t:number = this.get('time')+1;
              this.set('time',t);
            },1000)
        }
        defaults():VOAgent {
            return {
                stamp: 0,
                id: 3,
                fa: '',
                name: '',
                time: 0,
                aux: ''
            }
        }
    }

}