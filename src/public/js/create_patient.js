document.addEventListener("DOMContentLoaded", async () => {
  const saveBtn = document.getElementById("saveBtn");

  // Enviar la información al endpoint de creación de pacientes
  saveBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const documentId = document.getElementById("documentId").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;

    const patientData = {
      name: name,
      lastName: lastName,
      documentId: documentId,
      age: age,
      phone: phone
    };

    // Enviar la información mediante una petición POST
    const response = await fetch("http://localhost:3000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    if (response.ok) {
      alert("Paciente creado exitosamente");
      // Redirigir a la página principal después de crear al paciente
      window.location.href = "index.html";
    } else {
      alert("Error al crear el paciente");
    }
  });
});
