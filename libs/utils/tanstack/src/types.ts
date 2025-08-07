export interface OptionsWithCbk<TData, TError> {
    /**
     * This callback will fire any time the query successfully fetches new data.
     */
    onSuccess?: (data: TData) => void;
    /**
     * This callback will fire if the query encounters an error and will be passed the error.
     */
    onError?: (error: TError) => void;
    /**
     * This callback will fire any time the query is either successfully fetched or errors and be passed either the data or error.
     */
    onSettled?: (data: TData | undefined, error: TError | null) => void;
}
