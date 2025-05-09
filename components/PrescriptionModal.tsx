import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Prescription {
  medication: string;
  quantity: number | string;
}

interface PrescriptionModalProps {
  visible: boolean;
  onClose: () => void;
  prescriptions: Prescription[];
  noteText: string;
}

export default function PrescriptionModal({
  visible,
  onClose,
  prescriptions,
  noteText,
}: PrescriptionModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView intensity={50} tint="dark" style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.circle} onPress={onClose}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Prescription</Text>

              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Title</Text>
                <Text style={styles.headerText}>Qty</Text>
              </View>

              <ScrollView>
                {prescriptions.map((item, idx) => (
                  <View style={styles.tableRow} key={idx}>
                    <View style={styles.medicationCol}>
                      <Text style={styles.itemText}>{`• ${item.medication}`}</Text>
                    </View>
                    <View style={styles.qtyCol}>
                      <Text style={styles.itemText}>{item.quantity}</Text>
                    </View>
                  </View>
                ))}

                <Text style={styles.noteTitle}>Note</Text>
                <Text style={styles.noteText}>
                  {noteText}
                </Text>
              </ScrollView>
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
    padding: 20,
    paddingRight: 15,
    maxHeight: "90%",
    position: "relative",
    paddingHorizontal: 30,
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
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#fff",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
  noteTitle: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  noteText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 18,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  medicationCol: {
    flex: 4,
    paddingRight: 10,
  },
  qtyCol: {
    flex: 1,
    alignItems: "flex-end",
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
  },
});
