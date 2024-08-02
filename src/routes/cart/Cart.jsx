import { MdRemoveShoppingCart } from "react-icons/md"; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from "../../redux/actions/action-types";

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  const handleIncrementQuantity = (productId) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: { _id: productId } });
  };

  const handleDecrementQuantity = (productId) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: { _id: productId } });
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="my-5 text-3xl">Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/single-product/${product._id}`} className="flex items-center space-x-4">
                    <img
                      className="w-16 h-16 object-contain bg-gray-300 rounded"
                      src={product.product_images[0]}
                      alt={product.product_name}
                    />
                    <span className="font-medium text-slate-800">{product.product_name}</span>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleDecrementQuantity(product._id)} className="px-2 py-1 border rounded">-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleIncrementQuantity(product._id)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.sale_price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRemoveFromCart(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <MdRemoveShoppingCart />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
