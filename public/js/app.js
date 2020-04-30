console.log('app.js is working');

const newPhotoButton = document.querySelector('#newPhotoButton');
const container = document.querySelector('.container')

newPhotoButton.addEventListener('click', () => {
  console.log('clicked');
  console.log(newPhotoButton)
  const progress = document.createElement('p');
  progress.classList.add('progress-indicator');
  progress.innerHTML = '<h2>Loading...</h2>';
  console.log(progress);
  console.log(newPhotoButton.parentElement);
  container.appendChild(progress)

})