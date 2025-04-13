import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // useNavigate para redirecionar
import InputForm from "../components/InputForm";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensagem || "Erro ao fazer login");

      // ✅ Salva token e dados no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert("Login realizado com sucesso!");
      navigate("/dashboard"); // ✅ Redireciona para a rota protegida
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <InputForm label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputForm label="Senha" type="password" name="senha" value={form.senha} onChange={handleChange} />
        <Button type="submit" className="w-full mt-2">Entrar</Button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-600 hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
