import Collection = _.Collection;
/**
 * Created by MERDOCK on 23.04.2016.
 */
var CurrentScript:HTMLScriptElement=document.currentScript;
console.log("CurrentScript:"+CurrentScript);
var ParentElement:HTMLElement=CurrentScript.parentElement;
CurrentScript.onload=function(){
    var Table1=new VisualTable();
    Table1.HeaderRow.bgColor="#2e6791";
    Table1.HeaderRow.style.height="9vh";
    Table1.HeaderRow.style.textAlign="center";
    Table1.HeaderRow.style.fontFamily="Calibri";
    Table1.HeaderRow.style.fontSize="x-Large";
    Table1.HeaderRow.style.fontWeight="bolder";
    Table1.HeaderRow.style.color="white";

    /*Table1.HeaderRow.*/
    Table1.HeaderRow.cells[0].textContent="AGENT NAME";
    Table1.HeaderRow.cells[1].textContent="ELIPSED TIME";
    Table1.HeaderRow.cells[2].textContent="AUX";

}



class VisualTable {
        Table:HTMLTableElement;
        Header:HTMLTableSectionElement;
        Body:HTMLTableSectionElement;
        HeaderRow:HTMLTableRowElement;

        constructor() {
            var Cell:HTMLTableCellElement;
            this.Table = document.createElement("table");
            this.Header = this.Table.createTHead();
            this.Body = this.Table.createTBody();
            this.HeaderRow = this.Header.insertRow();
            Cell = this.HeaderRow.insertCell();
            Cell.colSpan = 2;
            Cell.width = "50%";
            this.HeaderRow.insertCell();
            this.HeaderRow.insertCell();
            this.Table.width = "100%";
            console.log(this.Header.rows[0]);
            ParentElement.insertBefore(this.Table, CurrentScript);
        }

        init() {

        }
}
    






