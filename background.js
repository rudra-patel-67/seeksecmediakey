// Function to handle the seek action
async function handleSeek(direction) {
  const settings = await chrome.storage.local.get(['enabled', 'seekSeconds']);
  const isEnabled = settings.enabled !== false; // Default to true
  const seekSeconds = settings.seekSeconds || 10; // Default to 10

  // Only run the function if the extension is enabled
  if (!isEnabled) {
    return;
  }

  const [pipWindow] = await chrome.tabs.query({
    windowType: 'normal',
    audible: true
  });

  if (!pipWindow) {
    return;
  }

  const seekFunction = (direction, seconds) => {
    const video = document.querySelector('video:picture-in-picture');
    if (video) {
      if (direction === 'forward') {
        video.currentTime += seconds;
      } else if (direction === 'backward') {
        video.currentTime -= seconds;
      }
    }
  };

  await chrome.scripting.executeScript({
    target: { tabId: pipWindow.id },
    func: seekFunction,
    args: [direction, seekSeconds]
  });
}

// Listen for the commands defined in manifest.json
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "seek_forward") {
    handleSeek('forward');
  } else if (command === "seek_backward") {
    handleSeek('backward');
  }
});