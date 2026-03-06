const loadIssuesCard = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayIssuesCard(data.data))
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
        <div class="card bg-[#FFFFFF] p-4 h-full space-y-3">
                    <div class="flex justify-between items-center">
                        <img src="assets/Open-Status.png" alt="">
                        <p class="font-medium text-[12px]">${card.priority}</p>
                    </div>
                    <h4 class="font-semibold text-[14px] text-[#1F2937]"> ${card.title} </h4>
                    <p class="text-[12px] text-[#64748B] line-clamp-2">${card.description}</p>

                    <div>
                        <div class="badge badge-soft badge-warning">Warning</div>
                        <div class="badge badge-soft badge-error">Error</div>
                    </div>

                    <hr class="text-[#dddddd]">

                    <p class="text-[12px] text-[#64748B]">${card.author}</p>
                    <p class="text-[12px] text-[#64748B]">${card.updatedAt}</p>
        </div>
        `

        issuesContainer.appendChild(div);
    })
};
loadIssuesCard();