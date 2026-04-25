<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
    'base_uri' => 'https://dummyjson.com/',
    'timeout'  => 5.0,
]);

$response = $client->request('GET', 'products');

$data = json_decode($response->getBody(), true);

$products = $data['products']?? [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Product Catalog Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { margin-bottom: 20px; }

        .product-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .product-card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
        }

        .product-card img {
            width: 100%;
            height: 200px;
            object-fit: contain;
        }

        .product-card a {
            font-size: 18px;
            font-weight: bold;
            color: #1a0dab;
            text-decoration: none;
        }

        .product-card a:hover { text-decoration: underline; }
        .product-card p { color: #555; font-size: 14px; }
    </style>
</head>
<body>

<h1>Product Catalog Dashboard</h1>

<div class="product-grid">
    <?php foreach ($products as $product): ?>
        <div class="product-card">

           
            <a href="product.php?id=<?= $product['id'] ?>">
                <img src="<?= htmlspecialchars($product['thumbnail']) ?>"
                     alt="<?= htmlspecialchars($product['title']) ?>">
            </a>

            <a href="product.php?id=<?= $product['id'] ?>">
                <?= htmlspecialchars($product['title']) ?>
            </a>

            <p><?= htmlspecialchars($product['description']) ?></p>
            <p>$<?= $product['price'] ?></p>
            <p>Rating: <?= $product['rating'] ?></p>

        </div>
    <?php endforeach; ?>
</div>

</body>
</html>