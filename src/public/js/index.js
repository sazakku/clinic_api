document.addEventListener("DOMContentLoaded", async () => {
  const appointmentsTableBody = document.getElementById("appointmentsTableBody");
  const createAppointmentBtn = document.getElementById("createAppointmentBtn");
  const createSpecialityBtn = document.getElementById("createSpecialityBtn");
  const createDoctorBtn = document.getElementById("createDoctorBtn");
  const createPatientBtn = document.getElementById("createPatientBtn");

  // Función para cargar la lista de citas desde el endpoint
  const loadAppointments = async () => {
    appointmentsTableBody.innerHTML = '<tr><td colspan="3">Cargando...</td></tr>';

    const appointments = await fetch("http://localhost:3000/api/appointments")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al obtener la lista de citas:", error);
        return [];
      });

    appointmentsTableBody.innerHTML = '';

    appointments.forEach((appointment) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${appointment._id}</td>
        <td>${appointment.patient.name} ${appointment.patient.lastName}</td>
        <td>${appointment.patient.documentId}</td>
        <td>${appointment.speciality.name}</td>
        <td>${appointment.date}</td>
        <td>${appointment.time}</td>
      `;
      appointmentsTableBody.appendChild(row);
    });
  };

  // Cargar la lista de citas al cargar la página
  await loadAppointments();

  // Botón "Crear Cita" que redirige al formulario de creación de citas
  createAppointmentBtn.addEventListener("click", () => {
    window.location.href = "create-appointment.html";
  });

  // Botón "Crear Especialidad" que redirige al formulario de creación de especialidad
  createSpecialityBtn.addEventListener("click", () => {
    window.location.href = "create-speciality.html";
  });

  // Botón "Crear Doctor" que redirige al formulario de creación de Doctor
  createDoctorBtn.addEventListener("click", () => {
    window.location.href = "create-doctor.html";
  });

  // Botón "Crear Doctor" que redirige al formulario de creación de Doctor
  createPatientBtn.addEventListener("click", () => {
    window.location.href = "create-patient.html";
  });
});
