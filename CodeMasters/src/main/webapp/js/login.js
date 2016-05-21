function validate()
{
    var a = document.LoginForm.username.value;
    var b = document.LoginForm.password.value;
    var usernameexp = (/[a-zA-Z0-9]/);
    var passwordexp = (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])^[\w!@$#.+-]{4,20}$/);
    if (document.LoginForm.username.value.length <= 0) {
        alert("username required");
        return false;
    }
    if (document.LoginForm.password.value.length < 5) {
        alert("invalid password");
        return false;
    }

    if (document.LoginForm.username.value.length <= 3) {
        alert("invalid username");
        return false;
    }
    if (document.LoginForm.username.value.match == usernameexp) {

        return true;
    }
    if (document.LoginForm.password.value.match == passwordexp)
        return true;
}
            