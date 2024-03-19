export const raiseHandColumns = [
  {
    field: "user",
    headerName: "Player Name",
    cellClassName: "test-3",
    renderCell: (params) => `${params.value.name} (${params.value.id})`,
    flex: 0.9,
  },
  {
    field: "type",
    headerName: "Scheme Type",
    cellClassName: "test-4",
    flex: 0.4,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "dateTime",
    flex: 0.3,
    valueGetter: ({ value }) => new Date(value),
  },
];

export const answerColumns = [
  {
    field: "id",
    headerName: "Number",
    filterable: false,
    cellClassName: "test",
    renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.row._id) + 1,
  },
  {
    field: "question",
    headerName: "Question",
    renderCell: (params) => {
      console.log(params);
      return params?.row?.type === "img"
        ? "Image Question"
        : params?.row?.question;
    },
    cellClassName: "test",
    flex: 1,
  },
  {
    field: "answer",
    headerName: "Answer",
    cellClassName: "test-2",
    flex: 0.4,
  },
];
