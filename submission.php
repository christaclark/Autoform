<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/PHPMailer-master/PHPMailerAutoload.php');

$sender = $_POST['sender'];
$recipient = $_POST['recipient'];
$subject = $_POST['subject'];
$bcc = $_POST['bcc'];

$host = $_POST['host'];
$auth = $_POST['auth'];
$user = $_POST['user'];
$pass = $_POST['pass'];
$port = $_POST['port'];

$template = "<b>The following information was submitted via " . $subject . "</b><br>";
$templatetxt = "The following information was submitted via " . $subject . "\r\n";

foreach($_POST as $key => $value) {
	if ($key == "save" or $key == "subject"
		or $key == "sender" or $key == "recipient"
		or $key == "host" or $key == "auth"
		or $key == "user" or $key == "pass"
		or $key == "port" or $key == "bcc") {

	} else {
		$template .= $key . " : " . $value . "<br>";
		$templatetxt .= $key . " : " . $value . "\r\n";
	}
}

$mail = new PHPMailer;

// Enter your SMTP info here. I use mandrill.
$mail->isSMTP();
$mail->Host 	= $host;
$mail->SMTPAuth = $auth;
$mail->Username = $user;
$mail->Password = $pass;
$mail->Port     = $port;

$mail->From = $sender;
$mail->FromName = $sender;
$mail->addAddress($recipient); // Add a recipient
$mail->addBCC($bcc);

$mail->WordWrap = 150; // Set word wrap to 50 characters

$mail->isHTML(true); // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = $template;
$mail->AltBody =  $templatetxt;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been successfully sent email to ' . $recipient;
    echo 'BCC' . $bcc;
}
?>

<?php

//echo $template;
?>