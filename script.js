
let firstName = document.submission.firstName;
let lastName = document.submission.lastName;
let startYear = document.submission.startYear;
let email = document.submission.email;
let number = document.submission.phoneNumber;
let slackId = document.submission.internId;
let gitHub = document.submission.gitHub;
let projectTitle = document.submission.projectTitle;
let submitBtn = document.querySelector('#submitBtn');


let fNameErr = lNameErr = emailErr = yearErr = slackErr = linkErr = titleErr = descErr = numberErr = true;
let gitHubErr =true

//function to set error messages
function showError(elemId,errorMsg){
    document.getElementById(elemId).textContent = errorMsg;
}

//event listner for the submit button
submitBtn.addEventListener('click', validateForm)

function validateForm(){
    //First name validation
    firstName.value.length == 0 ? showError("fNameErr", 'Enter your first name') :  fNameErr = false;

    //lastName validation
   
    lastName.value.length == 0? showError("lNameErr", "Enter your last name") : lNameErr = false;

    //startYear validation
    
   if(startYear.value.length === 0){
    showError("yearErr", "Enter your year of internship");
   }
   else if(startYear.value <  parseInt('2015')){
    showError("yearErr", "Enter your most recent year of internship");
   }
   else{
       yearErr = false;
   }

   //email validation
   if(email.value.length === 0){
    showError("emailErr", "Enter an email address");
   }
   else{
       let regex =  /^\S+@\S+\.\S+$/;
       if(regex.test(email) ==false){
        showError("emailErr", "Enter a valid email address");
       }
       else{
           emailErr = false
       }
   }

   //phone Number validation 
   if(number.value.length === 0){
       showError("numberErr", "Enter your phone number");
   }
   else{
       showError("numberErr", " ")
       numberErr = false
   }
   //slack username validation
     
   if(slackId.value.length ===0){
       showError("slackErr","Enter your slack username")
   }

   //github validation 
   if(gitHub.value.length == 0){
       showError("gitHubErr", "Enter your github usename");
   }
   else{
       gitHubErr = false
   }

   //ProjectTitle validation
   if(projectTitle.value.length == 0){
       showError("titleErr", "Enter a project title")
   }
   else{
       showError("titleErr", " ")
       titleErr = false
   }

   if(( fNameErr|| lNameErr || emailErr || yearErr ||slackErr || linkErr || titleErr || descErr || numberErr || gitHubErr) == true) {
       return false
   }

}

//consuming the API
let submission = document.querySelector('#submission')

//consume APi
const thisForm = document.getElementById('submission');

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()
    const response = await fetch('https://starthub-ng-staging.herokuapp.com/api/v1/project/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
    });

    const result = await response.json();
    console.log(result)
});
