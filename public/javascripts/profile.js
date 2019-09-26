window.addEventListener('load', windowLoaded);

function windowLoaded() {
  document
    .querySelector('#avatarInputFile')
    .addEventListener('change', readFile);
}

function readFile(event) {
  const file = event.target.files[0];
  if (file.size > 100000) {
    console.log('File too big');
    return;
  }

  var fileReader = new FileReader();

  fileReader.onload = function(event) {
    const base64Data = event.target.result;
    document.querySelector('#avatarInputFileBase64').value = base64Data;
  };

  fileReader.readAsDataURL(file);
}
