$(document).ready(function () {

    $("form[name='registration']").validate({
        rules: {
            firstname: {
                required: true,
                minlength: 2
            },
            lastname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            passportno: {
                required: true,
                minlength: 8,
                maxlength: 8
            },
            phoneno: {
                digits: true,
                required: true,
                minlength: 10,
                maxlength: 10
            }
        },
        messages: {
            firstname: {
                required: "Enter First Name",
                minlength: "First Name should be atleast 2 characcters"
            },
            lastname: {
                required: "Enter Last Name",
                minlength: "Last Name should be atleast 2 characcters"
            },
            email: {
                required: "Enter email",
                email: "The email should be in the format name@domain.com"
            },
            passportno: {
                required: "Please Enter Valid Passport Number",
                minlength: "Passport Number should be 8 characters",
                maxlength: "Passport Number should be 8 characters"
            },
            phoneno: {
                required: "Please Enter Valid Phone Number",
                number: "Please enter your Phone Number as a numerical value",
                minlength: "Phone Number should be 10 characters",
                maxlength: "Phone Number should be 10 characters"
            },
        }
    });
    $("form").submit(function () {
        let location = document.getElementById('chen').checked ? 'chenn' : 'benga';
        const formObj = {
            fname: $("#fname").val(),
            lname: $("#lname").val(),
            email: $("#email").val(),
            passportno: $("#passportno").val(),
            phoneno: $("#phoneno").val(),
            location: location,
        };
        chrome.storage.sync.set({ "formData": formObj });
        chrome.storage.sync.get("formData", function (obj) {
            $("#fname").val(obj.formData.fname);
            $("#lname").val(obj.formData.lname);
            $("#email").val(obj.formData.email);
            $("#passportno").val(obj.formData.passportno);
            $("#phoneno").val(obj.formData.phoneno);
            obj.formData.location === 'chenn' ? document.getElementById('chen').checked = true : document.getElementById('bang').checked = true; 
        });
    });

    chrome.storage.sync.get("formData", function (obj) {
        if (obj.formData) {
            $("#fname").val(obj.formData.fname);
            $("#lname").val(obj.formData.lname);
            $("#email").val(obj.formData.email);
            $("#passportno").val(obj.formData.passportno);
            $("#phoneno").val(obj.formData.phoneno);
            obj.formData.location === 'chenn' ? document.getElementById('chen').checked = true : document.getElementById('bang').checked = true; 

        }
    });
});



