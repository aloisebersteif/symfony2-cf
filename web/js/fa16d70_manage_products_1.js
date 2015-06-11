var $collectionHolder;

// Setup an "add a product" link
var $addProdLink = $('<a href="#" class="add_prod_link">Add a product</a>');
var $newLinkLi = $('<div></div>').append($addProdLink);
var $removeFormA = $('<a class="remove_product" onclick="var x = \n\
this.parentNode;x.parentNode.removeChild(x);" href="#">remove</a>');

jQuery(document).ready(function() {
    // Get the ul that holds the collection of products
    $collectionHolder = $('ul.products');

    // Add the "add a product" anchor and li to the products ul
    $collectionHolder.append($newLinkLi);

    // Count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addProdLink.on('click', function(e) {
        // Prevent the link from creating a "#" on the URL
        e.preventDefault();

        // add a new product form (see next code block)
        addProductForm($collectionHolder, $newLinkLi);
    });
    
    $prodFormLi = $collectionHolder.find('li');
    $prodFormLi.append($removeFormA);
    
});

function addProductForm($collectionHolder, $newLinkLi) {
    
    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // Get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a product" link li
    var $newFormLi = $('<li></li>').append(newForm);
    
    $newLinkLi.before($newFormLi);
    
    // Identify remove links, which are to be updated
    var $RemoveProductLinks = $collectionHolder.find('li a')
    
    // Delete all 'remove' links
    $RemoveProductLinks.remove();
    
    // Find all li inside .products
    var $ProductLi = $collectionHolder.find('li');
    
    // Add remove links to every field
    $ProductLi.append($removeFormA);
}