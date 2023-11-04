const h1 = document.querySelector("#h1");
const img = document.querySelector("#user_img");
const btns = document.querySelectorAll(".btn");


const { picture, name: { title, first, last }, email, phone, location: { country }, dob: { date }, gender } = JSON.parse(localStorage.getItem("user"))

if (first && picture.large) {
    h1.innerHTML =`${title}.${first} ${last}`
    img.src = picture.large
}


btns.forEach((btn) => {
    btn.onclick = () => {
        switch (btn.getAttribute("id")) {
            case "name":
                h1.innerHTML = `${title}.${first} ${last}` // insted of using like this we use uniqe method
                break;
            case "email":
                h1.innerHTML = email
                break;
            case "address":
                h1.innerHTML = country
                break;
            case "birthday":
                h1.innerHTML = new Date(date).toDateString() // it convert date to string
                break;
            case "phone":
                h1.innerHTML = phone
                break;
            case "gender":
                h1.innerHTML = gender
                break;
            default:
                h1.innerHTML = "ERROR"
                break;
        }
    }
})