/**
 * Created by Hans Dulimarta Fall 2017.
 * Zachary Hern
 */

/**
 * Given a node with id {rootId}, the following function finds all its descendant
 * elements having its attribute ID set. The function returns the number of
 * such elements. ALSO, for each such element this function sets its class
 * to {klazName}.
 *
 * @param rootId
 * @returns {number}
 */
function findElementsWithId(rootId, klazName) {
    var descendants = document.getElementById(rootId).querySelectorAll('[id]:not([id=""])');
    //iterate through array and change class
    descendants.forEach(changeClass);
    //function to change an items class
    function changeClass(item){
        item.setAttribute("class", klazName);
    }

    return descendants.length;
}

/**
 * The following function finds all elements with attribute 'data-gv-row' (or
 * 'data-gv-column') and create a table of the desired dimension as a child of
 * the element.
 *
 * @returns NONE
 */
function createTable() {
    var gvElements = document.querySelectorAll('[data-gv-row][data-gv-column]');
    gvElements.forEach(appendTable);

     //function to append table to each item found
    function appendTable(item, index) {
        //create table
        var table = document.createElement("TABLE");
        //set unique id for each table
        table.setAttribute("id", 'gvTable_' + index);
        //add table to element
        item.appendChild(table);
        //generate enough words to fit into table (+2 for error)
        var lipsum = new LoremIpsum();
        var words = lipsum.generate(2 + (item.getAttribute("data-gv-row")) * (item.getAttribute("data-gv-column")));
        //split words for ease of use
        var split = words.split(' ');
        //index for which specific word
        var wordIndex = 0;
        //create rows/columns for each row
        for (var i = -1; i < item.getAttribute("data-gv-row"); i++) {
            var row = document.createElement("TR");
            row.setAttribute("id", "row_" + i);
            //append rows to table
            document.getElementById('gvTable_' + index).appendChild(row);
            //create columns
            for (var j = 0; j < item.getAttribute("data-gv-column"); j++) {
                //create columns
                var col;
                var text;
                //check for first row
                if (i === -1) {
                    col = document.createElement("TH");
                    text = document.createTextNode("Header " + j);
                } else {
                    col = document.createElement("TD");
                    //setup word to be written to norm columns
                    text = document.createTextNode(split[wordIndex]);
                    //increment index
                    wordIndex++;
                }
                //set ids to "col_#_#" ex. col_0_3
                col.setAttribute("id", "col_" + i + "_" + j);

                col.appendChild(text);
                document.getElementById("row_" + i).appendChild(col);
            }
        }
        }




}