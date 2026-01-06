import { useOutletContext } from "react-router-dom";

const Checkout = () => {
  const { cart } = useOutletContext();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.map(item => (
        <div key={item.id} className="flex justify-between border-b py-4">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
