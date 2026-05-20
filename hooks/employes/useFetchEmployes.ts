import { Utilisateur } from "@/interfaces/utilisateur";
import DEV_API_URL from "@/utils/api";
import { authenticatedRequest } from "@/utils/authUtils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface ListEmployeResponse {
    utilisateurs: Utilisateur[]    
    hasNextPage: boolean,
    status: number
    total: number
}

interface EmployeResponse {
    utilisateur: Utilisateur
    status: number
}

const fetchListEmployes = async (page = 1, limit = 10, recherche?: string): Promise<ListEmployeResponse | null> => {
    return await authenticatedRequest<ListEmployeResponse>({
        url: `${DEV_API_URL}/compte/tous-les-employes/`,
        method: 'GET',
        params: {
            page,
            limit,
            recherche,
        }
    })
}

export const useFetchListEmployes = (recherche?: string) => {
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<ListEmployeResponse | null>({
        queryKey: ['employes', recherche],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => await fetchListEmployes(pageParam as number, 10, recherche),
        getNextPageParam: (lastPage, allPages) => lastPage?.hasNextPage ? allPages.length + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    })

    const employes: Utilisateur[] = data?.pages.flatMap(page => page?.utilisateurs).filter(employe => employe !== undefined) ?? []

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }


    return {
        employes,
        isLoading,
        isFetchingNextPage,
        handleLoadMore,
        refetch,
    }
}

export const useFetchEmploye = (id: number) => {
    const { data, isLoading, refetch, isError } = useQuery<EmployeResponse | null>({
        queryKey: ['employe', id],
        queryFn: async () => await authenticatedRequest<EmployeResponse>({
            url: `${DEV_API_URL}/compte/tous-les-employes/${id}`,
            method: 'GET',
        }),        
        staleTime: 5 * 60 * 1000,
    })

    return {
        employe: data?.utilisateur || null,
        isLoading,
        refetch,
        isError,
    }
}