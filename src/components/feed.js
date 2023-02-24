export const feed = () => {
    const feedSection = document.createElement("section");
    feedSection.className = "feedSection";
    feedSection.id = "feedSection";

    const feedNav = document.createElement('nav');
    feedNav.id = "feedNav";
    const logo = document.createElement("img");
    logo.className = "logo";
    logo.id = "logo";
    logo.src = "./img/logo.png";

    const btnLogout = document.createElement("button");
    btnLogout.type = "submit";
    btnLogout.className = "btnLogout";
    btnLogout.id = "btnLogout";
    btnLogout.textContent = "LOGOUT";

    feedNav.appendChild(logo);
    feedNav.appendChild(btnLogout);

   feedSection.appendChild(feedNav)

    return feedSection
}

    