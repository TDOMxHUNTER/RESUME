import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumePreview from './ResumePreview';
import html2pdf from 'html2pdf.js';
import cities from 'cities.json';

// InputGroup component - defined outside to prevent recreation on every render
const InputGroup = ({ label, value, onChange, type = "text", placeholder, ...props }) => (
    <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ 
            display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#9CA3AF', 
            marginBottom: '0.5rem', fontFamily: 'Inter', letterSpacing: '0.01em'
        }}>
            {label}
        </label>
        <input 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ 
              width: '100%', padding: '0.85rem 1rem', backgroundColor: '#0A0A0A', 
              border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter',
              fontSize: '0.95rem', transition: 'all 0.2s ease', outline: 'none'
          }} 
          onFocus={(e) => {
             e.target.style.borderColor = '#C5A059';
             e.target.style.boxShadow = '0 0 0 2px rgba(197, 160, 89, 0.2)';
          }}
          onBlur={(e) => {
             e.target.style.borderColor = '#374151';
             e.target.style.boxShadow = 'none';
          }}
          {...props}
         />
    </div>
);

const ResumeEditorModal = ({ isOpen, onClose, initialData }) => {
  // Use local state, defaulting to initialData
  // Ensure hobbies exists for backward compatibility
  const [formData, setFormData] = useState({
    ...initialData,
    hobbies: initialData.hobbies || []
  });

  // Location autocomplete state
  const [locationSearch, setLocationSearch] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Filter cities based on search input
  const filteredCities = useMemo(() => {
    if (!locationSearch || locationSearch.length < 2) return [];
    
    const searchLower = locationSearch.toLowerCase();
    return cities
      .filter(city => 
        city.name.toLowerCase().includes(searchLower) || 
        city.country.toLowerCase().includes(searchLower)
      )
      .slice(0, 50) // Limit to 50 results for performance
      .map(city => `${city.name}, ${city.country}`);
  }, [locationSearch]);

  // --- Handlers ---
  const handlePrint = () => {
    const element = document.getElementById('resume-preview-content');
    const printArea = document.getElementById('resume-print-area');
    
    console.log('=== PDF Generation Debug ===');
    console.log('Element found:', !!element);
    console.log('Print area found:', !!printArea);
    
    if (!element) {
      console.error('Resume preview element not found');
      alert('Error: Could not find resume content to print');
      return;
    }

    console.log('Element dimensions:', {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollHeight: element.scrollHeight
    });

    // Store original transform to restore later
    const originalTransform = printArea ? printArea.style.transform : '';
    const originalBorderRadius = printArea ? printArea.style.borderRadius : '';
    
    // Temporarily remove transform and border radius for clean PDF capture
    if (printArea) {
      printArea.style.transform = 'none';
      printArea.style.borderRadius = '0';
    }

    const opt = {
      margin:       0.3, // Reduced margin for better page fill
      filename:     'My_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        logging: true,
        backgroundColor: formData.backgroundColor || '#EEF0E5'
      },
      jsPDF:        { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak:    { 
        mode: ['css', 'legacy'],
        avoid: ['section']
      }
    };

    console.log('Starting PDF generation with options:', opt);

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        console.log('PDF generated successfully');
        // Restore original styles
        if (printArea) {
          printArea.style.transform = originalTransform;
          printArea.style.borderRadius = originalBorderRadius;
        }
      })
      .catch((error) => {
        console.error('PDF generation error:', error);
        alert('Error generating PDF: ' + error.message);
        // Restore original styles even on error
        if (printArea) {
          printArea.style.transform = originalTransform;
          printArea.style.borderRadius = originalBorderRadius;
        }
      });
  };


  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value
        }
    }));
  };

  const handleBackgroundColorChange = (color) => {
    setFormData(prev => ({ ...prev, backgroundColor: color }));
  };


  const handleArrayChange = (arrayName, index, field, value) => {
      const newArray = [...formData[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addItem = (arrayName, template) => {
      setFormData(prev => ({
          ...prev,
          [arrayName]: [...prev[arrayName], template]
      }));
  };

  const removeItem = (arrayName, index) => {
      setFormData(prev => ({
          ...prev,
          [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
  };

  // --- Pagination Logic (Simulation) ---
  // We assume 1st page has Header, Links, Summary.
  // Subsequent pages might just have spillover Skills/Languages?
  // For simplicity, we'll just pass the WHOLE data to the preview, 
  // and ResumePreview will handle splitting if logic exists, 
  // BUT user asked for manual buttons.
  // Actually, HTML-to-PDF is continuous. "Pages" in preview are just visual.
  // We'll create a logic to slice skills/langs if they exceed a limit.
  
  // Let's assume Page 1: Personal, Contact, Summary, First 6 Sklls, First 3 Langs.
  // Page 2: Remaining Skills/Langs.
  // This is complex to do perfectly dynamically. 
  // Simplified: We render the SAME component but let user scroll or scale it.
  // User asked for "Left Right" buttons. 
  
  // Let's just create a "Pages" array based on data volume?
  // No, simpler: Just show the data. If it overflows A4, the USER sees it.
  // We will provide a simple Scale Slider for the preview.

  // --- Components ---
  // InputGroup moved to top of file to prevent recreation

  if (!isOpen) return null;

  return (
    <AnimatePresence>
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ 
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 10000, 
                display: 'flex', overflow: 'hidden', cursor: 'auto'
            }}
        >
            {/* LEFT: Editor Panel (Dark Theme) - Added data-lenis-prevent for scroll fix */}
            <div 
                className="editor-panel" 
                data-lenis-prevent // KEY FIX: Prevents Lenis from hijacking scroll
                style={{ width: '450px', height: '100%', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', backgroundColor: '#050505' }}
            >
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#C5A059' }}></div>
                         <h2 className="font-sans" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#C5A059' }}>Resume Builder</h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>✕</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    
                    {/* PERSONAL */}
                    <div style={{ marginBottom: '2rem' }}>
                         <h3 className="section-title" style={{ color: '#F3F4F6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: '0.5rem', letterSpacing: '0.02em' }}>Personal Details</h3>
                         <InputGroup label="Full Name" value={formData.personal.name} onChange={(v) => handleInputChange('personal', 'name', v)} placeholder="e.g. John Doe" />
                         <InputGroup label="Role Title" value={formData.personal.role} onChange={(v) => handleInputChange('personal', 'role', v)} placeholder="e.g. Senior Frontend Developer" />
                    </div>

                    {/* CONTACT */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 className="section-title" style={{ color: '#F3F4F6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: '0.5rem', letterSpacing: '0.02em' }}>Contact</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0rem' }}>
                             <InputGroup label="Phone" value={formData.contact.phone} onChange={(v) => handleInputChange('contact', 'phone', v)} placeholder="e.g. +1 555 010 9999" />
                             <InputGroup label="Email" value={formData.contact.email} onChange={(v) => handleInputChange('contact', 'email', v)} placeholder="e.g. john.doe@example.com" />
                             
                             {/* Custom Location Autocomplete */}
                             <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#9CA3AF', marginBottom: '0.5rem', fontFamily: 'Inter' }}>Location</label>
                                <input 
                                  type="text" 
                                  value={formData.contact.location} 
                                  onChange={(e) => {
                                    handleInputChange('contact', 'location', e.target.value);
                                    setLocationSearch(e.target.value);
                                    setShowLocationDropdown(true);
                                  }}
                                  placeholder="Type city name..."
                                  style={{ 
                                      width: '100%', padding: '0.85rem 1rem', backgroundColor: '#0A0A0A', 
                                      border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter',
                                      fontSize: '0.95rem', transition: 'all 0.2s ease', outline: 'none'
                                  }} 
                                  onFocus={(e) => {
                                    setLocationSearch(formData.contact.location);
                                    setShowLocationDropdown(true);
                                    e.target.style.borderColor = '#C5A059';
                                    e.target.style.boxShadow = '0 0 0 2px rgba(197, 160, 89, 0.2)';
                                  }}
                                  onBlur={(e) => {
                                    setTimeout(() => setShowLocationDropdown(false), 200);
                                    e.target.style.borderColor = '#374151';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                />
                                {/* Dropdown */}
                                {showLocationDropdown && filteredCities.length > 0 && (
                                  <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    marginTop: '0.25rem',
                                    zIndex: 1000,
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                  }}>
                                    {filteredCities.map((city, idx) => (
                                      <div
                                        key={idx}
                                        onMouseDown={() => {
                                          handleInputChange('contact', 'location', city);
                                          setShowLocationDropdown(false);
                                        }}
                                        style={{
                                          padding: '0.75rem',
                                          cursor: 'pointer',
                                          color: '#F9FAFB',
                                          fontSize: '0.9rem',
                                          borderBottom: idx < filteredCities.length - 1 ? '1px solid #374151' : 'none',
                                          transition: 'background-color 0.15s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                      >
                                        {city}
                                      </div>
                                    ))}
                                  </div>
                                )}
                             </div>
                        </div>
                    </div>


                    {/* SOCIAL LINKS */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                            <h3 style={{ color: '#F3F4F6', margin: 0, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em' }}>Social Links</h3>
                            <button onClick={() => addItem('socials', { label: '', value: '', url: '' })} style={{ cursor: 'pointer', background: '#1F2937', border: '1px solid #374151', color: '#60A5FA', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; e.currentTarget.style.borderColor = '#60A5FA'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#1F2937'; e.currentTarget.style.borderColor = '#374151'; }}>+</button>
                        </div>
                        <AnimatePresence>
                        {formData.socials.map((link, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                                style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151', position: 'relative' }}
                            >
                                <button onClick={() => removeItem('socials', i)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1rem', padding: '0.2rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#EF4444'} onMouseLeave={(e) => e.target.style.color = '#6B7280'}>✕</button>
                                <div style={{ display: 'grid', gap: '0.2rem' }}>
                                    <InputGroup label="Link Label" value={link.label} onChange={(v) => handleArrayChange('socials', i, 'label', v)} placeholder="e.g. LinkedIn" />
                                    <InputGroup label="Display Text" value={link.value} onChange={(v) => handleArrayChange('socials', i, 'value', v)} placeholder="e.g. linkedin.com/in/johndoe" />
                                    <InputGroup label="URL (href)" value={link.url} onChange={(v) => handleArrayChange('socials', i, 'url', v)} placeholder="e.g. https://linkedin.com/..." />
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>

                    {/* SUMMARY */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 className="section-title" style={{ color: '#F3F4F6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: '0.5rem', letterSpacing: '0.02em' }}>Professional Summary</h3>
                        <textarea 
                            value={formData.summary} 
                            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                            rows={6}
                            placeholder="Briefly describe your professional background, key achievements, and career goals..."
                            className="summary-textarea"
                            style={{ 
                                width: '100%', padding: '0.85rem 1rem', backgroundColor: '#111827', 
                                border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', 
                                fontFamily: 'Inter', lineHeight: 1.6, fontSize: '0.95rem',
                                overflowY: 'auto', resize: 'none', outline: 'none', transition: 'all 0.2s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#C5A059';
                                e.target.style.boxShadow = '0 0 0 2px rgba(197, 160, 89, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#374151';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* HOBBIES */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                            <h3 style={{ color: '#F3F4F6', margin: 0, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em' }}>Hobbies & Interests</h3>
                            <button onClick={() => setFormData(prev => ({ ...prev, hobbies: [...prev.hobbies, ''] }))} style={{ cursor: 'pointer', background: '#1F2937', border: '1px solid #374151', color: '#60A5FA', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; e.currentTarget.style.borderColor = '#60A5FA'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#1F2937'; e.currentTarget.style.borderColor = '#374151'; }}>+</button>
                        </div>
                        <AnimatePresence>
                        {formData.hobbies.map((hobby, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 24px', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                                <input 
                                    value={hobby} 
                                    onChange={(e) => {
                                        const newHobbies = [...formData.hobbies];
                                        newHobbies[i] = e.target.value;
                                        setFormData(prev => ({ ...prev, hobbies: newHobbies }));
                                    }} 
                                    placeholder="e.g. Photography, Hiking, Reading"
                                    style={{ width: '100%', padding: '0.85rem 1rem', backgroundColor: '#0A0A0A', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s ease' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 2px rgba(197, 160, 89, 0.2)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#374151'; e.target.style.boxShadow = 'none'; }}
                                />
                                <button onClick={() => setFormData(prev => ({ ...prev, hobbies: prev.hobbies.filter((_, idx) => idx !== i) }))} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.target.style.color = '#EF4444'} onMouseLeave={(e) => e.target.style.color = '#6B7280'}>✕</button>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>

                    {/* BACKGROUND COLOR */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 className="section-title" style={{ color: '#F3F4F6', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Background Color</h3>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            {/* Preset Colors */}
                            {['#EEF0E5', '#FFE5E5', '#E5F3FF', '#FFF9E5', '#F0E5FF', '#E5FFF0'].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => handleBackgroundColorChange(color)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        backgroundColor: color,
                                        border: formData.backgroundColor === color ? '3px solid #C5A059' : '2px solid #374151',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    title={color}
                                />
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9CA3AF' }}>Custom:</label>
                            <input
                                type="color"
                                value={formData.backgroundColor || '#EEF0E5'}
                                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                                style={{
                                    width: '60px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    border: '2px solid #374151',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent'
                                }}
                            />
                            <span style={{ fontSize: '0.85rem', color: '#9CA3AF', fontFamily: 'monospace' }}>
                                {formData.backgroundColor || '#EEF0E5'}
                            </span>
                        </div>
                    </div>

                    {/* SKILLS */}
                     <div style={{ marginBottom: '2rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                            <h3 style={{ color: '#F3F4F6', margin: 0, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em' }}>Skills</h3>
                            <button onClick={() => addItem('skills', { name: '', level: 50 })} style={{ cursor: 'pointer', background: '#1F2937', border: '1px solid #374151', color: '#60A5FA', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; e.currentTarget.style.borderColor = '#60A5FA'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#1F2937'; e.currentTarget.style.borderColor = '#374151'; }}>+</button>
                        </div>
                        <AnimatePresence>
                        {formData.skills.map((skill, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 24px', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                                <input 
                                    value={skill.name} onChange={(e) => handleArrayChange('skills', i, 'name', e.target.value)} placeholder="e.g. React"
                                    style={{ width: '100%', padding: '0.85rem 1rem', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s ease' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 2px rgba(197, 160, 89, 0.2)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#374151'; e.target.style.boxShadow = 'none'; }}
                                />
                                <input 
                                    type="number" value={skill.level} onChange={(e) => handleArrayChange('skills', i, 'level', parseInt(e.target.value))} min="0" max="100"
                                    style={{ width: '100%', padding: '0.85rem 0.5rem', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter', fontSize: '0.95rem', textAlign: 'center', outline: 'none' }}
                                />
                                <button onClick={() => removeItem('skills', i)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.target.style.color = '#EF4444'} onMouseLeave={(e) => e.target.style.color = '#6B7280'}>✕</button>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>

                    {/* LANGUAGES */}
                     <div style={{ marginBottom: '2rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
                            <h3 style={{ color: '#F3F4F6', margin: 0, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em' }}>Languages</h3>
                            <button onClick={() => addItem('languages', { name: '', level: 50 })} style={{ cursor: 'pointer', background: '#1F2937', border: '1px solid #374151', color: '#60A5FA', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; e.currentTarget.style.borderColor = '#60A5FA'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#1F2937'; e.currentTarget.style.borderColor = '#374151'; }}>+</button>
                        </div>
                        <AnimatePresence>
                        {formData.languages.map((lang, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 24px', gap: '0.8rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                                <input 
                                    value={lang.name} onChange={(e) => handleArrayChange('languages', i, 'name', e.target.value)} placeholder="e.g. English"
                                    style={{ width: '100%', padding: '0.85rem 1rem', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s ease' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#C5A059'; e.target.style.boxShadow = '0 0 0 2px rgba(197, 160, 89, 0.2)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#374151'; e.target.style.boxShadow = 'none'; }}
                                />
                                <input 
                                    type="number" value={lang.level} onChange={(e) => handleArrayChange('languages', i, 'level', parseInt(e.target.value))} min="0" max="100"
                                    style={{ width: '100%', padding: '0.85rem 0.5rem', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB', fontFamily: 'Inter', fontSize: '0.95rem', textAlign: 'center', outline: 'none' }}
                                />
                                <button onClick={() => removeItem('languages', i)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.1rem', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.target.style.color = '#EF4444'} onMouseLeave={(e) => e.target.style.color = '#6B7280'}>✕</button>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>

                </div>
                
                {/* TOOLBAR */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid #333', backgroundColor: '#050505' }}>
                    <button 
                        onClick={handlePrint}
                        className="download-btn"
                        style={{ 
                            width: '100%', padding: '1rem', backgroundColor: '#C5A059', color: '#000', 
                            border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer',
                            fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(197, 160, 89, 0.3)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* RIGHT: Live Preview Area (Premium Dark Gradient) */}
            <div 
                style={{ 
                    flex: 1, 
                    background: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)', 
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', 
                    padding: '2rem', overflowY: 'auto' 
                }}
                data-lenis-prevent // KEY FIX: Allow scrolling here too
            >
                 {/* Preview Indicator */}
                 <div style={{ 
                     marginBottom: '2rem',
                     padding: '0.5rem 1.5rem',
                     backgroundColor: 'rgba(20, 20, 20, 0.8)',
                     backdropFilter: 'blur(12px)',
                     borderRadius: '100px',
                     border: '1px solid rgba(255,255,255,0.08)',
                     boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
                 }}>
                     <span style={{ color: '#9CA3AF', fontSize: '0.85rem', fontFamily: 'Inter', letterSpacing: '0.1em', fontWeight: 500 }}>
                         LIVE PREVIEW
                     </span>
                 </div>

                 {/* Print Wrapper */}
                 <div id="resume-print-area" style={{ 
                     transform: 'scale(0.85)', // Better Fit
                     transformOrigin: 'top center',
                     boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                     borderRadius: '20px',
                     marginBottom: '4rem'
                 }}>
                    {/* Wrapper with ID for html2pdf */}
                    <div id="resume-preview-content">
                        <ResumePreview data={formData} isEditing={true} />
                    </div>
                 </div>
            </div>

        </motion.div>
    </AnimatePresence>
  );
};

export default ResumeEditorModal;
