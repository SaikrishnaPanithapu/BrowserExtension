document.onreadystatechange = function () {
    if (document.readyState == "complete" && document.URL == "https://service2.diplo.de/rktermin/extern/choose_realmList.do?locationCode=banga&request_locale=en") {
        document.getElementsByTagName("a")[5].click();
    } else if (document.readyState == "complete" && document.URL == "https://service2.diplo.de/rktermin/extern/choose_categoryList.do?locationCode=banga&realmId=210") {
        document.getElementsByTagName("a")[3].click();
    } else if (document.readyState == "complete" && document.URL == "https://service2.diplo.de/rktermin/extern/choose_category.do?locationCode=banga&realmId=210&categoryId=337") {
        document.getElementsByTagName("a")[3].click();
    } else if (document.readyState == "complete" && document.URL == "https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=banga&realmId=210&categoryId=337") {
        debugger //just to check the from data is available here or not!! 
        let passportNumber;
        chrome.storage.sync.get("entereddata", function (data) {
            passportNumber = data.entereddata.passportno;
            $("#appointment_captcha_month_captchaText").val(passportNumber);
        });
        
        // if (JSON.parse(localStorage.getItem('formData'))) {
        //     // $("#appointment_captcha_month_captchaText").val(JSON.parse(localStorage.getItem('formData')).passportno);
            
        // }
    }
    // else if (document.readyState == "complete" && document.URL == "https://service2.diplo.de/rktermin/extern/appointment_showMonth.do") {
    //     alert("No Appointment page!!!")
    //     if (document.getElementsByTagName("a")[3]) {
    //         document.getElementsByTagName("a")[3].click();
    //     }
    // }
    // else if (document.readyState == "complete" && document.URL == "https://service2.diplo.de/rktermin/extern/appointment_refreshCaptchamonth.do") {
    //     alert("from captch error page !!!")
    //     if (document.getElementsByTagName("a")[3]) {
    //         document.getElementsByTagName("a")[3].click();
    //     }
    // }
    // else if (document.readyState == "complete" && document.URL.includes("https://service2.diplo.de/rktermin/extern/appointment_showMonth.do?locationCode=banga&realmId=210&categoryId=337&dateStr=")) {
    //     alert("from captch error page !!!")
    //     if (document.getElementsByTagName("a")[3]) {
    //         document.getElementsByTagName("a")[3].click();
    //     }
    // }
    // else if (document.readyState == "complete" && document.URL.includes("https://service2.diplo.de/rktermin/extern/appointment_showDay.do")) {
    //     alert("last but one page!!")
    //     if (document.getElementsByTagName("a")[7]) {
    //         document.getElementsByTagName("a")[7].click();
    //     }
    // }
    else if (document.readyState == "complete" && document.URL.includes("https://service2.diplo.de/rktermin/extern/appointment_showForm.do?locationCode=banga&realmId=210&categoryId=337&dateStr=")) {

        debugger
        chrome.storage.sync.get("entereddata", function (data) {
            $("#appointment_newAppointmentForm_lastname").val(data.entereddata.lname);
            $("#appointment_newAppointmentForm_firstname").val(data.entereddata.fname);
            $("#appointment_newAppointmentForm_email").val(data.entereddata.email);
            $("#appointment_newAppointmentForm_emailrepeat").val(data.entereddata.repeatemail);
            $("#appointment_newAppointmentForm_fields_0__content").val(data.entereddata.passportno);
            $("#appointment_newAppointmentForm_fields_1__content").val(data.entereddata.phoneno);
            
        });
        // if (JSON.parse(localStorage.getItem('formData'))) {
        //     //To auto fill the data, form data from the popup needs to be saved before navigating to this website 
        //     $("#appointment_newAppointmentForm_lastname").val(JSON.parse(localStorage.getItem('formData')).lname);
        //     $("#appointment_newAppointmentForm_firstname").val(JSON.parse(localStorage.getItem('formData')).fname);
        //     $("#appointment_newAppointmentForm_email").val(JSON.parse(localStorage.getItem('formData')).email);
        //     $("#appointment_newAppointmentForm_emailrepeat").val(JSON.parse(localStorage.getItem('formData')).repeatemail);
        //     $("#appointment_newAppointmentForm_fields_0__content").val(JSON.parse(localStorage.getItem('formData')).passportno);
        //     $("#appointment_newAppointmentForm_fields_1__content").val(JSON.parse(localStorage.getItem('formData')).phoneno);
        //     // After everything got feeded then the below method will get executed ;
        // }

    }
};

// chrome.storage.sync.get("entereddata",function(data){
//     alert(data)
// })

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.storage.sync.get("entereddata", function (data) {
        console.log(data);
    })
    // if (request.todo === "submitForm") {
    //     localStorage.setItem('formData', JSON.stringify(request.entereddata));
    //     // alert(request.entereddata.fname);
    // };
});