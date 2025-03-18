import {useLoading} from "@/lib/utils/context/LoadingContext";
import toast from "react-hot-toast";

export const useServerCall = () => {
    const { setLoading } = useLoading();

    const fetchWithLoading = async <T>(
        fetchFn: () => Promise<T>,
        showToast?: boolean
    ): Promise<T> => {
        try {
            setLoading(true);
            const response =  await fetchFn();
            if(showToast) toast.success(`Operazione eseguita con successo`, {duration: 8000});
            return response;
        } catch (error) {
            console.error('Errore nella chiamata al server:', error);
            if(showToast) toast.error(`Errore: controlla i log`, {duration: 8000});
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { fetchWithLoading };
};