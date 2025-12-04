// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Store {
    struct Product {
        uint id;
        string name;
        uint price;
        address seller;
        string image;
        bool available;
    }

    uint public productCount;
    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, uint price, address seller);
    event ProductSold(uint id, address buyer);

    function createProduct(string memory _name, uint _price, string memory _image) public {
        require(_price > 0, "El precio debe ser mayor a 0");

        productCount++;
        products[productCount] = Product({
            id: productCount,
            name: _name,
            price: _price,
            seller: msg.sender,
            image: _image,
            available: true
        });

        emit ProductCreated(productCount, _name, _price, msg.sender);
    }

    function buyProduct(uint _id) public payable {
        Product storage product = products[_id];
        require(product.available, "Producto no disponible");
        require(msg.value >= product.price, "Ether insuficiente");

        product.available = false;

        payable(product.seller).transfer(product.price);

        emit ProductSold(_id, msg.sender);
    }
}