async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value.trim();
    const password = document.querySelector('#loginPassword').value.trim();

    if(email && password){
        const response = await fetch('api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log('logged in');

        //check the response status
        if(response.ok){
            document.location.replace('/');
        } else {
            alert(response.statusText);
        };
    };
    
};

async function logout() {
    const response = await fetch('api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log('logged out');

    if(response.ok){
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

if(document.querySelector('.login-form')){
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
}

if(document.querySelector('#logout-button')){
    document.querySelector('#logout-button').addEventListener('click', logout);
}
