<?php

$data = array(
    'ret' => 0
);

/* Осуществляем проверку вводимых данных и их защиту от враждебных
скриптов */
$name = htmlspecialchars($_POST["feedback_name"]);
$phone = htmlspecialchars($_POST["feedback_phone"]);
$subject = "Supportforpc.ru"

/* Устанавливаем e-mail адресата */
$myemail = "enjoy0707@mail.ru";

/* Проверяем заполнены ли обязательные поля ввода, используя check_input
функцию */
$name = check_input($_POST["feedback_name"], "Введите ваше имя!");
$phone = check_input($_POST["feedback_phone"], "Укажите тему сообщения!");

/* Создаем новую переменную, присвоив ей значение */
$message_to_myemail = "На сайте Supportforpc.ru заполнили форму!
Имя отправителя: $name
Телефон: $phone";

/* Отправляем сообщение, используя mail() функцию */
mail($myemail, $subject, $message_to_myemail, $headers);

$data['ret'] = 1;

echo json_encode($data);
?>
