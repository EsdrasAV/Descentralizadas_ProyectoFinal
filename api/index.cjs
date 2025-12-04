const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const axios = require("axios");
const { ethers } = require("ethers");
const findConfig = require("find-config");
const fs = require("fs");

dotenv.config();

const storeJsonPath = findConfig("artifacts/contracts/Store.sol/Store.json");
if (!storeJsonPath) throw new Error("No se encontró Store.json, ejecuta npx hardhat compile");
const storeJson = require(storeJsonPath);

const marketJsonPath = findConfig("artifacts/contracts/Marketplace.sol/Marketplace.json");
if (!marketJsonPath) throw new Error("No se encontró Marketplace.json, ejecuta npx hardhat compile");
const marketJson = require(marketJsonPath);

const app = express();
app.use(express.json());
app.use(cors());
const upload = multer({ dest: "uploads/" });

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const STORE_ADDRESS = process.env.STORE_ADDRESS;
const MARKET_ADDRESS = process.env.MARKET_ADDRESS;

const storeContract = new ethers.Contract(STORE_ADDRESS, storeJson.abi, wallet);
const marketContract = new ethers.Contract(MARKET_ADDRESS, marketJson.abi, wallet);

app.get("/api/products", async (req, res) => {
  try {
    const total = await storeContract.productCount();
    let products = [];

    for (let i = 0; i < total; i++) {
      const p = await storeContract.products(i + 1);

      if (!p.available) continue;

      const category = await marketContract.getCategoryOfProduct(p.id.toNumber());

      products.push({
        id: p.id.toNumber(),
        name: p.name,
        price: ethers.utils.formatEther(p.price),
        seller: p.seller,
        image: p.image,
        available: p.available,
        category: category
      });
    }

    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error al obtener productos" });
  }
});


app.get("/api/products/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const productIds = await marketContract.getProductsByCategory(category);
    let products = [];

    for (let id of productIds) {
      const p = await storeContract.products(id);

      if (!p.available) continue;

      products.push({
        id: p.id.toNumber(),
        name: p.name,
        price: ethers.utils.formatEther(p.price),
        seller: p.seller,
        image: p.image,
        available: p.available
      });
    }

    res.json({ success: true, category, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error al obtener productos por categoría" });
  }
});


const FormData = require("form-data");

app.post("/api/products/add", upload.single("image"), async (req, res) => {
  try {
    const { name, priceEth, category } = req.body;
    const imageFile = req.file;

    if (!imageFile)
      return res.status(400).json({ success: false, message: "Falta la imagen" });

    const formData = new FormData();
    formData.append("file", fs.createReadStream(imageFile.path));

    const ipfsResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );

    const ipfsHash = ipfsResponse.data.IpfsHash;

    fs.unlinkSync(imageFile.path);

    res.json({
      success: true,
      message: "Imagen subida correctamente",
      ipfsHash,
      name,
      priceEth,
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error al subir imagen",
      error: err.message,
    });
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`API Web3 Tienda corriendo en http://localhost:${PORT}`));
