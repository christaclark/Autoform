var configuration = "configuration.json";
var submission = "submission.php";

    $(function() {
        localStorage.clear();
        loadGroups(configuration);

        $('#submit').on('click', function(event) {
            event.preventDefault();

            var info = "save=true";

            for (var i = 0; i < localStorage.length; i++){
                info = info + "&" + localStorage.key(i) + "=" + localStorage.getItem(localStorage.key(i));
            }

            //console.log(info);


            $.ajax({
                type: "POST",
                data: info,
                url: submission,
                success: function(data) {
                    //console.log(data);
                    $('.form').remove();
                    $('#submit').remove();
                    $('.complete').html('<p>Thank you for submitting your information.</p>');
                },
                error: function(data) {
                    console.log('error');
                }
            });

        });

    });


        function loadGroups(configuration, submission) {

            $.getJSON(configuration, function (obj) {

                    localStorage.setItem('subject', obj.defaults[0].subject);
                    localStorage.setItem('sender', obj.defaults[0].sender);
                    localStorage.setItem('recipient', obj.defaults[0].recipient);
                    localStorage.setItem('bcc', obj.defaults[0].bcc);
                    localStorage.setItem('user', obj.defaults[0].authentication[0].user);
                    localStorage.setItem('pass', obj.defaults[0].authentication[0].pass);
                    localStorage.setItem('host', obj.defaults[0].authentication[0].host);
                    localStorage.setItem('auth', obj.defaults[0].authentication[0].auth);
                    localStorage.setItem('port', obj.defaults[0].authentication[0].port);

                // panels
                $.each(obj.items, function (key, value) {

                    var validation='';

                    if (value.style == 'text') {


                        if (value.validation == "email") {
                           validation += "data-bv-emailaddress='true' ";
                           validation += "data-bv-emailaddress-message='The input is not a valid email address'";
                        }

                        if (value.required == true) {
                           validation += "data-bv-notempty ";
                           validation += "data-bv-notempty-message='The field is required'";
                        }

                        if (value.validation == "phone") {
                           validation += "data-bv-phone-country='us' ";
                           validation += "data-bv-phone-message='The input is not a valid phone number.'";
                        }






                        $("#items").append("<div class='form-group " + value.class + "'>"
                            + "    <label class='' for='" + value.id + "'>" + value.name + "</label>"
                            + "    <input type='text' class='form-control " + value.id + "' name='" + value.id + "' " + validation + " placeholder=''>"
                            + "</div>");

                            localStorage.setItem(value.id, 'no value');


                    }

                    if (value.style == 'textarea') {

                        $("#items").append("<div class='form-group " + value.class + "'>"
                            + "    <label class='' for='" + value.id + "'>" + value.name + "</label>"
                            + "    <textarea class='form-control' name='" + value.id + "'></textarea>"
                            + "</div>");

                        localStorage.setItem(value.id, 'no value');

                    }

                   if (value.style == 'checkbox') {
                        var pArray = value.options;

                        $("#items").append("<div class='col-sm-12'><label>" + value.name + "</label></div>");

                        for (var i = 0; i < pArray.length; i++) {

                             $("#items").append("<div class='col-sm-12'>"
                              + "<div class='checkbox'>"
                              + "  <label>"
                              + "    <input name='" + value.id + "-item" + i + "' type='" + value.style + "' value='" + value.options[i] + "'> " + value.options[i]
                              + "  </label>"
                              + "</div>"
                            + "</div>");
                        }

                        //localStorage.setItem(value.id, 'no value');

                    }

                    if (value.style == 'radio') {
                        var pArray = value.options;

                        $("#items").append("<div class='col-sm-12'><label>" + value.name + "</label></div>");

                        for (var i = 0; i < pArray.length; i++) {

                             $("#items").append("<div class='col-sm-12'>"
                              + "<div class='checkbox'>"
                              + "  <label>"
                              + "    <input name='" + value.id + "' type='" + value.style + "' value='" + value.options[i] + "'> " + value.options[i]
                              + "  </label>"
                              + "</div>"
                            + "</div>");

                        }

                        //localStorage.setItem(value.id, 'no value');

                    }



                    if (value.style == 'select') {
                        var pArray = value.options;
                        //console.log(pArray);

                        $("#items").append("<div class='form-group " + value.class + "' id='" + value.id + "'>"
                            + "    <label class='' for='" + value.id + "'>" + value.name + "</label>"
                            + "    <select class='form-control' name='" + value.id + "'></select>"
                            + "</div>");

                        if (value.range != undefined) {

                            for (var i = value.range[0]; i < value.range[1]; i++) {
                             $("#" + value.id + " select").append("<option value='" + i + "'>" + i + "</option>");
                            }

                        } else {

                            for (var i = 0; i < pArray.length; i++) {
                             $("#" + value.id + " select").append("<option value='" + value.options[i] + "'>" + value.options[i] + "</option>");
                            }

                        }

                        localStorage.setItem(value.id, 'no value');

                    }


                })

                $("input[type=text]").on("change", function() {
                    localStorage.setItem(this.name, this.value);
                });

                $("input[type=textarea]").on("change", function() {
                    localStorage.setItem(this.name, this.value);
                });

                $("input[type=checkbox]").on("change", function() {
                    localStorage.setItem(this.name, this.value);
                });

                $("input[type=radio]").on("change", function() {
                    localStorage.setItem(this.name, this.value);
                });

                $("select").on("change", function() {
                    localStorage.setItem(this.name, this.value);
                });

                $('.ariform').bootstrapValidator();
            })
    }