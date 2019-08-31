// window.open("https://service2.diplo.de/rktermin/extern/choose_realmList.do?locationCode=banga&request_locale=en");
chrome.storage.sync.get("formData", function (data) {
    window.open("https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=" + data.formData.location + "&realmId=210&categoryId=337");
});
// window.open("https://www.google.com");