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
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people); //[RDM]need to add check if there is multiple or single results... 
}

// Menu function to call once you find who you are looking for !!!
function mainMenu(person, people){

  /* Here we pass in the entire person obiect that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    findParents(people,person);
    findSiblings(people, person);
    findSpouse(people, person);
    break;
    case "descendants":
    findDescendants(people, person);
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

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  let lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  let foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })

    return foundPerson[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).ioin("\n"));
}

function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;

  alert(personInfo);
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

//[RDM] created first set of search criteria
//serach by height - [RDM] tested and works for t/f
//Need to create a funtion to ask the questions and pass arguements to app(people)


function searchByHeight(people){
  let height = promptFor("What is the person's height?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//serach by weight
function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", chars);
  let foundPerson = people.filter(function(person){
    if(person.weight === weight){ //string convert or ==
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//serach by age
function searchByAge(people){
  let age = promptFor("What is the person's age?", chars);
  let foundPerson = people.filter(function(person){
    if(person.age === age){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//search by gender
function searchByGemder(people){
  let gender = promptFor("What is the person's gender?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === gender){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//search by DOB
function searchByDOB(people){
  let DOB = promptFor("What is the person's DOB?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === DOB){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//search by Eye color
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//search by occupation
function searchByOccupation(people){
  let occupation = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//search by parents
function searchByOccupation(people){
  let parents = promptFor("What is the person's parents?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === parents){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

//search by current spouse
function searchByCurrentSpouse(people){
  let currentSpouse = promptFor("What is the person's parents?", chars);
  let foundPerson = people.filter(function(person){
    if(person.height === currentSpouse){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the height they entered
    return foundPerson;
}

function findSpouse(people, person){
  let mySpouse = people.filter(function(i){
    if (i.currentSpouse === person.id){
      return true;
    }else{
      return false;
    }
  })
  if(mySpouse.length > 0){
    alert("Spouse: " + mySpouse[0].firstName + " " + mySpouse[0].lastName);
  }else{
    alert(person.firstName + " has no spouse on file.");
  }
}

function findParents(people, person){
  let myParents = people.filter(function(i){
    if (person.parents[0] === i.id || person.parents[1] === i.id){
      return true;
    }else{
      return false;
    }
  })

  if(myParents.length === 0){
    alert(person.firstName + " does not have any parents on file.")
  }

  for(let i = 0; i < myParents.length; i++){
    if(myParents[i].gender === "male"){
      alert("Father: " + myParents[i].firstName + " " + myParents[i].lastName);
    }else{
      alert("Mother: " + myParents[i].firstName + " " + myParents[i].lastName);
    }
  }
}

function findSiblings(people, person){
  let mySiblings = people.filter(function(i){
      if(i.parents[0] === person.parents[0] && i.parents.length > 0){
        return true;
      }else{
        return false;
      }
  })

  console.log(mySiblings);

if(mySiblings.length === 0 || mySiblings[0].id === person.id){
  alert(person.firstName + " does not have any siblings on file.");
}

for(let i = 0; i < mySiblings.length; i++){
  if(mySiblings[i].gender === "male" && mySiblings[i].id != person.id){
    alert("Brother: " + mySiblings[i].firstName + " " + mySiblings[i].lastName);
  }else if(mySiblings[i].gender === "female" && mySiblings[i].id != person.id){
    alert("Sister: " + mySiblings[i].firstName + " " + mySiblings[i].lastName);
  }
}
}

function findDescendants(people, person){
  let myDescendants = people.filter(function(i){
    if(person.id === i.parents[0] || person.id === i.parents[1]){
      return true;
    }else{
      return false;
    }
  })

  if(myDescendants.length === 0){
    alert(person.firstName + " does not have any descendants on file.");
  }
  
  for(let i = 0; i < myDescendants.length; i++){
    if(myDescendants[i].gender === "male"){
      alert("Son: " + myDescendants[i].firstName + " " + myDescendants[i].lastName);
    }else{
      alert("Daughter: " + myDescendants[i].firstName + " " + myDescendants[i].lastName);
    }
  }
}