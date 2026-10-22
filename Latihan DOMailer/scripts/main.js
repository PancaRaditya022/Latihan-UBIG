const state = {
  emails: [],
  selected: new Set(),
  filter: 'all',
  search: ''
};

const elements = {
  emailList: document.getElementById('email-list'),
  selectAllCheckbox: document.getElementById('selectAllCheckbox'),
  bulkActionBar: document.getElementById('bulkActionBar'),
  selectedCountText: document.getElementById('selectedCountText'),
  unreadCount: document.getElementById('unreadCount'),
  starredCount: document.getElementById('starredCount'),
  totalCount: document.getElementById('totalCount'),
  searchInput: document.getElementById('searchInput'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  markReadBtn: document.getElementById('markReadBtn'),
  deleteSelectedBtn: document.getElementById('deleteSelectedBtn'),
  composeForm: document.getElementById('composeForm'),
  composeSender: document.getElementById('composeSender'),
  composeSubject: document.getElementById('composeSubject'),
  composeBody: document.getElementById('composeBody'),
  composeModal: document.getElementById('composeModal'),
  deleteModal: document.getElementById('deleteModal'),
  deleteModalBody: document.getElementById('deleteModalBody'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  appToast: document.getElementById('appToast'),
  appToastBody: document.getElementById('appToastBody')
};

let pendingDelete = null;

function showToast(message, variant = 'success') {
  elements.appToast.className = `toast align-items-center border-0 text-bg-${variant}`;
  elements.appToastBody.textContent = message;
  bootstrap.Toast.getOrCreateInstance(elements.appToast).show();
}

function isHighPriority(subject) {
  return /urgent|important/i.test(subject);
}

function getVisibleEmails() {
  const query = state.search.toLowerCase();

  return state.emails.filter((email) => {
    if (state.filter === 'unread' && email.isRead) return false;
    if (state.filter === 'starred' && !email.isStarred) return false;
    if (!query) return true;

    return (
      email.sender.toLowerCase().includes(query) ||
      email.subject.toLowerCase().includes(query)
    );
  });
}

function getEmailById(id) {
  return state.emails.find((email) => email.id === id);
}

function createEmailRow(email) {
  const row = document.createElement('tr');
  row.className = `email-row ${email.isRead ? 'is-read' : 'is-unread'}`;
  row.dataset.id = email.id;

  row.innerHTML = `
    <td class="text-center">
      <input class="form-check-input row-checkbox" type="checkbox">
    </td>
    <td class="text-center">
      <i class="bi star-icon"></i>
    </td>
    <td class="sender-name"></td>
    <td>
      <span class="email-subject"></span>
      <p class="email-preview"></p>
    </td>
    <td class="email-date"></td>
    <td class="text-center">
      <button type="button" class="btn-delete-link delete-btn">Delete</button>
    </td>
  `;

  row.querySelector('.row-checkbox').checked = state.selected.has(email.id);

  const star = row.querySelector('.star-icon');
  star.classList.add(email.isStarred ? 'bi-star-fill' : 'bi-star');
  star.classList.add(email.isStarred ? 'filled' : 'empty');
  star.setAttribute('title', email.isStarred ? 'Unstar email' : 'Star email');

  row.querySelector('.sender-name').textContent = email.sender;

  const subject = row.querySelector('.email-subject');
  subject.textContent = email.subject;
  if (isHighPriority(email.subject)) {
    const tag = document.createElement('span');
    tag.className = 'priority-tag';
    tag.textContent = 'High Priority';
    subject.appendChild(tag);
  }

  row.querySelector('.email-preview').textContent = email.body;
  row.querySelector('.email-date').textContent = email.date;

  return row;
}

function renderEmptyState(message) {
  elements.emailList.innerHTML = `
    <tr class="empty-state">
      <td colspan="6" class="text-center">${message}</td>
    </tr>
  `;
}

function updateCounters() {
  const unread = state.emails.filter((email) => !email.isRead).length;
  const starred = state.emails.filter((email) => email.isStarred).length;

  elements.unreadCount.textContent = unread;
  elements.starredCount.textContent = starred;
  elements.totalCount.textContent = state.emails.length;
}

function updateSelectionUI() {
  const visibleEmails = getVisibleEmails();
  const visibleSelected = visibleEmails.filter((email) => state.selected.has(email.id)).length;
  const selectedTotal = state.selected.size;

  elements.selectedCountText.textContent = `${selectedTotal} item(s) selected`;

  elements.bulkActionBar.classList.toggle('d-none', selectedTotal === 0);
  elements.bulkActionBar.classList.toggle('d-flex', selectedTotal > 0);

  elements.selectAllCheckbox.checked =
    visibleEmails.length > 0 && visibleSelected === visibleEmails.length;
  elements.selectAllCheckbox.indeterminate =
    visibleSelected > 0 && visibleSelected < visibleEmails.length;
}

function render() {
  const visibleEmails = getVisibleEmails();
  elements.emailList.innerHTML = '';

  if (visibleEmails.length === 0) {
    const message = state.emails.length === 0
      ? 'Belum ada email di inbox.'
      : 'Tidak ada email yang cocok dengan filter atau pencarian.';
    renderEmptyState(message);
  } else {
    const fragment = document.createDocumentFragment();
    visibleEmails.forEach((email) => fragment.appendChild(createEmailRow(email)));
    elements.emailList.appendChild(fragment);
  }

  updateCounters();
  updateSelectionUI();
}

function toggleRead(id) {
  const email = getEmailById(id);
  if (!email) return;

  email.isRead = !email.isRead;
  render();
  showToast(
    email.isRead ? 'Email ditandai sudah dibaca.' : 'Email ditandai belum dibaca.',
    'success'
  );
}

function deleteEmail(id) {
  state.emails = state.emails.filter((email) => email.id !== id);
  state.selected.delete(id);
  render();
}

function markSelectedAsRead() {
  const total = state.selected.size;
  if (total === 0) return;

  state.emails.forEach((email) => {
    if (state.selected.has(email.id)) email.isRead = true;
  });

  state.selected.clear();
  render();
  showToast(`${total} email ditandai sudah dibaca.`, 'success');
}

function deleteSelected() {
  state.emails = state.emails.filter((email) => !state.selected.has(email.id));
  state.selected.clear();
  render();
}

function requestDeleteEmail(id) {
  const email = getEmailById(id);
  if (!email) return;

  pendingDelete = { type: 'single', id };
  elements.deleteModalBody.textContent = `Hapus email "${email.subject}" dari ${email.sender}?`;
  bootstrap.Modal.getOrCreateInstance(elements.deleteModal).show();
}

function requestDeleteSelected() {
  if (state.selected.size === 0) return;

  pendingDelete = { type: 'bulk' };
  elements.deleteModalBody.textContent = `Hapus ${state.selected.size} email yang dipilih? Tindakan ini tidak dapat dibatalkan.`;
  bootstrap.Modal.getOrCreateInstance(elements.deleteModal).show();
}

function confirmDelete() {
  if (!pendingDelete) return;

  const total = pendingDelete.type === 'bulk' ? state.selected.size : 1;

  if (pendingDelete.type === 'bulk') {
    deleteSelected();
  } else {
    deleteEmail(pendingDelete.id);
  }

  pendingDelete = null;
  bootstrap.Modal.getOrCreateInstance(elements.deleteModal).hide();
  showToast(`${total} email dihapus.`, 'danger');
}

function setFilter(filter) {
  state.filter = filter;

  elements.filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('active', isActive);
    button.classList.toggle('btn-primary', isActive);
    button.classList.toggle('btn-outline-primary', !isActive);
  });

  render();
}

function formatCurrentTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function handleComposeSubmit(event) {
  event.preventDefault();

  const sender = elements.composeSender.value.trim();
  const subject = elements.composeSubject.value.trim();
  const body = elements.composeBody.value.trim();

  if (!sender || !subject || !body) return;

  state.emails.unshift({
    id: Date.now().toString(),
    sender,
    subject,
    body,
    date: formatCurrentTime(),
    isRead: true,
    isStarred: false
  });

  elements.composeForm.reset();

  const modal = bootstrap.Modal.getInstance(elements.composeModal);
  if (modal) modal.hide();

  elements.searchInput.value = '';
  state.search = '';
  setFilter('all');
  showToast('Email berhasil dikirim.', 'success');
}

elements.emailList.addEventListener('click', (event) => {
  const row = event.target.closest('tr[data-id]');
  if (!row) return;

  const email = getEmailById(row.dataset.id);
  if (!email) return;

  if (event.target.closest('.delete-btn')) {
    requestDeleteEmail(email.id);
    return;
  }

  if (event.target.closest('.star-icon')) {
    email.isStarred = !email.isStarred;
    render();
    showToast(
      email.isStarred ? 'Email ditandai penting.' : 'Tanda penting dihapus.',
      'primary'
    );
    return;
  }

  if (event.target.closest('.row-checkbox')) return;

  toggleRead(email.id);
});

elements.emailList.addEventListener('change', (event) => {
  if (!event.target.matches('.row-checkbox')) return;

  const row = event.target.closest('tr[data-id]');
  if (!row) return;

  if (event.target.checked) {
    state.selected.add(row.dataset.id);
  } else {
    state.selected.delete(row.dataset.id);
  }

  updateSelectionUI();
});

elements.selectAllCheckbox.addEventListener('change', () => {
  const visibleEmails = getVisibleEmails();

  visibleEmails.forEach((email) => {
    if (elements.selectAllCheckbox.checked) {
      state.selected.add(email.id);
    } else {
      state.selected.delete(email.id);
    }
  });

  render();
});

elements.searchInput.addEventListener('input', (event) => {
  state.search = event.target.value.trim().toLowerCase();
  render();
});

elements.filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

elements.markReadBtn.addEventListener('click', markSelectedAsRead);
elements.deleteSelectedBtn.addEventListener('click', requestDeleteSelected);
elements.confirmDeleteBtn.addEventListener('click', confirmDelete);
elements.composeForm.addEventListener('submit', handleComposeSubmit);
elements.deleteModal.addEventListener('hidden.bs.modal', () => {
  pendingDelete = null;
});

async function init() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error(`Gagal memuat data`);

    const result = await response.json();
    const emails = Array.isArray(result.data) ? result.data : [];

    state.emails = emails.map((email) => ({
      id: String(email.id),
      sender: String(email.sender ?? ''),
      subject: String(email.subject ?? ''),
      body: String(email.body ?? ''),
      date: String(email.date ?? ''),
      isRead: Boolean(email.isRead),
      isStarred: Boolean(email.isStarred)
    }));

    render();
  } catch (error) {
    console.error(error);
    renderEmptyState(
      'Data belum tersedia.'
    );
    updateCounters();
    showToast('Gagal memuat data email.', 'danger');
  }
}

init();
