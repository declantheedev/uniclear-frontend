import React, { useState } from 'react';
import List from './List';
import pickDocumentFile from '../utils/FIleUpload';

const items = [
  'passport photograph',
  '1 white office file',
  'Validity form',
  'Confirmation of Admission slip',
  'Joint Admissions and matriculation Board Result',
  'Statement of Results (WAEC/NECO Certificate)',
  'Post UTME Test Score',
  'Jamb Result',
  'Provisional offer of Admission 2022/2023 Academic Session',
  'Acceptance Receipt',
  'Computer Print Out',
  'Birth Certificate',
  'Letter of Identification',
  'Letter of Attestation',
];

const DepartmentClearance = ({ uploadUrl = '' }) => {
  // uploads map: itemName -> { status, fileName, size, formData, error }
  const [uploads, setUploads] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setItemState = (name, patch) => {
    setUploads(prev => ({ ...prev, [name]: { ...(prev[name] || {}), ...patch } }));
  };

  const handleAdd = async (name) => {
    setItemState(name, { status: 'picking', error: null });
    try {
      const result = await pickDocumentFile();
      // result: { fileName, size, formData }
      setItemState(name, { status: 'ready', fileName: result.fileName, size: result.size, formData: result.formData });

      // auto-upload if uploadUrl provided
      if (uploadUrl) {
        await uploadSingle(name, result.formData);
      }
    } catch (err) {
      setItemState(name, { status: 'error', error: err?.message || 'File selection failed' });
    }
  };

  const uploadSingle = async (name, formData) => {
    setItemState(name, { status: 'uploading', error: null });
    try {
      const res = await fetch(uploadUrl, { method: 'POST', body: formData });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Upload failed');
      }
      const json = await res.json().catch(() => null);
      setItemState(name, { status: 'done', uploadedResponse: json });
      return json;
    } catch (err) {
      setItemState(name, { status: 'error', error: err?.message || 'Upload failed' });
      return null;
    }
  };

  const handleSubmit = async () => {
    // gather all selected files
    const selected = Object.entries(uploads).filter(([_, v]) => v && v.formData);
    if (selected.length === 0) {
      alert('No files selected');
      return;
    }

    if (!uploadUrl) {
      // Build combined FormData and log it (can't inspect FormData easily)
      const combined = new FormData();
      selected.forEach(([name, info], idx) => {
        // append each file under a safe field name
        const file = info.formData.get('file');
        if (file) combined.append(`file_${idx}`, file, info.fileName || `file_${idx}`);
      });
      console.log('Combined FormData ready (no uploadUrl provided):', combined);
      alert('FormData prepared in console (no uploadUrl provided)');
      return;
    }

    setSubmitting(true);
    // append all files to a single FormData and POST
    const form = new FormData();
    selected.forEach(([name, info], idx) => {
      const f = info.formData.get('file');
      if (f) form.append(`file_${idx}`, f, info.fileName || `file_${idx}`);
    });

    try {
      const res = await fetch(uploadUrl, { method: 'POST', body: form });
      if (!res.ok) throw new Error(await res.text());
      alert('All files uploaded successfully');
    } catch (err) {
      alert('Upload failed: ' + (err?.message || 'unknown'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {items.map((it) => (
        <List
          key={it}
          name={it}
          value={uploads[it]?.fileName || (uploads[it]?.status === 'uploading' ? 'Uploading...' : uploads[it]?.status === 'error' ? uploads[it].error : '')}
          onAdd={() => handleAdd(it)}
        />
      ))}

      <div className="flex justify-center mt-6">
        <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2 bg-primary-custom text-white rounded-md">
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default DepartmentClearance;
