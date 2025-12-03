// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Store {
    uint public productCount = 0;

    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool available;
        string image;
    }

    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, uint price, address seller, string image);
    event ProductPurchased(uint id, address buyer);

    function createProduct(string memory _name, uint _price, string memory _image) public {
        require(_price > 0, "El precio debe ser mayor que 0");
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender), true, _image);
        emit ProductCreated(productCount, _name, _price, msg.sender, _image);
    }

    function buyProduct(uint _id) public payable {
        Product storage product = products[_id];
        require(product.available, "Producto no disponible");
        require(msg.value >= product.price, "No enviaste suficiente ETH");

        product.seller.transfer(msg.value);
        product.available = false;

        emit ProductPurchased(_id, msg.sender);
    }

    function getProductCount() public view returns (uint) {
        return productCount;
    }
}