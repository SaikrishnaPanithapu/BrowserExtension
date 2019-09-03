document.onreadystatechange = function () {
    var locationCode = '';
    var categoryId = '';
    var realmId = '';
    var url = new URL(document.URL);
    categoryId = url.searchParams.get("categoryId");
    realmId = url.searchParams.get("realmId");
    locationCode = url.searchParams.get("locationCode");
    if (document.readyState == "complete" && document.URL == `https://service2.diplo.de/rktermin/extern/choose_realmList.do?locationCode=${locationCode}&request_locale=en`) {
        document.getElementsByTagName("a")[5].click();
    } else if (document.readyState == "complete" && document.URL == `https://service2.diplo.de/rktermin/extern/choose_categoryList.do?locationCode=${locationCode}&realmId=${realmId}`) {
        document.getElementsByTagName("a")[3].click();
    } else if (document.readyState == "complete" && document.URL == `https://service2.diplo.de/rktermin/extern/choose_category.do?locationCode=${locationCode}&realmId=${realmId}&categoryId=${categoryId}`) {
        document.getElementsByTagName("a")[3].click();
    } else if (document.readyState == "complete" && document.URL == `https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=${locationCode}&realmId=${realmId}&categoryId=${categoryId}`) {

        $("#appointment_captcha_month_captchaText").select();
        checkAppointmentAvailability();
    }
    else if (document.readyState == "complete" && (document.URL.includes(`https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=${locationCode}&realmId=${realmId}&categoryId=${categoryId}&dateStr=`)
        || document.URL == `https://service2.diplo.de/rktermin/extern/appointment_showMonth.do`
        || document.URL.includes(`https://service2.diplo.de/rktermin/extern/appointment_showMonth.do;jsessionid=`)
        || document.URL == `https://service2.diplo.de/rktermin/extern/appointment_refreshCaptchamonth.do`)) {
        checkAppointmentAvailability();
    }
    else if (document.readyState == "complete" && document.URL.includes(`https://service2.diplo.de/rktermin/extern/appointment_showDay.do`)) {
        if (document.getElementsByTagName("a")[7]) {
            document.getElementsByTagName("a")[7].click();
        }
    }
    else if (document.readyState == "complete" && document.URL.includes(`https://service2.diplo.de/rktermin/extern/appointment_showForm.do?locationCode=${locationCode}&realmId=${realmId}&categoryId=${categoryId}&dateStr=`)) {
        chrome.storage.sync.get("formData", function (data) {
            let finalDateOfBirth = '';
            $("#appointment_newAppointmentForm_lastname").val(data.formData && data.formData.hasOwnProperty('lname') ? data.formData.lname : 'null');
            $("#appointment_newAppointmentForm_firstname").val(data.formData && data.formData.hasOwnProperty('fname') ? data.formData.fname : 'null');
            $("#appointment_newAppointmentForm_email").val(data.formData && data.formData.hasOwnProperty('email') ? data.formData.email : 'null');
            $("#appointment_newAppointmentForm_emailrepeat").val(data.formData && data.formData.hasOwnProperty('email') ? data.formData.email : 'null');
            $("#appointment_newAppointmentForm_fields_0__content").val(data.formData && data.formData.hasOwnProperty('passportno') ? data.formData.passportno : '');
            $("#appointment_newAppointmentForm_fields_1__content").val(data.formData && data.formData.hasOwnProperty('phoneno') ? data.formData.phoneno : '');
            if (data.formData && data.formData.hasOwnProperty('dob')) {
                let dateOfBirth = new Date(data.formData.dob);
                let month = ("0" + (dateOfBirth.getMonth() + 1)).slice(-2);
                finalDateOfBirth = ("0" + dateOfBirth.getDate()).slice(-2) + "." + month + "." + dateOfBirth.getFullYear();
            };
            $("#fields1content").val(finalDateOfBirth);
            $("#appointment_newAppointmentForm_fields_3__content").val(data.formData && data.formData.hasOwnProperty('phoneno') ? data.formData.phoneno : '');
            $("#appointment_newAppointmentForm_fields_2__content").val(data.formData && data.formData.hasOwnProperty('purpose') ? data.formData.purpose : '');
            $("#appointment_newAppointmentForm_fields_4__content").val(data.formData && data.formData.hasOwnProperty('nationality') ? data.formData.nationality : '');
            $("#appointment_newAppointmentForm_captchaText").select();
        });

    };
    function checkAppointmentAvailability() {
        if (document.getElementsByTagName('h2')[1] != undefined) {
            let date = new Date()
            let current_date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            let selected_date = new Date(parseInt(document.getElementsByTagName('h2')[1].innerText.trim().split('/')[1]),
                parseInt(document.getElementsByTagName('h2')[1].innerText.trim().split('/')[0]), 1);
            if (document.getElementsByTagName("a")[4].href == `https://service2.diplo.de/rktermin/extern/dsgvo.do?request_locale=en` && monthsDifference(selected_date, current_date) < 3) {
                document.getElementsByTagName("a")[3].click();
            } else if (document.getElementsByTagName("a")[4].href == `https://service2.diplo.de/rktermin/extern/dsgvo.do?request_locale=en` && monthsDifference(selected_date, current_date) == 3) {
                setTimeout(() => {
                    let urlDate = current_date.getDate() + "." + current_date.getMonth() + "." + current_date.getFullYear();
                    window.open(`https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=${locationCode}&realmId=${realmId}&categoryId=${categoryId}&dateStr=` + urlDate, "_self")
                }, 2000);
            } else {
                document.getElementsByTagName("a")[4].click();
            }
        }
        function monthsDifference(dt2, dt1) {
            var diff = (dt2.getTime() - dt1.getTime()) / 1000;
            diff /= (60 * 60 * 24 * 7 * 4);
            return Math.abs(Math.round(diff));
        };
    }
};