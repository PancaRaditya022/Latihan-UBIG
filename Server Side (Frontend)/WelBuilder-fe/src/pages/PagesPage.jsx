import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function PagesPage() {
    const [pages, setPages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editPage, setEditPage] = useState(null);
    const [deletePage, setDeletePage] = useState(null);
    const [form, setForm] = useState({ title: '', slug: '', summary: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        document.title = 'Pages';
        if (!token) return;

        fetchPages();

        const handleKey = (e) => {
            if (e.altKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                openCreate();
            }
            if (e.key === 'Escape') {
                setShowModal(false);
                setDeletePage(null);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    if (!token) {
        return <Navigate to='/login' />;
    }

    const fetchPages = async () => {
        try {
            const res = await api.get('/pages');
            const list = Array.isArray(res.data.data) ? res.data.data : (res.data.data?.pages || []);
            setPages(list);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/login');
            }
        }
    };

    const toSlug = (text) => text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

    const openCreate = () => {
        setEditPage(null);
        setForm({ title: '', slug: '', summary: '' });
        setErrors({});
        setShowModal(true);
    };

    const openEdit = (page) => {
        setEditPage(page);
        setForm({ title: page.title, slug: page.slug, summary: page.summary || '' });
        setErrors({});
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            if (editPage) {
                const res = await api.put(`/pages/${editPage.slug}`, form);
                setPages(pages.map((p) => (p.id === editPage.id ? res.data.data : p)));
            } else {
                const res = await api.post('/pages', form);
                setPages([res.data.data, ...pages]);
            }
            setShowModal(false);
        } catch (err) {
            setErrors(err.response?.data?.errors || {});
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/pages/${deletePage.slug}`);
            setPages(pages.filter((p) => p.id !== deletePage.id));
            setDeletePage(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="app-layout">
                <Navbar />

                <main className="app-main">
                    <div className="page-container">
                        <div className="page-header">
                            <div className="page-header__left">
                                <h1 className="page-title">My Pages</h1>
                                <p className="page-subtitle">{pages.length} pages · manage your web content</p>
                            </div>
                            <div>
                                <button className="btn btn--primary" type="button" onClick={openCreate}>
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                    </svg>
                                    New Page
                                    <span className="kbd">Alt+N</span>
                                </button>
                            </div>
                        </div>

                        <div className="pages-grid">
                            {pages.map((page) => (
                                <div className="page-item" key={page.id}>
                                    <div className="page-item__info">
                                        <span className="page-item__title">
                                            <Link to={`/pages/${page.slug}/builder`}>{page.title}</Link>
                                            <span className="page-item__title-arrow">→</span>
                                        </span>
                                        <div className="page-item__meta">
                                            <span className="page-item__slug">/{page.slug}</span>
                                            {page.summary && <span className="page-item__summary">{page.summary}</span>}
                                        </div>
                                    </div>
                                    <div className="page-item__actions">
                                        <Link to={`/pages/${page.slug}/builder`} className="btn btn--ghost btn--sm">
                                            Build
                                        </Link>
                                        <button className="btn btn--ghost btn--sm" type="button" onClick={() => openEdit(page)}>
                                            Edit
                                        </button>
                                        <button className="btn btn--danger btn--sm" type="button" onClick={() => setDeletePage(page)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <div className={`modal-backdrop ${showModal ? '' : 'hidden'}`}>
                <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-create-title">
                    <form onSubmit={handleSave}>
                        <div className="modal__header">
                            <h2 className="modal__title" id="modal-create-title">{editPage ? 'Edit Page' : 'New Page'}</h2>
                            <button className="modal__close" type="button" aria-label="Close" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <div className="modal__body">
                            <div className="form-group">
                                <label className="form-label" htmlFor="new-title">Title</label>
                                <input
                                    className={`form-input ${errors.title ? 'form-input--error' : ''}`}
                                    type="text"
                                    id="new-title"
                                    name="title"
                                    placeholder="e.g. Homepage"
                                    value={form.title}
                                    onChange={(e) => setForm({
                                        ...form,
                                        title: e.target.value,
                                        slug: editPage ? form.slug : toSlug(e.target.value)
                                    })}
                                    required
                                />
                                {errors.title && <span className="form-error">{errors.title[0]}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="new-slug">Slug</label>
                                <input
                                    className={`form-input ${errors.slug ? 'form-input--error' : ''}`}
                                    type="text"
                                    id="new-slug"
                                    name="slug"
                                    placeholder="e.g. homepage"
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase() })}
                                    required
                                />
                                {errors.slug
                                    ? <span className="form-error">{errors.slug[0]}</span>
                                    : <span className="form-hint">Auto-generated from title. Lowercase, no spaces.</span>
                                }
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="new-summary">Summary <span className="form-hint">(optional)</span></label>
                                <textarea
                                    className={`form-input ${errors.summary ? 'form-input--error' : ''}`}
                                    id="new-summary"
                                    name="summary"
                                    placeholder="Brief description of this page…"
                                    value={form.summary}
                                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                                ></textarea>
                                {errors.summary && <span className="form-error">{errors.summary[0]}</span>}
                            </div>
                        </div>

                        <div className="modal__footer">
                            <button className="btn btn--ghost" type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn--primary" type="submit">Save Page</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className={`modal-backdrop ${deletePage ? '' : 'hidden'}`}>
                <div className="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-delete-title">
                    <div className="modal__header">
                        <h2 className="modal__title" id="modal-delete-title">Delete Page</h2>
                        <button className="modal__close" type="button" aria-label="Close" onClick={() => setDeletePage(null)}>✕</button>
                    </div>

                    <div className="modal__body">
                        <div className="confirm-dialog__icon">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4v7" stroke="#c0392b" strokeWidth="2" strokeLinecap="square" />
                                <circle cx="11" cy="16" r="1" fill="#c0392b" />
                                <path d="M3 19L11 3l8 16H3z" stroke="#c0392b" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="confirm-dialog__text">
                            Are you sure you want to delete <strong>"{deletePage?.title}"</strong>?<br />
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="modal__footer">
                        <button className="btn btn--ghost" type="button" onClick={() => setDeletePage(null)}>Cancel</button>
                        <button className="btn btn--danger" type="button" onClick={handleDelete}>Ok, Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}