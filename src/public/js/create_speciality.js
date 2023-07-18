document.addEventListener("DOMContentLoaded", async () => {
  const saveBtn = document.getElementById("saveBtn");

  // Enviar la información al endpoint de creación de especialidades
  saveBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;

    const specialityData = {
      name: name,
    };

    // Enviar la información mediante una petición POST
    const response = await fetch("http://localhost:3000/api/specialities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(specialityData),
    });

    if (response.ok) {
      alert("Especialidad creada exitosamente");
      // Redirigir a la página principal después de crear la especialidad
      window.location.href = "index.html";
    } else {
      alert("Error al crear la especialidad");
    }
  });
});
