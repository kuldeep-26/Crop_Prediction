document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const numericInputs = document.querySelectorAll('input[type="number"]');
  const summaryBox = document.querySelector('.live-summary');
  const copyButton = document.querySelector('#copy-button');
  const statusNote = document.querySelector('.status-note');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (numericInputs.length && summaryBox) {
    const updateSummary = () => {
      const values = Array.from(numericInputs).map((input) => {
        return input.value ? `${input.labels[0].innerText}: ${input.value}` : null;
      }).filter(Boolean);
      summaryBox.innerHTML = values.length
        ? `Live values: <strong>${values.join(' · ')}</strong>`
        : 'Start entering soil values to preview your recommendation input.';
    };

    numericInputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.validity.badInput || input.value === '') {
          input.classList.add('input-error');
        } else {
          input.classList.remove('input-error');
        }
        updateSummary();
      });
    });

    updateSummary();
  }

  if (copyButton && statusNote) {
    copyButton.addEventListener('click', async () => {
      const cropNames = Array.from(document.querySelectorAll('.crop-name')).map((item) => item.textContent.trim());
      const text = cropNames.join(', ');
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        statusNote.textContent = 'Crop list copied to clipboard!';
        statusNote.classList.add('status-success');
        setTimeout(() => {
          statusNote.textContent = 'Choose the crop that fits your farm best.';
          statusNote.classList.remove('status-success');
        }, 3000);
      } catch (err) {
        statusNote.textContent = 'Unable to copy automatically. Please copy manually.';
        statusNote.classList.add('status-warning');
      }
    });
  }
});
