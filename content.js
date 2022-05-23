window.addEventListener('load', () => {
    if (window.location.href == 'https://banregister.unf.edu/StudentRegistrationSsb/ssb/classSearch/classSearch') {
        
    var searchCounter = 0;
    var professorRating = 0;

        function addNewRatingColumnOnSearch() {
            return new Promise((resolve) => {
                if(searchCounter < 1) {
                    const searchButton = document.getElementById("search-go");
                    searchButton.onclick = () => {
                        setTimeout(() => {
                            const columnToClone = document.querySelector("#table1 > thead > tr > th.sort-disabled.linked-col.ui-state-default");
                            let clone = columnToClone.cloneNode(true);
                            clone.innerHTML = "Rating";
                            clone.style.textAlign = "left";
                            let header = document.querySelector("#table1 > thead > tr");
                            header.appendChild(clone);
                            searchCounter++;
                            resolve();
                        }, 1200);
                    }
                } else {
                    setTimeout(() => {
                        resolve();
                    }, 1200);
                }
            });
        }

        function newPageLoad() {
            return new Promise((resolve) => {
                const searchAgainButton = document.getElementById("search-again-button");
                const firstButton = document.querySelector("[title='First']");
                const previousButton = document.querySelector("[title='Previous']");
                const nextButton = document.querySelector("[title='Next']");
                const lastButton = document.querySelector("[title='Last']");

                searchAgainButton.onclick = () => {
                    const searchButton = document.getElementById("search-go");
                    searchButton.onclick = () => resolve();
                }
                firstButton.onclick = () => resolve();
                previousButton.onclick = () => resolve();
                nextButton.onclick = () => resolve();
                lastButton.onclick = () => resolve();
            });
        }

        function insertRatingIntoRegistrationPage() {
            return new Promise((resolve) => {
                const subject = document.querySelector("#searchTerms > span:nth-child(2) > label > span").innerHTML.substring(0, 3);
                const trlist = document.querySelector("#table1 > tbody").getElementsByTagName("tr");
                let entireTable = Array.from(trlist);
    
                for(let i = 0; i < entireTable.length; i++) {
                    let currentProfessor = Array.from(entireTable[i].cells[7].getElementsByTagName("a"));
                    let professorLastNameFromCoursePage = currentProfessor[0].innerHTML.split(" ").pop();
                    let courseFromCoursePage = subject.concat(entireTable[i].cells[2].innerHTML.toString());

                    fetch(`https://professor-rating-api.herokuapp.com/${courseFromCoursePage}/${professorLastNameFromCoursePage}`)
                    .then(response => response.json())
                    .then(json => {
                        professorRating = json[0].Rating;
                        entireTable[i].insertCell(14);
                        const ratingForTable = document.createTextNode(professorRating);
                        entireTable[i].cells[14].appendChild(ratingForTable);
                    }).catch(err => {
                        professorRating = 'No Rating Found';
                        entireTable[i].insertCell(14);
                        const ratingForTable = document.createTextNode(professorRating);
                        entireTable[i].cells[14].appendChild(ratingForTable);
                    });
                }
                resolve();
            });
        }

        async function insertIntoTable() {
            await addNewRatingColumnOnSearch();
            await insertRatingIntoRegistrationPage();
            await newPageLoad();
            insertIntoTable();
        }
        insertIntoTable();
    }
}); 