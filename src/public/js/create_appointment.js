document.addEventListener("DOMContentLoaded", async () => {
  const specialitySelect = document.getElementById("speciality");
  const doctorSelect = document.getElementById("doctor");
  const saveBtn = document.getElementById("saveBtn");

  // Cargar la lista de especialidades desde el endpoint
  const specialities = await fetch("http://localhost:3000/api/specialities")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al obtener la lista de especialidades:", error);
      return [];
    });

  // Llenar la lista desplegable de especialidades
  specialities.forEach((speciality) => {
    const option = document.createElement("option");
    option.value = speciality._id;
    option.textContent = speciality.name;
    specialitySelect.appendChild(option);
  });

  // Actualizar la lista de médicos cuando se seleccione una especialidad
  specialitySelect.addEventListener("change", async () => {
    const selectedSpecialityId = specialitySelect.value;
    doctorSelect.innerHTML = '<option value="">Cargando...</option>';
    doctorSelect.disabled = true;

    // Consultar la lista de médicos con la especialidad seleccionada
    const doctors = await fetch(`http://localhost:3000/api/doctors?specialityId=${selectedSpecialityId}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al obtener la lista de médicos:", error);
        return [];
      });

    // Llenar la lista desplegable de médicos
    doctorSelect.innerHTML = '';
    doctors.forEach((doctor) => {
      const option = document.createElement("option");
      option.value = doctor._id;
      option.textContent = doctor.name;
      doctorSelect.appendChild(option);
    });

    doctorSelect.disabled = false;
  });

  // Enviar la información al endpoint de creación de citas
  saveBtn.addEventListener("click", async () => {
    const documentId = document.getElementById("documentId").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const specialityId = specialitySelect.value;
    const doctorId = doctorSelect.value;

    const appointmentData = {
      documentId: documentId,
      date: date,
      time: time,
      specialityId: specialityId,
      doctorId: doctorId,
    };

    // Enviar la información mediante una petición POST
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (response.ok) {
      alert("Cita creada exitosamente");
      // Redirigir a la página principal después de crear la cita
      window.location.href = "index.html";
    } else {
      alert("Error al crear la cita");
    }
  });
});
