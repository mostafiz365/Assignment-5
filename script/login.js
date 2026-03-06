document.getElementById('singIn-btn').addEventListener('click',
    function(){
        const nameInput = document.getElementById('name-input');
        const userName = nameInput.value;

        const pinInput = document.getElementById('pin-input');
        const pin = pinInput.value;

        if(userName === 'admin' && pin === 'admin123'){
            alert('login Successfully');
            // window.location.replace("/home.html");
            window.location.assign("home.html")
        }
        else{
            alert('login failed');
            return;
        }
    }
)