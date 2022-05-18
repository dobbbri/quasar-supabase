export default function useConfig() {
  const config = {
    table: {
      rowsPerPageLabel: "registros por página",
      noDataLabel: "Nenhum registrto disponível",
      class: "col-12",
      flat: true,
      pagination: { rowsPerPage: "9" },
      rowKey: "id",
    },
  };

  return { config };
}
