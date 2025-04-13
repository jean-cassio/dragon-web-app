import styles from "./Home.module.css";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import api from "@/services/api";

import LoadingScreen from "@/components/LoadingScreen";
import PrimaryButton from "@/components/PrimaryButton";
import Table from "@/components/Table";
import PageHeader from "@/components/PageHeader";
import { toast } from "react-toastify";

const columns = [
  { key: "name", label: "Nome" },
  { key: "actions", label: "Ações" },
];

const Home = () => {
  const [dragonsList, setDragonsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getDragons = useCallback(async () => {
    setLoading(true);
    setDragonsList([]);

    try {
      const { data: response, status } = await api.get();

      if (status !== 200) throw new Error();

      const dragonsLog = response
        .map((item) => ({
          id: item?.id,
          name: item?.name || "-",
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setDragonsList(dragonsLog);
    } catch {
      toast.error("Erro ao buscar dragões");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDragon = useCallback(async (id) => {
    setLoading(true);

    try {
      const { status } = await api.delete(`/${id}`);

      if (status !== 200) throw new Error();

      setDragonsList((prev) => prev.filter((dragon) => dragon.id !== id));

      toast.success("Dragão excluído com sucesso");
    } catch {
      toast.error("Erro ao deletar dragão");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDragons();
  }, [getDragons]);

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <PageHeader
            title="Lista de Dragões"
            buttonText="Cadastrar Novo Dragão"
            route="/register"
          />

          {dragonsList.length ? (
            <Table
              columns={columns}
              data={dragonsList}
              renderCell={(value, key, row) => {
                if (key === "actions") {
                  return (
                    <div className={styles.actions}>
                      <PrimaryButton
                        bgColor="var(--light-blue)"
                        borderColor="var(--light-blue)"
                        borderHoverColor="var(--dark-blue)"
                        onClick={() => navigate(`/details/${row.id}`)}
                      >
                        Ver
                      </PrimaryButton>
                      <PrimaryButton
                        bgColor="var(--yellow)"
                        borderColor="var(--yellow)"
                        borderHoverColor="var(--orange)"
                        onClick={() => navigate(`/register/${row.id}`)}
                      >
                        Editar
                      </PrimaryButton>
                      <PrimaryButton
                        bgColor="var(--light-red)"
                        borderColor="var(--light-red)"
                        borderHoverColor="var(--dark-red)"
                        onClick={() => deleteDragon(row.id)}
                      >
                        Excluir
                      </PrimaryButton>
                    </div>
                  );
                }
                return value;
              }}
            />
          ) : (
            <span>Nenhum dragão encontrado...</span>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
