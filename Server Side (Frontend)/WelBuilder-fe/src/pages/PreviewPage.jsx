import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import api from '../api/axios';

export default function PreviewPage() {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;

        api.get(`/pages/${slug}`)
            .then((res) => {
                setPage(res.data.data);
                document.title = `Preview: ${res.data.data.title}`;
            })
            .catch(console.error);
    }, [slug]);

    if (!token) {
        return <Navigate to='/login' />;
    }

    const getField = (section, key) => {
        return section.fields?.find((f) => f.slug === key || f.name.toLowerCase().replace(/\s+/g, '_') === key)?.value || '';
    };

    const renderSection = (section) => {
        const tplSlug = section.template?.slug;

        if (tplSlug === 'hero' || tplSlug === 'hero-banner') {
            const title = getField(section, 'title') || getField(section, 'heading');
            const subtitle = getField(section, 'subtitle');
            const cta = getField(section, 'button_label');
            const bg = getField(section, 'background_image');

            return (
                <div className="preview-hero-section">
                    <div className="preview-hero-section__content">
                        <h2 className="preview-hero-section__title">{title || 'Untitled Hero'}</h2>
                        {subtitle && <p className="preview-hero-section__subtitle">{subtitle}</p>}
                        {cta && <button className="btn btn--primary" type="button">{cta}</button>}
                    </div>
                    {bg ? (
                        <img src={bg} alt={title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                    ) : (
                        <div className="preview-hero-section__image-placeholder">
                            <span>background_image</span>
                        </div>
                    )}
                </div>
            );
        }

        if (tplSlug === 'about') {
            const heading = getField(section, 'heading');
            const desc = getField(section, 'description');
            const img = getField(section, 'image');

            return (
                <div className="preview-about">
                    {img ? (
                        <img src={img} alt={heading} style={{ width: '100%', maxHeight: '280px', objectFit: 'cover' }} />
                    ) : (
                        <div className="preview-about__image-placeholder">
                            <span>image</span>
                        </div>
                    )}
                    <div className="preview-about__body">
                        <div className="preview-about__label">About Us</div>
                        <h2 className="preview-about__heading">{heading || 'About Heading'}</h2>
                        <p className="preview-about__description">{desc}</p>
                    </div>
                </div>
            );
        }

        if (tplSlug === 'services') {
            const items = [1, 2, 3].map((n) => ({
                name: getField(section, `service_${n}_name`),
                icon: getField(section, `service_${n}_icon`),
            }));

            return (
                <div className="preview-services">
                    <div className="preview-services__heading">Our Services</div>
                    <div className="preview-services__grid">
                        {items.map((item, i) => (
                            <div className="preview-service-card" key={i}>
                                <div className="preview-service-card__icon">
                                    {item.icon ? <img src={item.icon} alt={item.name} style={{ width: 24, height: 24, objectFit: 'contain' }} /> : '★'}
                                </div>
                                <div className="preview-service-card__name">{item.name || `Service ${i + 1}`}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (tplSlug === 'contact') {
            const title = getField(section, 'title');
            const email = getField(section, 'email');
            const phone = getField(section, 'phone');
            const mapImg = getField(section, 'map_image');

            return (
                <div className="preview-contact">
                    <div className="preview-contact__left">
                        <h2 className="preview-contact__title">{title || 'Contact Us'}</h2>
                        <div className="preview-contact__details">
                            {email && (
                                <div className="preview-contact__detail">
                                    <span className="preview-contact__detail-value">{email}</span>
                                </div>
                            )}
                            {phone && (
                                <div className="preview-contact__detail">
                                    <span className="preview-contact__detail-value">{phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {mapImg ? (
                        <img src={mapImg} alt="Map" style={{ width: '100%', maxHeight: '240px', objectFit: 'cover' }} />
                    ) : (
                        <div className="preview-contact__map-placeholder">
                            <span>map_image</span>
                        </div>
                    )}
                </div>
            );
        }

        if (tplSlug === 'footer') {
            const copyright = getField(section, 'copyright_text');
            const logo = getField(section, 'logo_url');
            const ig = getField(section, 'instagram_link');
            const fb = getField(section, 'facebook_link');

            return (
                <div className="preview-footer">
                    <div className="preview-footer__top">
                        <div className="preview-footer__logo-placeholder">
                            {logo ? <img src={logo} alt="Logo" style={{ maxHeight: 32 }} /> : <span className="preview-footer__logo-label">logo_url</span>}
                        </div>
                        <div className="preview-footer__socials">
                            {ig && <a href={ig} target="_blank" rel="noreferrer" className="preview-footer__social-link">Instagram</a>}
                            {fb && <a href={fb} target="_blank" rel="noreferrer" className="preview-footer__social-link">Facebook</a>}
                        </div>
                    </div>
                    <div className="preview-footer__bottom">
                        <span className="preview-footer__copyright">{copyright || '© WelBuilder'}</span>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {section.fields?.map((f) => (
                    <div key={f.id} style={{ marginBottom: '0.75rem' }}>
                        <strong>{f.name}: </strong>
                        {f.type === 'image' && f.value
                            ? <img src={f.value} alt={f.name} style={{ maxWidth: '100%', display: 'block', marginTop: '0.5rem' }} />
                            : <span>{f.value || '-'}</span>
                        }
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="preview-layout">
            <div className="preview-topbar">
                <div className="preview-topbar__info">
                    <span className="preview-topbar__badge">Preview</span>
                    <span className="preview-topbar__title">{page?.title || slug}</span>
                    <span className="preview-topbar__slug">/{slug}</span>
                </div>
                <Link to={`/pages/${slug}/builder`} className="btn btn--ghost btn--sm">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2L3 6.5 8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                    </svg>
                    Back to Builder
                </Link>
            </div>

            <div className="preview-content">
                {page?.sections?.map((section, idx) => (
                    <div className="preview-section" key={section.id}>
                        <div className="preview-section__label">
                            <span className="preview-section__num">{String(idx + 1).padStart(2, '0')}</span>
                            <span className="preview-section__template-name">{section.template?.slug}</span>
                        </div>
                        <div className="preview-section__body">
                            {renderSection(section)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}