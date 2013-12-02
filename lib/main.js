let pageMod = require("sdk/page-mod");
let self = require("sdk/self");

pageMod.PageMod({
	attachTo: ["existing", "top"],
	include: [
		"http://feedly.com/*",
		"http://cloud.feedly.com/*",
		"https://feedly.com/*",
		"https://cloud.feedly.com/*"
	],
	contentScriptFile: self.data.url("title.js")
});
