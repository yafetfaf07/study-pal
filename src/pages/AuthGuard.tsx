import { useEffect, useState, type JSX } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate, useLocation } from "react-router";

function AuthGuard({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // If no session, redirect to login
        navigate("/login", { replace: true, state: { from: location } });
      }
      setLoading(false);
    }

    checkSession();

    // listen for changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  if (loading) return <p>Loading...</p>;

  return children;
}

export default AuthGuard;
