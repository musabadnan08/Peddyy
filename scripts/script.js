// All Categories
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

// All Cards
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
        <div class="min-h-[500px] flex flex-col gap-5 justify-center items-center">
            <div>
            <img class="mx-auto" src="images/error.webp">
            <h4 class="text-center">No Information Available</h4>
            <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
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
            `<figure class="h-[200px]">
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

            <div class="card-actions justify-between">
                <button class="btn btn-primary">like</button>
                <button class="btn btn-primary">adopt</button>
                <button class="btn btn-primary">details</button>
            </div>
        </div>`
        cardContainer.append(allCards);
    })
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