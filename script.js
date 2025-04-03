// mailing list

function validateName() {
    const nameInput = document.getElementById("username").value.trim();
    const nameError = document.getElementById("username-error");

    nameError.textContent = "";
    nameError.style.display = "none";

    if (nameInput === "") {
        nameError.textContent = "Name must be filled out";
        nameError.style.display = "block"
        return false;
    }else if(nameInput.length < 6) {
        nameError.textContent = "Name must be longer than 6 characters";
        nameError.style.display = "block"
        return false;
    }
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const email = emailInput.value.trim();

    emailError.textContent = "";
    emailError.style.display = "none";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email address.";
        emailError.style.display = "block";
        return false;
    }

    return true;
}

document.getElementById("submit-mail-button").addEventListener("click", (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isEmailValid) {
        return;
    }

    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    const url = "https://mudfoot.doc.stu.mmu.ac.uk/ash/api/mailinglist"
    const data = {
        "name": name,
        "email": email
    }

    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else if(response.status === 400){
            throw "Bad data was sent to the server"
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        document.getElementById("formResponse").innerHTML = resJson["message"];
        document.getElementById("formResponse").status = "success";
    })
    .catch((error) => {
        document.getElementById("formResponse").innerHTML = error;
        document.getElementById("formResponse").status = "error";
    })
})

// hall of fame

document.getElementById("submit-button").addEventListener("click", (e) => {
    e.preventDefault();

    const year = document.getElementById("year").value;
    if (!year) {
        alert("Please enter a year.");
        return;
    }

    const url = `https://mudfoot.doc.stu.mmu.ac.uk/ash/api/halloffame?year=${year}`;

    fetch(url, {
        method: "get"
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 404) {
            throw "No data found for the given year.";
        } else {
            throw "Something went wrong.";
        }
    })
    .then((resJson) => {
        let tableHTML = "";

        resJson.data.forEach((entry) => {
            const image = `<img src="${entry.image.source}" alt="${entry.image.title}" title="${entry.image.title}">`;
            const band = `<a href="${entry.band.url}" target="_blank">${entry.band.name}</a>`;
            const inductedMembers = entry.inducted_members
                .map((member) => `<a href="${member.url}" target="_blank">${member.name}</a>`)
                .join(", ");

            tableHTML += `
                <tr>
                    <td>${image}</td>
                    <td>${band}</td>
                    <td>${inductedMembers}</td>
                </tr>
            `;
        });

        document.getElementById("halloffame-table-body").innerHTML = tableHTML;
    })
    .catch((error) => {
        alert(error);
    });
});

// TODO: load 2021 data automatically
// form response