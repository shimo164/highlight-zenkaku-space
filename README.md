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
