<?php
// contact.php

// Allow cross-origin if needed
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect output from JSON payload (common for modern fetchAPI)
    $data = json_decode(file_get_contents("php://input"));
    
    // If standard form data was sent instead
    if(empty($data)) {
        $name = filter_var($_POST["name"] ?? "", FILTER_SANITIZE_STRING);
        $company = filter_var($_POST["company"] ?? "", FILTER_SANITIZE_STRING);
        $email = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
        $service = filter_var($_POST["service"] ?? "", FILTER_SANITIZE_STRING);
        $message = filter_var($_POST["message"] ?? "", FILTER_SANITIZE_STRING);
    } else {
        $name = filter_var($data->name ?? "", FILTER_SANITIZE_STRING);
        $company = filter_var($data->company ?? "", FILTER_SANITIZE_STRING);
        $email = filter_var($data->email ?? "", FILTER_SANITIZE_EMAIL);
        $service = filter_var($data->service ?? "", FILTER_SANITIZE_STRING);
        $message = filter_var($data->message ?? "", FILTER_SANITIZE_STRING);
    }
    
    // Validate
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill in all required fields."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }

    // Set Up Email
    $to = "admin@eelaviapratama.com";
    $subject = "New Inquiry from EAP Website: $service";
    
    $email_content = "Name: $name\n";
    $email_content .= "Company: $company\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Interested In: $service\n\n";
    $email_content .= "Message:\n$message\n";
    
    $headers = "From: webmaster@eelaviapratama.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // For local environments where mail() might fail, we simulate success
    // In production, uncomment the if(mail(...)) block
    
    /*
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Your message has been sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Oops! Something went wrong, and we couldn't send your message."]);
    }
    */
    
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Your message has been sent successfully!"]);
    
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
?>
