// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Store.sol";

contract Marketplace {
    Store store;

    string[] public categories = [
        "GPU","CPU","RAM","Motherboard","Storage",
        "Power Supply","Cooling","Case","Peripherals"
    ];

    mapping(string => uint[]) private productsByCategory;
    mapping(uint => string) private categoryOfProduct;

    constructor(address storeAddress) {
        store = Store(storeAddress);
    }

    function addProductToCategory(uint _productId, string memory _category) public {
        require(isValidCategory(_category), "Categoria no valida");

        productsByCategory[_category].push(_productId);
        categoryOfProduct[_productId] = _category;
    }

    function isValidCategory(string memory _category) public view returns (bool) {
        for (uint i = 0; i < categories.length; i++) {
            if (keccak256(bytes(categories[i])) == keccak256(bytes(_category))) {
                return true;
            }
        }
        return false;
    }

    function getProductsByCategory(string memory _category) public view returns (uint[] memory) {
        return productsByCategory[_category];
    }

    function getAvailableProductsByCategory(string memory _category) public view returns (uint[] memory) {
    uint[] storage allIds = productsByCategory[_category];
    uint count = 0;

    for (uint i = 0; i < allIds.length; i++) {
        (
            uint id,
            string memory name,
            uint price,
            address seller,
            string memory image,
            bool available
        ) = store.products(allIds[i]);

        if (available) count++;
    }

    uint[] memory availableIds = new uint[](count);
    uint index = 0;

    for (uint i = 0; i < allIds.length; i++) {
        (
            uint id,
            string memory name,
            uint price,
            address seller,
            string memory image,
            bool available
        ) = store.products(allIds[i]);

        if (available) {
            availableIds[index] = id;
            index++;
        }
    }

    return availableIds;
}

    function getCategoryOfProduct(uint _productId) public view returns (string memory) {
        return categoryOfProduct[_productId];
    }

    function getCategories() public view returns (string[] memory) {
        return categories;
    }
}
