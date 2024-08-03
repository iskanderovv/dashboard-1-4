import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, loading, error] = useFetch(`/product/single-product/${id}`);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!selectedImage && data) {
    setSelectedImage(data.product_images[0]);
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      {loading ? loading : (
        <div className="max-w-[1200px] mx-auto py-20 flex flex-col sm:flex-row">
          <div className="flex sm:flex-row gap-10">
            <div className="flex flex-col gap-4">
              {data?.product_images.map((image, index) => (
                <img
                  key={index}
                  className={`w-20 h-20 object-cover bg-gray-300 rounded-md cursor-pointer ${image === selectedImage ? "border-2 border-blue-500" : ""
                    }`}
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>

            <img
              className="w-full sm:w-1/2 h-auto object-contain bg-gray-300 rounded-md"
              src={selectedImage}
              alt={data?.product_name}
            />
          </div>

          <div className="flex flex-col sm:w-1/2 mt-10 sm:mt-0">
            <h1 className="text-2xl font-bold">{data?.product_name}</h1>
            <p className="mt-2 text-gray-700">{data?.description}</p>
            <p className="mt-4 text-lg font-semibold">${data?.sale_price}</p>

            <div className="mt-4">
              <p><strong>Likes:</strong> {data?.likes}</p>
              <p><strong>In Stock:</strong> {data?.number_in_stock}</p>
              <p><strong>Category:</strong> {data?.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
