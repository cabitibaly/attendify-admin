import { Site } from "@/interfaces/site"
import DEV_API_URL from "@/utils/api"
import { authenticatedRequest } from "@/utils/authUtils"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

interface ListSitesResponse {
    sites: Site[]
    hasNextPage: boolean
    status: number
    total: number
}

interface SiteResponse {
    site: Site
    status: number
}

const fetchListSites = async (page = 1, limit = 10, recherche?: string): Promise<ListSitesResponse | null> => {
    return await authenticatedRequest<ListSitesResponse>({
        url:  `${DEV_API_URL}/site/tous-les-sites/`,
        method: 'GET',
        params: {
            page,
            limit,
            recherche,
        }
    })
}

export const useFetchListSites = (recherche?: string) => {
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<ListSitesResponse | null>({
        queryKey: ['sites', recherche],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => await fetchListSites(pageParam as number, 10, recherche),
        getNextPageParam: (lastPage, allPages) => lastPage?.hasNextPage ? allPages.length + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    })

    const sites: Site[] = data?.pages.flatMap(page => page?.sites).filter(site => site !== undefined) ?? []

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }

    return {
        sites,
        isLoading,
        isFetchingNextPage,
        handleLoadMore,
        refetch,
    }
}

export const useFetchSite = (id: number) => {
    const { data, isLoading, refetch, isError } = useQuery<SiteResponse | null>({
        queryKey: ['site', id],
        queryFn: async () => await authenticatedRequest<SiteResponse>({
            url: `${DEV_API_URL}/site/${id}`,
            method: 'GET',
        }),        
        staleTime: 5 * 60 * 1000,
    })

    return {
        site: data?.site || null,
        isLoading,
        refetch,
        isError,
    }
}