import { Conge } from "@/interfaces/conge"
import DEV_API_URL from "@/utils/api"
import { authenticatedRequest } from "@/utils/authUtils"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

interface ListCongesResponse {
    conges: Conge[]
    hasNextPage: boolean
    status: number
    total: number
}

interface CongeResponse {
    conge: Conge
    status: number
}

const fetchListConges = async (page = 1, limit = 10, statutID?: number, utilisateurID?: number): Promise<ListCongesResponse | null> => {
    return await authenticatedRequest<ListCongesResponse>({
        url: `${DEV_API_URL}/conge/tous-les-conges/`,
        method: 'GET',
        params: {
            page,
            limit,
            statutID,
            utilisateurID
        }
    })
}

export const useFetchListConges = (statutID?: number, utilisateurID?: number) => {
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<ListCongesResponse | null>({
        queryKey: ['conges', statutID, utilisateurID],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => await fetchListConges(pageParam as number, 10, statutID, utilisateurID),
        getNextPageParam: (lastPage, allPages) => lastPage?.hasNextPage ? allPages.length + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    })

    const conges: Conge[] = data?.pages.flatMap(page => page?.conges).filter(conge => conge !== undefined) ?? []

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }

    return {
        conges,
        isLoading,
        isFetchingNextPage,
        handleLoadMore,
        refetch,
    }
}

export const useFetchConge = (id: number) => {
    const { data, isLoading, refetch, isError } = useQuery<CongeResponse | null>({
        queryKey: ['conge', id],
        queryFn: async () => await authenticatedRequest<CongeResponse>({
            url: `${DEV_API_URL}/conge/tous-les-conges/${id}`,
            method: 'GET',
        }),        
        staleTime: 5 * 60 * 1000,
    })

    return {
        conge: data?.conge || null,
        isLoading,
        refetch,
        isError,
    }
}