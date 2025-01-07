console.log("hello")

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

        const button = document.createElement("button")
        button.classList = "btn";
        button.innerHTML =
            `<div class="flex justify-center items-center">
                <img class="w-full" src=${item.category_icon}/> ${item.category}
            </div>`

        categoryContainer.append(button);
    })
}