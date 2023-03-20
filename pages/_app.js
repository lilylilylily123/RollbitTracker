import '@/styles/globals.scss'
import Router, {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import Loader from "@/components/Loader";
import {usePageLoading} from "@/components/pageLoad";
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
    const {isPageLoading} = usePageLoading();
  const router = useRouter();
  useEffect(() => {
    router.isReady && setLoading(false);
  })
  return (
      <>
        {isPageLoading ? (
            <Loader />
        ) : (
            <Component {...pageProps} />
        )}
      </>
  );
}
