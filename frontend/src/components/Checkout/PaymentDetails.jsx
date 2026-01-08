const PaymentDetails = ({ form, setForm, errors }) => {
  return (
    <section className="bg-white rounded-xl border overflow-hidden">
      <Header icon="credit_card" title="Payment Details" />

      {/* METHOD SWITCH */}
      <div className="p-6 flex gap-4">
        <Method
          active={form.paymentMethod === "card"}
          label="Credit Card"
          onClick={() => setForm({ ...form, paymentMethod: "card" })}
        />

        <Method
          active={form.paymentMethod === "paypal"}
          label="PayPal"
          onClick={() => setForm({ ...form, paymentMethod: "paypal" })}
        />
      </div>

      {/* CARD FORM */}
      {form.paymentMethod === "card" && (
        <div className="p-6 grid grid-cols-2 gap-5">
          <Input span label="Card Number"
            value={form.cardNumber}
            error={errors.cardNumber}
            onChange={v => setForm({ ...form, cardNumber: v })} />

          <Input label="MM / YY"
            value={form.expiry}
            error={errors.expiry}
            onChange={v => setForm({ ...form, expiry: v })} />

          <Input label="CVC"
            value={form.cvc}
            error={errors.cvc}
            onChange={v => setForm({ ...form, cvc: v })} />
        </div>
      )}

      {/* PAYPAL */}
      {form.paymentMethod === "paypal" && (
        <div className="p-6 text-sm text-slate-500">
          You will be redirected to PayPal to complete payment.
        </div>
      )}
    </section>
  );
};

export default PaymentDetails;
