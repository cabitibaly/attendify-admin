import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, ReactNode, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';

export interface CustomBottomSheetProps {
    children: ReactNode;
    snapPoints?: (string | number)[];
    enablePanDownToClose?: boolean;
    backdropComponent?: boolean;
    onClose?: () => void;
}

export interface CustomBottomSheetRef {
    close: () => void;
    open: () => void;
    snapToIndex: (index: number) => void;
}

const CustomBottomSheet = forwardRef<CustomBottomSheetRef, CustomBottomSheetProps>(({
    children,
    snapPoints = ['60%', '90%'],
    enablePanDownToClose = true,
    backdropComponent = true,
    onClose,
}, ref) => {    

    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRef.current?.present(),
        close: () => bottomSheetRef.current?.dismiss(),
        snapToIndex: (index: number) => bottomSheetRef.current?.snapToIndex(index),
    }));

    const snapPointsMemo = useMemo(() => snapPoints, [snapPoints])

    const renderBackDrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.3}
        />
    )

    return (        
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPointsMemo}
            enablePanDownToClose={enablePanDownToClose}
            backdropComponent={backdropComponent ? renderBackDrop : undefined}
            onDismiss={onClose}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
        >
            {children}                            
        </BottomSheetModal>
    )
})

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#EEEEF0',
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
    },
    handleIndicator: {
        backgroundColor: '#D1D5DB',
        borderRadius: 100,
        width: 48,
        height: 5,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
})

CustomBottomSheet.displayName = 'CustomBottomSheet'

export default CustomBottomSheet