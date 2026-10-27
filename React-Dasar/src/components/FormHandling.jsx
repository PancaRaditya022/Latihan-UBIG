import { useState } from "react";

export default function Formhandling() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    } else if (form.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form berhasil divalidasi!");
      console.log("Data form:", form);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>

      <table>
        <tr>
          <td>
            <label>Nama</label>
          </td>
          <td>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>{errors.name}</p>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <label>Email</label>
          </td>
          <td>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nama@email.com"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>{errors.email}</p>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <label>Password</label>
          </td>
          <td>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 8 karakter"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <p>{errors.password}</p>
          </td>
          <td></td>
        </tr>
      </table>

      <button type="submit">Daftar</button>
    </form>
  );
}
