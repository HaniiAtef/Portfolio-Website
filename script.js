function downloadCV() {
  // Create an invisible link element
  const link = document.createElement("a");
  
  // Set the link's href to the file path
  link.href = "assets/HaniAtef_cv (1).pdf"; // Update path to match your file location
  
  // Set the download attribute to specify the downloaded file name
  link.download = "HaniAtef_CV.pdf"; // Change to desired file name
  
  // Append the link to the document and trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Remove the link after the download
  document.body.removeChild(link);
}


function reorderElements() {
    const additionalInfo = document.querySelector('.additional-info');
    const leftTitles = document.querySelector('.left-titles');
    
    // Check if we're on mobile (width < 768px)
    if (window.innerWidth <= 768) {
      // Move additional-info after left-titles
      if (additionalInfo && leftTitles && additionalInfo.parentNode !== leftTitles.parentNode) {
        leftTitles.parentNode.appendChild(additionalInfo);
      }
    } else {
      // Ensure additional-info is back in its original place for larger screens
      const contentWrapper = document.querySelector('.content-wrapper');
      if (additionalInfo && contentWrapper && additionalInfo.parentNode !== contentWrapper) {
        contentWrapper.appendChild(additionalInfo); // Move it back to its original place
      }
    }
}


window.addEventListener('DOMContentLoaded', reorderElements);

  // Also run on window resize
window.addEventListener('resize', reorderElements);



let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 2

function loadShow() {
  let stt = 0;
  let isMobile = window.innerWidth <= 768; // Check if screen width is mobile-sized
  let spacing = isMobile ? 80 : 120; // Adjust spacing between items for mobile
  
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;

  for (let i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${spacing * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }

  stt = 0;

  for (let i = active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-spacing * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}


loadShow();

next.onclick = function(){
    active = active + 1 < items.length ? active +  1 : active;
    loadShow();
}


prev.onclick = function(){
  active = active - 1 >= 0 ? active -  1 : active;
  loadShow();
}


document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Send form data to FormSubmit
  fetch(event.target.action, {
      method: "POST",
      body: new FormData(event.target),
      headers: {
          'Accept': 'application/json'
      }
  }).then(response => {
      if (response.ok) {
          document.getElementById("status").innerText = "Thank you for your submission!";
          event.target.reset();  // Clear the form after successful submission
      } else {
          document.getElementById("status").innerText = "Submission failed. Please try again.";
      }
  }).catch(error => {
      document.getElementById("status").innerText = "There was an error: " + error.message;
  });
});
