let title;
let badge = 0;
let lastSet = "";
let unreadCount;
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

let unreadCountObserver = new MutationObserver(function(aRecords, aObserver) {
	getUnreadCount();
	setTitle();
});

init();

function init() {
	unreadCount = document.querySelector("#latesttab .staticSimpleUnreadCount");
	if (!unreadCount) {
		setTimeout(init, 500);
		return;
	}

	getTitle();
	getUnreadCount();
	setTitle();

	unreadCountObserver.observe(unreadCount, mutationOptions);
	titleObserver.observe(document.querySelector("title"), mutationOptions);

	self.on("detach", function() {
		titleObserver.disconnect();
		unreadCountObserver.disconnect();
	});
}
