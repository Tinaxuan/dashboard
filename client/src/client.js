const addUser = async function(username, email,password) {
    let msg
    await fetch("/users/addUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username,email:email,password: password })
        })
        .then(res => res.json())
        .then(dta => {
            console.log(dta);
            msg = dta.msg;
        })
        .catch(err => console.log(err))
    return msg
}