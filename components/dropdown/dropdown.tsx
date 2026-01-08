import { useFetchListSites } from '@/hooks/sites/useFetchSite';
import { Site } from '@/interfaces/site';
import { ChevronDown } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import RenderFooter from '../footer/renderFooter';

interface DropdownProps {
    setSite: React.Dispatch<React.SetStateAction<number | null>>;
    site: number | null;
}

const typeConge = [
    {id: 1, nom: "Congé exceptionnel"},
    {id: 2, nom: "Congé maladie"},
    {id: 3, nom: "Congé maternité"},
    {id: 4, nom: "Congé paternité"},
    {id: 5, nom: "Congé de formation"},
    {id: 6, nom: "Congé de sabbatique"},
]

const Dropdown = ({site, setSite}: DropdownProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('');
    const { sites, isFetchingNextPage, handleLoadMore } = useFetchListSites();

    useEffect(() => {
        if (!site) {
            setSelected("")
        }
    }, [site])

    const handleClick = () => {
        setIsActive(!isActive);
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
        setIsActive(false);
    }

    const handleChangeType = (s: Site) => {
        setSite(s.id);
        setSelected(s.site);
        handleClose();
    }

    return (
        <View className='relative w-full'>
            <TouchableOpacity 
                onPress={() => handleClick()} 
                activeOpacity={0.8} 
                style={{
                    borderStyle: 'solid', 
                    borderWidth: 1,
                    borderColor: `${isActive ? '#7E45DC' : "transparent"}`
                }} 
                className='p-4 rounded-xl bg-violet-5/70 w-full flex-row items-center justify-between gap-3'
            >                
                <Text className='text-xl text-gris-12 font-medium'>{ selected || 'Selectionner un site' }</Text>
                <ChevronDown size={24} color={isActive ? '#7E45DC' : '#EEEEF0'} style={{transform: [{rotate: isActive ? '180deg' : '0deg'}]}} />
            </TouchableOpacity>

            {visible && (
                <>
                    <Pressable
                        style={{
                        position: 'absolute',
                        top: -1000,
                        left: -1000,
                        right: -1000,
                        bottom: -1000,
                        zIndex: 40,
                        }}
                        onPress={() => handleClose()}
                    />

                        <FlatList 
                            horizontal={false}
                            data={sites}                    
                            renderItem={({item, index}) => (
                                <Pressable 
                                    key={item.id}
                                    style={{
                                        backgroundColor: item.site === selected ? '#7E45DC' : 'transparent',
                                        marginBottom: index === typeConge.length - 1 ? 8 : 0,
                                        marginTop: index == 0 ? 8 : 0,
                                    }}
                                    className='rounded-lg py-1.5 px-3 w-full mb-1'
                                    onPress={() => handleChangeType(item)}
                                >
                                    <Text className='text-gris-12 text-xl font-medium' >{item.site}</Text>
                                </Pressable>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            className='absolute top-16 left-0 bg-violet-7 rounded-xl px-2 z-50 w-full h-48'
                            ListFooterComponent={<RenderFooter isFetchingNextPage={isFetchingNextPage} />}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}                        
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            removeClippedSubviews={true}
                            updateCellsBatchingPeriod={50}
                        />
                </>
            )}
        </View>
    )
}

export default Dropdown