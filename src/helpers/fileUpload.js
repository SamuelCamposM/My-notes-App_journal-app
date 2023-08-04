export const fileUpload = async (file) => {
  if (!file) throw new Error("No hay archivo a subir");
  const cloudUlr =import.meta.env.VITE_cloudUlr;
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const resp = await fetch(cloudUlr, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo subir la imagen");
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
