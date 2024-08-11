import './styles.css';
import './components/app-bar';
import './components/footer-element';
import './components/note-form';
import './components/note-item';
import './components/loading-indicator';
import Swal from 'sweetalert2';
import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.getElementById('notesContainer');
  const noteForm = document.querySelector('note-form');
  const loadingIndicator = document.createElement('loading-indicator');
  document.body.appendChild(loadingIndicator);

  const showLoading = () => (loadingIndicator.style.display = 'flex');
  const hideLoading = () => (loadingIndicator.style.display = 'none');

  const handleApiResponse = async (response) => {
    const result = await response.json();
    if (result.status !== 'success') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message || 'Terjadi kesalahan dengan server',
      });
      throw new Error(result.message || 'Unknown error');
    }
    return result;
  };

  const displayNotification = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
    });
  };

  const createNoteElement = (note) => {
    const noteItem = document.createElement('note-item');
    noteItem.setAttribute('title', note.title);
    noteItem.setAttribute('body', note.body);
    noteItem.setAttribute('created-at', note.createdAt);
    noteItem.setAttribute('id', note.id);
    noteItem.setAttribute('archived', note.archived);

    notesContainer.appendChild(noteItem);

    // Animasi GSAP pada elemen catatan
    gsap.from(noteItem, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power2.out',
    });
  };

  const performApiOperation = async (
    url,
    method,
    successMessage,
    successCallback
  ) => {
    try {
      showLoading();
      const response = await fetch(url, { method });
      await handleApiResponse(response);
      successCallback();
      displayNotification('success', 'Success', successMessage);
    } catch (error) {
      console.error(error);
      displayNotification(
        'error',
        'Error',
        'Gagal melakukan operasi. Silakan coba lagi.'
      );
    } finally {
      hideLoading();
    }
  };

  noteForm.addEventListener('add-note', async (event) => {
    try {
      showLoading();
      const { title, body } = event.detail;
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });

      const result = await handleApiResponse(response);
      createNoteElement(result.data);
      displayNotification('success', 'Success', 'Catatan berhasil ditambahkan');
    } catch (error) {
      console.error(error);
      displayNotification(
        'error',
        'Error',
        'Gagal menambahkan catatan. Silakan coba lagi.'
      );
    } finally {
      hideLoading();
    }
  });

  notesContainer.addEventListener('delete-note', (event) => {
    const { id } = event.detail;
    performApiOperation(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      'DELETE',
      'Catatan berhasil dihapus',
      () => {
        gsap.to(event.target, {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: 'power2.in',
          onComplete: () => event.target.remove(),
        });
      }
    );
  });

  notesContainer.addEventListener('archive-note', (event) => {
    const { id } = event.detail;
    performApiOperation(
      `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
      'POST',
      'Catatan berhasil diarsipkan',
      () => event.target.remove()
    );
  });

  notesContainer.addEventListener('unarchive-note', (event) => {
    const { id } = event.detail;
    performApiOperation(
      `https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`,
      'POST',
      'Catatan berhasil dipulihkan dari arsip',
      () => event.target.remove()
    );
  });

  const loadNotes = async (url) => {
    try {
      showLoading();
      const response = await fetch(url);
      const result = await handleApiResponse(response);
      result.data.forEach(createNoteElement);
    } catch (error) {
      console.error(error);
      displayNotification(
        'error',
        'Error',
        'Gagal memuat catatan. Silakan coba lagi.'
      );
    } finally {
      hideLoading();
    }
  };

  loadNotes('https://notes-api.dicoding.dev/v2/notes');
  loadNotes('https://notes-api.dicoding.dev/v2/notes/archived');
});
