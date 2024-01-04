// script.js

document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const commentInput = document.getElementById('comment');
        const commentText = commentInput.value;

        if (commentText.trim() !== '') {
            addComment(commentText);
            commentInput.value = ''; // Clear the comment input field
        }
    });

    // Function to add a new comment to the list and localStorage
    function addComment(commentText) {
        const currentDate = new Date().toLocaleDateString();
        const comment = {
            text: commentText,
            date: currentDate
        };

        // Get existing comments from localStorage or create an empty array
        let existingComments = JSON.parse(localStorage.getItem('comments')) || [];
        existingComments.push(comment);

        // Update localStorage with the new comments array
        localStorage.setItem('comments', JSON.stringify(existingComments));

        // Display the comments
        displayComments();
    }

    // Function to display comments
    function displayComments() {
        commentsList.innerHTML = '';

        let existingComments = JSON.parse(localStorage.getItem('comments')) || [];
        existingComments.forEach(function(comment) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `<p>${comment.text}</p><span class="date">${comment.date}</span>`;
            commentsList.appendChild(commentDiv);
        });
    }

    // Initially display existing comments on page load
    displayComments();
});
