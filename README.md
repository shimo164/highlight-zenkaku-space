# highlight-zenkaku-space

This Chrome extension helps identify and highlight unexpected zenkaku spaces, which can cause errors upon execution.

- Zenkaku spaces are visually changed to '😀' using JavaScript.
- The script runs 5 seconds after the most recent DOM update.

# Settings

## For Snowsight
In manifest.json, set `content_scripts` to match `"https://app.snowflake.com/*"` .
```
	"content_scripts": [
		{
			"matches": ["https://app.snowflake.com/*"],
			"js": ["content.js"],
			...
```

## Settings in content.js

```
const replacementCharacter = '😀';
const debounceTimeMillisec = 5000;
```

## How to Install the Chrome Extension in Developer Mode

1. Download the extension folder to your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right corner.
4. Click on the **Load unpacked** button.
5. Select the folder containing the `manifest.json`.
6. The extension will now be installed in Developer mode.

For more information on using Chrome extensions in Developer mode, you can visit the [Google Chrome Enterprise Help page](https://support.google.com/chrome/a/answer/2714278?hl=en).
