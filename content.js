window.addEventListener('load', () => {

    var subject;                        // subject of class (PHY = Physics, COT = Computer Theory, etc.)
    var searchButton;                   // search button you click once you have chosen a subject
    var entireTable;                    // table in course page consisting of course information such as course title, number, subject description as well as professor name 
    var courseAndProfessorName = [];    // 2D array in which each index of courseAndProfessorName[] is another array consisting of two variables: Course & Professor Name 

    if (window.location.href == 'https://banregister.unf.edu/StudentRegistrationSsb/ssb/classSearch/classSearch'){
        searchButton = document.getElementById("search-go");
        searchButton.onclick = classPageLoaded;

        function classPageLoaded() {
            console.log('Course page loaded');

            setTimeout(function() { 
                subject = document.querySelector("#searchTerms > span:nth-child(2) > label > span").innerHTML.substring(0, 3);

                let trlist = document.querySelector("#table1 > tbody").getElementsByTagName("tr");
                entireTable = Array.from(trlist); 

                // I think this is creating multiple separate arrays rather than 1 array with multiple arrays within that array
                for(let i = 0; i < entireTable.length; i++) {
                    let currentProfessor = Array.from(entireTable[i].cells[7].getElementsByTagName("a"));
                    courseAndProfessorName[i] = []; 
                    for(let j = 0; j < 1; j++) { 
                        courseAndProfessorName[i][j] = [subject.concat(entireTable[i].cells[2].innerHTML.toString()), currentProfessor[0].innerHTML];
                    } 
                    console.log(courseAndProfessorName[i]);
                }
            }, 1000);
        }
    }
}); 
