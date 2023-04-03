import '@/styles/globals.scss'
import Router, {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import Loader from "@/components/OTHER/Loader";
import Head from "next/head";
import {usePageLoading} from "@/components/OTHER/pageLoad";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";
import Layout from "@/components/layout";

export default function App({Component, pageProps}) {
    const [loading, setLoading] = useState(true);
    const {isPageLoading} = usePageLoading();
    const router = useRouter();
    useEffect(() => {
        router.isReady && setLoading(false);
    }, [router.isReady])
    return (
        <>
            { router.pathname !== "/" ? (
                <Layout>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/BallOnly.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/BallOnly.png"/>
                </Head>
                {isPageLoading ? (
                    <Loader/>
                ) : (
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}>
                        <Component {...pageProps} />
                    </DevSupport>
                )}
            </Layout>
            ) : (
                <>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/BallOnly.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/BallOnly.png"/>
                </Head>
            {isPageLoading ? (
                <Loader/>
                ) : (
                <DevSupport ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}>
                <Component {...pageProps} />
                </DevSupport>
                )}
                </>)
            }
        </>
    );
}
