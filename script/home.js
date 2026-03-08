const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<span class="badge badge-soft badge-warning">${el}</span>`);
    return(htmlElement.join(" "));
};
// button toggle-------------
let currentTab = 'all';
const tabActive = ["bg-blue-500", "text-white"];
const tabInactive = ["bg-transparent", "text-black"];

function toggle(tab){
    const tabs = ["all", "open", "closed"];

    for(const t of tabs){
        const tabName = document.getElementById("tab-" + t);
        if(t === tab){
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        }
        else{
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }
};
const issueCount = document.getElementById('issue-count');


const loadingSpinner = document.getElementById('loadingSpinner');
// Show all Open Card --------
document.getElementById("tab-open").addEventListener('click',function(){
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayOpenCard(data.data));
});
const displayOpenCard = (cards) =>{
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";

    const openCards = cards.filter((card)=> card.status === 'open');
    const count = openCards.length;
    issueCount.innerText = count;
    openCards.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-[#FFFFFF] p-4 h-full space-y-3 border-t-2 border-green-500">
                    <div class="flex justify-between items-center">
                    <div>${card.status === 'open' ? `<img src="assets/Open-Status.png">` : `<img src="assets/Closed-Status.png">`}</div>
                        <p class="font-medium text-[12px] ${card.priority === 'high'? 'badge badge-soft badge-error' : card.priority==='medium'? 'badge badge-soft badge-warning' : 'badge bg-[#EEEFF2]'}">${card.priority}</p>
                    </div>
                    <h4 class="font-semibold text-[14px] text-[#1F2937]"> ${card.title} </h4>
                    <p class="text-[12px] text-[#64748B] line-clamp-2">${card.description}</p>

                    <div>${createElement(card.labels)}</div>
                    

                    <hr class="text-[#dddddd]">

                    <p class="text-[12px] text-[#64748B]">${card.author}</p>
                    <p class="text-[12px] text-[#64748B]">${card.updatedAt}</p>
        </div>
        `

        issuesContainer.appendChild(div);
    })
};
// Show all Closed Card ------------
document.getElementById("tab-closed").addEventListener('click',function(){
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayClosedCard(data.data));
});
const displayClosedCard = (cards) =>{
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";

    const closedCards = cards.filter((card)=> card.status === 'closed');
    const count = closedCards.length;
    issueCount.innerText = count;
    closedCards.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-[#FFFFFF] p-4 h-full space-y-3 border-t-2 border-purple-500">
                    <div class="flex justify-between items-center">
                    <div>${card.status === 'open' ? `<img src="assets/Open-Status.png">` : `<img src="assets/Closed-Status.png">`}</div>
                        <p class="font-medium text-[12px] ${card.priority === 'high'? 'badge badge-soft badge-error' : card.priority==='medium'? 'badge badge-soft badge-warning' : 'badge bg-[#EEEFF2]'}">${card.priority}</p>
                    </div>
                    <h4 class="font-semibold text-[14px] text-[#1F2937]"> ${card.title} </h4>
                    <p class="text-[12px] text-[#64748B] line-clamp-2">${card.description}</p>

                    <div>${createElement(card.labels)}</div>
                    

                    <hr class="text-[#dddddd]">

                    <p class="text-[12px] text-[#64748B]">${card.author}</p>
                    <p class="text-[12px] text-[#64748B]">${card.updatedAt}</p>
        </div>
        `

        issuesContainer.appendChild(div);
    })
};

const loadIssuesCard = () => {
    loadingSpinner.classList.remove('hidden');
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
        const count = (data.data).length;
        issueCount.innerText = count;
        loadingSpinner.classList.add('hidden');
        displayIssuesCard(data.data);
    })
};
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

const displayIssuesCard = (cards) => {
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";

    cards.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-[#FFFFFF] p-4 h-full space-y-3 ${card.status === 'open' ? 'border-t-2 border-green-500' : 'border-t-2 border-purple-500'}">
                    <div class="flex justify-between items-center">
                    <div>${card.status === 'open' ? `<img src="assets/Open-Status.png">` : `<img src="assets/Closed-Status.png">`}</div>
                        <p class="font-medium text-[12px] ${card.priority === 'high'? 'badge badge-soft badge-error' : card.priority==='medium'? 'badge badge-soft badge-warning' : 'badge bg-[#EEEFF2]'}">${card.priority}</p>
                    </div>
                    <h4 class="font-semibold text-[14px] text-[#1F2937]"> ${card.title} </h4>
                    <p class="text-[12px] text-[#64748B] line-clamp-2">${card.description}</p>

                    <div>${createElement(card.labels)}</div>
                    

                    <hr class="text-[#dddddd]">

                    <p class="text-[12px] text-[#64748B]">${card.author}</p>
                    <p class="text-[12px] text-[#64748B]">${card.updatedAt}</p>
        </div>
        `

        issuesContainer.appendChild(div);
    })
};
loadIssuesCard();


document.getElementById('btn-search').addEventListener('click', () =>{
    const inputSearch = document.getElementById('input-search');
    const searchValue = inputSearch.value.trim().toLowerCase();

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
.then(res => res.json())
.then((data) => {
    const allIssues = data.data;
    displayIssuesCard(allIssues);
});
});