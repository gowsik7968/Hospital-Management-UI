const prescriptionsData = [
  {
    id: "PR001",
    patientId: "P001",
    patientName: "Arun Kumar",
    doctorId: "D001",
    doctorName: "Dr. Priya Sharma",
    date: "2026-09-08",
    diagnosis: "Hypertension",
    medicines: [
      {
        name: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days"
      },
      {
        name: "Losartan",
        dosage: "50 mg",
        frequency: "Once daily",
        duration: "30 days"
      }
    ],
    instructions: "Take medicines after breakfast.",
    status: "Active"
  },
  {
    id: "PR002",
    patientId: "P002",
    patientName: "Priya Sharma",
    doctorId: "D002",
    doctorName: "Dr. Ravi Kumar",
    date: "2026-09-07",
    diagnosis: "Migraine",
    medicines: [
      {
        name: "Sumatriptan",
        dosage: "50 mg",
        frequency: "As needed",
        duration: "10 days"
      }
    ],
    instructions: "Avoid bright lights and take adequate rest.",
    status: "Active"
  }
];

export default prescriptionsData;