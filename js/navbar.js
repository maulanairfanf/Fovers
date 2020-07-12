document.addEventListener("DOMContentLoaded", function () {

    const navs = document.querySelectorAll(".sidenav");
    M.Sidenav.init(navs);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200)
                    return;
                document.querySelectorAll(".topnav").forEach(function (nav) {
                    nav.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (nav) {
                    nav.addEventListener("click", function (event) {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            };

        }
        xhttp.open("GET", "navbar.html", true);
        xhttp.send();
    }



    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-render");

                if(page === "home"){
                    getCountrys();
                } else if (page === "favorite"){
                    getSavedCountrys();
                }


                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak dapat ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Upss halaman tidak dapat di akses</p>";
                }

            }
        }
        document.addEventListener("DOMContentLoaded", function(){
            getCountrys();
        })
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});