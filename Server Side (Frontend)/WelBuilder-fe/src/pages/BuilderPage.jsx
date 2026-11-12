import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function PageBuilderPage() {
    const { slug } = useParams();
    const token = localStorage.getItem('token');

    const [page, setPage] = useState(null);
    const [sections, setSections] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [activeSectionId, setActiveSectionId] = useState(null);
    const [fieldValues, setFieldValues] = useState({});
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [newSection, setNewSection] = useState({ name: '', template_id: '' });
    const [removeSection, setRemoveSection] = useState(null);
    const [dragIndex, setDragIndex] = useState(null);

    useEffect(() => {
        document.title = 'Page Builder';
        if (!token) return;

        fetchPage();
        fetchTemplates();

        const handleKey = (e) => {
            if (e.altKey && e.key.toLowerCase() === 's') {
                e.preventDefault();
                setShowAddPanel(true);
            }
            if (e.key === 'Escape') {
                setShowAddPanel(false);
                setActiveSectionId(null);
                setRemoveSection(null);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [slug]);

    if (!token) {
        return <Navigate to='/login' />;
    }

    const fetchPage = async () => {
        try {
            const res = await api.get(`/pages/${slug}`);
            const data = res.data.data;
            setPage(data);
            setSections(data.sections || []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchTemplates = async () => {
        try {
            const res = await api.get('/templates');
            const list = Array.isArray(res.data.data) ? res.data.data : (res.data.data?.templates || []);
            setTemplates(list);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleExpand = (section) => {
        if (activeSectionId === section.id) {
            setActiveSectionId(null);
        } else {
            setActiveSectionId(section.id);
            const initial = {};
            section.fields.forEach((f) => {
                initial[f.id] = f.value || '';
            });
            setFieldValues(initial);
        }
    };

    const handleAddSection = async (e) => {
        e.preventDefault();
        if (!newSection.template_id) return;

        try {
            const res = await api.post(`/pages/${slug}/sections`, {
                name: newSection.name,
                template_id: Number(newSection.template_id),
                position: sections.length + 1,
            });
            const added = res.data.data;
            setSections([...sections, added]);
            setNewSection({ name: '', template_id: '' });
            setShowAddPanel(false);
            handleToggleExpand(added);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveFields = async (section) => {
        const payload = section.fields.map((f) => ({
            field_id: f.id,
            value: fieldValues[f.id] ?? '',
        }));

        try {
            const res = await api.put(`/pages/${slug}/sections/${section.id}/fields`, {
                fields: payload,
            });
            const updatedFields = res.data.data?.fields || section.fields.map((f) => ({
                ...f,
                value: fieldValues[f.id] ?? '',
            }));

            setSections(sections.map((s) => (s.id === section.id ? { ...s, fields: updatedFields } : s)));
            setActiveSectionId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveSection = async () => {
        try {
            await api.delete(`/pages/${slug}/sections/${removeSection.id}`);
            setSections(sections.filter((s) => s.id !== removeSection.id));
            setRemoveSection(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDrop = async (dropIndex) => {
        if (dragIndex === null || dragIndex === dropIndex) return;

        const reordered = [...sections];
        const [moved] = reordered.splice(dragIndex, 1);
        reordered.splice(dropIndex, 0, moved);
        setSections(reordered);
        setDragIndex(null);

        try {
            await api.put(`/pages/${slug}/sections/reorder`, {
                section_ids: reordered.map((s) => s.id),
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="app-layout">
                <Navbar />

                <div className="app-main">
                    <div className="builder-layout">
                        <div className="builder-main">
                            <div className="builder-toolbar">
                                <div className="builder-toolbar__left">
                                    <div className="builder-breadcrumb">
                                        <Link to="/pages">Pages</Link>
                                        <span>→</span>
                                        <span>{page?.title || slug}</span>
                                    </div>
                                    <div className="builder-toolbar__divider"></div>
                                    <span className="tag">{sections.length} sections</span>
                                </div>
                                <div className="navbar__actions">
                                    <button
                                        className="btn btn--primary btn--sm"
                                        type="button"
                                        onClick={() => setShowAddPanel(!showAddPanel)}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                        </svg>
                                        Add Section
                                    </button>
                                    <Link to={`/pages/${slug}/preview`} className="btn btn--ghost btn--sm">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 6.5C1 6.5 3 2 6.5 2S12 6.5 12 6.5 10 11 6.5 11 1 6.5 1 6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                        Preview
                                    </Link>
                                </div>
                            </div>

                            <div className="builder-canvas">
                                {sections.map((section, idx) => {
                                    const isOpen = activeSectionId === section.id;
                                    return (
                                        <div
                                            key={section.id}
                                            className={`field-editor ${isOpen ? 'field-editor--open' : ''}`}
                                            draggable
                                            onDragStart={() => setDragIndex(idx)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={() => handleDrop(idx)}
                                        >
                                            <div
                                                className="field-editor__header"
                                                onClick={() => handleToggleExpand(section)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div>
                                                    <div className="field-editor__title">
                                                        <span className="tag">{String(idx + 1).padStart(2, '0')}</span>
                                                        &nbsp; {section.name || section.template?.name}
                                                    </div>
                                                    <div className="field-editor__meta">
                                                        template: {section.template?.slug} · {section.fields?.length || 0} fields
                                                    </div>
                                                </div>
                                                <div className="field-editor__toggle" style={{ gap: '0.75rem' }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn--danger btn--sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setRemoveSection(section);
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                    <span>{isOpen ? 'Collapse' : 'Expand'}</span>
                                                    <svg className="field-editor__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d={isOpen ? "M1 1l5 5 5-5" : "M1 7l5-5 5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {isOpen && (
                                                <>
                                                    <div className="field-editor__body">
                                                        {section.fields.map((field) => (
                                                            <div className="form-group" key={field.id}>
                                                                <label className="form-label" htmlFor={`f-${field.id}`}>
                                                                    {field.name}
                                                                </label>
                                                                <input
                                                                    className="form-input"
                                                                    type={field.type === 'image' ? 'url' : 'text'}
                                                                    id={`f-${field.id}`}
                                                                    placeholder={field.type === 'image' ? 'https://example.com/image.jpg' : `Enter ${field.name.toLowerCase()}…`}
                                                                    value={fieldValues[field.id] ?? ''}
                                                                    onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="field-editor__footer">
                                                        <div className="shortcuts-hint">
                                                            <span className="kbd">Esc</span> to close
                                                        </div>
                                                        <div className="field-editor__footer-actions">
                                                            <button className="btn btn--ghost btn--sm" type="button" onClick={() => setActiveSectionId(null)}>
                                                                Discard
                                                            </button>
                                                            <button className="btn btn--primary btn--sm" type="button" onClick={() => handleSaveFields(section)}>
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}

                                {showAddPanel && (
                                    <form className="add-section-panel" onSubmit={handleAddSection}>
                                        <div className="add-section-panel__header">
                                            <span className="add-section-panel__title">Add Section</span>
                                            <button className="btn btn--ghost btn--sm btn--icon" type="button" onClick={() => setShowAddPanel(false)}>
                                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="form-wrap">
                                            <div className="form-group" style={{ flex: 1 }}>
                                                <label className="form-label" htmlFor="section-name">Section Name</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    id="section-name"
                                                    placeholder="Hero 1"
                                                    value={newSection.name}
                                                    onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group" style={{ flex: 1 }}>
                                                <label className="form-label" htmlFor="section-template">Section Template</label>
                                                <select
                                                    className="form-input"
                                                    id="section-template"
                                                    value={newSection.template_id}
                                                    onChange={(e) => setNewSection({ ...newSection, template_id: e.target.value })}
                                                    required
                                                >
                                                    <option value="" disabled>Choose a template…</option>
                                                    {templates.map((tpl) => (
                                                        <option key={tpl.id} value={tpl.id}>
                                                            {tpl.slug} — {tpl.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button className="btn btn--primary" type="submit" style={{ alignSelf: 'flex-start' }}>
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`modal-backdrop ${removeSection ? '' : 'hidden'}`}>
                <div className="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-remove-title">
                    <div className="modal__header">
                        <h2 className="modal__title" id="modal-remove-title">Remove Section</h2>
                        <button className="modal__close" type="button" aria-label="Close" onClick={() => setRemoveSection(null)}>✕</button>
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
                            Remove <strong>"{removeSection?.name || removeSection?.template?.name}"</strong> from this page?<br />
                            This action cannot be undone.
                        </p>
                    </div>
                    <div className="modal__footer">
                        <button className="btn btn--ghost" type="button" onClick={() => setRemoveSection(null)}>Cancel</button>
                        <button className="btn btn--danger" type="button" onClick={handleRemoveSection}>Ok, Remove</button>
                    </div>
                </div>
            </div>
        </>
    );
}