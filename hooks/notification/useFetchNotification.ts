import { Notif } from "@/interfaces/notif"
import DEV_API_URL from "@/utils/api"
import { authenticatedRequest } from "@/utils/authUtils"
import { useInfiniteQuery } from "@tanstack/react-query"

interface ListNotifResponse {
    status: number
    hasNextPage: boolean    
    notifications: Notif[]
}

const fetchListNotification = async (page = 1, limit = 10): Promise<ListNotifResponse | null> => {
    return await authenticatedRequest<ListNotifResponse>({
        url: `${DEV_API_URL}/notification/toutes-les-notifications`,
        method: 'GET',
        params: {
            page,
            limit,
        }
    })
}

export const useFetchListNotification = (page = 1, limit = 10) => {
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<ListNotifResponse | null>({
        queryKey: ['notifications', page],
        initialPageParam: 1,
        queryFn: async ({pageParam}) => await fetchListNotification(pageParam as number, 10),
        getNextPageParam: (lastPage, allPages) => lastPage?.hasNextPage ? allPages.length + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    })

    const notifications: Notif[] = data?.pages.flatMap(page => page?.notifications).filter(notification => notification !== undefined) ?? []

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }

    const hasNoReadNotifications = notifications.some(notification => !notification.estLu)

    return {
        notifications,
        isLoading,
        isFetchingNextPage,
        handleLoadMore,
        hasNoReadNotifications,
        refetch,
    }
}