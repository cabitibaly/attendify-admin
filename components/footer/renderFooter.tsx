import { ActivityIndicator, View } from "react-native";

const RenderFooter = ({ isFetchingNextPage }: { isFetchingNextPage: boolean }) => {
    if (!isFetchingNextPage) return null;
    return (
        <View className="py-4">
            <ActivityIndicator size="small" color="#EEEEF0" />
        </View>
    );
};

export default RenderFooter;