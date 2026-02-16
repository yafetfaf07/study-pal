// routes.tsx
import { createBrowserRouter, Navigate } from "react-router";
import SignUpPage from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Groups from "@/pages/groups";
import ProtectedRoute from "./protectedRoute"
import QuizPage from "@/pages/quizpage";
import LeaderBoard from "@/pages/leaderboard";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />, // default route
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/groups/:id",
    element: (
      <ProtectedRoute>
        <Groups />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <SignUpPage />,
  },
  {
    path: "/groups/:id/quiz/:quizId",
    element: (
      <ProtectedRoute>
        <QuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/groups/:id/leaderboard",
    element: (
      <ProtectedRoute>
        <LeaderBoard />
      </ProtectedRoute>
    ),
  },
]);

export default routes;
