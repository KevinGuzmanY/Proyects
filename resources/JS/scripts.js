
        load();
        let form = document.getElementById("formTransaction");
        form.addEventListener("submit",function(event){
            event.preventDefault();
            let formdata = new FormData(form);
            let newTransaction = createobject(formdata);
            addtotable(newTransaction);
            
            saveTranssaction(newTransaction);
            form.reset(); 
        })
        
        function createTransactionID() {
            let idCount = parseInt(localStorage.getItem("transactionsCount") || "-1") ;+
            idCount++;
            localStorage.setItem("transactionsCount", JSON.stringify(idCount) )
            return idCount;
        }


        function createobject(formdata){
            let typeS = formdata.get("typeS");
            let inpMonto = formdata.get("inpMonto");
            let inpDescrip = formdata.get("inpDescrip");
            let inpcateg = formdata.get("inpcateg");
            let transactionID= createTransactionID();
            return {
                "typeS": typeS,
                "inpMonto": inpMonto,
                "inpDescrip": inpDescrip,
                "inpcateg": inpcateg,
                "transactionID": transactionID
                }
        }
        

        function addtotable(Transaction){
            let table = document.getElementById("tableOne");
            let newrow = table.insertRow(-1);
            let newcellType = newrow.insertCell(0) ;
            let newcellMount = newrow.insertCell(1) ;
            let newcellDescrip = newrow.insertCell(2) ;
            let newcellCategory = newrow.insertCell(3) ;
            let newcellDelete = newrow.insertCell(4) ;

            newrow.setAttribute("Data-transaction-ID",Transaction["transactionID"]);

            newrow =  newcellType.textContent = Transaction["typeS"],
            newcellMount.textContent = Transaction["inpMonto"],
            newcellDescrip.textContent = Transaction["inpDescrip"],
            newcellCategory.textContent = Transaction["inpcateg"];
            let buttonDelete = document.createElement("button");
            buttonDelete.textContent ="Eliminar";
            listenertodelete(buttonDelete);
            newcellDelete.appendChild(buttonDelete);
        }

        function load(){
            let initTable = document.getElementById("tableOne");
            


            let table = localStorage.getItem("tabla") || "[]";
            let tableparse = JSON.parse(table) ;


            tableparse.forEach(element => {
                addtotable(element);
            });
             
        }

        function saveTranssaction (Transaction) {
            let initTable = document.getElementById("tableOne");
            
            let table = localStorage.getItem("tabla") || "[]";
            let tableparse = JSON.parse(table);
            let array = tableparse;
            
            array.push(Transaction);

            let tableJON = JSON.stringify(array);
            localStorage.setItem("tabla",tableJON);
        }
        
        function listenertodelete(button){
            button.addEventListener("click", (event) =>{
                let rowToDelete = event.target.parentNode.parentNode;
                let rowid = rowToDelete.dataset.transactionId;
                 event.target.parentNode.parentNode.remove();
                deleteTransactionStorage(rowid);
            })
            
        }

        

        function deleteTransactionStorage(transactionID){
            let tabla = localStorage.getItem("tabla");
            let tablaJSON = JSON.parse(tabla);
            let transactiontodel = tablaJSON.findIndex(element => element.transactionID==transactionID);
            console.log(transactiontodel);
            tablaJSON.splice(transactiontodel,1);
            
            localStorage.setItem("tabla",JSON.stringify(tablaJSON)); 
            let transactionsCount = JSON.parse(localStorage.getItem("transactionsCount"));
            transactionsCount--;
            localStorage.setItem("transactionsCount",transactionsCount);
        }

