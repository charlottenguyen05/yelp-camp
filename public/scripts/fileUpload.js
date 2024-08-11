document.addEventListener('DOMContentLoaded', () => {
    const imgFilesInput = document.getElementById('image');
    const fileNamesDiv = document.getElementById('fileNames');

    imgFilesInput.addEventListener('change', () => {
        const files = imgFilesInput.files; // Access the FileList object
        fileNamesDiv.innerHTML = ''; // Clear previous file names

        if (files.length > 0) {
            const fileList = document.createElement('ul');
            fileList.classList.add('list-group'); // Add Bootstrap class for styling

            for (let file of files) {
                const fileItem = document.createElement('li');
                fileItem.classList.add('list-group-item'); // Add Bootstrap class for styling
                fileItem.textContent = file.name;  // Set the text content of the list item to the file name
                fileList.appendChild(fileItem);
            }

            fileNamesDiv.appendChild(fileList);
        } else {
            fileNamesDiv.textContent = 'No files selected';
        }
    });
});