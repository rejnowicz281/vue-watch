import { ref } from "vue";

export function useAsync(asyncFn: () => Promise<any>) {
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const doFetch = async () => {
        try {
            isLoading.value = true;
            error.value = null;

            await asyncFn();
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    doFetch();

    return {
        isLoading,
        error,
        doFetch
    };
}
