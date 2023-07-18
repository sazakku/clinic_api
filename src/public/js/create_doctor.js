document.addEventListener("DOMContentLoaded", async () => {
  const specialitySelect = document.getElementById("specialities");
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

  // Enviar la información al endpoint de creación de Doctor
  saveBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const office = document.getElementById("office").value;
    const contactEmail = document.getElementById("contactEmail").value;
    const specialityId = specialitySelect.value;

    const doctorData = {
      name: name,
      lastName: lastName,
      office: office,
      contactEmail: contactEmail,
      specialityId: specialityId,
    };

    // Enviar la información mediante una petición POST
    const response = await fetch("http://localhost:3000/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    });

    if (response.ok) {
      alert("Doctor creado exitosamente");
      // Redirigir a la página principal después de crear el doctor
      window.location.href = "index.html";
    } else {
      alert("Error al crear el doctor");
    }
  });
});
