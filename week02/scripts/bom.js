const input = document.querySelector('#favchap');
const button = document.querySelector('button');

const list = document.querySelector('#list'); 

button.addEventListener('click', () => {
    // 1. Check if the input field is NOT empty
    if (input.value.length > 0) {
        
        // 2. Create the necessary elements
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        
        // 3. Set the content for the new elements
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        
        // 4. Append the delete button to the list item (li)
        li.append(deleteButton);
        
        // 5. Append the list item to the unordered list (ul)
        list.append(li);
        
        // 6. Add an event listener to the delete button
        deleteButton.addEventListener('click', function() {
            list.removeChild(li); // Remove the parent li element
        });
        
        // 7. Clear the input and return focus to it
        input.value = '';
        input.focus();
    }
});