// PaymentForm.jsx
import {type ChangeEvent, type FormEvent, useState} from "react";

interface PaymentFormProps {
  onSubmit: (data: any) => void;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Auto-format card number
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16); // digits only, max 16
      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // group in 4s
    }

    // Auto-format expiry MM/YY
    if (name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    }

    // CVC max length
    if (name === "cvc") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(form.cardNumber)) {
      alert("Ogiltigt kortnummer");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      alert("Ogiltigt utgångsdatum (MM/YY)");
      return;
    }
    if (!/^\d{3,4}$/.test(form.cvc)) {
      alert("Ogiltig CVC");
      return;
    }

    if (onSubmit) onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-2xl shadow"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Namn på kortet</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kortnummer</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Giltig till</label>
          <input
            type="text"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <input
            type="text"
            name="cvc"
            value={form.cvc}
            onChange={handleChange}
            placeholder="123"
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Betala
      </button>
    </form>
  );
}
