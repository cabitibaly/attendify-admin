import { Pointage } from "@/interfaces/pointage"
import DEV_API_URL from "@/utils/api"
import { authenticatedRequest } from "@/utils/authUtils"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

interface Stats { 
    absent: number
    present: number
    retard: number
    tauxPresence: number
    tauxAbsence: number
}

interface StatsResponse extends Stats {    
    status: number
}

interface PointageResponse {
    hasNextPage: boolean
    pointages: Pointage[]
    status: number
    total: number
}

export const useFetchStats = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['stats'],
        queryFn: async () =>{
            const data = await authenticatedRequest<StatsResponse>({
                url: `${DEV_API_URL}/pointage/stats`,
                method: 'GET',
            })

            return data
        },
        staleTime: 5 * 60 * 1000,
    })

    return {
        stats: data || undefined,
        isLoading,
        isError,
    }
}

const fetchPointages = async (
    page = 1, 
    limit = 10,
    aujourdhui = true,
    date?: string,
    utilisateurID?: number,
): Promise<PointageResponse | null> => {
    return await authenticatedRequest<PointageResponse>({
        url: `${DEV_API_URL}/pointage/tous-les-pointages`,
        method: 'GET',
        params: {
            page,
            limit,
            aujourdhui,
            date,
            utilisateurID,
        }
    })
}

export const useFetchPointage = (aujourdhui = true, date?: string, utilisateurID?: number) => {    

    const { data, isLoading, hasNextPage,  isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<PointageResponse | null>({
        queryKey: ['pointages', aujourdhui, date, utilisateurID],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => fetchPointages(pageParam as number, 10, aujourdhui, date, utilisateurID),
        getNextPageParam: (lastPage, allPages) => lastPage?.hasNextPage ? allPages.length + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    })

    const pointages: Pointage[] =  
        data?.pages.flatMap(page => page?.pointages)
        .filter(pointage => pointage !== undefined) ?? []

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }

    return {
        pointages,
        isLoading,
        isFetchingNextPage,        
        handleLoadMore,
        refetch,
    }
}