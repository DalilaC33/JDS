import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/nprogress.css";
import NProgress from "nprogress";

import { getLayout, getCookie, retrieveJWT } from "../utils";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import userStore from "../store/userStore";
import StaticPage from "../components/staticPage";
import Script from "next/script";

function MyApp({ Component, pageProps }) {

  const { user, setUser, fetchUser } = userStore();
  const router = useRouter();

  retrieveJWT();
  const Layout = getLayout(Component);

  useEffect(() => {
    !user && !getCookie() && (router.pathname !== "/auth/login") && (router.pathname !== "/conexion") && router.push("/auth/login");
    getCookie() && fetchUser() 
    Router.onRouteChangeStart = () => NProgress.start();
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
  }, []);

  return user || router.pathname === "/auth/login" || router.pathname === "/conexion" ? (
    <Layout>
      <Script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossOrigin="anonymous"
      ></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
        integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
        crossOrigin="anonymous"
      ></Script>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <StaticPage />
  );
}

export default MyApp;
