
// grab Submit button on Photo Create page
const newPhotoButton = document.querySelector('#newPhotoButton');
// grab container that Submit button resides in
const container = document.querySelector('.container')

// show Loading animation after user clicks submit
if (newPhotoButton) {
  newPhotoButton.addEventListener('click', () => {
    const progress = document.createElement('p');
    progress.classList.add('progress-indicator');
    progress.innerHTML = '<h2>Loading...</h2>';
    container.appendChild(progress)
  })
}