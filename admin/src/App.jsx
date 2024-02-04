import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { themeSettings } from "./theme";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Question from "./pages/Question";
import Answers from "./pages/Answers";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});
const App = () => {
  const theme = useMemo(() => createTheme(themeSettings("dark")), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notification />

        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/question" element={<Question />} />
            <Route path="/answers" element={<Answers />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
