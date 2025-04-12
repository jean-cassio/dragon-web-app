import styles from "./Details.module.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Card from "@/components/Card";
import LoadingScreen from "@/components/LoadingScreen";
import PageHeader from "@/components/PageHeader";

import api from "@/services/api";

const Details = () => {
  const [dragon, setDragon] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchDragon = useCallback(
    async (id) => {
      setIsLoading(true);
      setDragon({});

      try {
        const { data, status } = await api.get(`/${id}`);

        if (status !== 200) throw new Error();

        setDragon({
          name: data?.name || "-",
          type: data?.type || "-",
          createdAt: new Date(data?.createdAt).toLocaleString("pt-br") || "-",
          histories: Array.isArray(data?.histories)
            ? data.histories.length > 0
              ? data.histories.join(". ")
              : "-"
            : typeof data?.histories === "string" &&
              data.histories.trim() !== ""
            ? data.histories
            : "-",
        });
      } catch (error) {
        console.log(error);
        toast.error("Erro ao buscar dragão");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
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
            title={id ? "Visualizando Dragão" : "Inserindo Dragão"}
            buttonText="Voltar"
            route="/"
          />
          <Card borderColor="var(--light-green)">
            <div>
              <div className={styles.field}>
                <strong>Criado em:</strong> {dragon?.createdAt}
              </div>
              <div className={styles.field}>
                <strong>Nome:</strong> {dragon?.name}
              </div>
              <div className={styles.field}>
                <strong>Tipo:</strong> {dragon?.type}
              </div>
              <div className={styles.field}>
                <strong>Histórias:</strong> {dragon?.histories}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default Details;
