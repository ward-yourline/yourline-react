function showToast(text, view) {
  // Create a new div element for the toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;

  // Apply CSS styles
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.opacity = '0';
  toast.style.zIndex = '1';
  toast.style.transition = 'opacity 0.3s ease-in-out';
  toast.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
  toast.style.textAlign = 'center';

  // Append the toast element to the specified view
  view.appendChild(toast);

  // Add the 'show' class to display the toast
  setTimeout(function () {
      toast.style.opacity = '1';
  }, 0); // Use a very short delay to ensure the 'show' class is applied

  // Remove the 'show' class and the toast element after 3 seconds
  setTimeout(function () {
      toast.style.opacity = '0';
      // Remove the toast element from the view after the animation
      setTimeout(function () {
          view.removeChild(toast);
      }, 300);
  }, 3000);
}
