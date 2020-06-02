<?php
include "cockpit/bootstrap.php";

$allowedOrigins = [
  "http://localhost:8000",
  "http://localhost",
];
$origin = $_SERVER["HTTP_ORIGIN"];

if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Content-type: application/json; charset=utf-8");
}

// Формируем настройки отправщика из настроек Движка
$settings = cockpit("singletons")->getData("settings");
$domain = $_SERVER["SERVER_NAME"];
$address = $settings["senderEmail"];
$haveToSaveCalls = $settings["haveToSaveCalls"];
$fromName = !empty($settings["callbackName"]) ? $settings["callbackName"] : "Движок";
$fromAdderss = !empty($settings["callbackFrom"]) ? $settings["callbackFrom"] : "noreplay@$domain";
$subject = !empty($settings["callbackSubject"]) ? $settings["callbackSubject"] : "Письмо с сайта $domain";
$successMessage = $settings["callbackSuccessMessage"];

// functions
function numberWithSpaces($number) {
  return number_format($number, 0, ",", " ");
}

function sendEmail($address, $fromName, $fromAdderss, $subject, $message) {
  $fromBase64 = "=?utf-8?B?".base64_encode($fromName)."?=";
  $subjectBase64 = "=?utf-8?B?".base64_encode($subject)."?=";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=utf-8\r\n";
  $headers .= "From: $fromBase64 <$fromAdderss>\r\n";

  return mail($address, $subjectBase64, $message, $headers, "-f $fromAdderss");
}
// end functions

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$orderName = $data["name"];
$orderPhone = $data["phone"];

if (empty($orderName) || empty($orderPhone)) {
  echo json_encode([
    "success" => false,
    "message" => "Не отправлены данные",
  ]);

  die();
}

$messageSent = false;
$message = <<<EOT
<p>Имя: <strong>$orderName</strong></p>
<p>Телефон: <strong><a href="tel:$orderPhone">$orderPhone</a></strong></p>
EOT;

$messageSent = sendEmail($address, $fromName, $fromAdderss, $subject, $message);

if ($haveToSaveCalls) {
  $orderEntry = [
    "name" => $orderName,
    "phone" => $orderPhone,
    "processed" => false,
  ];

  $result = cockpit("collections")->save("callbacks", $orderEntry);
}

echo json_encode(array(
  "success" => $messageSent,
  "message" => $successMessage,
));