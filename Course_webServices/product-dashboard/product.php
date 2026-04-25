<?php
require 'vendor/autoload.php';
use GuzzleHttp\Client;

if (!isset($_GET['id']) || !is_numeric($_GET['id']) || $_GET['id'] <= 0) {
    header('Location: index.php');
    exit;
}

$id = (int) $_GET['id'];
$client = new Client([
    'base_uri' => 'https://dummyjson.com/',
    'timeout'  => 5.0,
]);
$response = $client->request('GET', "products/{$id}");

$product = json_decode($response->getBody(), true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($product['title']) ?></title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }

        .back-link { display: block; margin-bottom: 20px; color: #1a0dab; }

        .product-detail {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 30px;
            max-width: 700px;
        }

        .product-detail img {
            width: 150px;
            height: 150px;
            object-fit: contain;
            display: block;
            margin-bottom: 15px;
        }

        h1 { margin: 10px 0; }

        p { color: #333; margin: 6px 0; }
    </style>
</head>
<body>

<a class="back-link" href="index.php">← Back to Products</a>

<div class="product-detail">

    <img src="<?= htmlspecialchars($product['thumbnail']) ?>"
         alt="<?= htmlspecialchars($product['title']) ?>">

    <h1><?= htmlspecialchars($product['title']) ?></h1>

    <p><?= htmlspecialchars($product['description']) ?></p>

    <p>Price: $<?= $product['price'] ?></p>
    <p>Discount: <?= $product['discountPercentage'] ?>%</p>
    <p>Rating: <?= $product['rating'] ?>/5</p>
    <p>Stock: <?= $product['stock'] ?></p>
    <p>Brand: <?= htmlspecialchars($product['brand'] ?? 'N/A') ?></p>
    <p>Category: <?= htmlspecialchars($product['category']) ?></p>

</div>

</body>
</html>