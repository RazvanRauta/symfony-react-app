<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ProductFixture extends Fixture
{
    /**
     * @param ObjectManager $manager
     * @throws \Exception
     */
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 20; $i++) {

            $product = new Product();
            $product->setName('product '.$i);
            $product->setPrice(random_int(10, 100));
            $manager->persist($product);
        }

        $manager->flush();
    }
}
