import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SingleProduct = () => {
  const { productId } = useParams();
  const [data, loading] = useFetch(`/notifications/all`);

  console.log(data);
  

  return (
    // <div className="max-w-[1200px] mx-auto py-20">
    //   <div className="flex flex-col sm:flex-row gap-10">
    //     <img
    //       className="w-full sm:w-1/2 h-64 object-contain bg-gray-300 rounded-md"
    //       src={data?.product_images[0]}
    //       alt={data?.product_name}
    //     />
    //     <div className="flex flex-col sm:w-1/2">
    //       <h1 className="text-2xl font-bold">{data.product_name}</h1>
    //       <p className="mt-2 text-gray-700">{data.description}</p>
    //       <p className="mt-4 text-lg font-semibold">${data.sale_price}</p>
    //     </div>
    //   </div>
    // </div>
    <div>dfgds</div>
  );
};

export default SingleProduct;
