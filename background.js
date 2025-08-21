// Function to handle the seek action
async function handleSeek(direction) {
  const settings = await chrome.storage.local.get(['enabled', 'seekSeconds']);
  const isEnabled = settings.enabled !== false; // Default to true
  const seekSeconds = settings.seekSeconds || 10; // Default to 10

  // Only run the function if the extension is enabled
  if (!isEnabled) {
    return;
  }

  // Query for all tabs
  const allTabs = await chrome.tabs.query({});

  if (!allTabs || allTabs.length === 0) {
    return; // No tabs found
  }

  const seekFunction = (direction, seconds) => {
    const video = document.querySelector('video:picture-in-picture');
    if (video) {
      if (direction === 'forward') {
        video.currentTime += seconds;
      } else if (direction === 'backward') {
        video.currentTime -= seconds;
      }
      return true; // Indicate success
    }
    return false; // Indicate failure
  };

  // Iterate through all tabs and try to seek
  for (const tab of allTabs) {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: seekFunction,
        args: [direction, seekSeconds],
      });

      // If the script returned true, we've found the PiP video and can stop.
      if (results && results[0] && results[0].result) {
        break;
      }
    } catch (e) {
      // Ignore errors for tabs where script injection is not allowed (e.g., chrome:// pages)
      // console.error(`Failed to inject script in tab ${tab.id}: ${e.message}`);
    }
  }
}

// Listen for the commands defined in manifest.json
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "seek_forward") {
    handleSeek('forward');
  } else if (command === "seek_backward") {
    handleSeek('backward');
  }
});