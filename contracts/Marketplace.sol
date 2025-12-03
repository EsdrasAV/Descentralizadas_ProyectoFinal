// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Store.sol";

contract Marketplace {
    Store store;

    string[] public categories = ["GPU","CPU","RAM","Motherboard","Storage","Power Supply","Cooling","Case","Peripherals"];

    mapping(string => uint[]) public productsByCategory;

    mapping(uint => string) public categoryOfProduct;

    constructor(address storeAddress) {
        store = Store(storeAddress);
    }

    function addProductToCategory(uint _productId, string memory _category) public {
        bool exists = false;
        for(uint i=0; i<categories.length; i++){
            if(keccak256(bytes(categories[i])) == keccak256(bytes(_category))){
                exists = true;
                break;
            }
        }
        require(exists, "Categoria no valida");

        productsByCategory[_category].push(_productId);

        categoryOfProduct[_productId] = _category;
    }

    function getProductsByCategory(string memory _category) public view returns (uint[] memory){
        return productsByCategory[_category];
    }

    function getCategoryOfProduct(uint _productId) public view returns (string memory) {
        return categoryOfProduct[_productId];
    }

    function getCategories() public view returns (string[] memory){
        return categories;
    }
}
