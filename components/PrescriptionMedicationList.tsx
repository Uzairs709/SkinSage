import { Colors } from "@/constants/Colors";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Prescription {
  medication: string;
  quantity: number | string;
}

interface PrescriptionMedicationListProps {
  prescriptions: Prescription[];
  isEditing: boolean;
  onPrescriptionsChange: (prescriptions: Prescription[]) => void;
  onAddMedication: () => void;
  onRemoveMedication: (index: number) => void;
}

export default function PrescriptionMedicationList({
  prescriptions,
  isEditing,
  onPrescriptionsChange,
  onAddMedication,
  onRemoveMedication,
}: PrescriptionMedicationListProps) {
  return (
    <>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Title</Text>
        <Text style={styles.headerText}>Qty</Text>
        {isEditing && <View style={styles.actionCol} />}
      </View>

      <ScrollView>
        {prescriptions.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <View style={styles.medicationCol}>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={item.medication}
                  onChangeText={(text) => {
                    const newPrescriptions = [...prescriptions];
                    newPrescriptions[idx].medication = text;
                    onPrescriptionsChange(newPrescriptions);
                  }}
                  placeholder="Enter medication"
                />
              ) : (
                <Text style={styles.itemText}>{`• ${item.medication}`}</Text>
              )}
            </View>
            <View style={styles.qtyCol}>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={item.quantity.toString()}
                  onChangeText={(text) => {
                    const newPrescriptions = [...prescriptions];
                    newPrescriptions[idx].quantity = text;
                    onPrescriptionsChange(newPrescriptions);
                  }}
                  placeholder="Qty"
                />
              ) : (
                <Text style={styles.itemText}>{item.quantity}</Text>
              )}
            </View>
            {isEditing && (
              <View style={styles.actionCol}>
                <TouchableOpacity 
                  onPress={() => onRemoveMedication(idx)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {isEditing && (
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={onAddMedication}
          >
            <Text style={styles.addButtonText}>+ Add Medication</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
  actionCol: {
    width: 30,
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    color: Colors.dark.primary,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.dark.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 