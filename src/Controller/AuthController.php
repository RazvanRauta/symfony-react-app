<?php

/**
 * @author Razvan Rauta
 * 15.12.2019
 * 12:28
 */

namespace App\Controller;


use App\Entity\User;
use App\Repository\UserRepository;
use DateTime;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{

    /** @var UserRepository $userRepository */
    private $userRepository;

    /**
     * AuthController Constructor
     *
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/api/register",name="register", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function register(Request $request)
    {
        $newUserData = [
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'firstName' => $request->get('firstName'),
            'lastName' => $request->get('lastName'),
            'dateOfBirth' => DateTime::createFromFormat('d-m-Y', $request->get('dateOfBirth'))
        ];

        $user = $this->userRepository->createNewUser($newUserData);

        return new Response(sprintf('User %s was successfully created', $user->getUsername()));
    }

    /**
     * @Route("/api/userInfo",name="userInfo", methods={"GET"})
     * @return JsonResponse
     */
    public function userInfo()
    {
        /** @var User $user */
        $user = $this->getUser();

        if ($user) {

            $userInfo = [
                'email' => $user->getEmail(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'imageUrl' => $user->getImageUrl()
            ];
            return new JsonResponse($userInfo);
        }

        return new JsonResponse(['No user was found!']);
    }

    /**
     * @Route("/api/getToken",name="get_token", methods={"POST"})
     * @return JsonResponse
     * @throws \Exception
     */
    public function getTokenUser(JWTTokenManagerInterface $JWTManager, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if (!$user) {
            $timestamp = random_int(1, 2147385600);
            $dt = new DateTime();
            $dt->setTimestamp($timestamp);

            $newUserData = [
                'email' => $data['email'],
                'password' => 'password',
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'imageUrl' => $data['imageUrl'] ? $data['imageUrl'] : '/images/default/default.png',
                'dateOfBirth' => $dt
            ];

            $user = $this->userRepository->createNewUser($newUserData);

            return new JsonResponse(['token' => $JWTManager->create($user)]);


        }

        return new JsonResponse(['token' => $JWTManager->create($user)]);
    }

}