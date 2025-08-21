# PiP Media Seeker

PiP Media Seeker is a Chrome extension that allows you to seek forward and backward in Picture-in-Picture (PiP) videos using keyboard shortcuts. This is especially useful for platforms that don't natively support seeking in their PiP players.

## Features

- **Seek forward and backward:** Use custom keyboard shortcuts to jump through your video content.
- **Customizable seek duration:** Choose between 5, 10, 15, or 30-second seek intervals via the extension popup.
- **Enable/Disable:** Easily toggle the extension on or off from the popup.

## Installation

1.  **Download:** Download this repository as a ZIP file and unzip it on your local machine.
2.  **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions`.
3.  **Enable Developer Mode:** Turn on the "Developer mode" toggle in the top-right corner.
4.  **Load Unpacked:** Click the "Load unpacked" button and select the unzipped extension folder.
5.  The extension should now be installed and active.

## How to Use

The core functionality of this extension relies on keyboard shortcuts. You need to set them up manually.

1.  **Open Keyboard Shortcuts:** Navigate to `chrome://extensions/shortcuts`.
2.  **Find PiP Media Seeker:** Locate the "PiP Media Seeker" card.
3.  **Set Shortcuts:** You will see two unassigned actions:
    -   `Seeks forward in the PiP video.`
    -   `Seeks backward in the PiP video.`
    -   `Toggles play/pause on the PiP video.`
4.  Click the pencil icon next to each action and press the key combination you wish to use (e.g., `Ctrl+Right Arrow` for forward and `Ctrl+Left Arrow` for backward).

Once configured, you can use these shortcuts to seek in any active Picture-in-Picture video.

## Important Note on Media Keys

When you assign a global media key (like the "Next Track", "Previous Track", or "Play/Pause" keys on your keyboard) to a command in this extension, the extension will always capture that key press. This means the key will no longer perform its default action in other applications (like Spotify, Apple Music, etc.).

This is a limitation of the Chrome Extensions platform.

If you want to continue using your media keys for other applications, we recommend assigning non-media key shortcuts, such as:
- `Ctrl + Shift + Right Arrow` for seeking forward
- `Ctrl + Shift + Left Arrow` for seeking backward
- `Ctrl + Shift + Space` for toggling play/pause

## Configuration

You can configure the extension by clicking on its icon in the Chrome toolbar. The popup allows you to:

-   **Enable or Disable** the extension.
-   Set the **seek duration** (5, 10, 15, or 30 seconds). The default is 10 seconds.
