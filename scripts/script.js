// Load and Display All Categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
}
loadCategories()

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")

    categories.forEach((item) => {
        console.log(item)

        const buttonContainer = document.createElement("button")
        buttonContainer.onclick = () => loadC(item.category);//
        buttonContainer.innerHTML =
            `<div class="flex justify-center items-center">
                <button id="${item.category}" class="btn btn-outline category-btn">
                ${item.category}<img src="${item.category_icon}"></button>
            </div>`

        categoryContainer.append(buttonContainer);
    })
}

// Pet Data by different ID
const loadC = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const activeBtn = document.getElementById(`${id}`)
            console.log(activeBtn)
            activeBtn.classList.add("active-btn");
            displayCards(data.data)
        })
        .catch((error) => console.log(error))
}

// Load and Display All Cards
const loadCards = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayCards(data.pets))
        .catch((error) => console.log(error))
}
loadCards();

const displayCards = (pets) => {
    const cardContainer = document.getElementById("cards")
    cardContainer.innerHTML = "";

    if (pets.length === 0) {
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML = `
        <div class="min-h-96 bg-slate-300 border-4 rounded-lg flex flex-col gap-5 justify-center items-center">
            <div>
            <img class="mx-auto" src="images/error.webp">
            <h4 class="text-center text-3xl font-extrabold py-4">No Information Available</h4>
            <p class="text-center text-l font-bold px-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        </div>
        `
        return;
    }
    else {
        cardContainer.classList.add("grid")
    }

    pets.forEach((card) => {
        console.log(card)

        const property = "breed";
        const property2 = "date_of_birth";
        const property3 = "gender";
        const allCards = document.createElement("div")
        allCards.classList = "card card-compact shadow-xl"
        allCards.innerHTML =
            `<figure class="lg:h-[200px]">
            <img
            src="${card.image}"
            class="h-full w-full object-cover"
            alt="" />
            </figure>
        <div class="px-2 py-1">
            <h2 class="card-title">${card.pet_name}</h2>
            <div class="flex">
            <img class=w-5 src="${"https://img.icons8.com/?size=64&id=k5wELv7XvOR6&format=png"}"/>
            ${property in card ? `<p class="px-2">${card.breed}</p>` : `<p class="px-2">Breed Name Not Available</p>`}
            </div>
            <div class="flex">
            <img class=w-5 src="${"https://img.icons8.com/?size=64&id=JQyh0I18IaES&format=png"}"/>
            ${property2 in card && card[property2] !== null ? `<p class="px-2">${card.date_of_birth}</p>` : `<p class="px-2">Date of Birth Not Available</p>`}
            </div>
            <div class="flex">
            <img class=w-5 src="${"https://img.icons8.com/?size=64&id=vgKCn1iIkmp9&format=png"}"/>
            ${property3 in card ? `<p class="px-2">${card.gender}</p>` : `<p class="px-2">Gender is Undefined</p>`}
            </div>
            <div class="flex">
            <img class=w-5 src="${"https://img.icons8.com/?size=64&id=xuQVdwxnqTRn&format=png"}"/>
            <p class="px-2">${card.price}</p>
            </div>

            <div class="card-actions justify-between py-3 grid grid-cols-1">
                <div class="flex items-center justify-between">
                    <button onclick="likedPets('${card.image}')" class="btn bg-white text-green-900"><img class=w-7 src="${"https://img.icons8.com/?size=50&id=24816&format=png"}"/></button>
                <button id="buttonbutton" onclick="adoptedText(this)" class="btn bg-white text-green-900 text-xl font-bold">Adopt</button>
                </div>
                <div>
                    <button onclick="loadDetails('${card.petId}')" class="btn btn-wide bg-white text-green-900 text-xl font-bold w-full">Details</button>
                </div>
            </div>
        </div>`
        cardContainer.append(allCards);
    })
}

// Load and Display Details For Modal
const loadDetails = async (petId) => {
    console.log(petId)
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData)
}
const displayDetails = (petData) => {
    console.log(petData);
    const property = "breed";
    const property2 = "date_of_birth";
    const property3 = "gender";
    const property4 = "vaccinated_status";

    const modalContainer = document.getElementById("modal-content")
    modalContainer.innerHTML = `
    <div class="grid grid-cols-1">
    <div class="h-[200px]"><img class="h-full w-full object-cover" src="${petData.image}"></div>
    <div>
    <h2 class="text-xl font-bold py-1">${petData.pet_name}</h2>
    <div class="flex justify-between">
    <div>
    <div class="flex">
        <img class=w-5 src="${"https://img.icons8.com/?size=64&id=k5wELv7XvOR6&format=png"}"/>
        ${property in petData ? `<p class="px-2">Breed: ${petData.breed}</p>` : `<p class="px-2">Breed Name Not Available</p>`}
    </div>
    <div class="flex">
        <img class=w-5 src="${"https://img.icons8.com/?size=64&id=JQyh0I18IaES&format=png"}"/>
        ${property2 in petData && petData[property2] !== null ? `<p class="px-2">Birth: ${petData.date_of_birth}</p>` : `<p class="px-2">Date of Birth Not Available</p>`}
    </div>
    <div class="flex">
        <img class=w-5 src="${"https://img.icons8.com/?size=64&id=vgKCn1iIkmp9&format=png"}"/>
        ${property3 in petData ? `<p class="px-2">Gender: ${petData.gender}</p>` : `<p class="px-2">Gender is Undefined</p>`}
    </div>
    </div>
    <div>
    <div class="flex">
        <img class=w-5 src="${"https://img.icons8.com/?size=64&id=xuQVdwxnqTRn&format=png"}"/>
        <p class="px-2">Price: ${petData.price}</p>
    </div>
        <div class="flex">
        <img class=w-5 src="${"https://img.icons8.com/?size=64&id=k5wELv7XvOR6&format=png"}"/>
        ${property4 in petData && petData[property4] !== null ? `<p class="px-2">Vaccination Status: ${petData.vaccinated_status}</p>` : `<p class="px-2">Information Unavailable</p>`}
    </div>
    </div>
    </div>
    <hr class="mt-3">
    <h4 class="text-xl font-bold py-1">Detailed Information</h4>
    <p>${petData.pet_details}</p>
    </div>
    </div>
    `
    document.getElementById("customModal").showModal();
}

//
const objDemo = {
    "petId": 12,
    "breed": "Poodle",
    "category": "Dog",
    "date_of_birth": "2023-08-10",
    "price": 1500,
    "image": "https://i.ibb.co.com/R9ZHvDD/pet-12.jpg",
    "gender": "Female",
    "pet_details": "This elegant female Poodle, born on August 10, 2023, is intelligent and eager to learn. Fully vaccinated and priced at $1500, she's perfect for families looking for a trainable and loving companion.",
    "vaccinated_status": "Fully",
    "pet_name": "Chloe"
}

// Liked Pets Corner
const likedPets = (image) => {
    const likePetsContainer = document.getElementById("likedPetsContainer")
    const div = document.createElement("div");
    div.innerHTML = `
    <img class="w-full" src="${image}">
    `
    likePetsContainer.appendChild(div)
}

// Adopt Button
const adoptedText = (button) => {
    const countdownTime = document.getElementById("countdown");
    const customModal2 = document.getElementById("customModal2")
    customModal2.showModal();
    let countdown = 3;
    countdownTime.textContent = countdown;
    const interval = setInterval(() => {
        countdown -= 1;
        countdownTime.textContent = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            customModal2.close();
            button.disabled = true
            button.innerText = "Adopted";
        }
    }, 1000)
}