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
use Exception;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{

    /** UserRepository $userRepository */
    private $userRepository;

    /** KernelInterface $appKernel */
    private $appKernel;


    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     * @param KernelInterface $appKernel
     */
    public function __construct(UserRepository $userRepository, KernelInterface $appKernel)
    {
        $this->userRepository = $userRepository;
        $this->appKernel = $appKernel;
    }

    /**
     * @Route("/api/register",name="register", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function register(
        JWTTokenManagerInterface $JWTManager, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if (!$user) {

            $bd = $data['dateOfBirth'];

            $bt = date_create_from_format('Y-m-d', $bd);

            $newUserData = array(
                'email' => $data['email'],
                'password' => $data['password'],
                'firstName' => $data['firstName'],
                'lastName' => $data['lastName'],
                'imageUrl' => $this->savePicture($data['picture'], $data['email']),
                'dateOfBirth' => $data['dateOfBirth'] ? $bt : new DateTime('now')
            );

            $user = $this->userRepository->createNewUser($newUserData);
            return new JsonResponse(['message' => sprintf('User %s was successfully created', $user->getUsername()),
                'token' => $JWTManager->create($user)]);

        }
        return new JsonResponse(['message' => sprintf('User %s is already registered', $user->getUsername())], 409);
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
     * @throws Exception
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

    /**
     * @param $picture
     * @param $email
     * @return string
     */
    private function savePicture($picture, $email)
    {
        $projectRoot = $this->appKernel->getProjectDir() . '\\public\\images\\avatars\\';
        $pictureDecoded = base64_decode(explode(',', $picture)[1]);
        $extension = explode('/', explode(';', explode(',', $picture)[0])[0])[1];
        $pictureLocation = $projectRoot . 'avatar.' . $email . '.' . $extension;
        $pictureUrl = '/images/avatars/' . 'avatar.' . $email . '.' . $extension;


        if (!is_dir($projectRoot)) {

            if (!mkdir($projectRoot) && !is_dir($projectRoot)) {
                throw new RuntimeException(sprintf('Directory "%s" was not created', $projectRoot));
            }
        }

        if (file_put_contents($pictureLocation, $pictureDecoded)) {
            return $pictureUrl;
        }

        return '/images/default/default.png';

    }

}