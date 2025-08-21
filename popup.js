document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggle-switch');
  const seekButtons = document.querySelectorAll('.seek-btn');

  // Load current settings when the popup is opened
  chrome.storage.local.get(['enabled', 'seekSeconds'], (result) => {
    // Set toggle switch state
    toggleSwitch.checked = result.enabled !== false; // Default to true if not set

    // Set active class on the seek button
    const currentSeekSeconds = result.seekSeconds || 10; // Default to 10
    seekButtons.forEach(btn => {
      if (parseInt(btn.dataset.seconds) === currentSeekSeconds) {
        btn.classList.add('active');
      }
    });
  });

  // Save extension state when the toggle switch is changed
  toggleSwitch.addEventListener('change', () => {
    const isEnabled = toggleSwitch.checked;
    chrome.storage.local.set({ enabled: isEnabled });
  });

  // Save seek duration when a button is clicked
  seekButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const selectedSeconds = parseInt(event.target.dataset.seconds);

      // Remove active class from all buttons
      seekButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to the clicked button
      event.target.classList.add('active');

      // Save the new seek duration
      chrome.storage.local.set({ seekSeconds: selectedSeconds });
    });
  });
});