import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const router = useRouter();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        //console.log("update") 
        const res = await axios.put(
          "/api/products/" + router.query.id,
          product
        );
        toast.success("Product update successfully");
        //console.log(res)
      } else {
        const res = await axios.post("/api/products", product);
        //console.log(res);
        toast.success("Product created successfully");
      }
      router.push("/");
    } catch (error) {
      //console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    //console.log(name, value);
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/products/" + router.query.id);
      setProduct(data);
    };

    if (router.query.id) {
      getProducts(router.query.id);
    }
  }, []);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handlerSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label htmlFor="name">Nombre: </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          className="shadow border rounded px-2 py-3 text-gray-700"
          value={product.name}
        />

        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          name="price"
          id="price"
          onChange={handleChange}
          className="shadow border rounded px-2 py-3 text-gray-700"
          value={product.price}
        />

        <label htmlFor="description">Descripcion: </label>
        <textarea
          name="description"
          id="description"
          rows="2"
          onChange={handleChange}
          className="shadow border rounded px-2 py-3 text-gray-700"
          value={product.description}
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
          {router.query.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
