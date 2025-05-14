import { Colors } from "@/constants/Colors";
import axios from "@/utils/api";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface FollowUpModalProps {
    visible: boolean;
    onClose: () => void;
    doctorId: number | null;
    patientId: number;
    isViewOnly?: boolean;
}

export default function FollowUpModal({
    visible,
    onClose,
    doctorId,
    patientId,
}: FollowUpModalProps) {
    const [reason, setReason] = useState<string>("");
    const [followUpDate, setFollowUpDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);

    useEffect(() => {
        if (visible) {
            setReason("");
            setFollowUpDate(new Date());
            setShowPicker(false);
        }
    }, [visible]);

    const handleSave = async () => {
        if (!doctorId) return;
        try {
            await axios.post("/followup", {
                doctor_id: doctorId,
                patient_id: patientId,
                reason,
                status: "pending",
                follow_up_datetime: followUpDate.toISOString(),
            });
            onClose();
        } catch (error) {
            console.error("Error saving follow-up:", error);
        }
    };
    const showAndroidPicker = () => {
        DateTimePickerAndroid.open({
            value: followUpDate,
            onChange: onDateChange,
            mode: "datetime",
            is24Hour: false, // or true, your preference
        });
    };
    const onDateChange = (
        event: any,
        selectedDate?: Date | undefined
    ) => {
        if (Platform.OS === 'android') {
            // Android always closes the picker after selection or cancel
            setShowPicker(false);

            if (event?.type === "set" && selectedDate) {
                setFollowUpDate(selectedDate);
            }

            // Do nothing if "dismissed"
        } else {
            // On iOS, DateTimePicker stays visible, so update immediately
            if (selectedDate) {
                setFollowUpDate(selectedDate);
            }
        }
    };

    const formattedDate = followUpDate.toLocaleString();

    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <BlurView intensity={50} tint="dark" style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity style={styles.circle} onPress={onClose}>
                                <Text style={styles.closeText}>×</Text>
                            </TouchableOpacity>

                            <Text style={styles.title}>Schedule Follow-Up</Text>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Reason</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter follow-up reason"
                                    placeholderTextColor="#ccc"
                                    value={reason}
                                    onChangeText={setReason}
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Date & Time</Text>
                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={() => {
                                        if (Platform.OS === "android") {
                                            showAndroidPicker();
                                        } else {
                                            // on iOS we still render our inline picker
                                            setShowPicker(true);
                                        }
                                    }}
                                >
                                    <Text style={styles.inputText}>{formattedDate}</Text>
                                </TouchableOpacity>

                                {/* iOS-only inline picker */}
                                {Platform.OS === "ios" && showPicker && (
                                    <DateTimePicker
                                        value={followUpDate}
                                        mode="datetime"
                                        display="inline"
                                        onChange={onDateChange}
                                    />
                                )}
                            </View>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </BlurView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: Colors.dark.primary,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        maxHeight: "90%",
        position: "relative",
    },
    circle: {
        position: "absolute",
        top: -10,
        right: -10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    closeText: {
        fontSize: 18,
        color: Colors.dark.primary,
        fontWeight: "bold",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.dark.background,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        justifyContent: "center",
    },
    inputText: {
        color: "#000",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },
    saveButtonText: {
        color: Colors.dark.primary,
        fontWeight: "bold",
        fontSize: 16,
    },
});
