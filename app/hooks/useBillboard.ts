import useSWR from "swr";
import fetcher from "@/app/libs/fetcher";

const useBillboard = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useBillboard;