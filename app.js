// github jsden gelenler
import Github from "./github.js";
import UI from "./ui.js";

//* github ve UI class ının bir örneğini oluşturma
const github = new Github();
const ui = new UI();



// ! htmlden gelenler

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const themeBtn = document.getElementById("theme-btn");
const body = document.querySelector("body");

// ! olay izleyicileri
searchButton.addEventListener("click", getInput);
searchInput.addEventListener("keypress", (e)=>{
    if(e.code === "Enter"){
        getInput();
    }
});

themeBtn.addEventListener("click", changeTheme);


// ! metodlar
function getInput(){
    // arama terimi boş değil ise
    if(searchInput.value !== ""){
        // kullanıcı bilgileri ve repolar için api isteği
        github.getUser(searchInput.value).then((data)=> {
            //eğer kullanıcı bulanmadıysa
            if(data.profile.message == "Not Found"){
                ui.showAlert("Kullanıcı bulunamadı!", "alert-danger")
            }else{
                ui.showAlert("Kullanıcı başarıyla bulundu!", "alert-success")
                // apiden gelen kullanıcı bilgilerini ekrana bas
                ui.showProfile(data.profile);
                
                ui.showRepos(data.repos);
            }
            
        });
        return;
    }
    
    ui.showAlert("Form alanı boş olamaz!", "alert-info");

}

function changeTheme(){
    
    body.classList.toggle("bg-dark")
    body.classList.toggle("text-bg-dark")

    if(body.classList.contains("bg-dark")){
        themeBtn.innerText= "Açık Mod";
    } else{
        themeBtn.innerText= "Koyu Mod";
    }
}