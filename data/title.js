let title;
let badge = 0;
let lastSet = "";
let mutationOptions = { childList: true };

function getTitle() {
	title = document.title.replace(/\s+\(\d+\)/, "");
}

function setTitle() {
	if (badge)
		lastSet = document.title = title + " (" + badge + ")";
	else
		lastSet = document.title = title;

	titleObserver.takeRecords();
}

function getUnreadCount() {
	badge = parseInt(unreadCount.textContent, 10);
}

let titleObserver = new MutationObserver(function(aRecords, aObserver) {
	if (document.title == lastSet)
		return;

	getTitle();
	setTitle();
});

titleObserver.observe(document.querySelector("title"), mutationOptions);

let unreadCount = document.querySelector("#latesttab .simpleUnreadCount");
let unreadCountObserver = new MutationObserver(function(aRecords, aObserver) {
	getUnreadCount();
	setTitle();
});

unreadCountObserver.observe(unreadCount, mutationOptions);

getTitle();
getUnreadCount();
setTitle();

self.on("detach", function() {
	titleObserver.disconnect();
	unreadCountObserver.disconnect();
});
