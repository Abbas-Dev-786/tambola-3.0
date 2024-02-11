export const raiseHandColumns = [
  {
    field: "user",
    headerName: "Player Name",
    renderCell: (params) => `${params.value.name} (${params.value.id})`,
    flex: 0.5,
  },
  {
    field: "type",
    headerName: "Scheme Type",
    flex: 0.5,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "dateTime",
    flex: 0.5,
    valueGetter: ({ value }) => new Date(value),
  },
];
