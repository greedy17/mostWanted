"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      displayPeople(searchResults);
      if (searchResults.length > 0) {
        mainMenu(searchResults[0],people);
      }
      
      break;
    case 'no':
      searchResults = searchByTraits(people);
      displayPerson(searchResults);
      break;
      default:
    app(people);
      break;
  }
  //some time of logic that shows if there is more than one. if length of array if only one then send out index 0.
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
}

function mainMenu(person, people){
  let firstName = person.firstName; /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  let lastName = person.lastName
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + firstName + " " + lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
    switch(displayOption){
    case "info":
      displayPerson(person)
    break;
    case "family":
      immediateFamily(person, people);
    break;
    case "descendants":
      let parents = searchDecendants(person, people);
      displayPeople(parents);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//finds immediate family
function immediateFamily(person, people){
  let parents = []; //set string to empty
  let siblings = [];
  let kids = [];
  let spouse = ""; 

  for (let i = 0; i < people.length; i++) {
    for (let x = 0; x < people[i].parents.length; x++) {
      if (people[i].parents[x] === person.id) {
        kids.push(people[i]);
      }    
    }
    if (people[i].id === person.currentSpouse) {
          spouse = people[i].firstName + " " + people[i].lastName;
    }
  }
  for (let y = 0; y < person.parents.length; y++) {
    for (let z = 0; z < people.length; z++) {
       if (person.parents[y] === people[z].id) {
         parents.push(people[z]);
       }    
    }    
  }
  if (parents.length > 0) {
    for (let f = 0; f < people.length; f++) {
      for (let x = 0; x < people[f].parents.length; x++) {
        for (let w = 0; w < parents.length; w++) {
          if (parents[w].id === people[f].parents[x] && people[f].id != person.id) {
            siblings.push(people[f]);
          }
        }
      }
    } 
  }

  //creates message block that lists lists parents spouse and siblings
  let message = "";
    if (parents.length > 0) {
      message = "The parents found: " +
      parents.map(function(parent){
    return parent.firstName + " " + parent.lastName;
    }).join("\n")
  }
  if (spouse != "") {
    message = message + " \n The current spouse is: " + spouse;
  }
  if (siblings.length > 0) {
    message = message +   " \n The siblings are: " + 
    siblings.map(function(s){
      return s.firstName + " " + s.lastName;
    }).join("\n");
  }
  if (kids.length > 0) {
    message = message + "\n The kids found are: " + 
    kids.map(function(k){
      return k.firstName + " " + k.lastName;
    }).join("\n");
  }
  alert(message);
} 

var descendants = [];
var counter = 0;

//need to ask about recursive -- I think this could be done cleaner
function searchDecendants(person, people) {
  counter = 0;
  descendants = [];
  recursionSearch(person.id,people);
  return descendants;
}

function recursionSearch(id,people){
  for (let x = 0; x < people[counter].parents.length; x++) {
    if (people[counter].parents[x] === id) {
      descendants.push(people[counter]);
    }    
  }
  if (counter < 21) {
    counter++;
    recursionSearch(id,people);
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
    else {
      return false;
     }
    })
   return foundPerson;
}
// alerts a list of people
function displayPeople(people){
  if (people.length === 0) {
    alert("You search did not find any results");
  }else{
    alert(people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n"));
  }
}

function displayPerson(person){
  let personInfo = "Id: " + person.id + "\n";
  personInfo = "First Name: " + person['firstName'] + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;

  alert("Found person's details:" + personInfo);
  return personInfo;
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

//-------------------------------------------------------------------------------------------------------------------
//search by trait function
function searchByTraits(people, origionalPeople = null) {
  let searchResults = [];
  let userInput = promptFor("What trait would you like to search for? Please choose: height, weight, gender, dob, eye color, occcupation, parents or CurrentSpouse or done when finished.",chars)
  switch (userInput.toLowerCase()) {
    case "height":
      searchResults = searchByHeight(people);
      break;
    case "weight":
      searchResults = searchByWeight(people);
      break;
    case "gender":
      searchResults = searchByGender(people);
      break;
    case "dob":
      searchResults = searchByDOB(people);
      break;
    case "eye color":
      searchResults = searchByEyeColor(people);
      break;
    case "occupation":
      searchResults = searchByOccupation(people);
      break;
    case "parents":
      searchResults = searchByParents(people);
      break;
    case "spouse":
      searchResults = searchByCurrentSpouse(people);
      break;
    case "done":
      searchResults = displayPeople(people);
      break;
    default:
      return searchByTraits(people); //send people instead of search results
    
  }
  return searchByTraits(searchResults, people);
}

function searchByHeight(people){
  let height = promptFor("What is the person's height?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height.toString() === height){

      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){
    let weight = promptFor("What is the person's weight?", chars);
    let foundPerson = people.filter(function(person){
      if(person.weight.toString() === weight){
  
        return true;
      }
      else{
        return false;
      }
    })
    return foundPerson;
  }

function searchByDOB(people){
  let dob = promptFor("What is the person's DOB? m/d/yyyy", chars);
  let foundPerson = people.filter(function(person){
    if(person.dob.toString() === dob){ 
      return true;
    }
    else{
      return false;
    }
  })
    return foundPerson;
  }

//search by gneder
function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars);
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
    return foundPerson;
}

//search by eye color
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor.toString() === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
    return foundPerson;
  }
  
  //search by occupation
  function searchByOccupation(people){
    let occupation = promptFor("What is the person's occupation?", chars);
    let foundPerson = people.filter(function(person){
      if(person.occupation === occupation){
        
        return true;
      }else{
        return false;
      }
    })
  }

//search by parents
function searchByParents(people){
  let parents = promptFor("Who are the person's parents?", chars);
  let foundPerson = people.filter(function(person){
    if(person.parents === parents){
      return true;
    }else{
      return false;
    }
  })
}

//search by current spouse
function searchByCurrentSpouse(people){
  let currentSpouse = promptFor("Who is the person's current spouse?", chars);
  let foundPerson = people.filter(function(person){
    if(person.currentSpouse === currentSpouse){
      return true;
    }
  })
}

function findDescendants(people, person){
  let myDescendants = people.filter(function(i){
    if(person.id === i.parents[0] || person.id === i.parents[1]){
      return true;
    }else{
      return false;
    }
  })
     return foundPerson;
}

