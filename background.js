// Generic function to find the PiP tab and execute a script
async function executeInPiPTab(scriptFunc, args = []) {
  // This function finds the right tab and executes the provided script.
  // It does not handle application logic like checking if the extension is enabled.
  const allTabs = await chrome.tabs.query({});
  if (!allTabs || allTabs.length === 0) {
    return;
  }

  for (const tab of allTabs) {
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scriptFunc,
        args: args,
      });
      // If the script found and acted on a PiP video, it returns true.
      if (results && results[0] && results[0].result) {
        break; // Found the tab, so we can stop iterating.
      }
    } catch (e) {
      // Ignore errors for tabs where script injection is not allowed.
    }
  }
}

// The script that will be injected to perform the seek action.
const seekInjectedFunction = (direction, seconds) => {
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

// The script that will be injected to toggle play/pause.
const togglePlayPauseInjectedFunction = () => {
  const video = document.querySelector('video:picture-in-picture');
  if (video) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    return true; // Indicate success
  }
  return false; // Indicate failure
};

// Listen for commands
chrome.commands.onCommand.addListener(async (command) => {
  const settings = await chrome.storage.local.get(['enabled', 'seekSeconds']);
  const isEnabled = settings.enabled !== false; // Default to true

  if (!isEnabled) {
    return;
  }

  switch (command) {
    case 'seek_forward':
    case 'seek_backward': {
      const seekSeconds = settings.seekSeconds || 10; // Default to 10
      const direction = command === 'seek_forward' ? 'forward' : 'backward';
      executeInPiPTab(seekInjectedFunction, [direction, seekSeconds]);
      break;
    }
    case 'toggle_play_pause': {
      executeInPiPTab(togglePlayPauseInjectedFunction);
      break;
    }
  }
});