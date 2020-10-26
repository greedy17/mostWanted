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
      let trait = promptFor("Lets try a different approach. Search by: 'eye color', 'gender', 'dob', 'eyes and gender', 'eyes and dob', or 'gender and dob'?", chars).toLowerCase();
      if(trait === "eye color"){
      searchResults = searchByEyeColor(people);
      }else if(trait === "gender"){
      searchResults = searchByGender(people);
      }else if(trait === "dob"){
      searchResults = searchByDOB(people);
      }else if(trait === "eyes and gender"){
      searchResults = searchByEyesAndGender(people);
      }else if(trait === "eyes and dob"){
      searchResults = searchByEyesAndDOB(people);
      }else if(trait === "gender and dob"){
      searchResults = searchByGenderAndDOB(people);
      }else{
      alert("Invalid selection");
      searchByTraits(people);
      }
      break;
      default:
    app(people);
      break;
  }

  if(searchResults.length === 1){
    searchResults = searchResults[0];
  }else if(searchResults.length > 1){
    alert("The following is a list of individuals that match that criteria. To view more information about one of them, please use the search by name feature.");
    displayPeople(searchResults);
    app(people);
    }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
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
    findFamily(people,person);
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
    console.log(foundPerson);
    return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }));
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

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", chars).toLowerCase();
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  console.log(foundPerson);
  return foundPerson;

}

function searchByDOB(people){
  let DOB = promptFor("What is the person's DOB? M/D/YYYY", chars);
  let foundPerson = people.filter(function(person){
    if(person.dob === DOB){
      return true;
    }
    else{
      return false;
    }
  })
    console.log(foundPerson);
    return foundPerson;
}

function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
    console.log(foundPerson);
    return foundPerson;
}

function searchByEyesAndGender(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let gender = promptFor("What is the person's gender?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor && person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
    console.log(foundPerson);
    return foundPerson;
}

function searchByEyesAndDOB(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let DOB = promptFor("What is the person's dob?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor && person.dob === DOB){
      return true;
    }
    else{
      return false;
    }
  })
    console.log(foundPerson);
    return foundPerson;
}

function searchByGenderAndDOB(people){
  let DOB = promptFor("What is the person's dob?", chars);
  let gender = promptFor("What is the person's gender?", chars);
  let foundPerson = people.filter(function(person){
    if(person.dob === DOB && person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
    console.log(foundPerson);
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

function findFamily(people, person){
  findParents(people,person);
  findSiblings(people, person);
  findSpouse(people, person);
}