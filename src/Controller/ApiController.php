<?php

namespace App\Controller;

use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/products", name="product", methods={"GET"})
     * @throws ExceptionInterface
     */
    public function data(): JsonResponse
    {

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonObject = $serializer->normalize($this->getDoctrine()->getRepository(Category::class)->findAll(), 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }]);
        if ($jsonObject) {
            $response = new JsonResponse($jsonObject);
        }else{
            $response = new JsonResponse([],404);
        }

        $response->headers->set('access-control-allow-origin', 'http://localhost:9000');

        return $response;
    }

    /**
     * @Route("/api/products/{title}", name="category", methods={"GET"})
     * @param string $title
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function category(string $title): JsonResponse
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonObject = $serializer->normalize($this->getDoctrine()->getRepository(Category::class)->findOneBy(['title' => $title]), 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }]);

        if ($jsonObject) {
            $response = new JsonResponse([$jsonObject]);
        }else{
            $response = new JsonResponse([],404);
        }

        $response->headers->set('access-control-allow-origin', 'http://localhost:9000');

        return $response;
    }
}
