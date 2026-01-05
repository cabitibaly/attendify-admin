import { X } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
    error: ({ text1, text2 }: CustomToastProps) => (
        <View style={{width: "93%", backgroundColor: "rgba(255, 20, 116, 0.9)", borderRadius: 12}} className="flex-col items-start justify-start gap-2 p-4">
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8
                }}                
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 8
                    }}
                >
                    <View 
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "12%",
                            backgroundColor: "#7E45DC",                        
                        }}
                    />
                    <Text style={{color: "#EEEEF0", fontSize: 16, fontWeight: "600"}}>ATTENDIFY</Text>   
                </View>

                <TouchableOpacity onPress={() => Toast.hide()} activeOpacity={0.8}>
                    <X size={24} color={"#EEEEF0"}/>
                </TouchableOpacity>             
            </View>
            <View
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1
                }}
            >
                {text1 && (
                    <Text style={{color: "#EEEEF0", fontSize: 16, fontWeight: "600"}}>
                        {text1}
                    </Text>
                )}
                {text2 && <Text style={{ color: '#EEEEF0', fontSize: 14, fontWeight: 'regular' }}>{text2}</Text>}
            </View>            
        </View>
    ),
    info: ({ text1, text2 }: CustomToastProps) => (
        <View style={{width: "93%", backgroundColor: "rgba( 67, 0, 255, 0.8)", borderRadius: 12}} className="flex-col items-start justify-start gap-2 p-4">
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8
                }}                
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 8
                    }}
                >
                    <View 
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "12%",
                            backgroundColor: "#7E45DC",                        
                        }}
                    />
                    <Text style={{color: "#EEEEF0", fontSize: 16, fontWeight: "600"}}>ATTENDIFY</Text>   
                </View>

                <TouchableOpacity onPress={() => Toast.hide()} activeOpacity={0.8}>
                    <X size={24} color={"#EEEEF0"}/>
                </TouchableOpacity>             
            </View>
            <View
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1
                }}
            >
                {text1 && (
                    <Text style={{color: "#EEEEF0", fontSize: 16, fontWeight: "600"}}>
                        {text1}
                    </Text>
                )}
                {text2 && <Text style={{ color: '#EEEEF0', fontSize: 14, fontWeight: 'regular' }}>{text2}</Text>}
            </View>            
        </View>
    ),
    success: ({ text1, text2 }: CustomToastProps) => (
        <View style={{width: "93%", backgroundColor: "rgba(117, 65, 205, 0.9)", borderRadius: 12}} className="flex-col items-start justify-start gap-2 p-4">
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8
                }}                
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 8
                    }}
                >
                    <View 
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "12%",
                            backgroundColor: "#7E45DC",                        
                        }}
                    />
                    <Text style={{color: "#EEEEF0", fontSize: 16, fontWeight: "600"}}>ATTENDIFY</Text>   
                </View>

                <TouchableOpacity onPress={() => Toast.hide()} activeOpacity={0.8}>
                    <X size={24} color={"#EEEEF0"}/>
                </TouchableOpacity>             
            </View>
            <View
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 1
                }}
            >
                {text1 && (
                    <Text style={{color: "#EEEEF0", fontSize: 16, fontWeight: "600"}}>
                        {text1}
                    </Text>
                )}
                {text2 && <Text style={{ color: '#EEEEF0', fontSize: 14, fontWeight: 'regular' }}>{text2}</Text>}
            </View>            
        </View>
    )
};

export default toastConfig;