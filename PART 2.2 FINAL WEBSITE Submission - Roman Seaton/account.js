// ----- SEE BELOW SIGN UP NEW USER -----

// Sign up a new user
async function signUpUser(email, password) {
  //Sign up a new user with email and password
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });
  //Error handling
  if (error) {    
   alert('ERROR! PLEASE TRY AGAIN');   
  } else {    
    alert('SIGNED UP SUCCESSFULLY! PLEASE SIGN IN NOW');
  }
}

//When loading, hide the button LOGOUT
document.getElementById('logoutBtn').style.display = 'none';

//Handle sign up button click
document.getElementById('signUpButton').addEventListener('click', () => {
  let email = document.getElementById('signupemail').value.trim();
  let password = document.getElementById('signuppassword').value.trim();
  signUpUser(email, password);
});


// ----- SEE BELOW FOR SIGN IN -----


//Sign in an existing user
async function signInUser(email, password) {
  //Sign in an existing user with email and password  
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });
  //Error handling
  if (error) {      
    alert('ERROR! PLEASE TRY AGAIN');   
  } else {
    //Updata status on successful sign in
    document.getElementById('login-status').textContent = `Signed in as ${email}`; 
    //Show the button LOGOUT
    document.getElementById('logoutBtn').style.display = 'inline-block';  
    //Hide the sign in section & the sign up section
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    //Display message in dialog box  
    alert('SIGNED IN SUCCESSFULLY! WELCOME BACK!');
    console.log('User signed in:', data.user);
  }
}

//Handle sign in button click
document.getElementById('signInButton').addEventListener('click', () => {
  let email = document.getElementById('signinemail').value.trim();
  let password = document.getElementById('signinpassword').value.trim();
  signInUser(email, password);
});


// ----- SEE BELOW FOR SIGN OUT -----


// Sign out the current user
async function signOutUser() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    alert('ERROR! PLEASE TRY AGAIN');
    console.error('Error logging out:', error.message);
    return false;
  }
  alert('SIGNED OUT SUCCESSFULLY! BYE FOR NOW!'); 
  console.log('User logged out successfully.');
  //Hide the button LOGOUT
  document.getElementById('logoutBtn').style.display = 'none';
  //Show the sign in section & the sign up section
  document.getElementById('signin-section').style.display = 'block';
  document.getElementById('signup-section').style.display = 'block';
  return true;
}

//Handle logout button click
document.getElementById('logoutBtn').addEventListener('click', () => {
  signOutUser().then( (signedOut) => {
    if (signedOut) {    
      document.getElementById('login-status').textContent = 'Please sign in';
    } 
  });
});


// ----- SEE BELOW, CHECKS AND KEEPS TRACK OF ACTIVE SESSION LOGIN ON PAGES -----


//Check for an active session on page load
// If a session exists, update the UI accordingly
let { data: { session }, error } = await supabase.auth.getSession();
if (session) {
  document.getElementById('login-status').textContent = `Signed in as ${session.user.email}`;
  //Show the button LOGOUT
  document.getElementById('logoutBtn').style.display = 'inline-block';
  //Hide the sign in section & the sign up section
  document.getElementById('signin-section').style.display = 'none';
  document.getElementById('signup-section').style.display = 'none';
  //Just for debugging
  console.log('Current session:', session);
} else {
  console.log('No active session.');
}

// Listen for auth state changes to handle sign-in and sign-out events
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
     document.getElementById('login-status').textContent = `Signed in as ${session.user.email}`;
    //Show the button LOGOUT
    document.getElementById('logoutBtn').style.display = 'inline-block';
    //Hide the sign in section & the sign up section
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'none';
    //Just for debugging
    console.log('User signed in:', session.user);
    // Perform actions after login, e.g., redirect to dashboard
  } else if (event === 'SIGNED_OUT') {
      //Hide the button LOGOUT
    document.getElementById('logoutBtn').style.display = 'none';
    //Show the sign in section & the sign up section
    document.getElementById('signin-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'block';
    //Just for debugging
    console.log('User signed out.');
    // Perform actions after logout, e.g., redirect to login page
  }
});

