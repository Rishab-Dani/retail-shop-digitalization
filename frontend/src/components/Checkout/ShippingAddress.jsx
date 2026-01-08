const ShippingAddress = ({ form, setForm, errors }) => {
  const update = (field, value) =>
    setForm({ ...form, [field]: value });

  return (
    <section className="bg-white rounded-xl border overflow-hidden">
      <Header icon="location_on" title="Shipping Address" />

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="First Name" value={form.firstName}
          onChange={v => update("firstName", v)}
          error={errors.firstName} />

        <Input label="Last Name" value={form.lastName}
          onChange={v => update("lastName", v)}
          error={errors.lastName} />

        <Input label="Address" span value={form.address}
          onChange={v => update("address", v)}
          error={errors.address} />

        <Input label="City" value={form.city}
          onChange={v => update("city", v)} />

        <Input label="Postal Code" value={form.postalCode}
          onChange={v => update("postalCode", v)} />
      </div>
    </section>
  );
};

export default ShippingAddress;
