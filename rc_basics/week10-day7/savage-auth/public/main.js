const form = document.getElementById('imageForm');


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  try {
      const response = await fetch('/images', {
          method: 'POST',
          body: formData,
      });

      const data = await response.json();
      console.log(JSON.parse(data.response.candidates[0].content.parts[0].text));
  } catch (error) {
    console.log(error)
  }
});