<?php
declare(strict_types=1);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('Methode niet toegestaan.'); }
if (!empty($_POST['website'] ?? '')) { exit('Bedankt.'); }

function clean(string $value): string {
    return trim(strip_tags(str_replace(["\r", "\n"], ' ', $value)));
}
$name = clean($_POST['naam'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = clean($_POST['telefoon'] ?? '');
$company = clean($_POST['bedrijf'] ?? '');
$building = clean($_POST['gebouw'] ?? '');
$service = clean($_POST['dienst'] ?? '');
$surface = clean($_POST['oppervlakte'] ?? '');
$frequency = clean($_POST['frequentie'] ?? '');
$message = trim(strip_tags($_POST['bericht'] ?? ''));

if ($name === '' || !$email || $phone === '' || $building === '' || $service === '') {
    http_response_code(422);
    exit('Vul alle verplichte velden correct in.');
}

$to = 'info@all-cleaning.net';
$subject = 'Nieuwe offerteaanvraag via all-cleaning.net';
$body = "Naam: $name\nBedrijf: $company\nE-mail: $email\nTelefoon: $phone\nGebouw: $building\nDienst: $service\nOppervlakte: $surface\nFrequentie: $frequency\n\nExtra informatie:\n$message\n";
$headers = [
    'From: website@all-cleaning.net',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

if (mail($to, $subject, $body, implode("\r\n", $headers))) {
    header('Location: bedankt.html');
    exit;
}
http_response_code(500);
exit('De aanvraag kon niet worden verzonden. Bel ons op 03 230 36 66 of mail info@all-cleaning.net.');
?>