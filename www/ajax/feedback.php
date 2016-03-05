<?
$data = array(
    'ret' => 0
);

$name = $_REQUEST["feedback_name"];
$phone = $_REQUEST["feedback_phone"];
$subject = "Supportforpc.ru";
$myemail = "enjoy0707@mail.ru, oleg@it-nanny.ru";

$message_to_myemail = "На сайте Supportforpc.ru заполнили форму!\n
Имя отправителя: $name\n
Tелефон: $phone";

if (!empty($name) && !empty($phone)) {
    mail($myemail, $subject, $message_to_myemail);
}

$data['ret'] = 1;

echo json_encode($data);
?>
