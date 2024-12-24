import { useSearchParams } from "react-router-dom";

/**
 * A custom hook to manage and update URL search parameters while preserving existing ones.
 * @returns {[URLSearchParams, Function]} - The current search parameters and a function to update them.
 */
export const useUpdatedSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (newParams: { [key: string]: string }) => {
        const updatedParams = new URLSearchParams(searchParams); // Clone existing params
        Object.entries(newParams).forEach(([key, value]) => {
            updatedParams.set(key, value); // Update or add the new param
        });
        setSearchParams(updatedParams);
    };

    return [searchParams, updateSearchParams] as const;
};
