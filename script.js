const menuBar = document.querySelector('.menu-bar');
const dropDown = document.getElementsByTagName('nav')[0];
const shorten = document.getElementById('shorten');
const input = document.querySelector('input');
const container = document.querySelector('.shortener .ctr');

menuBar.onclick = () => {
   dropDown.classList.toggle('dropped');
}

shorten.onclick = () => {
   if(!input.value) {
      input.parentElement.classList.add("error") 
   }
   else {
      input.parentElement.classList.remove("error");
      fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
      .then( response => response.json())
      .then(response => {
         if (response.ok) {
            const {original_link, short_link} = response.result;
            createLink(original_link, short_link);
         }
      })
      .catch(error => console.error(error))
   }   
}

function createLink(url, shortenedLink) {
   const div = document.createElement('div');
   div.setAttribute('class', "shortened-link");
   
   div.innerHTML = `<p>${url.length > 35 ? url.substring(0, 35)+"..." : url}</p><p>${shortenedLink}</p><button type="button">Copy</button>`;
   container.appendChild(div);

   div.lastChild.onclick = () => {
      navigator.clipboard.writeText(shortenedLink);
      div.lastChild.textContent = "Copied!";
      div.lastChild.style.backgroundColor = "var(--d-violet)";
      setTimeout(() => {
         div.lastChild.textContent = "Copy";
         div.lastChild.style.backgroundColor = "var(--cyan)";  
      }, 3000);
   }
}