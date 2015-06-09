<?php

namespace Zol\TCBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Zol\TCBundle\Entity\Category;
use Zol\TCBundle\Entity\Product;
use Zol\TCBundle\Form\CategoryType;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    
    public function createProductAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        
        $product1 = new Product();
        $product1->setName('test product 1');
        $product2 = new Product();
        $product2->setName('test product 2');
        
        $em->persist($product1);
        $em->persist($product2);
        
        $category = new Category();
        $category->setName('test category 1');
        $category->getProducts()->add($product1);
        $category->getProducts()->add($product2);    
        
        $form = $this->createForm(new CategoryType(), $category);
        
        $form->add('submit', 'submit', array(
            'label' => 'Create',
            'attr' => array('class' => 'btn btn-lg btn-primary btn-block'),
            ));
        
        $form->handleRequest($request);
        
        if ($form->isValid()) {

            $em->persist($category);
            
            try {
                $em->flush();
            } 
            catch (\PDOException $e) {
                if (0 === strpos($e->getCode(), '23')) {
                    return new Response ($e->getMessage());
                }
                else throw $e;
            }
        }
        
        return $this->render('ZolTCBundle:Product:new.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}
