$(function () {

    var dataObj = { lname: null, fname: null, email: null, repeatemail: null, passportno: null, phoneno: null };
    $("#lname").on("change paste keyup", function () {
        let lname = $(this).val();
        dataObj.lname = lname;
    });
    $("#fname").on("change paste keyup", function () {
        let fname = $(this).val();
        dataObj.fname = fname;
    });
    $("#email").on("change paste keyup", function () {
        let email = $(this).val();
        dataObj.email = email;
    });
    $("#repeatemail").on("change paste keyup", function () {
        let repeatemail = $(this).val();
        dataObj.repeatemail = repeatemail;
    });
    $("#passportno").on("change paste keyup", function () {
        let passportno = $(this).val();
        dataObj.passportno = passportno;
    });
    $("#phoneno").on("change paste keyup", function () {
        let phoneno = $(this).val();
        dataObj.phoneno = phoneno;
    });


    $("#Submit").click(function () {
        if (dataObj.fname != null) {
            alert("data saved");
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.storage.sync.set({
                    entereddata: dataObj
                })
                // chrome.tabs.sendMessage(tabs[0].id, {
                //     todo: "submitForm",
                //     entereddata: dataObj
                // });
            })

        } else {
            alert("Please enter all required data!!!!!!!!")
        }

    });
})