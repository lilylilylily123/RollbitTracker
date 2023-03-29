import '@/styles/globals.scss'
import Router, {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import Loader from "@/components/Loader";
import {usePageLoading} from "@/components/pageLoad";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

export default function App({Component, pageProps}) {
    const [loading, setLoading] = useState(true);
    const {isPageLoading} = usePageLoading();
    const router = useRouter();
    useEffect(() => {
        router.isReady && setLoading(false);
    })
    return (
        <>
            {isPageLoading ? (
                <Loader/>
            ) : (
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <Component {...pageProps} />
                </DevSupport>
            )}
        </>
    );
}
