/**
 * Created by Vlad on 4/27/2016.
 */
    ///<reference path="base.ts"/>


module v1{

    import AgentModel = table.AgentModel

  export  class RowView extends Backbone.View<AgentModel> {
        template:(data:any)=>string;
        model:AgentModel
        static template:any

        constructor(options:any) {
            super(options);
            this.model.bind('change', ()=>this.render());
            this.model.bind('destroy', ()=>this.destroy());
            this.model.bind('remove', ()=>this.remove());
            //  this.model.bind('add',()=>this.add());
        }

        render() {
            // console.log(this.model);
            this.$el.html(RowView.template(this.model.toJSON()));

            return this;
        }

        remove():RowView {
            this.$el.fadeOut(()=> {
                super.remove();
            })
            return this;

        }

        add():void {
            console.log('add');
        }

        destroy():void {
            console.log('destroy');
        }


    }

}