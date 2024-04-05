const seerSigil = document.querySelector('.seer-sigil');
const passwordPrompt = document.querySelector('.password-prompt');
const passwordForm = passwordPrompt.querySelector('.password-form');
const passwordInput = passwordPrompt.querySelector('.password-input');
const passwordResult = passwordPrompt.querySelector('.password-result');
const mainContainer = document.querySelector('.main-container');
const filesView = document.querySelector('.files-view');
const files = filesView.querySelectorAll('.file');
const fileBack = document.querySelector('.file-back');

function show(element) {
  element.classList.toggle('visible', true);
  element.classList.toggle('hidden', false);
}

function hide(element) {
  element.classList.toggle('visible', false);
  element.classList.toggle('hidden', true);
}

async function sleep(ms) {
  await new Promise(r => setTimeout(r, ms));
}

async function fadeIn(element) {
  element.classList.add('fade-in');
  await sleep(1000);
}

async function fadeOut(element) {
  element.classList.add('fade-out');
  await sleep(1000);
}

async function crossFade(from, to) {
  fadeOut(from);
  await fadeIn(to);
}

async function dipFade(from, to) {
  await fadeOut(from);
  await fadeIn(to);
}

// transition between sigil and password prompt on keydown
async function enter(event) {
  if ([' ', 'Enter'].includes(event.key)) {
    document.removeEventListener('keydown', enter);
    await dipFade(seerSigil, passwordPrompt);
    passwordInput.disabled = false;
    passwordInput.focus();
  }
}
document.addEventListener('keydown', enter);

const PASSWORD = 'soar';

// check password on submit
async function check_password(event) {
  event.preventDefault();
  // get and clear password input
  password = passwordInput.value;
  passwordInput.value = '';
  if (password === PASSWORD) {
    // show password result
    passwordResult.classList.toggle('password-ok', true);
    passwordResult.classList.toggle('password-error', false);
    passwordResult.innerHTML = 'ACCESS GRANTED';
    show(passwordResult);
    // disable password input
    passwordInput.disabled = true;
    // transition to main content
    mainContainer.classList.remove('d-none');
    await sleep(1000);
    await fadeOut(passwordPrompt);
    filesView.classList.remove('d-none');
    await fadeIn(mainContainer);
  } else if (password !== '') {
    // show password result
    passwordResult.classList.toggle('password-ok', false);
    passwordResult.classList.toggle('password-error', true);
    passwordResult.innerHTML = 'ACCESS DENIED';
    show(passwordResult);
  }
}
passwordForm.addEventListener('submit', check_password);

// show file content on click
for (const file of files) {
  file.addEventListener('click', async function(event) {
    // hide file icons
    // filesView.classList.add('hidden');
    // await sleep(1000);
    filesView.classList.add('d-none');
    // show file content
    const fileContent = mainContainer.querySelector(`#${file.id}-content`);
    // const fileText = fileContent.textContent;
    // fileContent.innerHTML = '';
    fileContent.classList.remove('d-none');
    fileBack.classList.remove('d-none');
    // animate file text
    // Array.from(fileText).forEach((char, index) => {
    //   const span = document.createElement('span');
    //   span.innerHTML = char;
    //   span.classList.add('hidden');
    //   fileContent.appendChild(span);
    //   const chartime = 1;
    //   span.style.animation = `fadeIn ${chartime}ms forwards ${index * chartime}ms`;
    // });
  });
}

// go back on click
fileBack.addEventListener('click', async function(event) {
  // hide back button
  fileBack.classList.add('d-none');
  // hide file content
  for (const file of files) {
    const fileContent = mainContainer.querySelector(`#${file.id}-content`);
    fileContent.classList.add('d-none');
  }
  // show file icons
  filesView.classList.remove('d-none');
  // filesView.classList.remove('hidden');
  // await sleep(1000);
});
