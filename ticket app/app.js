let allfilters = document.querySelectorAll(".filter");
let openModel = document.querySelector(".open-model");
let closeModel = document.querySelector(".close-model");
let ticketContainer = document.querySelector(".ticket-container");

let myDB = window.localStorage;
let ticketModelOpen = false;
let isTextTyped = false;

let colors = ["red" ,"blue" ,"green","yellow","black"];
openModel.addEventListener("click", openTicketModel);

// document.querySelector(".active-filter").classList.remove("active-filter");

for(let i = 0;i<allfilters.length;i++){
    allfilters[i].addEventListener("click" , selectedFilter);
}

function selectedFilter(e){
    if(e.target.classList.contains("active-filter")){
        e.target.classList.remove("active-filter");
        ticketContainer.innerHTML = "";
        loadTickets();
    }
    else{
        if(document.querySelector(".active-filter") != null){
            document.querySelector(".active-filter").classList.remove("active-filter");
        }
        e.target.classList.add("active-filter");
        ticketContainer.innerHTML = "";
        let color = e.target.classList[1];
        loadSelectedTickets(color);
    }
}


loadTickets();

function openTicketModel(e) {
    if (ticketModelOpen) {
        return;
    }

    let ticketModel = document.createElement("div");
    ticketModel.classList.add("ticket-model");
    ticketModel.innerHTML = `
        <div class="ticket-text" contenteditable="true">
        <p>Enter your text !!</p>
            </div>
        <div class="ticket-filters">
        <div class="model-filter red selected-color"></div>
        <div class="model-filter blue"></div>
        <div class="model-filter green"></div>
        <div class="model-filter yellow"></div>
        <div class="model-filter black "></div>
        </div> `;

    document.querySelector("body").append(ticketModel);
    ticketModelOpen = true;
    let ticketText = document.querySelector(".ticket-text");
    ticketText.addEventListener("keypress", handleKeyPress);
    

    let ticketFilters = document.querySelectorAll(".model-filter");

    for (let i = 0; i < ticketFilters.length; i++) {
        ticketFilters[i].addEventListener("click", function (e) {
            if (e.target.classList.contains("selected-color")) {
                return;
            }
            document.querySelector(".selected-color").
                classList.remove("selected-color");
            e.target.classList.add("selected-color");
        });
    }


}

function handleKeyPress(e) {
    if(!isTextTyped){
        isTextTyped = true;
        e.target.textContent = "";
    }

    if (e.key == "Enter" && isTextTyped && e.target.textContent) {
        let filterSelected = document.querySelector(".selected-color").classList[1];
        let ticketId = uuid();
        let ticketInfoObject = {
            ticketFilter: filterSelected,
            ticketValue: e.target.textContent,
            ticketId: ticketId
        };
        
        appendTicket(ticketInfoObject);
        closeModel.click();
        saveTicketToDb(ticketInfoObject);
        isTextTyped = false;
    }


}

function saveTicketToDb(ticketInfoObject){
    let allTickets = myDB.getItem("allTickets");
    allTickets = JSON.parse(allTickets);
    if(allTickets !== null){
        allTickets.push(ticketInfoObject);
        myDB.setItem("allTickets", JSON.stringify(allTickets));

    }
    else{
        let allTickets = [ticketInfoObject];
        myDB.setItem("allTickets", JSON.stringify(allTickets));
    }
}






closeModel.addEventListener("click", closeTicketModel);

function closeTicketModel(e) {
    if (!ticketModelOpen) return;
    document.querySelector(".ticket-model").remove();
    ticketModelOpen = false;

}


function appendTicket(ticketInfoObject){
    let { ticketFilter, ticketValue, ticketId } = ticketInfoObject;
    
    let ticketdiv = document.createElement("div");
    ticketdiv.classList.add("ticket");
    ticketdiv.innerHTML = `
    <div class="ticket-header ${ticketFilter}"></div>

    <div class="ticket-content">
        <div class="ticket-info">
    
            <div class="ticket-id">${ticketId}</div>
            <div class="ticket-delete"><i class="fa-solid fa-trash"></i></div>
    
        </div>
    
        <div class="ticket-value">
            ${ticketValue}
        </div>
    
    </div>
     `;
    
    
    let ticketHeader = ticketdiv.querySelector(".ticket-header");
    ticketHeader.addEventListener("click" , function(e){
        let currentFilter = e.target.classList[1];
        let indexOfCurrentFilter = colors.indexOf(currentFilter);
        let newIndex =  (indexOfCurrentFilter + 1) % colors.length;
        let newFilter = colors[newIndex];
        console.log(newFilter);
        ticketHeader.style.backgroundColor = newFilter;
        ticketHeader.classList.remove(currentFilter);
        ticketHeader.classList.add(newFilter);
        
        
        let allTickets = JSON.parse(myDB.getItem("allTickets"));
        
        for(let i =0 ;i < allTickets.length;i++){
            if(allTickets[i].ticketId == ticketId){
                
                allTickets[i].ticketFilter = newFilter;
            }
        }
        
        myDB.setItem("allTickets" , JSON.stringify(allTickets) );
        
    });
    
    console.log("Dff");

    let deleteButton  = ticketdiv.querySelector(".ticket-delete");
    deleteButton.addEventListener("click" , function(e){
        ticketdiv.remove();
        let allTickets = JSON.parse(myDB.getItem("allTickets"));
        
        let updatedTicket = allTickets.filter(function(ticketObject){
            if(ticketObject.ticketId == ticketId){
                return false;
            } 
            return true;
        });
        myDB.setItem("allTickets",JSON.stringify(updatedTicket));

    });
    
    ticketContainer.append(ticketdiv); 


}

function loadTickets(){
    let allTickets = localStorage.getItem("allTickets");
    if(allTickets){
        allTickets = JSON.parse(allTickets);
        for(let i =0 ;i < allTickets.length;i++){
            let ticketobj = allTickets[i];
            appendTicket(ticketobj);
        }
    }
}

function loadSelectedTickets(color){
    let allTickets = localStorage.getItem("allTickets");
    if(allTickets){
        allTickets = JSON.parse(allTickets);
        for(let i =0 ;i < allTickets.length;i++){
            let ticketobj = allTickets[i];
            
            if(ticketobj.ticketFilter == color){

                appendTicket(ticketobj);
            }
            
        }
    }
}