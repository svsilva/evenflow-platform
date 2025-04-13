import { useState } from "react";
import InputForm from "../components/InputForm";
import { Button } from "@/components/ui/button";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoDocumento: "",
    documento: "",
    dataNascimento: "",
    telefone: "",
    endereco: {
      rua: "",
      bairro: "",
      numero: "",
      cidade: "",
      estado: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lida com campos do endereço
    if (["rua", "bairro", "numero", "cidade", "estado"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.mensagem || "Erro ao cadastrar usuário");
      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
        <InputForm label="Nome" name="nome" value={form.nome} onChange={handleChange} />
        <InputForm label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputForm label="Senha" type="password" name="senha" value={form.senha} onChange={handleChange} />
        <InputForm label="Tipo de Documento" name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} />
        <InputForm label="Documento" name="documento" value={form.documento} onChange={handleChange} />
        <InputForm label="Data de Nascimento" type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} />
        <InputForm label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} />

        <hr className="my-4" />
        <h2 className="text-lg font-semibold mb-2">Endereço</h2>
        <InputForm label="Rua" name="rua" value={form.endereco.rua} onChange={handleChange} />
        <InputForm label="Bairro" name="bairro" value={form.endereco.bairro} onChange={handleChange} />
        <InputForm label="Número" name="numero" value={form.endereco.numero} onChange={handleChange} />
        <InputForm label="Cidade" name="cidade" value={form.endereco.cidade} onChange={handleChange} />
        <InputForm label="Estado (UF)" name="estado" value={form.endereco.estado} onChange={handleChange} />

        <Button type="submit" className="w-full mt-4">Cadastrar</Button>
      </form>
    </div>
  );
}
