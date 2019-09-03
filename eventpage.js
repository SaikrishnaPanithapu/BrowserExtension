chrome.storage.sync.get("formData", function (data) {
    // alert(data.formData.purpose);
    let location = data.formData && data.formData.hasOwnProperty('location') ? data.formData.location : 'banga';
    var categoryId = '';
    var realmId = '';
    location === 'chenn' ? (realmId = 407, categoryId = 883) : (realmId = 210, categoryId = 337)
    window.open(`https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=${location}&realmId=${realmId}&categoryId=${categoryId}`);
});
