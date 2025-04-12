import styles from "./Register.module.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "@/components/Input";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import LoadingScreen from "@/components/LoadingScreen";
import PageHeader from "@/components/PageHeader";

import api from "@/services/api";
import Textarea from "@/components/Textarea";

const Register = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [histories, setHistories] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDragon = useCallback(
    async (id) => {
      setIsLoading(true);

      try {
        const { data, status } = await api.get(`/${id}`);

        if (status !== 200) throw new Error();

        setName(data?.name || "");
        setType(data?.type || "");
        setHistories(
          Array.isArray(data?.histories)
            ? data.histories.length > 0
              ? data.histories.join(". ")
              : ""
            : typeof data?.histories === "string" &&
              data.histories.trim() !== ""
            ? data.histories
            : ""
        );
      } catch {
        toast.error("Erro ao buscar dragão");
        navigate("/register");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const createDragon = useCallback(async () => {
    setIsLoading(true);

    try {
      const { status } = await api.post("/", {
        name: name.trim(),
        type: type.trim(),
        histories: histories
          .split(".")
          .map((history) => history.trim())
          .filter(Boolean),
      });

      if (status !== 201) throw new Error();

      toast.success("Dragão criado com sucesso");
      navigate("/");
    } catch {
      toast.error("Erro ao criar dragão");
    } finally {
      setIsLoading(false);
    }
  }, [name, type, histories, navigate]);

  const updateDragon = useCallback(
    async (id) => {
      setIsLoading(true);

      try {
        const { status } = await api.put(`/${id}`, {
          name: name.trim(),
          type: type.trim(),
          histories: histories
            .split(".")
            .map((history) => history.trim())
            .filter(Boolean),
        });

        if (status !== 200) throw new Error();

        toast.success("Dragão atualizado com sucesso");

        fetchDragon(id);
      } catch {
        toast.error("Erro ao atualizar dragão");
      } finally {
        setIsLoading(false);
      }
    },
    [name, type, histories, fetchDragon]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (id) {
        updateDragon(id);
      } else {
        createDragon();
      }
    },
    [id, updateDragon, createDragon]
  );

  useEffect(() => {
    if (!id) return;
    fetchDragon(id);
  }, [id, fetchDragon]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <PageHeader
            title={id ? "Editando Dragão" : "Inserindo Novo Dragão"}
            buttonText="Voltar"
            route="/"
          />
          <Card borderColor="var(--light-green)">
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="name"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="text"
                id="type"
                label="Tipo"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
              <Textarea
                id="histories"
                label="Histórias"
                value={histories}
                onChange={(e) => setHistories(e.target.value)}
                required
              />

              <PrimaryButton type="submit" maxWidth="200px">
                {id ? "Salvar" : "Criar"}
              </PrimaryButton>
            </form>
          </Card>
        </>
      )}
    </div>
  );
};

export default Register;
