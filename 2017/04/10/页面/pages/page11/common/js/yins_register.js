$(document).ready(function () {

    if ($(".field-db select[name=db]").val()) {
        $(".field-db").hide();
    }
    $("button[name=register]").bind("click",function(){
        // 验证
        if ($("form[name=registerForm]").validate().form()) {
            document.registerForm.action='/web/submit' + location.hash;
            document.registerForm.submit();
        }
    });
    $("div[id=login_cat]").hide();
    var department_cat = $('#department_cat');
    department_cat.bind('change',function(){
        if (department_cat.val() == 'farm') {
            $('#number_3').attr("required", true);
            $('label[for=number_3]').prepend('<span style="color: red;">*</span>')
        } else {
            $('#number_3').attr("required", false);
            $('label[for=number_3]').find('span').remove();
        }
    });
});