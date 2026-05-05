window.addEventListener("load", solve);

function solve() {
    // Get inputs and button
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const categoryInput = document.getElementById('category');
    const addButton = document.getElementById('add-btn');
    const checkListElement = document.getElementById('check-list');
    const contactListElement = document.getElementById('contact-list');

    // AddEventHandler
    addButton.addEventListener('click', addButtonClickHandler);

    function addButtonClickHandler(e) {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const category = categoryInput.value;

        // Validate inputs for empty strings
        if (!name || !phone || !category) {
            return;
        }

        // Add item to check list
        const checkListItemElement = createCheckListItem(name, phone, category);

        // Append to check list
        checkListElement.appendChild(checkListItemElement);

        // Clear inputs
        nameInput.value = '';
        phoneInput.value = '';
        categoryInput.value = '';
    }

    function createCheckListItem(name, phone, category) {
        const liElement = document.createElement('li');

        const paragraphNameElement = document.createElement('p');
        paragraphNameElement.textContent = `name:${name}`;

        const paragraphPhoneElement = document.createElement('p');
        paragraphPhoneElement.textContent = `phone:${phone}`;

        const paragraphCategoryElement = document.createElement('p');
        paragraphCategoryElement.textContent = `category:${category}`;

        const articleElement = document.createElement('article');
        articleElement.appendChild(paragraphNameElement);
        articleElement.appendChild(paragraphPhoneElement);
        articleElement.appendChild(paragraphCategoryElement);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            // Set input fields
            nameInput.value = name;
            phoneInput.value = phone;
            categoryInput.value = category;

            // Remove checklist item
            liElement.remove();
        });

        const saveButton = document.createElement('button');
        saveButton.classList.add('save-btn');
        saveButton.addEventListener('click', () => {
            // Move to the new list
            contactListElement.appendChild(liElement);

            // remove buttons
            buttonsDiv.remove();

            // add delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('del-btn');
            deleteButton.addEventListener('click', () => {
                liElement.remove();
            });

            liElement.appendChild(deleteButton);
        });

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(saveButton);

        liElement.appendChild(articleElement);
        liElement.appendChild(buttonsDiv);

        return liElement;
    }
}
