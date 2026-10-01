const billingData = [
  {
    id: "INV001",
    patientId: "P001",
    patientName: "Arun Kumar",
    date: "2026-09-08",
    items: [
      {
        description: "Consultation",
        quantity: 1,
        amount: 500
      },
      {
        description: "Blood Test",
        quantity: 1,
        amount: 800
      }
    ],
    subtotal: 1300,
    tax: 0,
    discount: 0,
    total: 1300,
    paymentMethod: "Cash",
    paymentStatus: "Paid"
  },
  {
    id: "INV002",
    patientId: "P002",
    patientName: "Priya Sharma",
    date: "2026-09-07",
    items: [
      {
        description: "Consultation",
        quantity: 1,
        amount: 600
      },
      {
        description: "MRI Scan",
        quantity: 1,
        amount: 3500
      }
    ],
    subtotal: 4100,
    tax: 0,
    discount: 100,
    total: 4000,
    paymentMethod: "UPI",
    paymentStatus: "Paid"
  },
  {
    id: "INV003",
    patientId: "P003",
    patientName: "Ravi Kumar",
    date: "2026-09-06",
    items: [
      {
        description: "Consultation",
        quantity: 1,
        amount: 500
      },
      {
        description: "Medicine",
        quantity: 2,
        amount: 750
      }
    ],
    subtotal: 1250,
    tax: 0,
    discount: 0,
    total: 1250,
    paymentMethod: "Card",
    paymentStatus: "Pending"
  }
];

export default billingData;