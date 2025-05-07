// components/PrescriptionModal.tsx
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Prescription {
  medication: string;
  quantity: number | string;
}

export default function PrescriptionModal({
  visible,
  onClose,
  prescriptions,
}: {
  visible: boolean;
  onClose: () => void;
  prescriptions: Prescription[];
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.circle} />
            <Text style={styles.title}>Prescription</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Title</Text>
              <Text style={styles.headerText}>Qty</Text>
            </View>
            {prescriptions.map((item, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text>{`• ${item.medication}`}</Text>
                <Text>{item.quantity}</Text>
              </View>
            ))}
            <Text style={styles.noteTitle}>Note</Text>
            <Text style={styles.noteText}>
              Cleanse your skin with a gentle cleanser. For eczema, apply
              Hydrocortisone cream thinly... (You can paste the full text from
              the image)
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={{ color: "#fff" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#3e663e",
    borderRadius: 16,
    padding: 16,
    maxHeight: "80%",
  },
  circle: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    color: "#fff",
  },
  noteTitle: {
    marginTop: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  noteText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  closeBtn: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "#1e4e1e",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
