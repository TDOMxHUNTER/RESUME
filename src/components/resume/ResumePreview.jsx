import React from 'react';
import { motion } from 'framer-motion';

const ResumePreview = ({ data, isEditing = false }) => {
  // Render full content continuously
  // PDF generation handles page breaks automatically
  const pageContent = {
    showHeader: true,
    showSummary: true,
    showLinks: true,
    hobbies: data.hobbies || [],
    skills: data.skills,
    languages: data.languages
  };
  
  // Styles for A4 Paper look
  const containerStyle = {
    maxWidth: '800px', // Standard A4 width reference
    width: '100%',
    margin: '0 auto',
    padding: '2.5rem 2rem', // Reduced padding for better page fill in PDF
    backgroundColor: data.backgroundColor || '#EEF0E5', // Use custom color or default
    borderRadius: '20px', // Always rounded on screen as requested
    color: '#1a1a1a',
    fontFamily: '"Inter", sans-serif',
    boxShadow: isEditing ? 'none' : '0 20px 40px rgba(0,0,0,0.1)',
  };

  // Section style to prevent awkward page breaks
  const sectionStyle = {
    pageBreakInside: 'avoid',
    breakInside: 'avoid'
  };


  return (
    <div className="resume-preview-node" style={containerStyle}>
       {/* Header */}
       {pageContent.showHeader && (
       <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '2px solid #1a1a1a', paddingBottom: '1rem' }}>
            <div>
                <h1 style={{ fontSize: '3.5rem', lineHeight: 0.9, fontWeight: 700, margin: 0, fontFamily: '"Playfair Display", serif', letterSpacing: '-0.03em' }}>
                    {data.personal.name.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                            {word} <br/>
                        </React.Fragment>
                    ))}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', color: '#555' }}>↘</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 500, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{data.personal.role}</span>
                </div>
            </div>

            <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Details</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: '0.5rem', width: '250px' }}>
                    <span style={{ color: '#555' }}>Phone</span>
                    <strong>{data.contact.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: '0.5rem', marginTop: '0.5rem', width: '250px' }}>
                    <span style={{ color: '#555' }}>Email</span>
                    <strong>{data.contact.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: '0.5rem', marginTop: '0.5rem', width: '250px' }}>
                    <span style={{ color: '#555' }}>Location</span>
                    <strong>{data.contact.location}</strong>
                </div>
            </div>
        </header>
       )}

        {/* Websites */}
        {pageContent.showLinks && (
        <section style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', marginBottom: '0.5rem', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Links</h3>
                <span style={{ fontSize: '2rem' }}>✶</span>
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.8, display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                {data.socials.map((link, i) => (
                    <div key={i}>
                        <strong style={{ marginRight: '0.5rem' }}>{link.label}:</strong> 
                        <a href={link.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: '#999' }}>{link.value}</a>
                    </div>
                ))}
                {!isEditing && (
                    <div className="no-print">
                        <strong style={{ marginRight: '0.5rem' }}>Builds:</strong> 
                        <a href="/#projects" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: '#C5A059', fontWeight: 'bold' }}>View Projects ↗</a>
                    </div>
                )}
            </div>
        </section>
        )}

        {/* Summary */}
        {pageContent.showSummary && (
        <section style={{ marginBottom: '1rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', marginBottom: '0.5rem', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Summary</h3>
                <span style={{ fontSize: '2rem' }}>✶</span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, textAlign: 'justify', color: '#333' }}>
                {data.summary}
            </p>
        </section>
        )}

        {/* Hobbies */}
        {pageContent.hobbies.length > 0 && pageContent.hobbies.some(h => h.trim()) && (
        <section style={{ marginBottom: '1rem', ...sectionStyle }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', marginBottom: '0.5rem', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Hobbies & Interests</h3>
                <span style={{ fontSize: '2rem' }}>✶</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {pageContent.hobbies.filter(h => h.trim()).map((hobby, i) => (
                    <span key={i} style={{ 
                        padding: '0.4rem 0.8rem', 
                        backgroundColor: 'rgba(0,0,0,0.05)', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem',
                        fontWeight: 500
                    }}>
                        {hobby}
                    </span>
                ))}
            </div>
        </section>
        )}

        {/* Skills */}
        {pageContent.skills.length > 0 && (
        <section style={sectionStyle}>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', marginBottom: '0.5rem', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Skills</h3>
                <span style={{ fontSize: '2rem' }}>✶</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem' }}>
                {pageContent.skills.map((skill, i) => (
                    <div key={i}>
                         <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>{skill.name}</div>
                          <div style={{ height: '12px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              style={{ height: '100%', backgroundColor: '#1a1a1a', borderRadius: '6px' }}
                            />
                          </div>
                    </div>
                ))}
            </div>
        </section>
        )}


         {/* Languages */}
        {pageContent.languages.length > 0 && (
        <section style={{ marginTop: '1.5rem', ...sectionStyle }}>
             <div style={{ borderBottom: '1px solid #1a1a1a', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: '"Playfair Display", serif' }}>Languages</h3>
            </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {pageContent.languages.map((lang, i) => (
                    <div key={i}>
                         <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>{lang.name}</div>
                          <div style={{ height: '12px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              style={{ height: '100%', backgroundColor: '#1a1a1a', borderRadius: '6px' }}
                            />
                          </div>
                    </div>
                ))}
            </div>
        </section>
        )}
    </div>
  );
};

export default ResumePreview;
