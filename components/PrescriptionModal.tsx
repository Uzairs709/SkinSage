import { Colors } from "@/constants/Colors";
import axios from "@/utils/api";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import PrescriptionMedicationList from "./PrescriptionMedicationList";
import PrescriptionNote from "./PrescriptionNote";

interface Prescription {
  medication: string;
  quantity: number | string;
}

interface PrescriptionModalProps {
  visible: boolean;
  onClose: () => void;
  prescriptions: Prescription[];
  noteText: string;
  isViewOnly?: boolean;
  doctorId: number | null;
  patientId: number;
}

export default function PrescriptionModal({
  visible,
  onClose,
  prescriptions: initialPrescriptions,
  noteText: initialNoteText,
  isViewOnly = true,
  doctorId,
  patientId,
}: PrescriptionModalProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [noteText, setNoteText] = useState("");

  // Sync into state only once when the modal actually opens
  useEffect(() => {
    if (visible) {
      setPrescriptions(initialPrescriptions ?? []);
      setNoteText(initialNoteText ?? "");
    }
  }, [visible]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!doctorId) return;
    try {
      await axios.put("/prescriptions", {
        doctor_id: doctorId,
        patient_id: patientId,
        medication: prescriptions,
        instructions: noteText,
      });
      setIsEditing(false);
      onClose();
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  const addNewMedication = () => {
    setPrescriptions([...prescriptions, { medication: "", quantity: "" }]);
  };

  const removeMedication = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView intensity={50} tint="dark" style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.circle} onPress={onClose}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>Prescription</Text>
                {!isViewOnly && (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditing(!isEditing)}
                  >
                    <Text style={styles.editButtonText}>
                      {isEditing ? "Cancel" : "Edit"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <PrescriptionMedicationList
                prescriptions={prescriptions}
                isEditing={isEditing}
                onPrescriptionsChange={setPrescriptions}
                onAddMedication={addNewMedication}
                onRemoveMedication={removeMedication}
              />

              <PrescriptionNote
                noteText={noteText}
                isEditing={isEditing}
                onNoteChange={setNoteText}
              />

              {isEditing && (
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              )}
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  editButtonText: {
    color: Colors.dark.primary,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: Colors.dark.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
