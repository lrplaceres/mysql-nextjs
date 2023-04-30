import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function ProductPage({ product }) {
  //console.log(product)

  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/products/" + id);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <button
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
        onClick={() => handleDelete(product.id)}
      >
        delete
      </button>
      <button
        className="bg-gray-600 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded"
        onClick={() => router.push("/products/edit/" + product.id)}
      >
        edit
      </button>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    "http://localhost:3000/api/products/" + context.query.id
  );
  // console.log(res.data);

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
