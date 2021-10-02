<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php'
    require 'phpmailer/src/PHPMailer.php'

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('uk', 'phpmailer/language/');
    $mail->IsHTML(true);

    $mail->setFrom('s.v.oliynuk@gmail.com');
    $mail->addAddress('s.v.oliynuk@gmail.com');

    $body = '<h1>Повідомлення</h1>';
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Імя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Повідомлення</strong> '.$_POST['message'].'</p>';
    }
    
    $mail->Body = $body;

    if(!$mail->send()) {
        $message = 'Помилка';
    } else {
        $message = 'Дані відправлені';
    }

    $response = ['messame' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>