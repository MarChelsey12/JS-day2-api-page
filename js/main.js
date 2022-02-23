submitButton()

let myTitle = document.getElementById('title');
myTitle.style.textAlign = 'center';
myTitle.style.color = 'darkblue'

let mySearch = document.getElementById('search');
mySearch.style.textAlign='center';
mySearch.style.color ='darkgreen';


function handleSubmit(event){
    event.stopPropagation();
    event.preventDefault();

    doAPICall(document.getElementById("year").value, document.getElementById("round").value);
};

function submitButton(){
    let button = document.getElementById("submit");
    button.addEventListener('click', (e)=>handleSubmit(e));
};

async function doAPICall(year, round){
    result = await axios.get(`http://ergast.com/api/f1/${year}/${round}/driverStandings.json`);

    result = result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

    tbody = document.getElementsByTagName('tbody')[0];

    tr = document.createElement('tr');
    tbody.appendChild(tr);    

    let counter = 1
    
    for (let score of result){
        if (score){
            th = document.createElement("th");
            th.innerText = (`${counter}`);
            tr.appendChild(th);

            td = document.createElement('td');
            td.innerText = score.Driver.givenName;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = score.Driver.familyName;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = score.Driver.dateOfBirth;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = score.position;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = score.wins;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = score.Driver.nationality;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerText = score.Constructors[0].name;
            tr.appendChild(td);

            tr = document.createElement('tr');
            tbody.appendChild(tr);
            counter>=1; counter++;
        };
    };
};
