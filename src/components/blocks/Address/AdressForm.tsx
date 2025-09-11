import { useState } from "react";

const counties = [
  "Stockholms län",
  "Uppsala län",
  "Södermanlands län",
  "Östergötlands län",
  "Jönköpings län",
  "Kronobergs län",
  "Kalmar län",
  "Gotlands län",
  "Blekinge län",
  "Skåne län",
  "Hallands län",
  "Västra Götalands län",
  "Värmlands län",
  "Örebro län",
  "Västmanlands län",
  "Dalarnas län",
  "Gävleborgs län",
  "Västernorrlands län",
  "Jämtlands län",
  "Västerbottens län",
  "Norrbottens län",
];

interface AddressFormProps {
  onSubmit: (data: any) => void;
}

export default function AddressForm({ onSubmit }: AddressFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    street: "",
    postalCode: "",
    city: "",
    county: "",
    country: "Sverige",
  });

  const handleChange = (e) => {
    console.log("EVENT: " + e.target.name, e.target.value);
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(form.postalCode)) {
      alert("Postnummer måste vara 5 siffror.");
      return;
    }
    if (onSubmit) onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-2xl shadow"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Förnamn</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Efternamn</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gatuadress</label>
        <input
          type="text"
          name="street"
          value={form.street}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Postnummer</label>
          <input
            type="text"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            required
            pattern="\d{5}"
            placeholder="12345"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ort</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Län</label>
        <select
          name="county"
          value={form.county}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Välj län</option>
          {counties.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Land</label>
        <input
          type="text"
          name="country"
          value={form.country}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Skicka
      </button>
    </form>
  );
}