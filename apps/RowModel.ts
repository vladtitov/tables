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