async function signupFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    if(email && password){
        const response = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log('signed up');
        //check the response status
        if(response.ok){
            console.log('success');
        } else {
            alert(response.statusText);
        };
    };
    
}

document.querySelector('#signupForm').addEventListener('submit', signupFormHandler);