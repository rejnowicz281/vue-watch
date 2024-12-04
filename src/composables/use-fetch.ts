import { onMounted, ref } from "vue";

export function useFetch<T>(fetchFn: () => Promise<{ data: T }>) {
    const data = ref<T | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const doFetch = async () => {
        try {
            const response = await fetchFn();
            data.value = response.data;
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(doFetch);

    return {
        data,
        isLoading,
        error
    };
}
